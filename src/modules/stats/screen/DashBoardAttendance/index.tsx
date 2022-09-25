import {
  CommonTable,
  Card,
  Container,
  DropDown,
  NoRecordFound,
  Modal,
  Table,
  Icon,
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
} from "@utils";
import { Navbar } from "@modules";
import { Icons } from "@assets";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";

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

  const [selectedDepartment, setSelectedDepartment] = useState(
    routeParams.departmentId
  );
  const [selectedAttendance, setSelectedAttendance] = useState(
    routeParams.attendanceType
  );

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
    // const AppUrl = url.FETCH_EMPLOYEE_TODAY_STATUS;
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
          downloadFile(response)
        },
        onError: (error: string) => {
          showToast("error", t("invalidUser"));
        },
      })
    );
  };

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
                <a download onClick={(e) => downloadSampleCsvFile()}>
                  <Icon  icon={Icons.DownloadSecondary}  />
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
    </div>
  );
};

export default DashBoardAttendance;

