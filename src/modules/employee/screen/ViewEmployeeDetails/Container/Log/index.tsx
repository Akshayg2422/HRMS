import { CommonTable, Container, InputText, Modal, NoRecordFound, Primary, ScreenContainer, Secondary, Sort, Table, TableWrapper } from '@components';
import { applyLeave, getCheckInDetailedLogPerDay, getEmployeesCheckInLogs, postAdminModifyLog } from '../../../../../../store/employee/actions';
import { getDisplayTimeFromMoment, getMomentObjFromServer, showAdminModify, showApprovedBy, showToast, validateDefault } from '@utils';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const LogView = () => {

    let dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        selectedEmployeeId,
        employeeCheckInLogs,
        employeeCheckInDetailedLogPerDay,
    } = useSelector((state: any) => state.EmployeeReducer);

    const employeeLogSort = [
        { id: 1, title: t("last3Months") },
        { id: 2, title: moment().format("MMMM") },
    ];

    const [activeSort, setActiveSort] = useState<number>(1);
    const [logPerDayModel, setLogPerDayModel] = useState<boolean>(false);

    const [presentModifiedDetails, setPresentModifiedDetails] = useState<any>();
    const [presentModifiedModel, setPresentModifiedModel] = useState<boolean>(false);


    const [markAsPresentModel, setMarkAsPresentModel] = useState<boolean>(false);
    const [markAsPresentDetails, setMarkAsPresentDetails] = useState<any>({
        date: "",
        reason: "",
        id: "",
    });



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
            user_id: selectedEmployeeId,
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
            case 11:
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
                }}
                    onClick={(e) => { handlePresentModified(e, el) }}
                >{el.day_status}{showApprovedBy(el?.day_status_type) && el?.approved_by  ?
                    <div className="text-small" style={{ color: 'black', fontWeight: 'lighter', }}>{`By - ${el?.approved_by}`}</div>
                    : <></>}</small></>,

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
            setPresentModifiedDetails(type)
            setPresentModifiedModel(!presentModifiedModel)
        }
    }

    const onModify = (e: any, item: any) => {
        e.stopPropagation()
        setMarkAsPresentDetails({
            ...markAsPresentDetails,
            date: item.date,
            id: item?.id
        });
        setMarkAsPresentModel(!markAsPresentModel);
    }

    function getEmployeeCheckInDetailedLogPerDay(item: any) {
        // setAccordion(index);
        const params = {
            date: item.date,
            user_id: selectedEmployeeId,
        }
        dispatch(
            getCheckInDetailedLogPerDay({
                params,
                onSuccess: (response: any) => () => {
                    setLogPerDayModel(!logPerDayModel)
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
                        getEmployeeCheckInDetailedLogPerDay(selectedEmployee);
                    }}
                />
            ) : <NoRecordFound />}
        </>
    }, [employeeCheckInLogs])

    const onChangeHandler = (event: any) => {
        setMarkAsPresentDetails({
            ...markAsPresentDetails,
            [event.target.name]: event.target.value,
        });
    };

    const normalizedPerDayData = (data: any) => {
        return data.map((it: any) => {
            return {
                Time: getDisplayTimeFromMoment(getMomentObjFromServer(it.checkin_time)),
                Type: it.type,
                address: it.address_text ? it.address_text : "       -",
            };
        });
    };

    const validateOnSubmit = () => {
        if (!validateDefault(markAsPresentDetails.reason).status) {
            showToast("error", t("invalidReason"));
            return false;
        }
        return true;
    };

    const onRequestHandler = () => {
        if (validateOnSubmit()) {
            const params = {
                daily_log_id: markAsPresentDetails.id,
                attendance_date: markAsPresentDetails.date,
                reason: markAsPresentDetails.reason,
                is_approved: true,
                employee_id: selectedEmployeeId,
            };
            dispatch(
                postAdminModifyLog({
                    params,
                    onSuccess: (response: any) => () => {
                        setMarkAsPresentModel(!markAsPresentModel);
                        setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
                        showToast("success", response?.message);
                        getUserCheckInLogs(1)
                    },
                    onError: (error: string) => () => {
                        showToast("error", error);
                        setMarkAsPresentDetails({ ...markAsPresentDetails, reason: "" });
                        setMarkAsPresentModel(!markAsPresentModel);
                    },
                })
            );
        }
    };

    return (
        <Container additionClass='mx-2 m-0'>
            <TableWrapper
                buttonChildren={<div className="text-right">
                    <Sort
                        size={'btn-sm'}
                        sortData={employeeLogSort}
                        activeIndex={activeSort}
                        onClick={(index: any, item: any) => {
                            setActiveSort(index);
                            onTabChange(index);
                        }}
                    />
                </div>}>
                {memoizedTable}
            </TableWrapper>
            <Modal
                showModel={logPerDayModel}
                toggle={() => setLogPerDayModel(!logPerDayModel)}
            >
                {employeeCheckInDetailedLogPerDay &&
                    employeeCheckInDetailedLogPerDay.length > 0 ? (
                    <Table
                        displayDataSet={normalizedPerDayData(
                            employeeCheckInDetailedLogPerDay
                        )}
                    />
                ) : (
                    <NoRecordFound />
                )}
            </Modal>
            <Modal
                showModel={markAsPresentModel}
                toggle={() => {
                    setMarkAsPresentModel(!markAsPresentModel)
                    setMarkAsPresentDetails({
                        ...markAsPresentDetails,
                        reason: '',
                    });
                }}
            >
                <Container>
                    <span className="h4 ml-xl-4">{t("requestForAsPresent")}</span>
                    <Container additionClass="col-6 my-4">
                        <InputText
                            disabled
                            label={t("today")}
                            value={markAsPresentDetails.date}
                            name={"date"}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }}
                        />
                        <InputText
                            label={t("reason")}
                            validator={validateDefault}
                            value={markAsPresentDetails.reason}
                            name={"reason"}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }}
                        />
                    </Container>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => {
                                setMarkAsPresentModel(!markAsPresentModel)
                                setMarkAsPresentDetails({
                                    ...markAsPresentDetails,
                                    reason: '',
                                });
                            }}
                        />
                        <Primary text={t("modify")} onClick={() => onRequestHandler()} />
                    </Container>
                </Container>
            </Modal>
            <Modal showModel={presentModifiedModel} title={t('markAsPresent')}
                toggle={() => setPresentModifiedModel(!presentModifiedModel)} size="modal-sm">
                <Container additionClass={'ml-3'}><span>
                    {t("approver")}
                    {":"}&nbsp;&nbsp;
                    <span className="text-black">{presentModifiedDetails?.approved_by}</span>
                </span>
                    <br />
                    <span>
                        {t("reason")}
                        {":"}&nbsp;&nbsp;
                        <span className="text-black">{presentModifiedDetails?.note}</span>
                    </span>
                </Container>
            </Modal>
        </Container>
    )
}

export default LogView 
