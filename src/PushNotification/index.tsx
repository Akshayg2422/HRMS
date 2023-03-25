import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './Firebase';
import { useNav } from '@utils';
import {
    goTo,
    ROUTE,
} from "@utils";
import { useSelector } from 'react-redux';

const PushNotification = () => {
    const navigation = useNav();

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
      );

      const { userLoggedIn } = useSelector(
        (state: any) => state.AppReducer
      );

      const { isWebPushRegisterController } = useSelector(
        (state: any) => state.AuthReducer
      );


    const [notification, setNotification] = useState({ title: '', body: '' });
    const notify = () => toast(<ToastDisplay />);
    function ToastDisplay() {

        return (
            <div
                // onClick={() => {
                //     if (notification?.title === 'Title') {
                //         goTo(navigation, ROUTE.ROUTE_MANAGE_EMPLOYEE);
                //     }
                // }}
            >
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

    requestForToken(dashboardDetails);
    

    onMessageListener()
        .then((payload: any) => {
            setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
        })
        .catch((err) => console.log('failed: ', err));

    return (
        <Toaster />
    )
}

export { PushNotification }