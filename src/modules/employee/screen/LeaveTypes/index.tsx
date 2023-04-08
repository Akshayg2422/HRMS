import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary, TableWrapper } from '@components';
import { getEditLeaveTypesDetails, getLeaveFromDate, getLeaveTypes, getLeaveTypesDetails } from '../../../../store/employee/actions';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

function LeaveTypes() {
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
                "Edit": <><h5 style={{ cursor: 'pointer' }} onClick={() => editOnClick(el)} className='text-primary'>{t('edit')}</h5></>
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
        <TableWrapper>
            <Container additionClass={"mt-2"}>
                <div className='mx-3'>
                    <Container additionClass='row'>
                        <h2 className={"col-xl-3  mt--4 mb-4 "}>{t('leaveTypes')}</h2>
                        {/* <Container additionClass="text-right col">
                            <Primary
                                additionClass='col mt-sm-0 mt-3 col-md-2'
                                text={t('addNew')}
                                onClick={() => addOnClick()}
                            />
                        </Container> */}
                    </Container>
                </div>
                {
                    memoizedTable
                }
            </Container>
        </TableWrapper>
    )
}


export default LeaveTypes
