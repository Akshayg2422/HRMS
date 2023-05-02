import { messaging } from '../Config'
import React, { useEffect, useState } from 'react'
import { getToken, onMessage } from "firebase/messaging"
import { useDispatch, useSelector } from 'react-redux'
import { getFcmToken } from '../../store/auth/actions'

const GetToken = () => {
    const { fcmToken } = useSelector(
        (state: any) => state.AuthReducer
    );
    const dispatch = useDispatch()

    useEffect(() => {
        pushNotification()
    }, [])


    const pushNotification = async () => {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("./firebase-messaging-sw.js")
                    .then(async function (registration) {
                        console.log("Registration successful, scope is:", registration.scope);
                        await getToken(messaging, { vapidKey: "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk", serviceWorkerRegistration: registration })
                            .then((currentToken) => {
                                if (currentToken) {
                                    console.log('current token for client: ', currentToken);
                                    dispatch(getFcmToken(currentToken))
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });
                    })
                    .catch(function (err) {
                        console.log("Service worker registration failed, error:", err);
                    });
            }

        }
        else if (permission === "denied") {
            console.log("Denied Notifications")
        }

    }


    return (
        <div></div>
    )
}

export default GetToken;