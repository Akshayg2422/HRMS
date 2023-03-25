import { Card, CommonTable, NoRecordFound } from '@components';
import { getShiftRequestedEmployees } from '../../../../../../store/shiftManagement/actions';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ApprovedRequest() {
  let dispatch = useDispatch();

  const { currentPage, numOfPages, shiftRequestedEmployees } = useSelector(
    (state: any) => state.ShiftManagementReducer
  );
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const getEmployeeRequest = (type: number, pageNumber: number) => {
    const params = {
      status: type,
      page_number: pageNumber,
      ...hierarchicalBranchIds
    }
    dispatch(getShiftRequestedEmployees({ params }));
  }

  const normalizedRequestList = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          name: `${el?.name}${' '}(${el?.employee_id})`,
          "Branch": el?.branch_name,
          "Shift": el?.shift_details?.name,
          "Reason": el?.reason,
          "Status": el?.status_text
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
    getEmployeeRequest(1, page);
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


export { ApprovedRequest }
