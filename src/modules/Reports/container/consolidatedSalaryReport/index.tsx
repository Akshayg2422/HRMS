import { getDownloadEmployeeCheckinLogs, getMisReport } from '../../../../store/employee/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CommonTable, ImageView, NoRecordFound, Secondary } from '@components';
import { Icons } from '@assets';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { downloadFile, getArrayFromArrayOfObject } from '@utils';
import { Row } from 'reactstrap';

type LogReportsProps = {
    data?: Array<any>;
    department?: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
    designation?: string
    startDate: string
    endDate: string
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


function ConsolidatedSalaryReport({ data, departments, reportType, customrange, designations, startDate, endDate ,categorys,qualifications,genders,bloodGroups,martialStatus,agencys}: LogReportsProps) {
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
            attendance_type: -1,
            ...(hierarchicalBranchIds.include_child && { child_ids: hierarchicalBranchIds?.child_ids }),
            // designation_id: designation,
            // department_id: department,
            ...( departments && departments.length>0&& { department_ids:getArrayFromArrayOfObject(departments,'id') }),
            ... (designations && designations?.length>0 && {designation_ids:getArrayFromArrayOfObject(designations,'id')}),
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



    const normalizedEmployee = (data: any) => {
        return data && data.length > 0 && data.map((el: any) => {
            return {
                employee: el.name,
                designation: el.designation,
                "Branch": el.branch,
                "Total Days": el?.break_down?.total,
                "Payable Days": el?.break_down?.payable_days,
                "LOP Days": el?.break_down?.lop_days,
                "Basic Pay": el?.salary_till_date?.base_pay ? el?.salary_till_date?.base_pay : '-',
                "Allowance": renderNormalizer(AllowancesNormalizer(el?.salary_till_date?.calculated_pay), true),
                "Other Pay": renderNormalizer(otherPayNormalizer(el?.salary_till_date?.calculated_pay), true),
                "Gross Salary": el?.salary_till_date?.gross_pay ? el?.salary_till_date?.gross_pay : '-',
                "Deduction": renderNormalizer(deductionNormalizer(el?.salary_till_date?.calculated_pay), false),
                "Net Payable": el?.salary_till_date?.pay_till_date ? el?.salary_till_date?.gross_pay_till_date_after_deductions : '-'
            };
        });
    };


    const AllowancesNormalizer = (item: any) => {
        const allowanceData: any[] = []
        item && item.length > 0 && item.map((el: any) => {
            if (el.key === 'allowance_breakdown') {
                allowanceData.push(el.value)
            }
        })
        return allowanceData
    }

    const deductionNormalizer = (item: any) => {
        const deductionData: any[] = []
        item && item.length > 0 && item.map((el: any) => {
            if (el.key === 'deduction_breakdown') {
                deductionData.push(el.value)
            }
        })
        return deductionData
    }

    const otherPayNormalizer = (item: any) => {
        const otherPayData: any[] = []
        item && item.length > 0 && item.map((el: any) => {
            if (el.key === 'other_income_breakdown') {
                otherPayData.push(el.value)
            }
        })
        return otherPayData
    }



    const renderNormalizer = (data: any, status: any) => {
        const item = data && data.length > 0 && data[0]
        const convertedData = Object.entries(item).map(([key, value]) => ({
            key: key,
            value: value
        }));
        return (
            <div style={{ flexDirection: 'column' }}>
                {convertedData && convertedData.length > 0 ? convertedData.map((el: any) => {
                    return (
                        <>
                            {el.value !== 0 && <th scope="col">
                                <div>
                                    {el?.key}
                                </div>
                                <div className={`font-weight-normal mt-2 text-center ${status ? 'text-success' : 'text-danger'}`}>{el?.value}</div>
                            </th>}
                        </>
                    )
                })
                    : <div className='font-weight-normal mt-2 text-center'>{"-"}</div>}
            </div >
        )
    }

    const memoizedTable = useMemo(() => {
        return <>
            {data && data.length > 0 ? (
                <CommonTable
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
                    customClass='text-center'
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


type LocationTableProps = {
    tableDataSet?: any;
    employeeLogDownload?: any
};

const LocationTable = ({
    tableDataSet, employeeLogDownload
}: LocationTableProps) => {

    const renderTableHeader = () => {
        if (tableDataSet) {
            const mostkeys = tableDataSet.sort(
                (a: {}, b: {}) => Object.keys(b).length - Object.keys(a).length
            )[0];

            const header = Object.keys(mostkeys)
            return header.map(key => {
                return <th scope="col" key={key}>{key === 'emp_id' ? '' : key.trim()}</th>
            })
        }
    }
    function renderTableValue(eachObject: any) {
        return Object.keys(eachObject).map((key: string) => {
            const isString = typeof (eachObject[key as keyof object]) === 'string'
            if (isString)
                return <td style={{ whiteSpace: 'pre-wrap' }} key={key} >{key === 'emp_id' ? "" : eachObject[key as keyof object]}
                    {key === 'emp_id' && (
                        <div style={{ cursor: 'pointer' }}>
                            <ImageView height={20} width={20} icon={Icons.Download} onClick={() => {
                                if (employeeLogDownload) {
                                    employeeLogDownload(eachObject)
                                }
                            }} />
                        </div>
                    )}
                </td>
            else {
                let startTime = eachObject[key as keyof object]?.start_time
                let endTime = eachObject[key as keyof object]?.end_time
                return <td className='text-center' style={{ whiteSpace: 'pre-wrap' }} key={key} ><div className="d-flex">
                    {eachObject[key as keyof object] ? <div className="column">
                        {!startTime && !endTime ? <h6>{"-"}</h6> : <>
                            {eachObject[key as keyof object]?.start_time ? <h6 className="" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.start_time}`}</h6> : <h6>{"-"}</h6>}
                            {eachObject[key as keyof object]?.end_time ? <h6 className="" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.end_time}`}</h6> : <h6>{"-"}</h6>}
                        </>}
                        {/* <div className='mb-2'>
                            <ImageView icon={key != 'string' && coloredIcons(eachObject[key as keyof object]?.attendance_status_code)} height={16} width={16} />
                        </div> */}
                        {<h6 className="text-center" style={{
                            color: getTextColor(eachObject[key as keyof object]?.attendance_status_code)
                        }}>{eachObject[key as keyof object]?.day_status}</h6>}
                        {/* {eachObject[key as keyof object]?.attendance_status_code === 6 ? <Secondary additionClass={'ml--3'} text={'Modify'} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} /> : null} */}
                    </div> : <h6 className='ml-2'>{'N/A'}</h6>}
                </div></td>
            }
        })

        function getTextColor(statusType: any) {
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

    }


    return (
        <div className="table-responsive scroll-hidden">
            <table className="table align-items-center table-flush">
                <thead className="thead-light">
                    <tr>
                        {
                            renderTableHeader()
                        }
                    </tr>
                </thead>
                <tbody>
                    {tableDataSet && tableDataSet.length > 0 &&
                        tableDataSet.map((each_table_obj: object, idx: number) => {
                            return (
                                <tr key={idx}>
                                    {renderTableValue(each_table_obj)}
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        </div >
    );
};

export { ConsolidatedSalaryReport }
