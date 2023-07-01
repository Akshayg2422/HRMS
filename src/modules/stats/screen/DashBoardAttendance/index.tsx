import {
  CommonTable,
  Card,
  Container,
  DropDown,
  NoRecordFound,
  Modal,
  Table,
  Icon,
  DatePicker,
  BackArrow,
  Secondary,
  Primary,
  InputText,
  useKeyPress,
  TableWrapper,
  Search,
} from "@components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeTodayStatus,
  getCheckInDetailedLogPerDay,
  getDownloadTodayStatus,
  applyLeave,
  postAdminModifyLog,
} from "../../../../store/employee/actions";
import { useTranslation } from "react-i18next";
import {
  getServerDateFromMoment,
  getMomentObjFromServer,
  getDisplayTimeFromMoment,
  showToast,
  downloadFile,
  DOWNLOAD_RANGE,
  validateDefault,
  showAdminModify,
  dropDownValueCheckByEvent,
  dropDownValueCheck,
  INITIAL_PAGE,
  showApprovedBy,
} from "@utils";
import { Today, ThisWeek, ThisMonth, LastMonth, LastWeek } from "@utils";
import { Icons } from "@assets";

const DashBoardAttendance = ({ }) => {
  const keyPress = useKeyPress('Enter')
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [markAsPresentModel, setMarkAsPresentModel] = useState<boolean>(false);
  const [markAsPresentDetails, setMarkAsPresentDetails] = useState({
    date: "",
    reason: "",
    emp_id: '',
    day_status_id: ''
  });
  const {
    routeParams,
    employeeAttendanceStats,
    numOfPages,
    currentPage,
    employeeattendancedatalog,
    employeeCheckInDetailedLogPerDay,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [model, setModel] = useState(false);
  const [downloadmodel, setDownloadModel] = useState(false);
  const [showCustomCalendar, setShowCustomCalender] = useState(false);
  const [paramsDetails, setParamsDetails] = useState({
    selectedDate: "",
    selectedDateTo: "",
    range: false,
  })
  const [searchEmployee, setSearchEmployee] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(
    routeParams.params.departmentId
  );
  const [selectedAttendance, setSelectedAttendance] = useState(
    routeParams.params.attendanceType
  );

  const [selectedDateRange, setSelectedDateRange] = useState(DOWNLOAD_RANGE[0].value);
  const [customselectedDate, setCustomSelectedDateRange] = useState(
    getServerDateFromMoment(getMomentObjFromServer(routeParams.params.selectedDate))
  );
  const [customRange, setCustomRange] = useState({
    dateFrom: "",
    dataTo: "",
  });
  const [presentModifiedModel, setPresentModifiedModel] = useState<boolean>(false);
  const [presentModifiedDetails, setPresentModifiedDetails] = useState<any>();

  useEffect(() => {
    getTodayStats(INITIAL_PAGE);
  }, [selectedAttendance, selectedDepartment, customselectedDate]);



  useEffect(() => {
    if (keyPress) {
      getTodayStats(INITIAL_PAGE);
    }
  }, [keyPress])

  useEffect(() => {
    const toSeverDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dataTo))
    ).getTime();
    const fromServerDate = new Date(
      getServerDateFromMoment(getMomentObjFromServer(customRange.dateFrom))
    ).getTime();
    if (toSeverDate < fromServerDate) {
      setCustomRange({ ...customRange, dataTo: "" });
    }
  }, [customRange.dateFrom, customRange.dataTo]);


  const validateTodayStatsParams = () => {
    if (selectedDepartment === '') {
      showToast("error", t("inValidDepartment"));
      return false;
    } else if (selectedAttendance === '') {
      showToast("error", t("inValidAttendance"));
      return false
    }
    return true;
  };



  const getTodayStats = (pageNumber: number) => {
    if (validateTodayStatsParams()) {
      const params = {
        ...hierarchicalBranchIds,
        department_id: selectedDepartment + "",
        attendance_type: selectedAttendance + "",
        selected_date: customselectedDate,
        page_number: pageNumber,
        download: false,
        ...(searchEmployee && { q: searchEmployee }),
      };

      dispatch(getEmployeeTodayStatus({
        params,
        onSuccess: (success: any) => () => {

        },
        onError: (error: any) => () => {

        }
      }));
    }
  };



  const onModify = (e: any, item: any) => {
    e.stopPropagation()
    setMarkAsPresentDetails({
      ...markAsPresentDetails,
      date: item.attendance_date,
      emp_id: item.id,
      day_status_id: item?.per_day_details?.id
    });
    setMarkAsPresentModel(!markAsPresentModel);
  }


  const normalizedEmployee = (data: any) => {
    return data.map((el: any) => {

      return {
        name: el.name,
        "Mobile Number": el.mobile_number,
        in: el.per_day_details
          ? el.per_day_details.start_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el?.per_day_details?.start_time)
            )
            : "-"
          : "-",
        out: el.per_day_details
          ? el.per_day_details.end_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el?.per_day_details?.end_time)
            )
            : "-"
          : "-",
        remark: <div style={{
          fontWeight: 'bold',
          cursor: el?.per_day_details?.day_status_type === 10 ? 'pointer' : '',
          color: fontColor(el.per_day_details?.day_status_type)
        }}
          onClick={(e) => { handlePresentModified(e, el) }}
        >{el.per_day_details ? el.per_day_details.day_status : "-"}{showApprovedBy(el?.per_day_details?.day_status_type) ? <div className="text-xs" style={{ color: 'black', fontWeight: 'lighter', }}>
          {el?.per_day_details?.approved_by !== null ? `${`By - ${el?.per_day_details?.approved_by}`}` : ""}
        </div> : <></>}</div>,


        'Modify': <>{showAdminModify(el?.per_day_details?.day_status_type) ?
          <Secondary text={t("modify")} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} onClick={(e: any) => { onModify(e, el) }} />
          : '-'}</>
      };
    });
  };



  const handlePresentModified = (e: any, type: any) => {
    if (type?.per_day_details?.day_status_type === 10) {
      e.stopPropagation()
      setPresentModifiedModel(!presentModifiedModel)
      setPresentModifiedDetails(type)
    }
  }



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
    getTodayStats(page);
  }

  function getEmployeeCheckInDetailedLogPerDay(index: number) {
    const selectedUser = employeeAttendanceStats[index];
    const params = {
      date: selectedUser?.per_day_details?.date,
      user_id: selectedUser?.id,
    }
    if (selectedUser.per_day_details && selectedUser.id) {
      dispatch(
        getCheckInDetailedLogPerDay({
          params,
          onSuccess: (success: any) => () => {

          },
          onError: (error: any) => () => {

          }
        })
      );
    }
    setModel(!model);
  }

  const normalizedPerDayData = (data: any) => {
    return data.map((it: any) => {
      return {
        Time: getDisplayTimeFromMoment(getMomentObjFromServer(it.checkin_time)),
        Type: it.type,
        address: it.address_text ? it.address_text : "       -",
      };
    });
  };

  const downloadSampleCsvFile = (
    logs: boolean
  ) => {
    if (selectedDateRange == "Custom Range") {
      if (customRange.dateFrom == '') {
        showToast("error", t('dateCantbeempty'));
        return
      } if (customRange.dataTo == '') {
        showToast("error", t('dateCantbeempty'));
        return
      }
    }
    const params = {
      ...hierarchicalBranchIds,
      department_id: selectedDepartment + "",
      attendance_type: selectedAttendance + "",
      selected_date: selectedDateRange === 'Custom Range' ? customRange.dateFrom : selectedDateRange === 'SelectedDate' ? customselectedDate : paramsDetails.selectedDate,
      selected_date_to: selectedDateRange === 'Custom Range' ? customRange.dataTo : selectedDateRange === 'SelectedDate' ? customselectedDate : paramsDetails.selectedDateTo,
      range: selectedDateRange === 'Custom Range' ? true : selectedDateRange === 'SelectedDate' ? false : paramsDetails.range,
      page_number: currentPage,
      download: true,
      logs: logs,
    };
    setDownloadModel(!downloadmodel)
    dispatch(
      getDownloadTodayStatus({
        params,
        onSuccess: (response: any) => () => {
          setDownloadModel(false)
          downloadFile(response);
          customRangeReset()
        },
        onError: (errorMessage: string) => () => {
          showToast("error", errorMessage);
          setDownloadModel(false)
          customRangeReset()
        },
      })
    );
    customRangeReset()
  };

  const resetCustom = () => {
    setCustomRange({ ...customRange, dataTo: "", dateFrom: "" });
  };


  const customRangeReset = () => {
    setShowCustomCalender(false);
    setSelectedDateRange(DOWNLOAD_RANGE[0].value)
    resetCustom();
  }

  const selectedRange = (type: string) => {
    setSelectedDateRange(type)
    if (type === "Today") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: Today, range: false })
      setShowCustomCalender(false);
      resetCustom();
    }
    else if (type === "SelectedDate") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: customselectedDate, selectedDate: customselectedDate, range: false })
      setShowCustomCalender(false);
      resetCustom();
    } else if (type === "This Week") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: ThisWeek, range: true })
      setShowCustomCalender(false);
      resetCustom();
    } else if (type === "Last Week") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: LastWeek, range: true })
      setShowCustomCalender(false);
      resetCustom();
    } else if (type === "This Month") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: ThisMonth, range: true })
      setShowCustomCalender(false);
      resetCustom();
    } else if (type === "Last Month") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: LastMonth, range: true })
      setShowCustomCalender(false);
      resetCustom();
    } else if (type === "Custom Range") {
      setShowCustomCalender(true);
    }
  };
  const dateTimePickerHandler = (value: string, key: string) => {
    setCustomRange({ ...customRange, [key]: value });
  };

  const LogsDownload = (type: string) => {
    if (type === 'Log') {
      downloadSampleCsvFile(true)
    } if (type === 'ConsolidatedLog') {
      downloadSampleCsvFile(false)
    }
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
        employee_id: markAsPresentDetails.emp_id,
      };
      dispatch(
        postAdminModifyLog({
          params,
          onSuccess: (response: any) => () => {
            showToast("success", response?.message);
            setMarkAsPresentModel(!markAsPresentModel);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
            getTodayStats(currentPage);
          },
          onError: (error: string) => () => {
            showToast("error", error);
            setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
          },
        })
      );
    }
  };


  const memoizedTable = useMemo(() => {
    return <>
      {employeeAttendanceStats && employeeAttendanceStats.length > 0 ? (
        <CommonTable
          card={false}
          noHeader
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          tableOnClick={(e, index, item) => {
            getEmployeeCheckInDetailedLogPerDay(index);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployee(employeeAttendanceStats)}
        />
      ) : (
        <NoRecordFound />
      )}
    </>
  }, [employeeAttendanceStats])

  return (
    <>
      <TableWrapper
        filterChildren={
          <Container additionClass={"col"}>
            <div className="row">
              <Container additionClass={"row"}>
                <div className="col-lg-3 col-md-12">
                  <DropDown
                    label={"Department"}
                    placeholder={"Select Department"}
                    data={employeeattendancedatalog.departments_types}
                    value={selectedDepartment}
                    onChange={(event) => {
                      if (setSelectedDepartment) {
                        setSelectedDepartment(dropDownValueCheck(event.target.value, "Select Department"));
                      }
                    }}
                  />
                </div>
                <div className="col-lg-3 col-md-12">
                  <DropDown
                    label={"Attendance"}
                    placeholder={"Select Attendance"}
                    data={employeeattendancedatalog.attendance_types}
                    value={selectedAttendance}
                    onChange={(event) => {
                      if (setSelectedAttendance) {
                        setSelectedAttendance(event.target.value);
                      }
                    }}
                  />
                </div>
                <div className="col-lg-3 col-md-12 " style={{ marginTop: "4px" }}>
                  <h5>{t("selectedDate")}</h5>
                  <DatePicker
                    placeholder={"Select Date"}
                    icon={Icons.Calendar}
                    maxDate={Today}
                    iconPosition={"prepend"}
                    value={customselectedDate}
                    onChange={(date: string) =>
                      setCustomSelectedDateRange(
                        getServerDateFromMoment(getMomentObjFromServer(date))
                      )
                    }
                  />
                </div>
                <Container additionClass={'col-lg-3 col-md-12'} >
                  <InputText
                    placeholder={t("enterEmployeeName")}
                    label={t("employeeName")}
                    value={searchEmployee}
                    onChange={(e) => {
                      setSearchEmployee(e.target.value);
                    }}
                  />
                </Container>
                <Container additionClass={"col mb-4"}>
                  <Search variant="Button" onClick={() => getTodayStats(INITIAL_PAGE)} />
                </Container>
              </Container>
            </div>
          </Container>
        }
      >
        {memoizedTable}
      </TableWrapper>

      <Modal showModel={model} toggle={() => setModel(!model)}>
        {employeeCheckInDetailedLogPerDay &&
          employeeCheckInDetailedLogPerDay.length > 0 ? (
          <Table
            displayDataSet={normalizedPerDayData(
              employeeCheckInDetailedLogPerDay
            )}
          />
        ) : (
          <NoRecordFound />
        )}
      </Modal>
      <Modal
        showModel={downloadmodel}
        toggle={() => setDownloadModel(!downloadmodel)}
      >
        <div className="col-lg-12 col-md-12 ">
          <DropDown
            additionClass="col-lg-6"
            label={"Select Range"}
            // placeholder={"Select Range"}
            data={DOWNLOAD_RANGE}
            value={selectedDateRange}
            onChange={(event) => {
              selectedRange(event.target.value);
            }}
          />
          {showCustomCalendar ? (
            <div className="row">
              <div className="col-lg-6">
                <h5 className="ml-3">{t("dataFrom")}</h5>
                <DatePicker
                  additionalClass="col"
                  icon={Icons.Calendar}
                  iconPosition={"append"}
                  onChange={(date: string) =>
                    dateTimePickerHandler(date, "dateFrom")
                  }
                  value={customRange.dateFrom}
                />
              </div>
              <div className="col-lg-6">
                <h5 className="ml-3">{t("dataTo")}</h5>
                <DatePicker
                  additionalClass="col"
                  icon={Icons.Calendar}
                  iconPosition={"append"}
                  onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
                  value={customRange.dataTo}
                />
              </div>
            </div>
          ) : null}
          <Container margin={"mt-5"} additionClass={'text-right'}>
            <Secondary
              text={t("cancel")}
              onClick={() => setDownloadModel(!downloadmodel)}
            />
            <Primary
              text={t("downloadLog")}
              onClick={() => LogsDownload('Log')}
            />
            <Primary
              additionClass={'mt-3 mt-sm-0'}
              text={t("downloadConsolidatedLog")}
              onClick={() => LogsDownload('ConsolidatedLog')}
            />
          </Container>
        </div>
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
            <span className="text-black">{presentModifiedDetails?.per_day_details?.note}</span>
          </span>
        </Container>
      </Modal>
    </>
  );
};

export default DashBoardAttendance;
