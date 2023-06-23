import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, TableWrapper, ImageView } from '@components';
import { getEditLeaveTypesDetails, getLeaveFromDate, getLeaveTypes, getLeaveTypesDetails, updateLeaveType } from '../../../../store/employee/actions';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Icons } from '@assets';

function LeaveTypes() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')


    const { userDetails } = useSelector(
        (state: any) => state.AuthReducer
    );

    useEffect(() => {
        fetchLeaveTypes()
    }, [])


    const fetchLeaveTypes = () => {
        const params = {};
        dispatch(
            getLeaveTypes({
                params,
                onSuccess: (success: any) => () => {
                    setLeaveTypes(success.leave_types);
                },
                onError: (error: string) => () => {
                    showToast("error", t("somethingWrong"));
                },
            })
        );
    };

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                "Name": el?.name,
                "No Of Days": el?.allocated_days,
                "Active": <> <ImageView icon={el?.is_active ? Icons.TickActive : Icons.TickDefault} onClick={() => { changeStatus(el) }} /></>,
                "Edit": el?.is_active ? <><h5 style={{ cursor: 'pointer' }} onClick={() => editOnClick(el)} className='text-primary'>{t('edit')}</h5></> : '-',
            };
        });
    };

    const addOnClick = () => {
        dispatch(getEditLeaveTypesDetails(""));
        goTo(navigation, ROUTE.ROUTE_MANAGE_LEAVE_TYPES);
    };

    const editOnClick = (item: any) => {
        dispatch(getEditLeaveTypesDetails(item));
        goTo(navigation, ROUTE.ROUTE_MANAGE_LEAVE_TYPES);
    }



    const changeStatus = (data: any) => {
        const params = {
            name: data?.name,
            allocated_days: data?.allocated_days,
            id: data.id,
            max_days_per_month: data?.max_days_per_month,
            max_days_per_week: data?.max_days_per_week,
            is_active: data?.is_active ? false : true
        }
        dispatch(
            updateLeaveType({
                params,
                onSuccess: (success: any) => () => {
                    showToast("success", success?.status);
                    fetchLeaveTypes()
                },
                onError: (error: string) => () => {
                    showToast("error", error);
                },
            })
        );
    }

    // editLeaveTypesDetails

    // getEditLeaveTypesDetails

    const memoizedTable = useMemo(() => {
        return <>
            {leaveTypes && leaveTypes.length > 0 ? (
                <CommonTable
                    noHeader
                    card={false}
                    isPagination
                    displayDataSet={normalizedEmployeeLog(leaveTypes)}
                />
            ) : <NoRecordFound />}
        </>
    }, [leaveTypes])

    return (
        <TableWrapper title={t('leaveTypes')} buttonChildren={
            // userDetails?.is_admin &&
            <Container additionClass={" d-flex justify-content-end mr-xl-2"}>
                <Primary size={'btn-sm'} text={'Add'} additionClass={''} onClick={(e: { stopPropagation: () => void; }) => {
                    e.stopPropagation();
                    addOnClick()
                }} />

            </Container>
        }>

            <Container additionClass={"mt-2"}>
                {
                    memoizedTable
                }
            </Container>
        </TableWrapper>
    )
}


export default LeaveTypes
