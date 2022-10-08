import {
  Card,
  CommonTable,
  Container,
  Modal,
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
    return data.map((el: any) => {
      return {
        name: el.name,
        "Date From": el.date_from,
        "Date To": el.date_to,
        "Leave Types": el.leave_type,
        Status: el.status_text,
      };
    });
  };

  const manageApproveStatus = (id: string) => {
    dispatch(getSelectedEventId(id));
    setApproveModel(!approveModel);
  };

  const manageRejectStatus = (id: string) => {
    dispatch(getSelectedEventId(id));
    manageStatusHandler(0);
  };

  const manageStatusHandler = (el: number) => {
    const params = {
      id: selectedEventId,
      status: el,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          if (el === 1) {
            setApproveModel(!approveModel);
          }
          fetchPendingDetail(currentPage);
        },
        onError: (error: string) => {},
      })
    );
  };

  const manageRevertHandler = (el: string) => {
    const params = {
      id: el,
      status: -1,
    };
    dispatch(
      changeEmployeeLeaveStatus({
        params,
        onSuccess: (success: object) => {
          fetchPendingDetail(currentPage);
        },
        onError: (error: string) => {},
      })
    );
  };

  return (
    <div>
      <div className="row">
        {employeesLeaves && employeesLeaves.length > 0 && (
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
                onRevertClick={(item) => manageRevertHandler(item.id)}
                onApproveClick={(item) => {
                  manageApproveStatus(item.id);
                }}
                onRejectClick={(item) => {
                  manageRejectStatus(item.id);
                }}
              />
            }
            custombutton={"h5"}
          />
        )}
        <Modal
          title={t("deleteUser")}
          showModel={approveModel}
          toggle={() => setApproveModel(!approveModel)}
        >
          <Container>
            <span className="ml-3">{t("approveWarningMessage")}</span>
            <Container
              margin={"m-5"}
              justifyContent={"justify-content-end"}
              display={"d-flex"}
            >
              <Secondary
                text={t("cancel")}
                onClick={() => setApproveModel(!approveModel)}
              />
              <Primary
                text={t("proceed")}
                onClick={() => manageStatusHandler(1)}
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
