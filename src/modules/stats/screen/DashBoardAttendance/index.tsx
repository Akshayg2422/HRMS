import { CommonTable, Card, Container, DropDown, NoRecordFound, } from '@components';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployeeTodayStatus } from "../../../../store/employee/actions";
import { useTranslation } from "react-i18next";
import { getServerDateFromMoment, getMomentObjFromServer, getDisplayTimeFromMoment } from '@utils'
import {Navbar} from '@modules'
const DashBoardAttendance = ({ }) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { routeParams, employeeAttendanceStats, numOfPages, currentPage, employeeattendancedatalog } = useSelector(
    (state: any) => state.EmployeeReducer
  );

  const [selectedDepartment, setSelectedDepartment] = useState(
    routeParams.departmentId
  );
  const [selectedAttendance, setSelectedAttendance] = useState(
    routeParams.attendanceType
  );



  useEffect(() => {
    getTodayStats(currentPage);
   
  }, [selectedAttendance, selectedDepartment])


  const getTodayStats = (pageNumber: number) => {
    const params = {
      branch_id: '2b166a62-22ec-4fcd-a2fe-aab084cb6d37',
      child_ids: ['5b37ee6a-7666-4b82-b955-0dd2db63e9e3', '65599068-e89b-4ffa-881d-7172d12aaa34', '27e701ab-b359-40c7-b9e1-d543b11ba416'],
      include_child: true,
      department_id: selectedDepartment+'',
      attendance_type: selectedAttendance + '',
      selected_date: getServerDateFromMoment(
        getMomentObjFromServer(routeParams.selectedDate),
      ),
      page_number: pageNumber,
    }

    dispatch(getEmployeeTodayStatus(params))
  }





  const normalizedEmployee = (data: any) => {
    return data.map((el: any) => {
      return {
        name: el.name,
        'Mobile Number': el.mobile_number,
        in: el.per_day_details
          ? el.per_day_details.start_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el.per_day_details.start_time),
            )
            : '-'
          : '-',
        out: el.per_day_details
          ? el.per_day_details.end_time
            ? getDisplayTimeFromMoment(
              getMomentObjFromServer(el.per_day_details.end_time),
            )
            : '-'
          : '-',

        remark: el.per_day_details ? el.per_day_details.day_status : '-',

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


  return (
    <>

      <Navbar />
      <div className='main-content'>
        <Card>
          <Container additionClass={'col'}>
            <div className='row mt-3'>
              <div className='col'>
              </div>
              <div className='row col-lg-6 col-md-10'>
                <div className='col-lg-6 col-md-12'>
                  <DropDown
                    label={'Department'}
                    placeholder={'Select Department'}
                    data={employeeattendancedatalog.departments_types}
                    value={selectedDepartment}
                    onChange={(event) => {
                      if (setSelectedDepartment) {
                        setSelectedDepartment(event.target.value);
                      }
                    }}
                  />
                </div>
                <div className='col-lg-6 col-md-12'>
                  <DropDown
                    label={'Attendance'}
                    placeholder={'Select Attendance'}
                    data={employeeattendancedatalog.attendance_types}
                    value={selectedAttendance}
                    onChange={(event) => {
                      if (setSelectedAttendance) {
                        setSelectedAttendance(event.target.value);
                      }
                    }}
                  />
                </div>
              </div>
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
              previousClick={() => paginationHandler("prev")}
              nextClick={() => paginationHandler("next")}
              displayDataSet={normalizedEmployee(employeeAttendanceStats)}
            />
          ) : <NoRecordFound />}
        </Card>
      </div>
    </>
  )
}

export default DashBoardAttendance;