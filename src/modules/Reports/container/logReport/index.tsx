import { getDownloadEmployeeCheckinLogs, getMisReport } from '../../../../store/employee/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CommonTable, ImageView, Secondary } from '@components';
import { Icons } from '@assets';
import moment from 'moment';
import { useEffect } from 'react';
import { downloadFile } from '@utils';

type LogReportsProps = {
    data?: Array<any>;
    department: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
    designation: string
    attendanceType: any
    startDate: string
    endDate: string
};


function LogReports({ data, department, reportType, customrange, designation, attendanceType, startDate, endDate }: LogReportsProps) {
    const { hierarchicalBranchIds, hierarchicalAllBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const {
        numOfPages,
        currentPage,
    } = useSelector((state: any) => state.EmployeeReducer);

    let dispatch = useDispatch();
    const { t } = useTranslation();

    const getConvertedTableData = (data: any) => {
        const updatedData = []
        let key = getDatesListBetweenStartEndDates(startDate, endDate)
        for (let i = 0; i < data.length; i++) {
            let { days, name, designation, emp_id } = data[i]
            let updateObject = { name, emp_id, designation }
            if (key && key.length > 0) {
                key.forEach((each: any) => {
                    const index = days.findIndex((day: any) => day.date === each)
                    updateObject = { ...updateObject, [each]: index !== '-1' ? days[index] : {} }
                })
            }
            updatedData[i] = updateObject
        }
        return updatedData
    }

    const getDatesListBetweenStartEndDates = (
        startDate: moment.MomentInput,
        stopDate: moment.MomentInput,
    ) => {
        const dateObj = [];
        let currentDate = moment(startDate);
        stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateObj.push(moment(currentDate).format('YYYY-MM-DD'));
            currentDate = moment(currentDate).add(1, 'days');
        }

        return dateObj;
    };

    const getReports = ((pageNumber: number) => {
        const params = {
            report_type: reportType,
            ...(reportType === "log" ? { attendance_type: attendanceType } : { attendance_type: -1 }),
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
            params
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


    const getEmployeeCheckInLogsReports = (emp: any) => {
        console.log("emp------->", emp);

        const params = {
            emp_id: emp?.emp_id,
            selected_date: customrange?.dateFrom,
            selected_date_to: customrange?.dataTo,
            download: true
        }
        console.log("params----->", params);
        dispatch(getDownloadEmployeeCheckinLogs({
            params,
            onSuccess: (response: any) => {
                downloadFile(response);
            },
            onError: (error: string) => {
            },
        }));
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
                    tableChildren={
                        <LocationTable tableDataSet={getConvertedTableData(data)}
                            employeeLogDownload={(item: any) => {
                                getEmployeeCheckInLogsReports(item)
                            }} />
                    }
                    custombutton={"h5"}
                />
            </Card>
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
                        <div style={{ cursor:'pointer'}}>
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
                default:
                    color = '#000000'
            }
            return color
        }

    }


    return (
        <div className="table-responsive">
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

export { LogReports }
