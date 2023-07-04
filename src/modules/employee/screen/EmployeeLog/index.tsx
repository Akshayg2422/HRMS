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
  ImageView,
  TableWrapper,
  Search,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import {
  getEmployeesList,
  getEmployeesCheckInLogs,
  getCheckInDetailedLogPerDay,
  applyLeave,
  postAdminModifyLog,
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
  showApprovedBy,
} from "@utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Navbar } from "@modules";
import { Icons } from "@assets";
import { Collapse } from "reactstrap";


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
  const [clicked, setClicked] = useState(false);
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

  const [collapseId, setCollapseId] = useState<any>()


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
    getEmployeeLogs(1);
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
    dispatch(getEmployeesList({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error: any) => () => {
      }
    }));
  }

  const normalizedEmployeeLog = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        Code: el.employee_id,
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
      onSuccess: (success: object) => () => {
        setModel(true);
      },
      onError: (error: string) => () => {
        showToast("info", error);
      },
    }));
  }

  function getEmployeeCheckInDetailedLogPerDay(item: any, index: number) {
    const params = {
      date: item.date,
      user_id: selectedEmployeeDetails.id,
    }
    dispatch(
      getCheckInDetailedLogPerDay({
        params,
        onSuccess: (response: any) => () => {
        },
        onError: (error: string) => () => {
        },
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
        daily_log_id: markAsPresentDetails.day_status_id,
        attendance_date: markAsPresentDetails.date,
        reason: markAsPresentDetails.reason,
        is_approved: true,
        employee_id: selectedEmployeeDetails.id,
      };

      dispatch(
        postAdminModifyLog({
          params,
          onSuccess: (response: any) => () => {
            showToast("success", response?.message);
            setMarkAsPresentModel(!markAsPresentModel);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
            const params = {
              start_time: startDate,
              end_time: endDate,
              user_id: selectedEmployeeDetails.id,
            };
            dispatch(getEmployeesCheckInLogs({
              params,
              onSuccess: (success: any) => () => {

              },
              onError: (error: any) => () => {

              }
            }));
          },
          onError: (error: string) => () => {
            showToast("error", error);
            setMarkAsPresentModel(!markAsPresentModel);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
          },
        })
      );
    }
  };

  function fontColor(statusType: any) {
    let color = ''
    switch (statusType) {
      case 1:
        color = '#00b603'
        break;
      case 6:
        color = '#DC4A1F';
        break;
      case 5:
        color = '#ff351f';
        break;
      case 2:
        color = '#642209';
        break;
      case 4:
        color = '#f0c434';
        break;
      case 10:
        color = '#00b603'
        break;
      case 9:
        color = '#de9b00'
        break;
      case 8:
        color = '#5d00ff'
        break;
      case 11:
        color = '#5d00ff'
        break;
      default:
        color = '#000000'
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

  const memoizedTable = useMemo(() => {
    return <>
      {registeredEmployeesList && registeredEmployeesList.length > 0 ? (
        <CommonTable
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          displayDataSet={normalizedEmployeeLog(registeredEmployeesList)}
          tableOnClick={(e, index, item) => {
            const selectedEmployee = registeredEmployeesList[index];
            getUserCheckInLogs(selectedEmployee);
            setCollapseId('')
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
      ) : <NoRecordFound />}
    </>
  }, [registeredEmployeesList])


  const collapsesToggle = (collapse: string) => {
    let openedCollapses = collapseId
    if (openedCollapses?.includes(collapse)) {
      setCollapseId('')
    } else {
      setCollapseId(collapse)
    }
  }

  return (
    <>
      <TableWrapper
        buttonChildren={
          <div className="mr--1">
            <Sort
              size={'btn-sm'}
              sortData={employeeLogSort}
              activeIndex={activeSort}
              onClick={(index: any, item: any) => {
                setActiveSort(index);
                onTabChange(index);
              }}
            />
          </div>
        }
        filterChildren={
          <Container additionClass={"row"}>
            <Container col={"col-xl-3"}>
              <ChooseBranchFromHierarchical />
            </Container>
            <Container additionClass={"col-xl-4 col-md-6 col-sm-12 mt-xl-4 row"}>
              <InputText
                size="sm"
                value={searchEmployee}
                col={'col'}
                placeholder={t("enterEmployeeName")}
                onChange={(e) => {
                  setSearchEmployee(e.target.value);
                }}
              />
              <Container additionClass="col-xl-3">
                <Search variant="Button" additionalClassName={' mt-2'} onClick={() => { getEmployeeLogs(currentPage) }} />
              </Container>
            </Container>

          </Container>
        }
      >
        {memoizedTable}
      </TableWrapper>


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
              {employeeCheckInLogs.map((item: any, index: number) => {
                return (
                  <div className="accordion" id="accordionExample" key={item?.id} >
                    <div
                      data-toggle="collapse"
                      role="tab"
                      aria-expanded={collapseId === item.id}
                      onClick={() => {
                        if (accordion !== index || !clicked) {
                          getEmployeeCheckInDetailedLogPerDay(item, index);
                          collapsesToggle(item.id)
                          setClicked(true);
                        } else {
                          setClicked(false);
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
                        }} onClick={(e) => { handlePresentModified(e, item) }}>{item.day_status}{item?.approved_by && showApprovedBy(item?.day_status_type) ?
                          <div className="text-xs" style={{ color: 'black', fontWeight: 'lighter', }}>{`By - ${item?.approved_by}`}</div>
                          : <></>}</small>

                        <small className="mb-0 col" >{showAdminModify(item?.day_status_type) ?
                          <Secondary text={t('modify')} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} onClick={(e: any) => { onModify(e, item) }} />
                          : '-'}</small>
                      </Container>
                      <Divider />
                    </div>
                    {collapseId === item.id && (
                      <Collapse
                        isOpen={collapseId === item.id}
                      >
                        <div className="card-body align-items-center">
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
                                          {item.address_text ? item.address_text : "       -"}
                                        </small>
                                      </Container>
                                      <Divider />
                                    </>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            <div className="d-flex justify-content-center">
                              <small className="mb-0">
                                {t("noLogsFound")}
                              </small>
                            </div>
                          )}
                        </div>
                      </Collapse>
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
        toggle={() => {
          setMarkAsPresentModel(!markAsPresentModel)
          setMarkAsPresentDetails({
            ...markAsPresentDetails,
            reason: '',
          });
        }}
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
              onClick={() => {
                setMarkAsPresentModel(!markAsPresentModel)
                setMarkAsPresentDetails({
                  ...markAsPresentDetails,
                  reason: '',
                });
              }}
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
