import { CommonTable, NoRecordFound, ScreenContainer, Secondary, Sort, TableWrapper } from '@components';
import { getCheckInDetailedLogPerDay, getEmployeesCheckInLogs } from '../../../../../../store/employee/actions';
import { getDisplayTimeFromMoment, getMomentObjFromServer, showAdminModify, showToast } from '@utils';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const LogView = () => {

    let dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        employeeCheckInLogs,
        employeeCheckInDetailedLogPerDay,
    } = useSelector((state: any) => state.EmployeeReducer);

    const employeeLogSort = [
        { id: 1, title: t("last3Months") },
        { id: 2, title: moment().format("MMMM") },
    ];
    const [activeSort, setActiveSort] = useState<number>(1);

    const [startDate, setStartDate] = useState(
        moment().startOf("month").format("yyyy-MM-DD")
    );
    const [endDate, setEndDate] = useState(
        moment().add(1, "days").format("yyyy-MM-DD")
    );

    const onTabChange = (index: number) => {
        if (index === 0) {
            setStartDate(moment().add(-3, "month").format("yyyy-MM-DD"));
        } else {
            setStartDate(moment().startOf("month").format("yyyy-MM-DD"));
        }
    };

    useEffect(() => {
        getUserCheckInLogs(1)
    }, [activeSort])

    function getUserCheckInLogs(selectedEmployee: any) {
        const params = {
            start_time: startDate,
            end_time: endDate,
            user_id: "8a50c345-dc86-4e4e-841b-6e2eca44c2ed",
        };

        dispatch(getEmployeesCheckInLogs({
            params,
            onSuccess: (success: object) => () => {
                // setModel(!model);
            },
            onError: (error: string) => () => {
                showToast("info", error);
            },
        }));
    }

    function fontColor(statusType: any) {
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

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                date: el.date,
                "startTime": <>{el.start_time
                    ? getDisplayTimeFromMoment(
                        getMomentObjFromServer(el.start_time)
                    )
                    : "-"}</>,
                "EndTime": <>{el.end_time
                    ? getDisplayTimeFromMoment(
                        getMomentObjFromServer(el.end_time)
                    )
                    : "-"}</>,
                "Status": <><small className="mb-0 p-0 col" style={{
                    cursor: el.day_status_type === 10 ? 'pointer' : '', fontWeight: 'bold',
                    color: fontColor(el.day_status_type),
                }} onClick={(e) => { handlePresentModified(e, el) }}>{el.day_status}</small></>,

                "": <>
                    {<small className="mb-0 col" >{showAdminModify(el?.day_status_type) ?
                        <Secondary text={t('modify')} size={'btn-sm'} style={{ borderRadius: '20px', fontSize: '8px' }} onClick={(e: any) => { onModify(e, el) }} />
                        : '-'}</small>}
                </>

            };
        });
    };

    const handlePresentModified = (e: any, type: any) => {
        if (type?.day_status_type === 10) {
            e.stopPropagation()
            //   setPresentModifiedDetails(type)
            //   setPresentModifiedModel(!presentModifiedModel)
        }
    }

    const onModify = (e: any, item: any) => {
        e.stopPropagation()
        // setMarkAsPresentDetails({
        //   ...markAsPresentDetails,
        //   date: item.date,
        //   day_status_id: item.id
        // });
        // setMarkAsPresentModel(!markAsPresentModel);
    }

    function getEmployeeCheckInDetailedLogPerDay(item: any, index: number) {
        // setAccordion(index);
        const params = {
            date: item.date,
            user_id: "8a50c345-dc86-4e4e-841b-6e2eca44c2ed",
        }
        dispatch(
            getCheckInDetailedLogPerDay({
                params,
                onSuccess: (response: any) => () => {
                    console.log('----------------->');
                },
                onError: (error: string) => () => {
                },
            })
        );
    }

    const memoizedTable = useMemo(() => {
        return <>
            {employeeCheckInLogs && employeeCheckInLogs.length > 0 ? (
                <CommonTable
                    card={false}
                    displayDataSet={normalizedEmployeeLog(employeeCheckInLogs)}
                    tableOnClick={(e, index, item) => {
                        const selectedEmployee = employeeCheckInLogs[index];
                        getUserCheckInLogs(selectedEmployee);
                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [employeeCheckInLogs])
    console.log("--------->employeeCheckInLogs", employeeCheckInLogs);


    return (
            <TableWrapper
                buttonChildren={<div className="text-right">
                    <Sort
                        size={'btn-sm'}
                        sortData={employeeLogSort}
                        activeIndex={activeSort}
                        onClick={(index) => {
                            setActiveSort(index);
                            onTabChange(index);
                        }}
                    />
                </div>}>
                {memoizedTable}
            </TableWrapper>
    )
}

export default LogView 
