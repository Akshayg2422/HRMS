import {
  Card,
  ChooseBranchFromHierarchical,
  Container,
  DatePicker,
  Icon,
  InputText,
  Search,
  TableWrapper,
  useKeyPress,
} from "@components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Pending, Approved, Rejected, AllLeaves } from "./Container";
import { INITIAL_PAGE, LEAVE_STATUS_UPDATE, Today, showToast } from "@utils";
import {
  getEmployeeLeaves,
  getEmployeeLeavesSuccess,
} from "../../../../store/employee/actions";
import { Icons } from "@assets";

const LeaveRequest = () => {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  const enterPress = useKeyPress("Enter");
  const [date, setDate] = useState(Today)


  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const [searchEmployee, setSearchEmployee] = useState("");


  const { currentPage } = useSelector((state: any) => state.EmployeeReducer);

  const LEAVE_TYPE = [
    { id: 1, name: 'All', value: -2, component: <AllLeaves search={searchEmployee} date={date} /> },
    { id: 2, name: 'Pending', value: -1, component: <Pending search={searchEmployee} date={date} /> },
    { id: 3, name: 'Approved', value: 1, component: <Approved search={searchEmployee} date={date} /> },
    { id: 4, name: 'Rejected', value: 0, component: <Rejected search={searchEmployee} date={date} /> },
  ];

  const [currentStatusId, setCurrentStatusId] = useState<number>(-2);

  useEffect(() => {
    fetchPendingDetail(INITIAL_PAGE, currentStatusId);
  }, [hierarchicalBranchIds, date]);


  useEffect(() => {
    if (enterPress) {
      fetchPendingDetail(INITIAL_PAGE, currentStatusId);
    }
  }, [enterPress])

  const fetchPendingDetail = (pageNumber: number, statusId: number) => {
    setCurrentStatusId(statusId);
    const params = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      status: statusId,
      q: searchEmployee,
      date: date,
    };
    dispatch(
      getEmployeeLeaves({
        params,
        onSuccess: (success: object) => () => { },
        onError: (error: string) => () => { },
      })
    );
  };

  function proceedSearchApi() {
    fetchPendingDetail(INITIAL_PAGE, currentStatusId);
  }

  const dateTimePickerHandler = (value: string, key: string) => {
    setDate(value)
  };

  return (
    <>
      <TableWrapper>
        <div className="mb-3 mt--5 ">
          <Container
            flexDirection={"row"}
            additionClass={"col"}
            alignItems={"align-items-center"}
          // padding={"pl-5"}
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
              col={"col-xl-3 col-md-4 col-sm-12"}
              additionClass={"mt-xl-4"}
            >
              <ChooseBranchFromHierarchical />
            </Container>
            <div className='col-sm-3'>
              <h5 className=''>{t("Date")}</h5>
              <DatePicker
                placeholder={"Select Date"}
                icon={Icons.Calendar}
                // maxDate={Today}
                iconPosition={"prepend"}
                onChange={(date: string) =>
                  dateTimePickerHandler(date, "dateFrom")
                }
                value={date}
              />
            </div>
            <Container
              col={"col"}
              additionClass={"mt-sm-3 mb-xl-3"}
              justifyContent={"justify-content-center"}
              alignItems={"align-items-center"}
              onClick={proceedSearchApi}
            >
              {/* <Icon type={"btn-primary"} icon={Icons.Search} /> */}
              <Search variant="Button" onClick={() => proceedSearchApi} />

            </Container>
          </Container>
          <div className="nav-wrapper mx-xl-4">
            <ul
              className="nav nav-pills nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              role="tablist"
            >
              {LEAVE_TYPE.map((el: any, index: number) => {
                return (
                  <li className="nav-item">
                    <a
                      className={`nav-link mb-sm-3 mb-md-0 ${currentStatusId === el.value && "active"
                        }`}
                      id={`tabs-icons-text-${el.id}-tab`}
                      data-toggle="tab"
                      // href={`#tabs-icons-text-${el.id}`}
                      role="tab"
                      aria-controls={`tabs-icons-text-${el.id}`}
                      aria-selected="true"
                      onClick={() => fetchPendingDetail(INITIAL_PAGE, el.value)}
                    >
                      {el.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* <Card> */}
        <div className="tab-content px-1" id="myTabContent">
          {LEAVE_TYPE.map((el) => {
            return (
              <div
                className={`tab-pane fade ${currentStatusId === el.value && " show active"}`}
                id={`tabs-icons-text-${el.id}`}
                role="tabpanel"
                aria-labelledby={`tabs-icons-text-${el.id}-tab`}
              >
                {el.component}
              </div>
            )
          })}
        </div>
        {/* </Card > */}
      </TableWrapper >
    </>
  );
};

export default LeaveRequest;
