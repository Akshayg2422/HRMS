import { BackArrow, Container, Card, CommonTable, NoRecordFound, Primary } from '@components';
import { goTo, ROUTE, showToast, useNav } from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function BroadCast() {
    const navigation = useNav();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [leaveTypes, setLeaveTypes] = useState('')

    useEffect(() => {
        // fetchLeaveTypes()
    }, [])


    // const fetchLeaveTypes = () => {
    //     const params = {};
    //     dispatch(
    //         getLeaveTypes({
    //             params,
    //             onSuccess: (success: any) => {
    //                 setLeaveTypes(success.leave_types);
    //             },
    //             onError: (error: string) => {
    //                 showToast("error", t("somethingWrong"));
    //             },
    //         })
    //     );
    // };

    const normalizedEmployeeLog = (data: any) => {
        return data.map((el: any) => {
            return {
                "Name": el?.name,
                "No Of Days": el?.allocated_days,
                // "Edit": <><h5 style={{ cursor: 'pointer' }} onClick={() => editOnClick(el)} className='text-primary'>{t('edit')}</h5></>
            };
        });
    };

    const addOnClick = () => {
        // dispatch(getEditLeaveTypesDetails(""));
        goTo(navigation, ROUTE.ROUTE_MANAGE_BROADCAST);
    };

    // const editOnClick = (item: any) => {
    //     dispatch(getEditLeaveTypesDetails(item));
    //     goTo(navigation, ROUTE.ROUTE_MANAGE_LEAVE_TYPES);
    // }

    return (
        <>
            <Container additionClass={"mt-2"}>
                <Card additionClass='mx-3'>
                    <Container additionClass='row'>
                        <Container additionClass="text-right col">
                            <Primary
                                additionClass='col mt-sm-0 mt-3 col-md-2'
                                text={t('addNew')}
                                onClick={() => addOnClick()}
                            />
                        </Container>
                    </Container>
                </Card>
                {leaveTypes && leaveTypes?.length > 0 ? (
                    <CommonTable
                        displayDataSet={normalizedEmployeeLog(leaveTypes)}
                    />
                ) : (
                    <Card additionClass={"mx-3"}><NoRecordFound /></Card>
                )}
            </Container>
        </>
    )
}

export { BroadCast }
