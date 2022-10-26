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
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getSelectedEventId,
} from "../../../../../../store/employee/actions";
import { LEAVE_STATUS_UPDATE } from "@utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const AllLeaves = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const [approveModel, setApproveModel] = useState(false);
  const [rejectModel, setRejectModel] = useState(false);
  const [revertModel, setRevertModel] = useState(false);

  const { employeesLeaves, numOfPages, currentPage, selectedEventId } =
    useSelector((state: any) => state.EmployeeReducer);
  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    fetchPendingDetail(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: -2,
    };
    dispatch(
      getEmployeeLeaves({
        params,
        onSuccess: (success: object) => {},
        onError: (error: string) => {
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
          // Status: el.status_text,
          // Branch: el.branch_name,
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
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          if (el === 1) {
            setApproveModel(!approveModel);
          }
          if (el === 0) {
            setRejectModel(!rejectModel);
          }
          if (el === -1) {
            setRevertModel(!revertModel);
          }
          fetchPendingDetail(currentPage);
        },
        onError: (error: string) => {},
      })
    );
  };

  return (
    <div>
      <div className="row">
        {employeesLeaves && employeesLeaves.length > 0 ? (
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
            displayDataSet={normalizedEmployeeLog(employeesLeaves)}
            tableChildren={
              <LocationTable
                tableDataSet={employeesLeaves}
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
        ) : (
          <NoRecordFound />
        )}
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
                {t("dataFrom")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_from}</span>
              </span>
              <br />
              <span>
                {t("dataTo")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_to}</span>
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
                {t("dataFrom")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_from}</span>
              </span>
              <br />
              <span>
                {t("dataTo")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_to}</span>
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
                {t("dataFrom")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_from}</span>
              </span>
              <br />
              <span>
                {t("dataTo")}
                {":"}&nbsp;&nbsp;
                <span className="text-black">{selectedEventId?.date_to}</span>
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
  date_from: string;
  date_to: string;
  status_text: string;
  leave_type: string;
  status_code: number;
  id: string;
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
            <th scope="col">{"Name"}</th>
            <th scope="col">{"Date From"}</th>
            <th scope="col">{"Date To"}</th>
            <th scope="col">{"Leave Type"}</th>
            <th scope="col">{"Status"}</th>
            <th scope="col">{"Approve/Revert"}</th>
            <th scope="col">{"Reject"}</th>
          </tr>
        </thead>
        <tbody>
          {tableDataSet &&
            tableDataSet.length > 0 &&
            tableDataSet.map((item: Location, index: number) => {
              return (
                <tr className="align-items-center">
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.name}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.date_from}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.date_to}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.leave_type}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{item.status_text}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {item.status_code === -1 ? (
                      <span
                        className="h5 text-primary"
                        onClick={() => {
                          if (onApproveClick) onApproveClick(item);
                        }}
                      >
                        {"Approve"}
                      </span>
                    ) : item.status_code === 1 ? (
                      <span
                        className="h5 text-primary"
                        onClick={() => {
                          if (onRevertClick) onRevertClick(item);
                        }}
                      >
                        {"Revert"}
                      </span>
                    ) : item.status_code === 0 ? (
                      <span
                        className="h5 text-primary"
                        onClick={() => {
                          if (onRevertClick) onRevertClick(item);
                        }}
                      >
                        {"Revert"}
                      </span>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {item.status_code === -1 ? (
                      <span
                        className="h5 text-primary"
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
