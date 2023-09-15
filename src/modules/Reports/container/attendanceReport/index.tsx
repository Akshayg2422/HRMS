import React, { useEffect, useMemo, useState } from 'react'
import { Card, Container, DropDown, DateRangePicker, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, ImageView, NoRecordFound, CommonDropdownMenu } from '@components'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { downloadFile, getArrayFromArrayOfObject, getDisplayTimeFromMoment, getMomentObjFromServer } from '@utils';
import { fetchCalendardetailsFailure, getDownloadEmployeeCheckinLogs, getMisReport } from '../../../../store/employee/actions';
import { validateHeaderValue } from 'http';
import { Icons } from '@assets';


type AttendanceReportProps = {
  data?: Array<any>;
  department?: string;
  reportType: string;
  customrange: { dateFrom: string, dataTo: string };
  designation?: string
  //i do this
  departments?: Array<any>;
  designations?: Array<any>;
  qualifications?: Array<any>;
  categorys?:Array<any>;
  genders?:Array<any>;
  bloodGroups?:Array<any>;
  martialStatus?:Array<any>;
  agencys?:Array<any>;
};

const ATTENDANCE_DROPDOWN_ITEM = [
  { id: '1', name: 'Download detail checkIn logs', value: 'DL', icon: 'ni ni-cloud-download-95' },
]

function AttendanceReport({ data, departments, reportType, customrange, designations,categorys,qualifications,genders,bloodGroups,martialStatus,agencys }: AttendanceReportProps) {


  let dispatch = useDispatch();

  const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const {
    numOfPages,
    currentPage,
  } = useSelector((state: any) => state.EmployeeReducer);


  const getReports = ((pageNumber: number) => {
    const params = {
      report_type: reportType,
      ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
      ...( departments && departments.length>0&& { department_ids:getArrayFromArrayOfObject(departments,'id') }),
      ... (designations && designations?.length>0 && {designation_ids:getArrayFromArrayOfObject(designations,'id')}),
      attendance_type: '-1',
      ...( genders && genders.length>0 &&{genders:getArrayFromArrayOfObject(genders,'id')}),
        ...(bloodGroups && bloodGroups.length>0 &&{blood_groups:getArrayFromArrayOfObject(bloodGroups,'id')}),
        ...(martialStatus && martialStatus.length>0 &&{marital_statuss:getArrayFromArrayOfObject(martialStatus,'id')}),
        ...(qualifications && qualifications.length>0 &&{qualifications:getArrayFromArrayOfObject(qualifications,'id')}),
        ...(agencys && agencys.length>0 && {vendor_ids:getArrayFromArrayOfObject(agencys,'id')}),
        ...( categorys && categorys.length>0 && {employment_types:getArrayFromArrayOfObject(categorys,'id')}),
  
      download: false,
      ...(hierarchicalAllBranchIds !== -1 && { branch_ids: [hierarchicalBranchIds.branch_id] }),
      selected_date: customrange?.dateFrom,
      selected_date_to: customrange?.dataTo,
      page_number: pageNumber,
    };
    dispatch(getMisReport({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  })


  const getEmployeeCheckInLogsReports = (id: string) => {
    const params = {
      emp_id: id,
      selected_date: customrange?.dateFrom,
      selected_date_to: customrange?.dataTo,
      download: true
    }
    dispatch(getDownloadEmployeeCheckinLogs({
      params,
      onSuccess: (response: any) => () => {
        downloadFile(response);
      },
      onError: (error: string) => () => {
      },
    }));
  }

  const normalizedEmployee = (data: any) => {
    return data && data.length > 0 && data.map((el: any) => {
      return {
        name: el.name,
        "Designation": el.designation,
        "Total Days": el.total,
        "Present": el.present,
        "Leave": el.leave,
        "Holidays": el.holiday,
        "Week Off": el?.week_off ? el?.week_off : '-',
        "Absent": el.absent,
        "Alert": el.alert,
        "Billable Days": el?.billable_days,
        "  ": <CommonDropdownMenu
          data={ATTENDANCE_DROPDOWN_ITEM}
          onItemClick={(e, item) => {
            e.stopPropagation()
            getEmployeeCheckInLogsReports(el?.emp_id)
          }}
        />
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

  const memoizedTable = useMemo(() => {
    return <>
      {data && data.length > 0 ? (
        <CommonTable
          // noHeader
          card={false}
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(currentPage) => {
            paginationHandler("current", currentPage);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployee(data)}
        // tableOnClick={(e, index, item) => {
        //   const selectedId = registeredEmployeesList[index].id;
        //   dispatch(getSelectedEmployeeId(selectedId));
        //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
        // }}
        />
      ) : <NoRecordFound />}
    </>
  }, [data])


  return (
    <>
      {
        memoizedTable
      }
      {/* <Card>
        <CommonTable
          noHeader
          isPagination
          currentPage={currentPage}
          noOfPage={numOfPages}
          paginationNumberClick={(Page) => {
            paginationHandler("current", Page);
          }}
          previousClick={() => paginationHandler("prev")}
          nextClick={() => paginationHandler("next")}
          displayDataSet={normalizedEmployee(data)}
        />
      </Card> */}
    </>
  )
}

export { AttendanceReport }