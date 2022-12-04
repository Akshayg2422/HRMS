import React, { useEffect, useState } from 'react'
import { Card, Container, DropDown, DateRangePicker, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getDisplayTimeFromMoment, getMomentObjFromServer } from '@utils';
import { fetchCalendardetailsFailure, getMisReport } from '../../../../store/employee/actions';
import { validateHeaderValue } from 'http';


type AttendanceReportProps = {
  data?: Array<any>;
  department: string;
  reportType: string;
  customrange: { dateFrom: string, dataTo: string };
};

function AttendanceReport({ data, department, reportType, customrange }: AttendanceReportProps) {

  let dispatch = useDispatch();

  const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const {
    numOfPages,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);



  const branchId = (() => {
    if (hierarchicalAllBranchIds === -1) {
      return hierarchicalAllBranchIds
    } else {
      return [hierarchicalBranchIds.branch_id]
    }
  })


  const getReports = ((pageNumber: number) => {

    const params = {
      report_type: reportType,
      attendance_type: '-1',
      department_id: department,
      download: false,
      branch_ids: branchId(),
      selected_date: customrange?.dateFrom,
      selected_date_to: customrange?.dataTo,
      page_number: pageNumber,
    };
    dispatch(getMisReport({
      params
    }));
  })

  const normalizedEmployee = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        name: el.name,
        "Designation": el.designation,
        "Total Days": el.total,
        "Present Days": el.present,
        "Leave Days": el.leave,
        "Holidays": el.holiday,
        "Absent": el.absent,
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
    getReports(page)
  }


  return (
    <>
      <Card>
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
          displayDataSet={normalizedEmployee(data)}
        />
      </Card>
    </>
  )
}

export { AttendanceReport }