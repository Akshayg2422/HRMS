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
import { Navbar } from "@modules";
import { Icons } from "@assets";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";
import moment from "moment";

const DashBoardAttendance = ({}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    routeParams,
    employeeAttendanceStats,
    numOfPages,
    currentPage,
    employeeattendancedatalog,
    employeeCheckInDetailedLogPerDay,
    downloadContent,
  } = useSelector((state: any) => state.EmployeeReducer);

  const { hierarchicalBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [model, setModel] = useState(false);
  const [downloadmodel, setDownloadModel] = useState(false);
  const [showCustomCalendar, setShowCustomCalender] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(
    routeParams.departmentId
  );
  const [selectedAttendance, setSelectedAttendance] = useState(
    routeParams.attendanceType
  );

  const [selectedDateRange, setSelectedDateRange] = useState("");

  const [customRange, setCustomRange] = useState({
    dateFrom: "",
    dataTo: "",
  });

  useEffect(() => {
    getTodayStats(currentPage);
  }, [selectedAttendance, selectedDepartment]);

  const getTodayStats = (pageNumber: number) => {
    const params = {
      ...hierarchicalBranchIds,
      department_id: selectedDepartment + "",
      attendance_type: selectedAttendance + "",
      selected_date: getServerDateFromMoment(
        getMomentObjFromServer(routeParams.selectedDate)
      ),
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

  const downloadSampleCsvFile = () => {
    const params = {
      ...hierarchicalBranchIds,
      department_id: selectedDepartment + "",
      attendance_type: selectedAttendance + "",
      selected_date: getServerDateFromMoment(
        getMomentObjFromServer(routeParams.selectedDate)
      ),
      page_number: currentPage,
      download: true,
    };
    dispatch(
      getDownloadTodayStatus({
        params,
        onSuccess: (response: any) => {
          downloadFile(response);
        },
        onError: (error: string) => {
          showToast("error", t("invalidUser"));
        },
      })
    );
  };

  const selectedRange = (type: string) => {
    let today = moment().format("YYYY-MM-DD");
    let thisWeek = moment()
      .startOf("isoWeek")
      .add(0, "week")
      .format("YYYY-MM-DD");
    let thisMonth = `01-${moment().format("M")}-${moment().format("Y")}`;
    let lastMonth = `01-${moment().add(-1,'month').format("M")}-${moment().format("Y")}`;

    let lastWeek = moment()
      .startOf("isoWeek")
      .add(-1, "week")
      .format("YYYY-MM-DD");
    console.log("type", lastMonth);
    if (type === "Today") {
      setShowCustomCalender(false);
    } else if (type === "This Week") {
      setShowCustomCalender(false);
    } else if (type === "Last Week") {
      setShowCustomCalender(false);
    } else if (type === "This Month") {
      setShowCustomCalender(false);
    } else if (type === "Last Month") {
      setShowCustomCalender(false);
    } else if (type === "Custom Range") {
      setShowCustomCalender(false);
      setShowCustomCalender(true);
    }
  };
  const dateTimePickerHandler = (value: string, key: string) => {};

  return (
    <div className="mx-3">
      <Card>
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

              <Container additionClass={"col my-4 text-right"}>
                {/* <a download onClick={(e) => setDownloadModel(!downloadmodel)}> */}
                <a download onClick={(e) => downloadSampleCsvFile()}>

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
        <div className="col-lg-6 col-md-12">
          <DropDown
            label={"Select Range"}
            placeholder={"Select Range"}
            data={DOWNLOAD_RANGE}
            value={selectedDateRange}
            onChange={(event) => {
              selectedRange(event.target.value);
            }}
          />
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
