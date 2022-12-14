import { BackArrow, Card, CheckBox, Container, Input, InputText, NoRecordFound } from '@components';
import { WeekDaysList } from '../../../shiftManagement/container';
import { getWeekAndWeekDaysById, WEEK_LIST } from '@utils';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getMyShifts } from '../../../../store/shiftManagement/actions';
import { EmployeeShiftListing } from '../../container';


function MyShiftDetails() {
    let dispatch = useDispatch();
    const { t } = useTranslation();

    const { myShifts } = useSelector(
        (state: any) => state.ShiftManagementReducer
    );

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [isActiveWeek, setIsActiveWeek] = useState(1)

    useEffect(() => {
        getMyShiftsDetails()
    }, [])

    const getMyShiftsDetails = () => {
        const params = {
            // employee_id: 'cb624abe-062a-40b5-afa0-e5086646be76'
        }
        dispatch(getMyShifts({ params }));
    }


    return (
        <div>
            <Card>
                <Container additionClass='row mb-4'>
                    <BackArrow additionClass={"my-2 col-sm col-xl-1"} />
                    <h2 className={"my-2 ml-xl--5 col-sm col-md-11 col-xl-4"}>{t('myShift')}</h2>
                </Container>
                <Container col={"col-xl-3 col-md-6 col-sm-12 ml--2"}>
                    <InputText
                        label={t("shifts")}
                        value={myShifts?.group_name}
                        disabled
                    />
                </Container>
            </Card>
            {Object.keys(myShifts).length > 0 ? <Card>
                <ul
                    className="nav nav-pills nav-fill flex-row flex-md-row"
                    id="tabs-icons-text"
                    role="tablist"
                >
                    {myShifts && myShifts.weekly_group_details.length > 0 && myShifts.weekly_group_details.map((it: any, index: number) => {
                        return (
                            <>
                                <li className="nav-item">
                                    <a
                                        className={`nav-link  ml-0 ml-sm-2 align-content-center justify-content-center  ${it.week === isActiveWeek ? 'active' : ''}`}
                                        id={`tabs-icons-text-${it.week}-tab`}
                                        data-toggle="tab"
                                        href={`#tabs-icons-text-${it.week}`}
                                        role="tab"
                                        aria-controls={`tabs-icons-text-${it.week}`}
                                        aria-selected="true"
                                        onClick={() => {
                                            setIsActiveWeek(it.week)
                                        }}
                                    >
                                        {getWeekAndWeekDaysById(WEEK_LIST, 'id', it.week + '').name}
                                    </a>
                                </li>
                            </>
                        );
                    })}
                </ul>
                <EmployeeShiftListing datesList={myShifts.weekly_group_details[isActiveWeek - 1]} />
            </Card> : <NoRecordFound />}

        </div>
    )
}

export default MyShiftDetails
