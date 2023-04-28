import { Card, CommonTable, Container, Modal, NoRecordFound, Primary, Secondary } from '@components';
import { getShiftRequestedEmployees, postChangeShiftChange } from '../../../../../../store/shiftManagement/actions';
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@utils';
import { useTranslation } from 'react-i18next';

function AllRequest() {
  let dispatch = useDispatch();
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequested] = useState<any>()

  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);
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
    dispatch(getShiftRequestedEmployees({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  }

  const normalizedRequestList = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          Employee: `${el?.name}${' '}(${el?.employee_id})`,
          "Branch": el?.branch_name,
          "Shift": el?.shift_details?.name,
          "Reason": el?.reason,
          "Status": el?.status_text,
          "Approve": <>
            {el?.status_code === -1 ? (
              <span
                style={{ cursor: 'pointer' }}
                className="h5 text-primary"
                onClick={() => {
                  handleApproveModel(el)
                }}
              >
                {"Approve"}
              </span>
            ) : (
              <>{"-"}</>
            )}
          </>,
          "Reject": <>
            {el?.status_code === -1 ? (
              <span
                className="h5 text-primary"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleRejectModel(el)
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
    getEmployeeRequest(-2, page);
  }

  const ChangeStatusHandler = (item: any, type: number) => {
    const params = { id: item.id, status: type }
    dispatch(postChangeShiftChange({
      params,
      onSuccess: (success: any) => () => {
        getEmployeeRequest(-2, currentPage);
        
        if (type === 1) {
          showToast("success", success.status)
          setApproveModel(!approveModel);
        }
        if (type === 0) {
          showToast("success", success.status)
          setRejectModel(!rejectModel);
        }
      },
      onError: (error: string) => () => {
        showToast("error", error)
      }
    }));
  }

  const handleApproveModel = (item: any) => {
    setSelectedRequested(item)
    setApproveModel(!approveModel)
  }

  const handleRejectModel = (item: any) => {
    setSelectedRequested(item)
    setRejectModel(!rejectModel)
  }

  const memoizedTable = useMemo(() => {
    return <>
      {shiftRequestedEmployees && shiftRequestedEmployees.length > 0 ? (
        <CommonTable
          noHeader
          isPagination
          card={false}
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedRequestList(shiftRequestedEmployees)}
        />
      ) : <NoRecordFound />}
    </>
  }, [shiftRequestedEmployees])

  return (
    <div>
      <div>
        <>
          {
            memoizedTable
          }
        </>
      </div>
      <Modal
        title={t("approveShift")}
        showModel={approveModel}
        toggle={() => setApproveModel(!approveModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("approveRequestMessage")}</span>
          <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
            <span>
              {t("employeeName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.name}</span>
            </span>
            <br />
            <span>
              {t("requestShift")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.shift_details?.name}</span>
            </span>
            <br />
            <span>
              {t("reason")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.reason}</span>
            </span>
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setApproveModel(!approveModel)}
            />
            <Primary
              text={t("approve")}
              onClick={() => ChangeStatusHandler(selectedRequest, 1)}
            />
          </Container>
        </Container>
      </Modal>
      <Modal
        title={t("rejectShift")}
        showModel={rejectModel}
        toggle={() => setRejectModel(!rejectModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("rejectRequestMessage")}</span>
          <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
            <span>
              {t("employeeName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.name}</span>
            </span>
            <br />
            <span>
              {t("requestShift")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.shift_details?.name}</span>
            </span>
            <br />
            <span>
              {t("reason")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{selectedRequest?.reason}</span>
            </span>
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setRejectModel(!rejectModel)}
            />
            <Primary
              text={t("reject")}
              onClick={() => ChangeStatusHandler(selectedRequest, 0)}

            />
          </Container>
        </Container>
      </Modal>
    </div>
  )
}


export { AllRequest }
