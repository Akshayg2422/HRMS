import { getMisReport } from '../../../../store/employee/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CommonTable, ImageView } from '@components';
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
                    updateObject = { ...updateObject, [j + 1 + '           ']: days[j] }
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
            branch_ids: branchId(),
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
                    <div className="d-flex flex-column justify-content-center ">
                        {/* <h6 className="mb-0 text-xs mb-2 ml-2">1 logs</h6> */}
                        <div className='d-flex justify-content-center align-items-center mb-2'>
                            <ImageView icon={key != 'string' && (eachObject[key as keyof object]?.is_present) ? Icons.TickActive: Icons.TickInActive } height={16} width={16} />
                        </div>
                        {/* <Secondary text={'Modify'} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} /> */}
                    </div>
                </div></td>
            }
        })
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
