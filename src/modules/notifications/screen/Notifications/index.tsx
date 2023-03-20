import { BackArrow, Card, CommonTable, Container, ImageView, NoRecordFound, Pagination } from '@components';
import { Icons } from '@assets';
import { getDisplayDateTimeFromMoment, getMomentObjFromServer, goTo, ROUTE, showToast, useNav } from '@utils';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    getNotifications
} from "../../../../../src/store/notifications/actions";

function Notifications() {
    const dispatch = useDispatch()
    const navigate = useNav();

    const { currentPage, numOfPages, notificationsDataList } = useSelector(
        (state: any) => state.NotificationReducer
    );

    const NOTIFICATION_ITEMS = [{ id: '1', name: 'Leave Request', value: 'LR', image: Icons.LeaveRequest, type: 'EmployeeLeaves' },
    { id: '2', name: 'Attendance Request', value: 'AR', image: Icons.AttendanceRequest, type: 'ModifyLogs' },
    { id: '3', name: 'Face re-Register', value: 'FR', image: Icons.FaceRegister, type: 'FaceReRegister' },
    { id: '4', name: 'Shift Change', value: 'SC', image: Icons.ShiftRequest, type: 'ShiftRequest' }]

    const ROUTE_PATH = [{ route: ROUTE.ROUTE_LEAVE_REQUEST, type: 'EmployeeLeaves' },
    { route: ROUTE.ROUTE_MODIFY_LOGS, type: 'ModifyLogs' },
    { route: ROUTE.ROUTE_FACE_RE_REQUEST, type: 'FaceReRegister' },
    { route: ROUTE.ROUTE_SHIFT_REQUEST, type: 'ShiftRequest' }]
    
    const ROUTE_TYPE_BROADCAST_MESSAGE = 'BROADCAST_MESSAGE';
    const ROUTE_TYPE_LEAVE_REQUEST = 'LEAVE_REQUEST';
    const ROUTE_TYPE_LEAVE_RESPONSE = 'LEAVE_RESPONSE';
    const ROUTE_TYPE_SHIFT_REQUEST = 'SHIFT_REQUEST';
    const ROUTE_TYPE_SHIFT_RESPONSE = 'SHIFT_RESPONSE';
    const ROUTE_TYPE_FACE_RR_REQUEST = 'FACE_RR_REQUEST';
    const ROUTE_TYPE_MODIFY_LOG_REQUEST = 'MODIFY_LOG_REQUEST';
    const ROUTE_TYPE_NO_ACTION = 'NO_ACTION';

    const handleRoute = (item: any) => {
        ROUTE_PATH.map((el: any) => {
            if (el.type === item.type) {
                navigate(el.route);
            }
        })
    }

    useEffect(() => {
        getBroadcastMessagesList(currentPage)
    }, [])


    const getBroadcastMessagesList = (pageNumber: number) => {

        const params = {
            page_number: pageNumber,
        };
        dispatch(getNotifications({
            params,
            onSuccess: (success: any) => {
            },
            onError: (error: string) => {
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
        getBroadcastMessagesList(page);
    }

    return (
        <>
        <div className='ml-3 mb-3'>
            <BackArrow />
        </div>
        <Container additionClass={" mx-1"}>
            {notificationsDataList && notificationsDataList?.length > 0 ? notificationsDataList?.map((el: any) => {
                return (
                    <Container additionClass={"col"}>
                        <Card>
                            <Container additionClass={"d-flex justify-content-between"} >
                                <Container>
                                    <div className="h1">
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
                                            {getDisplayDateTimeFromMoment(
                                                getMomentObjFromServer(el.created_at)
                                            )}
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
