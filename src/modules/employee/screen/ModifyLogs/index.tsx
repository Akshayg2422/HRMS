import {
  Card,
  ChooseBranchFromHierarchical,
  CommonTable,
  Container,
  Icon,
  InputText,
  NoRecordFound,
  TableWrapper,
  useKeyPress,
  WorkInProgress,
} from "@components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending, Approved, Rejected, AllLeaves } from "./Container";
import { getRequestType, LEAVE_STATUS_UPDATE, showToast } from "@utils";
import {
  getCurrentLeaveType,
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
  getModifyLogs,
} from "../../../../store/employee/actions";
import { Icons } from "@assets";

const ModifyLogs = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();


  const LEAVE_TYPES = [
    { id: 1, name: 'All', value: -2, component: <AllLeaves /> },
    { id: 2, name: 'Pending', value: -1, component: <Pending /> },
    { id: 3, name: 'Approved', value: 1, component: <Approved /> },
    { id: 4, name: 'Rejected', value: 0, component: <Rejected /> },
  ];

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const [searchEmployee, setSearchEmployee] = useState("");
  const [active, setActive] = useState(1);
  const enterPress = useKeyPress("Enter");

  const { currentPage, currentLeaveType } = useSelector((state: any) => state.EmployeeReducer);

  useEffect(() => {
    fetchPendingDetail(currentPage, currentLeaveType)
  }, [hierarchicalBranchIds]);


  const fetchPendingDetail = (pageNumber: number, status: any) => {
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: status,
      q: searchEmployee,
      leave_group: "MP",
    };
    dispatch(
      getModifyLogs({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => { },
      })
    );
  };

  useEffect(() => {
    if (enterPress) {
      fetchPendingDetail(currentPage, currentLeaveType)
    }
  }, [enterPress])

  const getLeavesDetails = (item: any) => {
    setActive(item.id || item)
    dispatch(getCurrentLeaveType(getRequestType(item.name)))
    fetchPendingDetail(currentPage, getRequestType(item.name))
  }

  return (
    <TableWrapper>
      <div>
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

          >
            <Icon type={"btn-primary"} icon={Icons.Search} onClick={() => fetchPendingDetail(currentPage, currentLeaveType)} />
          </Container>
        </Container>
        <div className="nav-wrapper mx-xl-4">
          <ul
            className="nav nav-pills nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            role="tablist"
          >
            {LEAVE_TYPES.map((el: any, index: number) => {
              return (
                <li className="nav-item">
                  <a
                    className={`nav-link mb-sm-3 mb-md-0 ${active === el.id && "active"
                      }`}
                    id={`tabs-icons-text-${el.id}-tab`}
                    data-toggle="tab"
                    href={`#tabs-icons-text-${el.id}`}
                    role="tab"
                    aria-controls={`tabs-icons-text-${el.id}`}
                    aria-selected="true"
                    onClick={() => getLeavesDetails(el)}
                  >
                    {el.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
        <div className="tab-content" id="myTabContent">
          {LEAVE_TYPES.map((el) => {
            return (
              <div
                className={`tab-pane fade ${active === el.id && "show active"}`}
                id={`tabs-icons-text-${el.id}`}
                role="tabpanel"
                aria-labelledby={`tabs-icons-text-${el.id}-tab`}
              >
                {el.component}
              </div>
            )
          })}
        </div>
    </TableWrapper>
  );
};

export default ModifyLogs;
