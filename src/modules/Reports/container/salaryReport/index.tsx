import { CommonTable, NoRecordFound } from '@components';
import { getMisReport } from '../../../../store/employee/actions';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

type LogReportsProps = {
    data?: any;
    department: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
    designation: string
    attendanceType: any
    startDate: string
    endDate: string
    shiftid: string
    name: string
};


function SalaryReport({ data, department, reportType, customrange, designation }: LogReportsProps) {
    const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );


    const {
        numOfPages,
        currentPage,
    } = useSelector((state: any) => state.EmployeeReducer);


    let dispatch = useDispatch();
    const { t } = useTranslation();



    const getReports = ((pageNumber: number) => {
        const params = {
            report_type: reportType,
            attendance_type: '-1',
            ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
            designation_id: designation,
            department_id: department,
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
        return data && data.length > 0 && data.map((el: any) => {
            return {
                name: el.name,
                "Designation": el.designation,
                "Branch": el.branch,
                "Total Days": el?.break_down?.total,
                "Payable Days": el?.break_down?.payable_days,
                "LOP Days": el?.break_down?.lop_days ? el?.break_down?.lop_days : '-',
                "Gross Salary": el?.salary_till_date?.gross_pay ? el?.salary_till_date?.gross_pay :"-",
                "Net Salary": el?.salary_till_date?.net_salary ? el?.salary_till_date?.net_salary : "-",
                "LOP": el?.salary_till_date?.lop_pay_till_date ? el?.salary_till_date?.lop_pay_till_date : "-",
                "Net Payable": el?.salary_till_date?.pay_till_date ? el?.salary_till_date?.gross_pay_till_date_after_deductions : "-"
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

export { SalaryReport }
