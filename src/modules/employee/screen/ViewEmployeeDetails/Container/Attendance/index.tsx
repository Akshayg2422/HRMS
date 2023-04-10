import { Container, Divider, FormTypography, FormWrapper, ScreenContainer, ScreenTitle } from '@components'
import { getEmployeeAttendanceInfo, getEmployeeDetails } from '../../../../../../store/employee/actions';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@utils';

const AttendanceView = () => {

    const { t } = useTranslation();
    let dispatch = useDispatch();

    const {
        selectedEmployeeId,
    } = useSelector((state: any) => state.EmployeeReducer);

    const [employeeDetails, setEmployeeDetails] = useState({

        attendanceStartTime: "",
        attendanceEndTime: "",
        shift: "",

    });

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

                    employeeInitData.attendanceStartTime = response.basic_attendance?.start_time;
                    employeeInitData.attendanceEndTime = response.basic_attendance?.end_time;
                    employeeInitData.shift = response.shift_details?.name;
                    setEmployeeDetails(employeeInitData)
                },
                onError: (error: string) => () => {
                    showToast('error', error)
                },
            })
        );
    };

    const convertFrom24To12Format = (time24: any) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours = +sHours % 12 || 12;
        return `${hours}:${minutes} ${period}`;
    }

    return (
        <ScreenContainer>
            <FormWrapper hideFooter isTitle>
                <ScreenTitle title={'Attendance Details'} />

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
        </ScreenContainer>
    )
}

export default AttendanceView 
