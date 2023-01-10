import { getMisReport } from '../../../../store/employee/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CommonTable, ImageView, Secondary } from '@components';
import { Icons } from '@assets';

type LogReportsProps = {
    data?: Array<any>;
    department: string;
    reportType: string;
    customrange: { dateFrom: string, dataTo: string };
};


function LogReports({ data, department, reportType, customrange }: LogReportsProps) {
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
        for (let i = 0; i < data.length; i++) {
            let { days, name, designation } = data[i]
            let updateObject = { name, designation }
            if (days && days.length > 0) {
                for (let j = 0; j < days.length; j++) {
                    updateObject = { ...updateObject, [days[j].date]: days[j] }
                }
            }
            updatedData[i] = updateObject
        }
        return updatedData
    }

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
                        <LocationTable tableDataSet={getConvertedTableData(data)} />
                    }
                    custombutton={"h5"}
                />
            </Card>
        </>
    )
}


type LocationTableProps = {
    tableDataSet?: any;
};

const LocationTable = ({
    tableDataSet,
}: LocationTableProps) => {

    const renderTableHeader = () => {
        if (tableDataSet) {
            const mostkeys = tableDataSet.sort(
                (a: {}, b: {}) => Object.keys(b).length - Object.keys(a).length
            )[0];
            const header = Object.keys(mostkeys)
            return header.map(key => {
                return <th scope="col" key={key}>{key.trim()}</th>
            })
        }
    }
    function renderTableValue(eachObject: any) {
        return Object.keys(eachObject).map((key: string) => {
            const isString = typeof (eachObject[key as keyof object]) === 'string'
            if (isString)
                return <td style={{ whiteSpace: 'pre-wrap' }} key={key} >{eachObject[key as keyof object]}</td>
            else {
                return <td style={{ whiteSpace: 'pre-wrap' }} key={key} ><div className="d-flex">
                    <div className="column">
                        <h6 className="mb-0 text-xs mb-2 ml-2" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.start_time}`}</h6>
                        <h6 className="mb-0 text-xs mb-2 ml-2" style={{ color: getTextColor(eachObject[key as keyof object]?.attendance_status_code) }}>{`${eachObject[key as keyof object]?.end_time}`}</h6>
                        {/* <div className='mb-2'>
                            <ImageView icon={key != 'string' && coloredIcons(eachObject[key as keyof object]?.attendance_status_code)} height={16} width={16} />
                        </div> */}
                        <h6 className="mb-0  mb-2 ml-2 text-center" style={{
                            color: getTextColor(eachObject[key as keyof object]?.attendance_status_code)
                        }}>{eachObject[key as keyof object]?.day_status}</h6>
                        {/* {eachObject[key as keyof object]?.attendance_status_code === 6 ? <Secondary additionClass={'ml--3'} text={'Modify'} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} /> : null} */}
                    </div>
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
                    color = '#FF8c00'
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
