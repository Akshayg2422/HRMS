import { BackArrow, Card, CheckBox, Container, DropDown, ImageView, Input, InputText, Modal, NoRecordFound, Primary, Secondary, useKeyPress } from '@components';
import { dropDownValueCheckByEvent, formatAMPM, getWeekAndWeekDaysById, mergeTimeSlots, ROUTE, showToast, useNav, validateDefault, WEEK_LIST } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchShifts, getMyShifts, postRequestShiftChange } from '../../../../../store/shiftManagement/actions';
import { EmployeeShiftListing } from '../../../container';


function ShiftDetailsPerDay() {
    let dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNav();

    // const { myShifts } = useSelector(
    //     (state: any) => state.ShiftManagementReducer
    // );
    const [shiftData, setShiftData] = useState<any>([])

    useEffect(() => {
        getMyShiftsDetails()
    }, [])


    const getMyShiftsDetails = () => {
        const params = {}
        dispatch(getMyShifts({
            params, onSuccess: (success: any) => () => {
                setShiftData(success)
            },
            onError: (error: string) => () => {
                showToast("error", error);
            },
        }));
    }

    function getWeekNumber(date: any) {
        const firstDayOfYear: any = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }


    function getCurrentMonthDates() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1);
        const firstWeekOfMonth = getWeekNumber(firstDayOfMonth);

        const dates:any = [];
        for (let i = 1; i <= numDays; i++) {
            const date = new Date(year, month, i);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const weekNumber = getWeekNumber(date) - firstWeekOfMonth + 1;
            const weekdayNumber = date.getDay();
            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
            dates.push({
                date: formattedDate,
                day: dayOfWeek,
                week: weekNumber,
                week_day: weekdayNumber === 0 ? 7 : weekdayNumber,
            });
        }
        return dates;
    }

    const filteredDetails = () => {
        let matchedData: any = []
        shiftData && Object.keys(shiftData).length > 0 && shiftData?.weekly_group_details.forEach((item: { week: any; week_calendar: any[]; }) => {
            getCurrentMonthDates().forEach((el: any) => {
                if (item.week === el.week) {
                    item?.week_calendar.forEach((element: any) => {
                        if (element.week_day === el.week_day) {
                            matchedData = [...matchedData, { time: element.time_breakdown, date: el.date, day: el.day }]
                        }
                    })
                }
            })
        });
        return matchedData

    }


    function convertFirstThreeToUpperCase(str: string) {
        if (str.length <= 3) {
            return str.toUpperCase();
        } else {
            return str.substring(0, 3).toUpperCase()
        }
    }


    return (
        <div className='mx-3'>
            <Card>
                <div className='mb-4'>
                    <div >
                        <h2 className={"my-2  col-sm col-md-11 col-xl-4"}>{`${t('myShift')}`}</h2>
                        {filteredDetails() && filteredDetails().length > 0 && <div className="row m-0 d-flex justify-content-end">
                            <Primary
                                text={'Detailed View'}
                                onClick={() => { navigate(ROUTE.ROUTE_MY_SHIFTS_DETAILS_MONTHLY) }}
                                size={"btn-md"}
                                additionClass={"mt-sm-0 mt-2"}
                            />
                        </div>}
                    </div>
                </div>
            </Card>

            <Container additionClass={'row'} margin={"mt-3"}>
                {filteredDetails() && filteredDetails().length > 0 ? filteredDetails().map((it: any) => {
                    return (
                        <Container additionClass={"col-xl-3 col-md-6"}>
                            <Card style={{ height: '25vh' }}
                            >
                                <Container additionClass={"d-flex justify-content-between"} >
                                    <Container>
                                        <div className="h4">
                                            {it.date}
                                        </div>
                                    </Container>
                                    <Container additionClass='d-flex justify-content-between'>
                                        <p className='fw-normal'>
                                            {convertFirstThreeToUpperCase(it.day)}
                                        </p>
                                    </Container>
                                </Container>
                                <Container additionClass='py-3'>
                                    {it.time && it.time.length > 0 ? mergeTimeSlots(it.time).map((el: any) => {
                                        return (
                                            <Container>
                                                {el.start_time && el.end_time ? <span>{`${formatAMPM(el.start_time)} - ${formatAMPM(el.end_time)}`}</span> : ''}
                                            </Container>
                                        )
                                    }) : 'Not Working'}
                                </Container>
                            </Card>
                        </Container>
                    );
                }) : <Container additionClass='col'><NoRecordFound /></Container>}
            </Container>
        </div >

    )
}

export { ShiftDetailsPerDay }
