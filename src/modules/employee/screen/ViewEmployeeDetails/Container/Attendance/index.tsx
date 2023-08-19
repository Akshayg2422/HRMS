import { CheckBox, Container, Divider, FormTypography, FormWrapper, ImageView, Modal, NoRecordFound, Primary, ScreenContainer, ScreenTitle, Secondary } from '@components'
import {
    getEmployeeAttendanceInfo, getEmployeeDetails, changeAttendanceSettings,
    postEnableFieldCheckIn,
    postEnableOfficeCheckIn,
} from '../../../../../../store/employee/actions';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN, isHfwsBranch, showToast } from '@utils';
import { Icons } from '@assets';
import { getBranchShifts, getHfwsBranchShift, postEmployeeShiftChange } from "../../../../../../store/shiftManagement/actions";



const AttendanceView = () => {

    const { t } = useTranslation();
    let dispatch = useDispatch();
    const isHfws = localStorage.getItem(DOMAIN);
    const {
        selectedEmployeeId,
        employeeAttendanceInfoDetails
    } = useSelector((state: any) => state.EmployeeReducer);

    const { hierarchicalBranchIds } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const { hfwsBranchShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const [changeShiftModel, setChangeShiftModel] = useState(false);
    const [shiftsList, setShiftList] = useState<any>()
    const [currentEmployeeShiftId, setCurrentEmployeeShiftId] = useState<any>()
    const [defaultShiftId, setDefaultShiftId] = useState<any>()
    const [hfswShiftModel, setHfswShiftModel] = useState(false)



    const [employeeDetails, setEmployeeDetails] = useState({

        attendanceStartTime: "",
        attendanceEndTime: "",
        shift: "",
        faceRegisterEnable: false,
        canFieldCheckIn: false,
        canOfficeCheckIn: false
    });
    const [attendanceSettingsId, setAttendanceSettingsId] = useState('')
    useEffect(() => {
        getEmployeeDetailsAPi()
    }, [])


    const getEmployeeDetailsAPi = () => {
        const params = {
            user_id: selectedEmployeeId,
        };
        dispatch(
            getEmployeeAttendanceInfo({
                params,
                onSuccess: (response: any) => () => {

                    let employeeInitData = employeeDetails;

                    employeeInitData.attendanceStartTime = response?.basic_attendance?.start_time;
                    employeeInitData.attendanceEndTime = response?.basic_attendance?.end_time;
                    employeeInitData.shift = response?.shift_details?.name;


                    employeeInitData.canFieldCheckIn =
                        response?.basic_attendance?.can_field_checkin;


                    employeeInitData.canOfficeCheckIn =
                        response?.basic_attendance?.can_office_checkin;

                    employeeInitData.faceRegisterEnable =
                        response?.basic_attendance?.face_validation_required;
                    setAttendanceSettingsId(response?.basic_attendance?.id)
                    setEmployeeDetails(employeeInitData)
                },
                onError: (error: string) => () => {
                    showToast('error', error)
                },
            })
        );
    };

    const getHfwsBranchShiftDetails = () => {
        const params = {}
        dispatch(getHfwsBranchShift({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
                showToast('error', error)
            },

        }));
    }

    const convertFrom24To12Format = (time24: any) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours = +sHours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    /**
   * Enable office checkIn
   */

    const fieldCheckInHandler = (value: boolean) => {
        const params = {
            can_field_checkin: value,
            id: attendanceSettingsId
        }
        dispatch(postEnableFieldCheckIn({
            params, onSuccess: (success: any) => () => {
                setEmployeeDetails({ ...employeeDetails, canFieldCheckIn: value })
                showToast('success', success.message)
            },
            onError: (error: string) => () => {
                showToast('error', error)
            },
        }))
    }

    const officeCheckInHandler = (value: boolean) => {
        const params = {
            can_office_checkin: value,
            id: attendanceSettingsId
        }
        dispatch(postEnableOfficeCheckIn({
            params, onSuccess: (success: any) => () => {
                setEmployeeDetails({ ...employeeDetails, canOfficeCheckIn: value })
                showToast('success', success.message)

            },
            onError: (error: string) => () => {
                showToast('error', error)
            },
        }))
    }

    const faceValidationHandler = (value: boolean) => {
        const params = {
            face_validation_required: value,
            id: attendanceSettingsId
        }
        dispatch(changeAttendanceSettings({
            params, onSuccess: (success: any) => () => {
                setEmployeeDetails({ ...employeeDetails, faceRegisterEnable: value })
                showToast('success', success.message)
            },
            onError: (error: string) => () => {
                showToast('error', error)
            },
        }))

    }

    const handleChangeShift = () => {
        const params = { branch_id: hierarchicalBranchIds.branch_id }
        dispatch(getBranchShifts({
            params,
            onSuccess: (success: object) => () => {
                designationMatchShifts(employeeAttendanceInfoDetails?.designation_id, success)
                setCurrentEmployeeShiftId(setDefaultShift(employeeAttendanceInfoDetails?.shift_details?.id))
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }));
    }

    const onChangeShift = () => {
        const params = {
            shift_id: currentEmployeeShiftId,
            employee_id: selectedEmployeeId
        }
        dispatch(postEmployeeShiftChange({
            params,
            onSuccess: (success: any) => () => {
                setChangeShiftModel(!changeShiftModel)
                showToast("success", success);
                getEmployeeDetailsAPi()
            },
            onError: (error: string) => () => {
                setChangeShiftModel(!changeShiftModel)
                showToast("error", error);
            },
        }));
    }

    const setDefaultShift = (shiftId: string) => {
        if (!shiftId) {
            return defaultShiftId
        } else {
            return shiftId
        }
    }

    const designationMatchShifts = (id: any, response: any) => {
        let shifts = response && response.length > 0 && response.filter((el: any) => el?.weekly_shift?.designation_id === id)
        setShiftList(shifts)
        setChangeShiftModel(!changeShiftModel)
    }


    // const handleHfswShiftSelect = (item: any, index: number) => {
    //     setHfswSelectedShiftIndex(index)
    //     // setEmployeeDetails({ ...employeeDetails, attendanceStartTime: convertTo24Hour(item.start_time).trim(),attendanceEndTime: convertTo24Hour(item.end_time).trim() });
    //     setHfswShiftModel(!hfswShiftModel)
    //   }


    return (
        <ScreenContainer>
            <FormWrapper hideFooter isTitle >


                <Container additionClass={'d-flex justify-content-between'}>
                    <ScreenTitle title={'Attendance Details'} />
                    {employeeDetails.shift && (
                        <ImageView icon={Icons.Edit} height={20} onClick={() => {
                            handleChangeShift()
                        }} />
                    )}
                </Container>

                {isHfws !== "HFWS" && <Container additionClass="mb-3 mt-4">
                    <CheckBox
                        id={'1'}
                        text={t("enableOfficeCheckIn")}
                        checked={employeeDetails.canOfficeCheckIn}
                        onChange={(e) => {
                            officeCheckInHandler(e.target.checked)
                        }}
                    />
                    <CheckBox
                        id={'2'}
                        text={t('enableFieldCheckIn')}
                        checked={employeeDetails.canFieldCheckIn}
                        onChange={(e) => {
                            fieldCheckInHandler(e.target.checked)
                        }}
                    />
                    <CheckBox
                        id={'3'}
                        text={t('enableFaceValidation')}
                        checked={employeeDetails.faceRegisterEnable}
                        onChange={(e) => {
                            faceValidationHandler(e.target.checked)
                        }}
                    />
                </Container>}

                <Container additionClass={'col-xl-12 row col-sm-3 mb-4'}>
                    {employeeDetails.shift &&
                        <div className="col-xl-6">
                            <FormTypography title={"Shift"} subTitle={employeeDetails.shift} />
                        </div>
                    }
                    {!employeeDetails.shift &&
                        <>
                            <div className="col-xl-6">
                                <FormTypography title={t("startTime")} subTitle={employeeDetails.attendanceStartTime
                                    ? convertFrom24To12Format(employeeDetails.attendanceStartTime)
                                    : "-:-"} />
                            </div>
                            <div className="col-xl-6">
                                <FormTypography title={t("endTime")} subTitle={employeeDetails.attendanceEndTime
                                    ? convertFrom24To12Format(employeeDetails.attendanceEndTime)
                                    : "-:-"} />
                            </div>
                        </>
                    }
                </Container>

            </FormWrapper>

            <Modal showModel={changeShiftModel}
                title={t('shiftGroups')}
                size={"modal-sm"}
                toggle={() => setChangeShiftModel(!changeShiftModel)}>
                <Container style={{ cursor: 'pointer' }}>
                    {shiftsList && shiftsList.length > 0 ? <Container>
                        {shiftsList && shiftsList.length > 0 && shiftsList.map((el: any) => {
                            return (
                                <Container additionClass="p-2 row"
                                    onClick={() => {
                                        setCurrentEmployeeShiftId(el.id)
                                    }}
                                >
                                    <h4 className="col fw-normal">{el.name}</h4>
                                    <td className="col-2" style={{ whiteSpace: "pre-wrap" }}><ImageView icon={el.id === currentEmployeeShiftId ? Icons.TickActive : Icons.TickDefault} /></td>

                                </Container>
                            )
                        })}
                        <Container
                            margin={'m-3'}
                            justifyContent={'justify-content-end'}
                            display={'d-flex'}>
                            <Secondary
                                text={t('cancel')}
                                onClick={() => setChangeShiftModel(!changeShiftModel)}
                            />
                            <Primary
                                text={t('update')}
                                onClick={() => { onChangeShift() }}
                            />
                        </Container>
                    </Container> : <NoRecordFound />}
                </Container>
            </Modal>

        </ScreenContainer>
    )
}

export default AttendanceView 
