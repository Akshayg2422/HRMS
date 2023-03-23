import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './Firebase';
import { useNav } from '@utils';
import {
    goTo,
    ROUTE,
} from "@utils";

const PushNotification = () => {
    const navigation = useNav();

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

    const register = () =>{
        const params ={
          "name": "",
          "registration_id": "",
          "active": false,
          "p256dh": "",
          "auth": "",
          "browser": null,
          "application_id": ""
      }
      }

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    requestForToken();

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