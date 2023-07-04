import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary } from '@components';
import { getEmployeeBranchLeaveType, getLeaveFromDate, getLeaveTypes, getLeaveTypesDetails } from '../../../../store/employee/actions';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

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
            getEmployeeBranchLeaveType({
                params,
                onSuccess: (success: any) => () => {
                    setLeaveTypes(success?.details?.leave_types);
                },
                onError: (error: string) => () => {
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

    const memoizedTable = useMemo(() => {
        return <>
            {leaveTypes && leaveTypes.length > 0 ? (
                <CommonTable
                    // noHeader
                    title={t("AvailableLeaves")}
                    displayDataSet={normalizedEmployeeLog(leaveTypes)}

                // tableOnClick={(e, index, item) => {
                //   const selectedId = registeredEmployeesList[index].id;
                //   dispatch(getSelectedEmployeeId(selectedId));
                //   goTo(navigation, ROUTE.ROUTE_VIEW_EMPLOYEE_DETAILS);
                // }}
                />
            ) : <NoRecordFound />}
        </>
    }, [leaveTypes])


    return (
        <>
            <Container additionClass={"mt-5 main-contain mx-3"}>
                <Container additionClass='mt-5'>
                    {
                        memoizedTable
                    }
                </Container>
            </Container>
        </>
    )
}

export default AvailableLeaves
