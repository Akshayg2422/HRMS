import {
  Card,
  ChooseBranchFromHierarchical,
  CommonTable,
  Container,
  NoRecordFound,
} from "@components";
import {
  getApprovedLeaves,
  getPendingLeaveDetails,
} from "../../../../store/employee/actions";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending, Approved, Rejected } from "./Container";
import { LEAVE_STATUS_UPDATE } from "@utils";

const LeaveRequest = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { leaveRequestPending, numOfPages, currentPage } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  useEffect(() => {
    fetchPendingDetail(currentPage);
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
    };
    dispatch(getPendingLeaveDetails({ params }));
  };

  const fetchApprovedLeaves = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
    };
    dispatch(getApprovedLeaves({ params }));
  };

  return (
    <div>
      <Card additionClass="my-3">
        <div className="col-lg-6">
          <ChooseBranchFromHierarchical />
        </div>
        <div className="nav-wrapper mx-xl-4">
          <ul
            className="nav nav-pills nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0 active"
                id="tabs-icons-text-1-tab"
                data-toggle="tab"
                href="#tabs-icons-text-1"
                role="tab"
                aria-controls="tabs-icons-text-1"
                aria-selected="true"
                onClick={() => fetchPendingDetail(currentPage)}
              >
                {t("pending")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-2-tab"
                data-toggle="tab"
                href="#tabs-icons-text-2"
                role="tab"
                aria-controls="tabs-icons-text-2"
                aria-selected="true"
              >
                {t("markAsPresent")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-3-tab"
                data-toggle="tab"
                href="#tabs-icons-text-3"
                role="tab"
                aria-controls="tabs-icons-text-3"
                aria-selected="false"
                onClick={() => fetchApprovedLeaves(currentPage)}
              >
                {t("approved")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-4-tab"
                data-toggle="tab"
                href="#tabs-icons-text-4"
                role="tab"
                aria-controls="tabs-icons-text-4"
                aria-selected="false"
              >
                {t("rejected")}
              </a>
            </li>
          </ul>
        </div>
      </Card>
      {/* <Card> */}
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-icons-text-1"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-1-tab"
        >
          <Pending />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-2"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-2-tab"
        >
          <div className="row">
            <NoRecordFound />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-3"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-3-tab"
        >
          <Approved />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-4"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-4-tab"
        >
          <Rejected />
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default LeaveRequest;
