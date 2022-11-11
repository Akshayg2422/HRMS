import {
  CommonTable,
  Card,
  Container,
  DropDown,
  NoRecordFound,
  Modal,
  Table,
  Icon,
  CardCalendar,
  DatePicker,
  BackArrow,
  Secondary,
  Primary,
} from "@components";
import * as url from "../../../../helpers/url_helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeTodayStatus,
  getCheckInDetailedLogPerDay,
  getDownloadTodayStatus,
} from "../../../../store/employee/actions";
import { useTranslation } from "react-i18next";
import {
  getServerDateFromMoment,
  getMomentObjFromServer,
  getDisplayTimeFromMoment,
  showToast,
  downloadFile,
  DOWNLOAD_RANGE,
} from "@utils";
import { Today, ThisWeek, ThisMonth, LastMonth, LastWeek } from "@utils";
import { Icons } from "@assets";
import moment from "moment";

const DashBoardAttendance = ({ }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    routeParams,
    employeeAttendanceStats,
    numOfPages,
    currentPage,
    employeeattendancedatalog,
    employeeCheckInDetailedLogPerDay, error
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [model, setModel] = useState(false);
  const [downloadmodel, setDownloadModel] = useState(false);
  const [showCustomCalendar, setShowCustomCalender] = useState(false);
  const [paramsDetails, setParamsDetails] = useState({
    selectedDate: routeParams.selectedDate,
    selectedDateTo: routeParams.selectedDate,
    range: false,
  })

  const [selectedDepartment, setSelectedDepartment] = useState(
    routeParams.departmentId
  );
  const [selectedAttendance, setSelectedAttendance] = useState(
    routeParams.attendanceType
  );

  const [selectedDateRange, setSelectedDateRange] = useState(DOWNLOAD_RANGE[0].value);
  const [customselectedDate, setCustomSelectedDateRange] = useState(
    getServerDateFromMoment(getMomentObjFromServer(routeParams.selectedDate))
  );
  const [customRange, setCustomRange] = useState({
    dateFrom: "",
    dataTo: "",
  });

  useEffect(() => {
    getTodayStats(currentPage);
  }, [selectedAttendance, selectedDepartment, customselectedDate]);

  const getTodayStats = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      department_id: selectedDepartment + "",
      attendance_type: selectedAttendance + "",
      selected_date: customselectedDate,
      page_number: pageNumber,
      download: false,
    };

    dispatch(getEmployeeTodayStatus(params));
  };

  const normalizedEmployee = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        "Mobile Number": el.mobile_number,
        in: el.per_day_details
          ? el.per_day_details.start_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el.per_day_details.start_time)
            )
            : "-"
          : "-",
        out: el.per_day_details
          ? el.per_day_details.end_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el.per_day_details.end_time)
            )
            : "-"
          : "-",

        remark: el.per_day_details ? el.per_day_details.day_status : "-",
      };
    });
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
    getTodayStats(page);
  }

  function getEmployeeCheckInDetailedLogPerDay(index: number) {
    const selectedUser = employeeAttendanceStats[index];
    if (selectedUser.per_day_details && selectedUser.id) {
      dispatch(
        getCheckInDetailedLogPerDay({
          date: selectedUser.per_day_details.date,
          user_id: selectedUser.id,
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
        address: it.address_text,
      };
    });
  };

  const downloadSampleCsvFile = (
    logs: boolean
  ) => {
    const params = {
      ...hierarchicalBranchIds,
      department_id: selectedDepartment + "",
      attendance_type: selectedAttendance + "",
      selected_date: selectedDateRange !== "SelectedDate" ? paramsDetails.selectedDate : customselectedDate,
      selected_date_to: selectedDateRange !== "SelectedDate" ? paramsDetails.selectedDateTo : customselectedDate,
      range: selectedDateRange !== "SelectedDate" ? paramsDetails.range : false,
      page_number: currentPage,
      download: true,
      logs: logs,
    };
    setDownloadModel(!downloadmodel)
    dispatch(
      getDownloadTodayStatus({
        params,
        onSuccess: (response: any) => {
          setDownloadModel(false)
          downloadFile(response);
          setShowCustomCalender(false);
          setSelectedDateRange(DOWNLOAD_RANGE[0].value)
        },
        onError: (errorMessage: string) => {
          showToast("error", errorMessage);
          setDownloadModel(false)
          setSelectedDateRange(DOWNLOAD_RANGE[0].value)

        },
      })
    );
  };

  const resetCustom = () => {
    setCustomRange({ ...customRange, dataTo: "", dateFrom: "" });
  };

  const selectedRange = (type: string) => {
    setSelectedDateRange(type)
    if (type === "Today") {
      setParamsDetails({ ...paramsDetails, selectedDateTo: Today, selectedDate: Today, range: false })
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
      setParamsDetails({ ...paramsDetails, selectedDate: customRange.dataTo, selectedDateTo: customRange.dateFrom, range: true })
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

  console.log('customselectedDate', customselectedDate)

  return (
    <div className="mx-3">
      <Card>
        <BackArrow additionClass={"my-3"} />
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
                      setSelectedDepartment(event.target.value);
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
              <div className="col-lg-3 col-md-12 mt-1">
                <h5>{t("selectedDate")}</h5>
                <DatePicker
                  placeholder={"Select Date"}
                  icon={Icons.Calendar}
                  iconPosition={"prepend"}
                  value={customselectedDate}
                  onChange={(date: string) =>
                    setCustomSelectedDateRange(
                      getServerDateFromMoment(getMomentObjFromServer(date))
                    )
                  }
                />
              </div>

              <Container additionClass={"col my-4 text-right"}>
                <a download onClick={(e) => setDownloadModel(!downloadmodel)}>
                  {/* <a download onClick={(e) => downloadSampleCsvFile()}> */}
                  <Icon icon={Icons.DownloadSecondary} />
                </a>
              </Container>
            </Container>
          </div>
        </Container>
        {employeeAttendanceStats && employeeAttendanceStats.length > 0 ? (
          <CommonTable
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
      </Card>

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
        <div className="col-lg-12 col-md-12">
          <DropDown
            additionClass="col-lg-6"
            label={"Select Range"}
            placeholder={"Select Range"}
            data={DOWNLOAD_RANGE}
            value={selectedDateRange}
            onChange={(event) => {
              selectedRange(event.target.value);
            }}
          />
          <Container margin={"mt-5"} additionClass={"text-right"}>
            <Secondary
              text={t("cancel")}
              onClick={() => setDownloadModel(!downloadmodel)}
            />
            <Primary
              text={t("downloadLog")}
              onClick={() => LogsDownload('Log')}
            />
            <Primary
              text={t("downloadConsolidatedLog")}
              onClick={() => LogsDownload('ConsolidatedLog')}
            />
          </Container>
        </div>
        {showCustomCalendar ? (
          <div className="col-lg-6 col-md-12">
            <h5>{t("dataFrom")}</h5>
            <DatePicker
              icon={Icons.Calendar}
              iconPosition={"append"}
              onChange={(date: string) =>
                dateTimePickerHandler(date, "dateFrom")
              }
              value={customRange.dateFrom}
            />
            <h5>{t("dataTo")}</h5>
            <DatePicker
              icon={Icons.Calendar}
              iconPosition={"append"}
              onChange={(date: string) => dateTimePickerHandler(date, "dataTo")}
              value={customRange.dataTo}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default DashBoardAttendance;
