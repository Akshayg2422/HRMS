import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary } from '@components';
import { getLeaveFromDate, getLeaveTypes, getLeaveTypesDetails } from '../../../../store/employee/actions';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function AvailableLeaves() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')

    useEffect(() => {
        fetchLeaveTypes()
    }, [])


    const fetchLeaveTypes = () => {
        const params = {};
        dispatch(
            getLeaveTypes({
                params,
                onSuccess: (success: any) => {
                    setLeaveTypes(success.leave_types);
                },
                onError: (error: string) => {
                    showToast("error", error);
                },
            })
        );
    };

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                "Name": el?.name,
                "Allocated Days": el?.allocated_days,
                "Available Days": el?.available_days,
                "Apply": <><Primary text={t("applyLeave")} size={'btn-sm'} disabled={el?.available_days <= 0 ? true : false} onClick={() => {
                    handleApplyLeave(el)
                }} /></>
            };
        });
    };

    const handleApplyLeave = (item: any) => {
        dispatch(getLeaveFromDate(""));
        dispatch(getLeaveTypesDetails(item));
        goTo(navigation, ROUTE.ROUTE_APPLY_LEAVE);
    };


    return (
        <>
            <Container additionClass={"mt-5 main-contain"}>
                <BackArrow additionClass='ml-3' />
                <Container additionClass='mt-5'>
                    {leaveTypes && leaveTypes?.length > 0 ? (
                        <CommonTable
                            tableTitle={t("AvailableLeaves")}
                            displayDataSet={normalizedEmployeeLog(leaveTypes)}
                        />
                    ) : (
                        <NoRecordFound />
                    )}
                </Container>
            </Container>
        </>
    )
}

export default AvailableLeaves
