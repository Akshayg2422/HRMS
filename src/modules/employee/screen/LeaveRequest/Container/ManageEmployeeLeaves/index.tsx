import { Card, CommonTable, Container, Modal, NoRecordFound, Primary, Secondary } from "@components";
import {
  changeEmployeeLeaveStatus, getEmployeeLeaveHistory, getEmployeeLeaves, getEmployeeLeavesSuccess, getLeavesByTypes, getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_REVERT, LEAVE_STATUS_UPDATE, ROUTE, goTo, showToast, useNav } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ManageEmployeeLeaves = ({ search }: any) => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const navigation = useNav();

  const [revertModel, setRevertModel] = useState(false);
  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);

  const {numOfPages, currentPage, employeeLeaveHistory, myLeaves } = useSelector(
    (state: any) => state.EmployeeReducer
  );


  const fetchleaveDetail = (pageNumber: number) => {
    const params = {
      status: -2,
      page_number: pageNumber,
      employee_id: employeeLeaveHistory?.employee_company_info_id
    };
    dispatch(getLeavesByTypes({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {
      }
    }));
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
    fetchleaveDetail(page);
  }

  const normalizedEmployeeLog = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        Employee: `${el.name}${' '}(${el.employee_id})`,
        "Date From": el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
        "Reason": el.reason,
        "Branch": el.branch_name,
        "Status": <div style={{ whiteSpace: "pre-wrap" }}>{el.status_text}<br />{el.status_code !== -1 ? <small>{`${el.approved_by !== null ? `By -${el.approved_by}` : ''}`}</small> : <></>}</div>
      };
    });
  };

  const normalizedEmployeeDetails = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        Employee: `${el.name}${' '}(${el.employee_id})`,
        "Date From": el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
        "Reason": el.reason,
        "Branch": el.branch_name,
        "Status": <div style={{ whiteSpace: "pre-wrap" }}>{el.status_text}<br />{el.status_code !== -1 ? <small>{`${el.approved_by !== null ? `By -${el.approved_by}` : ''}`}</small> : <></>}</div>,
        "": <td style={{ whiteSpace: "pre-wrap" }} >
          {el.status_code === -1 ? (
            <span
              className="h5 text-primary "
              style={{ cursor: 'pointer' }}

              onClick={() => {
                setApproveModel(!approveModel)
              }}
            >
              {"Approve"}
            </span>
          )
             : el.status_code === 1 ? (
              <span
                className="h5 text-primary"
                style={{ cursor: 'pointer' }}
              onClick={() => {
                setRevertModel(!revertModel)
              }}
              >
                {"Revert"}
              </span>
            )
            // : el.status_code === 0 ? (
            //   <span
            //     className="h5 text-primary"
            //     style={{ cursor: 'pointer' }}
            //     onClick={() => {
            //       setRevertModel(!revertModel)
            //     }}
            //   >
            //     {"Revert"}
            //   </span>
            // )
              : (
                <></>
              )}
        </td>,
        " ": <td style={{ whiteSpace: "pre-wrap", }}>
          {el.status_code === -1 ? (
            <span
              style={{ cursor: 'pointer' }}
              className="h5 text-danger"
              onClick={() => {
                setRejectModel(!rejectModel)
              }}
            >
              {"Reject"}
            </span>
          ) : (
            <>{"-"}</>
          )}
        </td>
      };
    });
  };

  const memoizedTable = useMemo(() => {
    return <>
      {myLeaves && myLeaves.length > 0 ? (
        <CommonTable
          // noHeader
          title="Leave History"
          isPagination
          card={true}
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(myLeaves)}

        />
      ) : <NoRecordFound />}
    </>
  }, [myLeaves])

  const manageStatusHandler = (el: number) => {
    const params = {
      id: employeeLeaveHistory.id,
      status: el,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: any) => () => {
          if (el === 1) {
            setApproveModel(!approveModel);
          }
          if (el === 0) {
            setRejectModel(!rejectModel);
          }
          if (el === -1) {
            setRevertModel(!revertModel);
          }
          // fetchPendingDetail(currentPage);
          showToast('success', success?.status)
          goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);

        },
        onError: (error: string) => () => {
          showToast('error', error)
        },
      })
    );
  };

  return (
    <div>
      <Card>
        <CommonTable
          card={false}
          displayDataSet={normalizedEmployeeDetails([employeeLeaveHistory])} />
      </Card>
      <div>
        <>
          {
            memoizedTable
          }
        </>
      </div>
      <Modal
        title={t("revertStatus")}
        showModel={revertModel}
        toggle={() => setRevertModel(!revertModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("revertWarningMessage")}</span>
          <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
            <span>
              {t("employeeName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.name}</span>
            </span>
            <br />
            <span>
              {t("dataFrom")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_from}</span>
            </span>
            <br />
            <span>
              {t("dataTo")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_to}</span>
            </span>
            <br />
            <span>
              {t("leaveType")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">
                {employeeLeaveHistory?.leave_type}
              </span>
            </span>
            <br />
            <span>
              {t("reason")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.reason}</span>
            </span>
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setRevertModel(!revertModel)}
            />
            <Primary
              text={t("confirm")}
              onClick={() => manageStatusHandler(-1)}
            />
          </Container>
        </Container>
      </Modal>
      <Modal
        title={t("rejectLeave")}
        showModel={rejectModel}
        toggle={() => setRejectModel(!rejectModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("rejectWarningMessage")}</span>
          <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
            <span>
              {t("employeeName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.name}</span>
            </span>
            <br />
            <span>
              {t("dataFrom")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_from}</span>
            </span>
            <br />
            <span>
              {t("dataTo")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_to}</span>
            </span>
            <br />
            <span>
              {t("leaveType")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">
                {employeeLeaveHistory?.leave_type}
              </span>
            </span>
            <br />
            <span>
              {t("reason")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.reason}</span>
            </span>
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setRejectModel(!rejectModel)}
            />
            <Primary
              text={t("reject")}
              onClick={() => manageStatusHandler(0)}
            />
          </Container>
        </Container>
      </Modal>
      <Modal
        title={t("approveLeave")}
        showModel={approveModel}
        toggle={() => setApproveModel(!approveModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("approveWarningMessage")}</span>
          <Container additionClass={"ml-xl-4"} textAlign={"text-left"}>
            <span>
              {t("employeeName")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.name}</span>
            </span>
            <br />
            <span>
              {t("dataFrom")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_from}</span>
            </span>
            <br />
            <span>
              {t("dataTo")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.date_to}</span>
            </span>
            <br />
            <span>
              {t("leaveType")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">
                {employeeLeaveHistory?.leave_type}
              </span>
            </span>
            <br />
            <span>
              {t("reason")}
              {":"}&nbsp;&nbsp;
              <span className="text-black">{employeeLeaveHistory?.reason}</span>
            </span>
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setApproveModel(!approveModel)}
            />
            <Primary
              text={t("approve")}
              onClick={() => manageStatusHandler(1)}
            />
          </Container>
        </Container>
      </Modal>
    </div>
  );
};


export default ManageEmployeeLeaves
