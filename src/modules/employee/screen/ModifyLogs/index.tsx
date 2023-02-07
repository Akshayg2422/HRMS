import {
  Card,
  ChooseBranchFromHierarchical,
  CommonTable,
  Container,
  Icon,
  InputText,
  NoRecordFound,
  WorkInProgress,
} from "@components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending, Approved, Rejected, AllLeaves } from "./Container";
import { LEAVE_STATUS_UPDATE, showToast } from "@utils";
import {
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getModifyLogs,
} from "../../../../store/employee/actions";
import { Icons } from "@assets";

const ModifyLogs = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const [currentStatusId, setCurrentStatusId] = useState<number>(-2);
  const [searchEmployee, setSearchEmployee] = useState("");

  const { currentPage } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    fetchPendingDetail(currentPage, -2);
  }, [hierarchicalBranchIds]);

  const fetchPendingDetail = (pageNumber: number, statusId: number) => {
    setCurrentStatusId(statusId);
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: statusId,
      q: searchEmployee,
      leave_group: "MP",
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: any) => {
        },
        onError: (error: string) => {},
      })
    );
  };

  function proceedSearchApi() {
    fetchPendingDetail(currentPage, currentStatusId);
  }

  return (
    <div>
      <Card additionClass="my-3">
        <Container
          flexDirection={"row"}
          additionClass={"col"}
          alignItems={"align-items-center"}
        >
          <Container col={"col-xl-3 col-md-6 col-sm-12"}>
            <InputText
              placeholder={t("enterEmployeeName")}
              label={t("employeeName")}
              onChange={(e) => {
                setSearchEmployee(e.target.value);
              }}
            />
          </Container>
          <Container
            col={"col-xl-5 col-md-6 col-sm-12"}
            additionClass={"mt-xl-4"}
          >
            <ChooseBranchFromHierarchical />
          </Container>
          <Container
            col={"col"}
            additionClass={"mt-sm-3 mb-xl-3"}
            justifyContent={"justify-content-center"}
            alignItems={"align-items-center"}
            onClick={proceedSearchApi}
          >
            <Icon type={"btn-primary"} icon={Icons.Search} />
          </Container>
        </Container>
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
                aria-selected="false"
                onClick={() => fetchPendingDetail(currentPage, 1)}
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
                onClick={() => fetchPendingDetail(currentPage, 0)}
              >
                {t("rejected")}
              </a>
            </li>
          </ul>
        </div>
      </Card>
      <Card>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-icons-text-1"
          role="tabpanel"
          aria-labelledby="tabs-icons-text-1-tab"
        >
          <AllLeaves />
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
      </Card>
    </div>
  );
};

export default ModifyLogs;
