import { BackArrow, Card, CommonTable, Container, ImageView, NoRecordFound, Pagination } from '@components';
import { Icons } from '@assets';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, getTimelineRelativeTimeFormat, goTo, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    clearNotificationCount,
    getNotifications, setIsShowBack, setNotificationCount
} from "../../../../../src/store/notifications/actions";

function Notifications() {
    const dispatch = useDispatch()
    const navigation = useNav();

    const { currentPage, numOfPages, notificationsDataList, isShowBack, NotificationCount } = useSelector(
        (state: any) => state.NotificationReducer
    );


    const NOTI_TYPE_BROADCAST_MESSAGE = 'BROADCAST_MESSAGE'
    const NOTI_TYPE_LEAVE_REQUEST = 'LEAVE_REQUEST'
    const NOTI_TYPE_LEAVE_REQUEST_AD = 'LEAVE_REQUEST_AD'
    const NOTI_TYPE_SHIFT_REQUEST = 'SHIFT_REQUEST'
    const NOTI_TYPE_SHIFT_REQUEST_AD = 'SHIFT_REQUEST_AD'
    // const NOTI_TYPE_FACE_RR_REQUEST = 'FACE_RR_REQUEST'
    const NOTI_TYPE_FACE_APPROVAL_REQUEST_AD = 'FACE_APPROVAL_REQUEST_AD'
    const NOTI_TYPE_FACE_RR_REQUEST_AD = 'FACE_RR_REQUEST_AD'
    // const NOTI_TYPE_MODIFY_LOG_REQUEST = 'MODIFY_LOG_REQUEST'
    const NOTI_TYPE_MODIFY_LOG_REQUEST_AD = 'MODIFY_LOG_REQUEST_AD'
    const NOTI_TYPE_MY_SHIFTS = 'MY_SHIFTS'
    const NOTI_TYPE_NO_ACTION = 'NO_ACTION'


    const handleRoute = (item: any) => {
        if (item?.extra?.route_type === NOTI_TYPE_BROADCAST_MESSAGE) {
            goTo(navigation, ROUTE.ROUTE_MY_NOTIFICATION);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_LEAVE_REQUEST) {
            goTo(navigation, ROUTE.ROUTE_MY_LEAVES);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_LEAVE_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_SHIFT_REQUEST) {
            goTo(navigation, ROUTE.ROUTE_EMPLOYEE_SHIFT_REQUEST);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_SHIFT_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_SHIFT_REQUEST);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_FACE_RR_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_FACE_RE_REGISTER_REQUEST);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_FACE_APPROVAL_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_FACE_RE_REQUEST);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_MODIFY_LOG_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_MODIFY_LOGS);
        }
        else if (item?.extra?.route_type === NOTI_TYPE_MY_SHIFTS) {
            goTo(navigation, ROUTE.ROUTE_MY_SHIFTS_DETAILS_MONTHLY);
        }
        else {
            // goTo(navigation, ROUTE.ROUTE_MY_NOTIFICATION);
        }
    }

    // useEffect(() => {
    //     getNotificationsList(currentPage)
    // }, [])

    useEffect(() => {
        dispatch(clearNotificationCount())
        getNotificationsList(currentPage)
        return () => {
            dispatch(setIsShowBack(false))
        }
    }, [NotificationCount > 0])

    const getNotificationsList = (pageNumber: number) => {
        const params = {
            page_number: pageNumber,
        };
        dispatch(getNotifications({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
                showToast("error", error)
            },
        }));
    };

    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getNotificationsList(page);
    }

    return (
        <>
            <div className='ml-3 mb-3'>
            </div>
            <Container additionClass={" mx-1"}>
                {notificationsDataList && notificationsDataList?.length > 0 ? notificationsDataList?.map((el: any) => {
                    return (
                        <Container additionClass={"col"}>
                            <Card
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleRoute(el)
                                }}>
                                <Container additionClass={"d-flex justify-content-between"} >
                                    <Container>
                                        <div className="h2">
                                            {el.title}
                                        </div>
                                    </Container>
                                    <Container additionClass='d-flex justify-content-between'>
                                        <Container>
                                            <span className='h6 float-right'>
                                                {'Posted at'}
                                            </span>
                                            <br />
                                            <span className='h5 float-right mt--2'>
                                                {getTimelineRelativeTimeFormat(el.created_at)}
                                            </span>
                                        </Container>
                                    </Container>
                                </Container>
                                <Container additionClass={'h4 fw-normal'}>
                                    {el.message}
                                </Container>
                            </Card>
                        </Container>
                    );
                }) : <NoRecordFound />}
                {notificationsDataList && notificationsDataList.length > 0 && (
                    <Pagination currentPage={currentPage}
                        // additionalClass={'card-footer'}
                        noOfPage={numOfPages}
                        totalPages={numOfPages}
                        paginationNumberClick={(currentPage: number | undefined) => {
                            paginationHandler("current", currentPage);
                        }}
                        previousClick={() => paginationHandler("prev")}
                        nextClick={() => paginationHandler("next")}
                    />
                )}
            </Container>

        </>
    )
}

export { Notifications }
