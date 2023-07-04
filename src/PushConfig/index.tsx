import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './Firebase';
import { Icons } from '@assets';
import { goTo, ROUTE, useNav } from '@utils';


const PushConfig = () => {

    const navigation = useNav();

    const [notification, setNotification] = useState({ title: '', body: '' });
    const notify = () => toast(<ToastDisplay />);
    function ToastDisplay() {
        return (
            <div >
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    requestForToken();


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
            goTo(navigation, ROUTE.ROUTE_MY_SHIFTS_DETAILS_MONTHLY);
        }
        else {
            // goTo(navigation, ROUTE.ROUTE_MY_NOTIFICATION);
        }
        
    }

    onMessageListener()
        .then((payload: any) => {
            const title = payload?.data?.title;
            const options = {
                body: payload?.data?.message,
                icon: Icons.LogoSmall
            };
            new Notification(title, options).addEventListener('click', function () {
                routingHandler(payload)
            });
        })
        .catch((err) => console.log('failed: ', err));

    return (
        // <Toaster />
        <></>
    )
}

export { PushConfig }