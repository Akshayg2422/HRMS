import {
  Card,
  ChooseBranchFromHierarchical,
  CommonTable,
  Container,
  NoRecordFound,
} from "@components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending, Approved, Rejected, AllLeaves } from "./Container";
import { LEAVE_STATUS_UPDATE, showToast } from "@utils";
import { getEmployeeLeaves, getEmployeeLeavesSuccess } from "../../../../store/employee/actions";

const LeaveRequest = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { currentPage } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    fetchPendingDetail(currentPage, -2);
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = (pageNumber: number, statusId: number) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: statusId,
    };
    dispatch(getEmployeeLeaves({  params,
      onSuccess: (success: object) => {
      },
      onError: (error: string) => {
      },
    }));
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
                onClick={() => fetchPendingDetail(currentPage, -2)}
              >
                {t("all")}
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
                onClick={() => fetchPendingDetail(currentPage, -1)}
              >
                {t("pending")}
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
                aria-selected="true"
              >
                {t("markAsPresent")}
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
                onClick={() => fetchPendingDetail(currentPage, 1)}
              >
                {t("approved")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link mb-sm-3 mb-md-0"
                id="tabs-icons-text-5-tab"
                data-toggle="tab"
                href="#tabs-icons-text-5"
                role="tab"
                aria-controls="tabs-icons-text-5"
                aria-selected="false"
                onClick={() => fetchPendingDetail(currentPage, 0)}
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
          <AllLeaves/>
        </div>
          <div
          className="tab-pane fade show"
          id="tabs-icons-text-2"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-2-tab"
        >
          <Pending />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-3"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-3-tab"
        >
          <div className="row">
            <NoRecordFound />
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-4"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-4-tab"
        >
          <Approved />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-icons-text-5"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-5-tab"
        >
          <Rejected />
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default LeaveRequest;
