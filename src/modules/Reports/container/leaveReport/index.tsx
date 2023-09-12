import React, { useEffect, useMemo, useState } from 'react'
import { Card, Container, DropDown, DateRangePicker, Icon, Table, InputText, ChooseBranchFromHierarchical, DatePicker, CommonTable, Primary, AllHierarchical, NoRecordFound } from '@components'
import { Icons } from '@assets'
import { getMomentObjFromServer, getServerDateFromMoment, REPORTS_TYPE, TABLE_CONTENT_TYPE_REPORT, Today,DOMAIN } from '@utils';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMisReport } from '../../../../store/employee/actions';


type LeaveReportProps = {
    data?: Array<any>;
    //i do it
    designations?: Array<any>;
    departments?: Array<any>;
    department?: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
    designation?: string

}


function LeaveReports({ data, department, reportType, customrange, designation }: LeaveReportProps) {

    const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

console.log('leave-====>')
    const {
        numOfPages, 
        currentPage,
    } = useSelector((state: any) => state.EmployeeReducer);


    let dispatch = useDispatch();
    const { t } = useTranslation();



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
            ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
            // designation_id: designation,
            // department_id: department,
            
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


    const normalizedEmployee = (data: any) => {
        console.log(data,"data=====?")
        return data && data.length > 0 && data.map((el: any) => {
            return {
                name: el.name,
                "Designation": el.designation,
                "Reason": el.reason,
                "start Date": el.start_date,
                "end Date": el.end_date,
                "No.Of Days": el.days,
                "Status": <span
                    className="h5 text-primary"
                >
                    {el.status}
                </span>
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
              custombutton={"h5"}

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
        </>
    )
}

export { LeaveReports }