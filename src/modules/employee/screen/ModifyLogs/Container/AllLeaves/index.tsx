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
import { LEAVE_STATUS_UPDATE, convertToUpperCase, showToast } from "@utils";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const AllLeaves = ({ search }: any) => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);
  const [revertModel, setRevertModel] = useState(false);

  const { employeesModifyLeaves, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: -2,
      q: search,
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: object) => () => { },
        onError: (error: string) => () => {
          dispatch(getEmployeeLeavesSuccess(""));
        },
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
          name: el.name,
          "Date From": el.date_from,
          "Date To": el.date_to,
          "Leave Types": el.leave_type,
          Reason: el.reason,
          Status: el.status_text,
          Branch: el.branch_name,
        };
      })
    );
  };

  const manageApproveStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setApproveModel(!approveModel);
  };

  const manageRevertStatus = (item: object) => {
    dispatch(getSelectedEventId(item));
    setRevertModel(!revertModel);
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
          if (el === -1) {
            setRevertModel(!revertModel);
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
          isPagination
          card={false}
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          // displayDataSet={normalizedEmployeeLog(employeesLeaves)}
          tableChildren={
            <LocationTable
              tableDataSet={employeesModifyLeaves}
              onRevertClick={(item) => manageRevertStatus(item)}
              onApproveClick={(item) => {
                manageApproveStatus(item);
              }}
              onRejectClick={(item) => {
                manageRejectStatus(item);
              }}
            />
          }
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
                onClick={() => setRevertModel(!revertModel)}
              />
              <Primary
                text={t("confirm")}
                onClick={() => manageStatusHandler(-1)}
              />
            </Container>
          </Container>
        </Modal>
      </div>
    </div>
  );
};
type Location = {
  name: string;
  attendance_date: string;
  date_to: string;
  status_text: string;
  leave_type: string;
  status_code: number;
  branch_name: string;
  reason: string;
  id: string;
  employee_id: string;
  approved_by: string;
};

type LocationTableProps = {
  tableDataSet?: Array<Location>;
  onRevertClick?: (item: Location) => void;
  onApproveClick?: (item: Location) => void;
  onRejectClick?: (item: Location) => void;
};

const LocationTable = ({
  tableDataSet,
  onApproveClick,
  onRejectClick,
  onRevertClick,
}: LocationTableProps) => {
  return (
    <div className="table-responsive">
      <table className="table align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">{"Employee"}</th>
            <th scope="col">{"Date"}</th>
            {/* <th scope="col">{"Leave Type"}</th> */}
            <th scope="col">{"Reason"}</th>
            <th scope="col">{"Branch"}</th>
            <th scope="col">{"Status"}</th>
            <th scope="col">{"Approve"}</th>
            <th scope="col">{"Reject"}</th>
          </tr>
        </thead>
        <tbody>
          {tableDataSet &&
            tableDataSet.length > 0 &&
            tableDataSet.map((item: Location, index: number) => {
              return (
                <tr className="align-items-center">
                  <td style={{ whiteSpace: "pre-wrap" }}>{`${convertToUpperCase(item.name)}${" "}(${item.employee_id
                    })`}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.attendance_date}</td>
                  {/* <td style={{ whiteSpace: "pre-wrap" }}>{item.leave_type}</td> */}
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.reason}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.branch_name}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.status_text}<br />{item.status_code !== -1 ? <small>{`${item.approved_by !== null ? `By -${item.approved_by}` : ''}`}</small> : <></>}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {item.status_code === -1 ? (
                      <span
                        className="h5 text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (onApproveClick) onApproveClick(item);
                        }}
                      >
                        {"Approve"}
                      </span>
                    ) : (
                      <>{'-'}</>
                    )}
                  </td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {item.status_code === -1 ? (
                      <span
                        className="h5 text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (onRejectClick) onRejectClick(item);
                        }}
                      >
                        {"Reject"}
                      </span>
                    ) : (
                      <>{"-"}</>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllLeaves;
