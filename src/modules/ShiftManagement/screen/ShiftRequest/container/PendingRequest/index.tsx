import { Card, CommonTable, NoRecordFound } from '@components';
import { getShiftRequestedEmployees, postChangeShiftChange } from '../../../../../../store/shiftManagement/actions';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@utils';

function PendingRequest() {
  let dispatch = useDispatch();

  const { currentPage, numOfPages, shiftRequestedEmployees } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );

  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
    }
    dispatch(getShiftRequestedEmployees({ params }));
  }

  const normalizedRequestList = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          name: `${el?.name}${' '}(${el.employee_id})`,
          "Branch": el.branch_name,
          "Shift": el.shift_details.name,
          "Reason": el.reason,
          "Status": el.status_text,
          "Approve": <>
            {el.status_code === -1 ? (
              <span
                className="h5 text-primary"
                onClick={() => {
                  ChangeStatusHandler(el, -1)
                }}
              >
                {"Approve"}
              </span>
            ) : (
              <>{"-"}</>
            )}
          </>,
          "Reject": <>
            {el.status_code === -1 ? (
              <span
                className="h5 text-primary"
                onClick={() => {
                  ChangeStatusHandler(el, -1)
                }}
              >
                {"Reject"}
              </span>
            ) : (
              <>{"-"}</>
            )}
          </>
        };
      })
    );
  };

  function paginationHandler(
    type: "next" | "prev" | "current",
    position?: number
  ) {
    let page =
      type === "next"
        ? currentPage + 1
        : type === "prev"
          ? currentPage - 1
          : position;
    getEmployeeRequest(-1, page);
  }

  const ChangeStatusHandler = (item: any, type: number) => {
    const params = { id: item.id, status: type }
    dispatch(postChangeShiftChange({
      params,
      onSuccess: (success: any) => {
        showToast("success", success?.message)
        getEmployeeRequest(-1, currentPage);
      },
      onError: (error: string) => {
        showToast("error", error)
      }
    }));
  }

  return (
    <div>
      <Card>
        {shiftRequestedEmployees && shiftRequestedEmployees?.length > 0 ? (
          <CommonTable
            noHeader
            isPagination
            currentPage={currentPage}
            noOfPage={numOfPages}
            paginationNumberClick={(currentPage) => {
              paginationHandler("current", currentPage);
            }}
            previousClick={() => paginationHandler("prev")}
            nextClick={() => paginationHandler("next")}
            displayDataSet={normalizedRequestList(shiftRequestedEmployees)}
          />
        ) : (
          <NoRecordFound />
        )}
      </Card>
    </div>
  )
}

export { PendingRequest }
