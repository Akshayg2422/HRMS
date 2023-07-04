import { Card, CommonTable, Container, ImageView, Modal, NoRecordFound, Primary, Secondary } from '@components';
import { CompanyBaseWeeklyCalendar, setCompanyBaseWeeklyCalendar } from '../../../../store/employee/actions';
import { showToast, useNav } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Icons } from '@assets';

function WeeklyCalendar() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [weekDays, setWeeKDays] = useState([])
    const [editModel, setEditModel] = useState(false)
    const [disableDay, setDisableDay] = useState<any>()
    const [weeklyArray, setWeeklyArray] = useState<any>()
    const [modelMessage, setModelMessage] = useState<any>('')



    useEffect(() => {
        fetchCompanyBaseWeeklyCalendarDetails()
    }, [])

    const fetchCompanyBaseWeeklyCalendarDetails = () => {
        const params = {};
        dispatch(
            CompanyBaseWeeklyCalendar({
                params,
                onSuccess: (success: any) => () => {
                    weeklyCalendarList(success?.status?.week_calendar)
                    setWeeklyArray(success?.status?.week_calendar)
                },
                onError: (error: string) => () => {
                },
            })
        );
    };

    const weeklyCalendarList = (calendar: any) => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const calendarObjects = calendar.map((value: number, index: any) => {
            const dayOfWeek = daysOfWeek[index];
            const isEnable = value === 1 ? true : false;
            return { day: dayOfWeek, isEnable: isEnable };
        });
        setWeeKDays(calendarObjects)
    }

    const normalizedAllowanceList = (data: any) => {
        return data.map((el: any, index: number) => {
            return {
                Days: el.day,
                is_Working: <ImageView icon={el.isEnable ? Icons.TickActive : Icons.Remove} onClick={() => {
                    setEditModel(!editModel)
                    setDisableDay(index)
                    setModelMessage(`Mark ${el.day} As ${el.isEnable ? 'Off' : 'Working'}`)
                }} />
            };
        });
    }

    const handleSubmit = () => {
        let editedParams: any = [...weeklyArray]
        if (disableDay !== -1) {
            editedParams[disableDay] = editedParams[disableDay] === 0 ? 1 : 0
        }
        const params = {
            week_calendar: editedParams
        }
        dispatch(
            setCompanyBaseWeeklyCalendar({
                params,
                onSuccess: (success: any) => () => {
                    setEditModel(!editModel)
                    fetchCompanyBaseWeeklyCalendarDetails()
                    showToast('success',success?.message)
                },
                onError: (error: string) => () => {
                },
            })
        );
    }


    return (
        <>
            <Card >
                {weekDays && weekDays.length > 0 ?
                    <CommonTable
                        card={false}
                        displayDataSet={normalizedAllowanceList(weekDays)}
                    />
                    : <NoRecordFound />
                }
            </Card>
            <Modal
                showModel={editModel}
                size='modal-sm'
                toggle={() => setEditModel(!editModel)}
            >
                <Container>
                    <span className="h4 ml-xl-4">{modelMessage}</span>
                    <Container margin={"mt-5"} additionClass={"text-right"}>
                        <Secondary
                            text={t("cancel")}
                            onClick={() => setEditModel(!editModel)}
                        />
                        <Primary
                            text={t("confirm")}
                            onClick={() => handleSubmit()}
                        />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export default WeeklyCalendar
