import {
  CommonTable,
  Container,
  Modal,
  Divider,
  Sort,
  NoRecordFound,
  ChooseBranchFromHierarchical,
  Icon,
  InputText,
  Card,
  Secondary,
  Primary,
  useKeyPress,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  getEmployeesList,
  getEmployeesCheckInLogs,
  getCheckInDetailedLogPerDay,
  applyLeave,
} from "../../../../store/employee/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  paginationHandler,
  displayStringExists,
  getDisplayTimeFromMoment,
  getMomentObjFromServer,
  showToast,
  validateDefault,
  showAdminModify,
} from "@utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Navbar } from "@modules";
import { Icons } from "@assets";

type CheckInLog = {
  date?: string;
  logs?: [];
  start_time?: string;
  end_time?: string;
  day_status_type?: number | undefined;
  day_status?: string;
  hours_spent?: number;
  mobile_number?: string;
};

function EmployeeLog() {
  const { t } = useTranslation();
  let dispatch = useDispatch();
  let enterPress = useKeyPress("Enter");

  const [model, setModel] = useState(false);
  const [accordion, setAccordion] = useState<number>();
  const [userId, setUserId] = useState<string>();
  const [activeSort, setActiveSort] = useState<number>(1);
  const [searchEmployee, setSearchEmployee] = useState('')
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState<any>()
  const [markAsPresentModel, setMarkAsPresentModel] = useState<boolean>(false);
  const [presentModifiedModel, setPresentModifiedModel] = useState<boolean>(false);
  const [presentModifiedDetails, setPresentModifiedDetails] = useState<any>();
  const [markAsPresentDetails, setMarkAsPresentDetails] = useState({
    date: "",
    reason: "",
    day_status_id: ''
  });

  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().add(1, "days").format("yyyy-MM-DD")
  );

  const employeeLogSort = [
    { id: 1, title: t("last3Months") },
    { id: 2, title: moment().format("MMMM") },
  ];

  const {
    registeredEmployeesList,
    numOfPages,
    currentPage,
    employeeCheckInLogs,
    employeeCheckInDetailedLogPerDay,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  useEffect(() => {
    getEmployeeLogs(currentPage);
  }, [startDate, hierarchicalBranchIds]);


  useEffect(() => {
    if (enterPress) {
      getEmployeeLogs(currentPage);
    }
  }, [enterPress])


  function getEmployeeLogs(pageNumber: number) {
    const params: object = {
      ...hierarchicalBranchIds,
      page_number: pageNumber,
      ...(searchEmployee && { q: searchEmployee }),
    };
    dispatch(getEmployeesList({ params }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        id: el.employee_id,
        name: el.name,
        "mobile number": el.mobile_number,
        branch: el.branch,
      };
    });
  };

  const onTabChange = (index: number) => {
    if (index === 0) {
      setStartDate(moment().add(-3, "month").format("yyyy-MM-DD"));
    } else {
      setStartDate(moment().startOf("month").format("yyyy-MM-DD"));
    }
  };

  function getUserCheckInLogs(selectedEmployee: any) {
    setSelectedEmployeeDetails(selectedEmployee)
    const params = {
      start_time: startDate,
      end_time: endDate,
      user_id: selectedEmployee.id,
    };
    dispatch(getEmployeesCheckInLogs({
      params,
      onSuccess: (success: object) => {
        setModel(!model);
      },
      onError: (error: string) => {
        showToast("info", error);
      },
    }));
  }

  function getEmployeeCheckInDetailedLogPerDay(index: number) {
    const selectedDate = employeeCheckInLogs[index].date;
    dispatch(
      getCheckInDetailedLogPerDay({
        date: selectedDate,
        user_id: selectedEmployeeDetails.id,
      })
    );
  }

  const onModify = (e: any, item: any) => {
    e.stopPropagation()
    setMarkAsPresentDetails({
      ...markAsPresentDetails,
      date: item.date,
      day_status_id: item.id
    });
    setMarkAsPresentModel(!markAsPresentModel);
  }

  const onChangeHandler = (event: any) => {
    setMarkAsPresentDetails({
      ...markAsPresentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const validateOnSubmit = () => {
    if (!validateDefault(markAsPresentDetails.reason).status) {
      showToast("error", t("invalidReason"));
      return false;
    }
    return true;
  };

  const onRequestHandler = () => {
    if (validateOnSubmit()) {
      const params = {
        day_status_id: markAsPresentDetails.day_status_id,
        date_from: markAsPresentDetails.date,
        date_to: markAsPresentDetails.date,
        reason: markAsPresentDetails.reason,
        is_approved: true,
        employee_id: selectedEmployeeDetails.id,
      };
      dispatch(
        applyLeave({
          params,
          onSuccess: (response: any) => {
            showToast("success", response?.message);
            setMarkAsPresentModel(!markAsPresentModel);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
            const params = {
              start_time: startDate,
              end_time: endDate,
              user_id: selectedEmployeeDetails.id,
            };
            dispatch(getEmployeesCheckInLogs({ params }));
          },
          onError: (error: string) => {
            showToast("error", error);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
          },
        })
      );
    }
  };

  function fontColor(statusType: any) {
    let color = ''
    switch (statusType) {
      case 1: color = "#2ECC71"
        break;
      case 6: color = "#DC4A1F";
        break;
      case 9: color = "#C39DE9";
        break;
      case 2: color = "#BA4A00";
        break;
      case 4: color = "#D4AC0D";
        break;
      case 10: color = "#2ECC71";
        break;
      case 5: color = "#FF351F";
        break;
      default:
        color = "#000000"
    }
    return color
  }

  const handlePresentModified = (e: any, type: any) => {
    if (type?.day_status_type === 10) {
      e.stopPropagation()
      setPresentModifiedDetails(type)
      setPresentModifiedModel(!presentModifiedModel)
    }
  }

  console.log("presentModifiedDetails", presentModifiedDetails)

  return (
    <>
      <Container additionClass={"row mx-2 my-3"}>
        <Container col={"col-xl-5"}>
          <ChooseBranchFromHierarchical />
        </Container>
        <Container additionClass={"col-xl-4 col-md-6 col-sm-12 mt-xl-4 row"}>
          <InputText
            value={searchEmployee}
            col={'col'}
            placeholder={t("enterEmployeeName")}
            onChange={(e) => {
              setSearchEmployee(e.target.value);
            }}
          />
          <Icon type={"btn-primary"} additionClass={'col-xl-3 mt-2'} icon={Icons.Search}
            onClick={() => {
              getEmployeeLogs(currentPage);
            }}
          />
        </Container>

        <div className="col text-right mt-xl-4 my-sm-2 mt-3 mt-sm-0">
          <Sort
            sortData={employeeLogSort}
            activeIndex={activeSort}
            onClick={(index) => {
              setActiveSort(index);
              onTabChange(index);
            }}
          />
        </div>

      </Container>

      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          tableTitle={t("employeeLog")}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
          tableOnClick={(e, index, item) => {
            const selectedEmployee = registeredEmployeesList[index];
            getUserCheckInLogs(selectedEmployee);
          }}
          paginationNumberClick={(currentPage) => {
            getEmployeeLogs(paginationHandler("current", currentPage));
          }}
          previousClick={() =>
            getEmployeeLogs(paginationHandler("prev", currentPage))
          }
          nextClick={() =>
            getEmployeeLogs(paginationHandler("next", currentPage))
          }
        />
      ) : <Card><NoRecordFound /></Card>}
      <Modal
        showModel={model}
        title={`${selectedEmployeeDetails?.name}'s ${t('log')}`}
        size={"modal-xl"}
        toggle={() => setModel(!model)}
      >
        {employeeCheckInLogs && employeeCheckInLogs.length > 0 ? (
          <>
            <Container
              flexDirection={"flex-row"}
              display={"d-flex"}
              justifyContent={"justify-content-around"}
            >
              <h5 className="mb-0 col">{"Date"}</h5>
              <h5 className="mb-0 col">{"In"}</h5>
              <h5 className="mb-0 col">{"Out"}</h5>
              <h5 className="mb-0 col">{"Remark"}</h5>
              <h5 className="mb-0 col">{"Modify"}</h5>

            </Container>
            <Divider />

            <div>
              {employeeCheckInLogs.map((item: CheckInLog, index: number) => {
                return (
                  <div className="accordion" id="accordionExample">
                    <div
                      data-toggle="collapse"
                      data-target={
                        index === accordion ? "#collapse" + index : undefined
                      }
                      onClick={() => {
                        if (accordion !== index) {
                          setAccordion(index);
                          getEmployeeCheckInDetailedLogPerDay(index);
                        }
                      }}
                    >
                      <Container
                        flexDirection={"flex-row"}
                        display={"d-flex"}
                        justifyContent={"justify-content-around"}
                      >
                        <small className="mb-0 col">{item.date}</small>
                        <small className="mb-0 col">
                          {item.start_time
                            ? getDisplayTimeFromMoment(
                              getMomentObjFromServer(item.start_time)
                            )
                            : "-"}
                        </small>
                        <small className="mb-0 col">
                          {item.end_time
                            ? getDisplayTimeFromMoment(
                              getMomentObjFromServer(item.end_time)
                            )
                            : "-"}
                        </small>
                        <small className="mb-0 p-0 col" style={{
                          cursor: item.day_status_type === 10 ? 'pointer' : '', fontWeight: 'bold',
                          color: fontColor(item.day_status_type),
                        }} onClick={(e) => { handlePresentModified(e, item) }}>{item.day_status}</small>
                        <small className="mb-0 col" >{showAdminModify(item?.day_status_type) ?
                          <Secondary text={t('modify')} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} onClick={(e: any) => { onModify(e, item) }} />
                          : '-'}</small>
                      </Container>
                      <Divider />
                    </div>

                    {accordion === index && (
                      <div
                        className="collapse"
                        id={
                          index === accordion ? "collapse" + index : undefined
                        }
                      >
                        <div className="card-body row align-items-center">
                          {employeeCheckInDetailedLogPerDay &&
                            employeeCheckInDetailedLogPerDay.length > 0 ? (
                            <div>
                              <Container
                                flexDirection={"flex-row"}
                                display={"d-flex"}
                                alignItems={"align-items-center"}
                              >
                                <h5 className="mb-0 col">{"Time"}</h5>
                                <h5 className="mb-0 col">{"Type"}</h5>
                                <h5 className="mb-0 col">{"Address"}</h5>
                              </Container>
                              <Divider />
                              {employeeCheckInDetailedLogPerDay.map(
                                (item: any, index: number) => {
                                  return (
                                    <>
                                      <Container
                                        flexDirection={"flex-row"}
                                        display={"d-flex"}
                                        alignItems={"align-items-center"}
                                      >
                                        <small className="mb-0 col">
                                          {getDisplayTimeFromMoment(
                                            getMomentObjFromServer(
                                              item.checkin_time
                                            )
                                          )}
                                        </small>
                                        <small className="mb-0 col">
                                          {item.type}
                                        </small>
                                        <small className="mb-0 col">
                                          {item.address_text}
                                        </small>
                                      </Container>
                                      <Divider />
                                    </>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="row align-items-center">
                              <small className="mb-0 text-center">
                                {t("noLogsFound")}
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <NoRecordFound />
        )}
      </Modal>
      <Modal
        showModel={markAsPresentModel}
        toggle={() => setMarkAsPresentModel(!markAsPresentModel)}
      >
        <Container>
          <span className="h4 ml-xl-4">{t("requestForAsPresent")}</span>
          <Container additionClass="col-6 my-4">
            <InputText
              disabled
              label={t("today")}
              value={markAsPresentDetails.date}
              name={"date"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
            <InputText
              label={t("reason")}
              validator={validateDefault}
              value={markAsPresentDetails.reason}
              name={"reason"}
              onChange={(event) => {
                onChangeHandler(event);
              }}
            />
          </Container>
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setMarkAsPresentModel(!markAsPresentModel)}
            />
            <Primary text={t("modify")} onClick={() => onRequestHandler()} />
          </Container>
        </Container>
      </Modal>
      <Modal showModel={presentModifiedModel} title={t('markAsPresent')}
        toggle={() => setPresentModifiedModel(!presentModifiedModel)} size="modal-sm">
        <Container additionClass={'ml-3'}><span>
          {t("approver")}
          {":"}&nbsp;&nbsp;
          <span className="text-black">{presentModifiedDetails?.approved_by}</span>
        </span>
          <br />
          <span>
            {t("reason")}
            {":"}&nbsp;&nbsp;
            <span className="text-black">{presentModifiedDetails?.note}</span>
          </span>
        </Container>
      </Modal>
    </>
  );
}

export default EmployeeLog;
