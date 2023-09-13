import { getDownloadEmployeeCheckinLogs, getMisReport } from '../../../../store/employee/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CommonTable, ImageView, NoRecordFound, Secondary } from '@components';
import { Icons } from '@assets';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { downloadFile, formatAMPM, getArrayFromArrayOfObject } from '@utils';

type LogReportsProps = {
    data?: any;
    department?: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
    designation?: string
    attendanceType: any
    startDate: string
    endDate: string
    shiftid: string
    name: string
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


function ShiftReports({ data, shiftid, departments, reportType, name, customrange, designations, attendanceType, startDate, endDate,categorys,qualifications,genders,bloodGroups,martialStatus,agencys }: LogReportsProps) {
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
        let item = data
        let shiftTime = data?.shift_details
        const updatedData:any = []
        let key = getDatesListBetweenStartEndDates(startDate, endDate)
        for (let i = 0; i < item.length; i++) {
            let { days, name, designation, emp_id } = item[i]

            let updateObject = { name, emp_id, designation, shiftTime }
            if (key && key.length > 0) {
                key?.forEach((each: any) => {
                    const index = days && days.findIndex((day: any) => day?.date === each)
                    updateObject = { ...updateObject, [each]: index !== '-1' ? days[index] : {} }
                })
            }
            updatedData[i] = updateObject as never
        }
        return updatedData
    }



    const getDatesListBetweenStartEndDates = (
        startDate: moment.MomentInput,
        stopDate: moment.MomentInput,
    ) => {
        const dateObj:any = [];
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
            ...(reportType === "shift" ? { attendance_type: attendanceType } : { attendance_type: -1 }),
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
            shift_id: shiftid,
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


    const getEmployeeCheckInLogsReports = (emp: any) => {
        const params = {
            emp_id: emp?.emp_id,
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


    const memoizedTable = useMemo(() => {
        
        return <>
          {data?.data && data?.data?.length > 0 ? (
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
              tableChildren={
                <LocationTable tableDataSet={getConvertedTableData(data)}
                    employeeLogDownload={(item: any) => {
                        getEmployeeCheckInLogsReports(item)
                    }} />
            }
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


type LocationTableProps = {
    tableDataSet?: any;
    employeeLogDownload?: any,
};

const LocationTable = ({
    tableDataSet,
}: LocationTableProps) => {

    const shiftTime = (date: any) => {
        let show
        tableDataSet && tableDataSet.length && tableDataSet.map((el: any) => {
            el.shiftTime && el.shiftTime.length > 0 && el.shiftTime.map((item: any) => {
                if (item.date == date) {
                    let startTime = item.shift_start_time
                    let endTime = item.shift_end_time
                    // show = <>{`${item.shift_start_time === '-' ? 'Holiday' : item.shift_start_time} - ${item.shift_end_time === '-' ? "Holiday" : item.shift_end_time}`}</>
                    show = <>  {
                        !startTime && !endTime ? <h6>{"Holiday"}</h6> : <>
                            {/* {item.shift_start_time ? <h6>{`${item.shift_start_time}`}</h6> : <h6>{"-"}</h6>}
                            {item.shift_end_time ? <h6>{`${item.shift_end_time}`}</h6> : <h6>{"-"}</h6>} */}
                            {`${item.shift_start_time} - ${item.shift_end_time}`}
                        </>
                    }</>
                }

            })
        })
        return show
    }

    const renderTableHeader = () => {
        if (tableDataSet) {
            const mostkeys = tableDataSet.sort(
                (a: {}, b: {}) => Object.keys(b).length - Object.keys(a).length
            )[0];

            const header = Object.keys(mostkeys)
            return header.map(key => {
                return <><th scope="col" key={key}>{key === 'emp_id' || key === "shiftTime" ? '' : key.trim()}
                    <br />
                    <div className='text-black fw-normal'>{shiftTime(key)}</div>
                </th>
                </>
            })
        }
    }

    function renderTableValue(eachObject: any) {
        return Object.keys(eachObject).map((key: string) => {
            const isString = typeof (eachObject[key as keyof object]) === 'string'
            if (isString)
                return <td style={{ whiteSpace: 'pre-wrap' }} key={key} >{key === 'emp_id' ? "" : eachObject[key as keyof object]}
                </td>
            else {
                let startTime = eachObject[key as keyof object]?.start_time
                let endTime = eachObject[key as keyof object]?.end_time
                return <td className='text-center' style={{ whiteSpace: 'pre-wrap' }} key={key} ><div className="d-flex">
                    {eachObject[key as keyof object] ? <div className="column">
                        {key !== 'shiftTime' && <>{!startTime && !endTime ? <h6>{"-"}</h6> : <>
                            {eachObject[key as keyof object]?.start_time ? <h6 className="" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.start_time}`}</h6> : <h6>{"-"}</h6>}
                            {eachObject[key as keyof object]?.end_time ? <h6 className="" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.end_time}`}</h6> : <h6>{"-"}</h6>}
                        </>}</>}
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

export { ShiftReports }
