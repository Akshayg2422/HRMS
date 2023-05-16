import {
  Card,
  CommonTable,
  Container,
  Modal,
  NoRecordFound,
  Primary,
  Secondary,
} from "@components";
import {
  changeEmployeeLeaveStatus,
  changeEmployeeModifyLogStatus,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getModifyLogs,
  getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_UPDATE, showToast } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Pending = ({ search }: any) => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);

  const { employeesModifyLeaves, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: -1,
      q: search,
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: object) => () => { },
        onError: (error: string) => () => { },
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
    fetchPendingDetail(page);
  }
  const normalizedEmployeeLog = (data: any) => {
    return (
      data &&
      data.length > 0 &&
      data.map((el: any) => {
        return {
          Employee: `${el.name}${" "}(${el.employee_id})`,
          "Date": el.attendance_date,
          // "Date To": el.date_to,
          // "Leave Types": el.leave_type,
          Reason: el.reason,
          Branch: el.branch_name,
        };
      })
    );
  };

  const manageApproveStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setApproveModel(!approveModel);
  };

  const manageRejectStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setRejectModel(!rejectModel);
  };

  const manageStatusHandler = (el: number) => {
    const params = {
      id: selectedEventId.id,
      status: el,
    };
    dispatch(
      changeEmployeeModifyLogStatus({
        params,
        onSuccess: (success: any) => () => {
          if (el === 1) {
            setApproveModel(!approveModel);
            showToast("info", success.status);
          }
          if (el === 0) {
            setRejectModel(!rejectModel);
            showToast("info", success.status);
          }
          fetchPendingDetail(currentPage);
        },
        onError: (error: string) => () => { },
      })
    );
  };


  const memoizedTable = useMemo(() => {
    return <>
      {employeesModifyLeaves && employeesModifyLeaves.length > 0 ? (
        <CommonTable
          noHeader
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployeeLog(employeesModifyLeaves)}
          additionalDataSet={LEAVE_STATUS_UPDATE}
          tableValueOnClick={(e, index, item, elv) => {
            const current = employeesModifyLeaves[index];
            if (elv === "Approve") {
              manageApproveStatus(current);
            }
            if (elv === "Reject") {
              manageRejectStatus(current);
            }
          }}
          custombutton={"h5"}
        />
      ) : <NoRecordFound />}
    </>
  }, [employeesModifyLeaves])

  return (
    <div>
      <div className="">
        <>
          {
            memoizedTable
          }
        </>
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
                <span className="text-black">{selectedEventId?.name}</span>
              </span>
              <br />
              <span>
                {t("date")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.attendance_date}</span>
              </span>
              <br />

              <span>
                {t("leaveType")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">
                  {selectedEventId?.leave_type}
                </span>
              </span>
              <br />
              <span>
                {t("reason")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.reason}</span>
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
                <span className="text-black">{selectedEventId?.name}</span>
              </span>
              <br />
              <span>
                {t("date")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.attendance_date}</span>
              </span>
              <br />
              <span>
                {t("leaveType")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">
                  {selectedEventId?.leave_type}
                </span>
              </span>
              <br />
              <span>
                {t("reason")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.reason}</span>
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
      </div>
    </div>
  );
};

export default Pending;
