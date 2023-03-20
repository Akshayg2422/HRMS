import { Card, CommonTable, Container, ImageView } from '@components';
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

function Notifications() {
    const dispatch = useDispatch()
    const navigate = useNav();

    const NOTIFICATION_ITEMS = [{ id: '1', name: 'Leave Request', value: 'LR', image: Icons.LeaveRequest, type: 'EmployeeLeaves' },
    { id: '2', name: 'Attendance Request', value: 'AR', image: Icons.AttendanceRequest, type: 'ModifyLogs' },
    { id: '3', name: 'Face re-Register', value: 'FR', image: Icons.FaceRegister, type: 'FaceReRegister' },
    { id: '4', name: 'Shift Change', value: 'SC', image: Icons.ShiftRequest, type: 'ShiftRequest' }]

    const ROUTE_PATH = [{ route: ROUTE.ROUTE_LEAVE_REQUEST, type: 'EmployeeLeaves' },
    { route: ROUTE.ROUTE_MODIFY_LOGS, type: 'ModifyLogs' },
    { route: ROUTE.ROUTE_FACE_RE_REQUEST, type: 'FaceReRegister' },
    { route: ROUTE.ROUTE_SHIFT_REQUEST, type: 'ShiftRequest' }]

    const normalizedNotificationList = (data: any) => {
        return (
            data &&
            data.length > 0 &&
            data.map((el: any) => {
                return {
                    "Type": el.name
                };
            })
        );
    };

    const handleRoute = (item: any) => {
        ROUTE_PATH.map((el: any) => {
            if (el.type === item.type) {
                navigate(el.route);
            }
        })
    }

    return (
        <Container>
            {/* {NOTIFICATION_ITEMS.map((it, index) => {
                return (
                    <>
                         <Container additionClass={"col-xl-3 col-md-6"}>
                            <Card
                                additionClass={"border"}
                                style={{ border: "1px bg-gray" }}
                                onClick={() => currentNav(it, index)}
                            >
                                <Container
                                    additionClass={"row py-3"}
                                    justifyContent={"justify-content-center"}
                                >
                                    <Container col={"col-auto"} alignItems={"align-items-center"}>
                                        <ImageView additionClass={'m-0'} icon={it?.image} alt={it.name} height={50} width={50} />
                                    </Container>
                                    <div className="col">
                                        <h5 className="text-black h4 mb-0 mt-2 font-weight-bold">
                                            {it.name}
                                        </h5>
                                    </div>
                                </Container>
                            </Card>
                        </Container>
                    </>
                );
            })} */}
            <CommonTable
                displayDataSet={normalizedNotificationList(NOTIFICATION_ITEMS)}
                tableOnClick={(e, index, item) => {
                    const current = NOTIFICATION_ITEMS[index]
                    handleRoute(current)
                }}
            />
        </Container >
    )
}

export { Notifications }
