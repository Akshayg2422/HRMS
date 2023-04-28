import { BackArrow, Card, CheckBox, Container, DropDown, Input, InputText, Modal, NoRecordFound, Primary, Secondary, useKeyPress } from '@components';
import { dropDownValueCheckByEvent, getWeekAndWeekDaysById, mergeTimeSlots, showToast, Today, validateDefault, WEEK_LIST } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchShifts, getMyShifts, postRequestShiftChange } from '../../../../../store/shiftManagement/actions';
import { EmployeeShiftListing } from '../../../container';


function ShiftMonthlyView() {
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { myShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );
    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const enterPress = useKeyPress("Enter");
    const [myShiftDetails, setMyShiftDetails] = useState<any>()

    const [isActiveWeek, setIsActiveWeek] = useState(1)
    const [changeShiftModel, setChangeShiftModel] = useState(false)
    const [shiftList, setShiftList] = useState()
    const [requestDetails, setRequestDetails] = useState({
        shiftId: '',
        reason: ''
    })
    const [weeklyData, setWeeklyData] = useState<any>()

    const [error, setError] = useState('')

    useEffect(() => {
        getMyShiftsDetails()
    }, [])


    const getMyShiftsDetails = () => {
        const params = {}
        dispatch(getMyShifts({
            params, onSuccess: (success: object) => () => {
                setError('')
                breakTimeConvertion(success)
            },
            onError: (error: string) => () => {
                showToast("error", error);
                setError(error)
            },
        }));
    }

    const getBranchShiftsList = () => {
        const params = { branch_id: dashboardDetails?.company_branch?.id }
        dispatch(getBranchShifts({
            params,
            onSuccess: (success: object) => () => {
                designationMatchShifts(dashboardDetails?.user_details?.designation_id, success)
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }));
    }

    const checkShiftExist = (id: any, response: any) => {
        if (response.length === 1) {
            response.map((el: any) => {
                if (el?.weekly_shift?.designation_id === id) {
                    showToast("info", "No Another Shift To  Change");
                } else {
                    setChangeShiftModel(!changeShiftModel)
                }
            })
        } else {
            setChangeShiftModel(!changeShiftModel)
        }

    }


    const onChangeHandler = (event: any) => {
        setRequestDetails({ ...requestDetails, [event.target.name]: event.target.value });
    };

    const onValidationParams = () => {
        if (!validateDefault(requestDetails.reason).status) {
            showToast("error", t("invalidReason"));
            return false;
        } else if (!requestDetails.shiftId) {
            showToast("error", t("invalidShiftId"));
            return false;
        }
        return true
    }

    const designationMatchShifts = (id: any, response: any) => {
        let shifts = response && response.length > 0 && response.filter((el: any) => el?.weekly_shift?.designation_id === id)
        setShiftList(shifts)
        checkShiftExist(dashboardDetails?.user_details?.designation_id, shifts)
    }

    const onRequestHandler = () => {
        if (onValidationParams()) {
            const params = {
                reason: requestDetails.reason,
                request_shift_id: requestDetails.shiftId
            }
            dispatch(
                postRequestShiftChange({
                    params,
                    onSuccess: (success: any) => () => {
                        showToast('success', success)
                        setChangeShiftModel(!changeShiftModel)
                        setRequestDetails({ ...requestDetails, shiftId: '', reason: '' })
                    },
                    onError: (error: string) => () => {
                        showToast('error', error)
                    },
                })
            );
        }
    }


    const handleClose = () => {
        setRequestDetails({ ...requestDetails, shiftId: '', reason: '' })
        setChangeShiftModel(!changeShiftModel)
    }

    const breakTimeConvertion = (data: any) => {
        let updatedData = [...data.weekly_group_details]
        updatedData = updatedData.map((week: any) => {
            const updateWeek = { ...week }
            updateWeek.week_calendar = updateWeek.week_calendar.map((weekDay: any) => {
                let updateWeek = { ...weekDay }
                updateWeek.time_breakdown = mergeTimeSlots(updateWeek.time_breakdown)
                weekDay = updateWeek
                return weekDay
            });
            return updateWeek
        });
        setWeeklyData(updatedData)
    }

    return (
        <div>
            <Card>
                <Container additionClass='mb-4'>
                    {!error ? <Container additionClass=''>
                        <h2 className={"my-2  col-sm col-md-11 col-xl-4"}>{`${t('myShift')}  (${myShifts?.group_name})`}</h2>
                        <Container additionClass="text-right">
                            <Primary
                                text={t("requestForShift")}
                                onClick={() => getBranchShiftsList()}
                                col={"col-xl-3"}
                                size={"btn-md"}
                                additionClass={"mt-sm-0 mt-2"}
                            />
                        </Container>
                    </Container> : <div className="text-muted text-center"><small>{error}</small></div>}
                </Container>
            </Card>
            {myShifts && myShifts?.weekly_group_details?.length > 0 ? <Card>
                <ul
                    className="nav nav-pills nav-fill flex-row flex-md-row"
                    id="tabs-icons-text"
                    role="tablist"
                >
                    {myShifts && myShifts?.weekly_group_details.length > 0 && myShifts?.weekly_group_details.map((it: any, index: number) => {
                        return (
                            <>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link  ml-0 ml-sm-2 align-content-center justify-content-center  ${it?.week === isActiveWeek ? 'active' : ''}`}
                                        id={`tabs-icons-text-${it?.week}-tab`}
                                        data-toggle="tab"
                                        role="tab"
                                        aria-controls={`tabs-icons-text-${it?.week}`}
                                        aria-selected="true"
                                        onClick={() => {
                                            setIsActiveWeek(it?.week)
                                        }}
                                    >
                                        {getWeekAndWeekDaysById(WEEK_LIST, 'id', it?.week + '')?.name}
                                    </a>
                                </li>
                            </>
                        );
                    })}
                </ul>
                {weeklyData && weeklyData.length > 0 &&
                    <EmployeeShiftListing datesList={weeklyData[isActiveWeek - 1]} />
                }
            </Card> : <NoRecordFound />}
            <Modal title={t("changeShift")} showModel={changeShiftModel} toggle={() => handleClose()}>
                <Container >
                    <Container
                        col={"col-xl-5 col-md-6 col-sm-12"}
                        additionClass={"xl-4"}
                    >
                        <DropDown
                            label={t('selectShift')}
                            placeholder={t('selectShift')}
                            data={shiftList}
                            value={requestDetails?.shiftId}
                            name={"shiftId"}
                            onChange={(event) => {
                                onChangeHandler(dropDownValueCheckByEvent(event, t('selectShift')))
                            }}
                        />
                    </Container>
                    <Container
                        col={"col-xl-5 col-md-6 col-sm-12"}
                        additionClass={"xl-4"}
                    >
                        <InputText
                            label={t("reason")}
                            validator={validateDefault}
                            value={requestDetails.reason}
                            name={"reason"}
                            onChange={(event) => {
                                onChangeHandler(event);
                            }}
                        />
                    </Container>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => handleClose()}
                        />
                        <Primary
                            text={t("request")}
                            onClick={() => onRequestHandler()}
                        />
                    </Container>
                </Container>
            </Modal>
        </div>

    )
}

export { ShiftMonthlyView }
