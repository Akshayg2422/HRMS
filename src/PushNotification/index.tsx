import { ImageView } from '@components';
import { goTo, ROUTE, useNav } from '@utils';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import GetToken from './GetToken';
import { onMessageListener } from './OnMessaging';
import { Icons } from '@assets';

const MAX_LENGTH = 70

const PushNotification = () => {
    const navigation = useNav();
    const [notification, setNotification] = useState<any>([]);

    const notify = () => {
        notification.forEach((message: any) => {
            toast(<ToastDisplay data={message} />, {
                position: 'top-right', duration: 3000,
            });
        });
    };


    function ToastDisplay({ data }: any) {
        const MAX_LENGTH = 50;

        const bodyContent = data?.body?.length <= MAX_LENGTH
            ? data?.body
            : data?.body?.slice(0, MAX_LENGTH) + '...';

        return (
            <div onClick={() => {
                goTo(navigation, data?.route);
            }}>
                <p><b>{data?.title}</b></p>
                <div className='d-flex justify-content-center align-items-center'>
                    {data.icon && <div>
                        <ImageView
                            icon={data.icon}
                            style={{ height: '50px', width: '50px', borderRadius: "5px" }}
                        />
                    </div>}
                    <div className={data.icon ? 'ml-3' : ''}>{bodyContent}</div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (notification && notification.length > 0) {
            notify()
        }
    }, [notification])

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

    const routingHandler = (payload: any) => {

        const route_type = JSON.parse( payload?.data?.extra_data.replace(/'/g, '"')).route_type

        if (route_type === NOTI_TYPE_BROADCAST_MESSAGE) {
            goTo(navigation, ROUTE.ROUTE_MY_NOTIFICATION);
        }
        else if (route_type === NOTI_TYPE_LEAVE_REQUEST) {
            goTo(navigation, ROUTE.ROUTE_MY_LEAVES);
        }
        else if (route_type === NOTI_TYPE_LEAVE_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_LEAVE_REQUEST);
        }
        else if (route_type === NOTI_TYPE_SHIFT_REQUEST) {
            goTo(navigation, ROUTE.ROUTE_EMPLOYEE_SHIFT_REQUEST);
        }
        else if (route_type === NOTI_TYPE_SHIFT_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_SHIFT_REQUEST);
        }
        else if (route_type === NOTI_TYPE_FACE_RR_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_FACE_RE_REGISTER_REQUEST);
        }
        else if (route_type === NOTI_TYPE_FACE_APPROVAL_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_FACE_RE_REQUEST);
        }
        else if (route_type === NOTI_TYPE_MODIFY_LOG_REQUEST_AD) {
            goTo(navigation, ROUTE.ROUTE_MODIFY_LOGS);
        }
        else if (route_type === NOTI_TYPE_MY_SHIFTS) {
            goTo(navigation, ROUTE.ROUTE_MY_SHIFTS_DETAILS);
        }
        else {
            // goTo(navigation, ROUTE.ROUTE_MY_NOTIFICATION);
        }
        
    }


    onMessageListener()
        .then((payload: any) => {
            console.log("foreground message",payload);
            
            const title = payload?.data?.title;
            const options = {
                body: payload?.data?.message,
                icon: Icons.LogoSmall
            };
            new Notification(title, options).addEventListener('click', function () {
                routingHandler(payload)
            });
        })
        .catch((err: any) => console.log('failed: ', err));

    return (
        <>
            {/* <Toaster /> */}
            <GetToken />
        </>
    )
}

export { PushNotification }