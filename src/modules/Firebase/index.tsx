import { ImageView } from '@components';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import GetToken from './GetToken';
import { onMessageListener } from './OnMessage';

const MAX_LENGTH = 70

const Firebase = () => {
    const [notification, setNotification] = useState({ title: 'hi', body: 'This Is Message', icon: 'https://picsum.photos/id/237/200/300' });

    const notify = () => toast(<ToastDisplay />, {
        position: 'top-right', duration: 5000,
    });

    function ToastDisplay() {
        const bodyContent = notification?.body?.length <= MAX_LENGTH
            ? notification?.body
            : notification?.body?.slice(0, MAX_LENGTH) + '...';

        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <div className='d-flex justify-content-center align-items-center'>
                    {notification.icon && <div
                    >
                        <ImageView
                            icon={notification.icon}
                            style={{ height: '50px', width: '50px', borderRadius: "5px" }}
                        />
                    </div>}
                    <div className={notification.icon ? 'ml-3' : ''}>{bodyContent}</div></div>
            </div>
        );

    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])


    onMessageListener()
        .then((payload: any) => {
            setNotification({ title: payload?.notification?.title, body: payload?.notification?.body, icon: payload.notification.icon || payload.notification.image, });
        })
        .catch((err: any) => console.log('failed: ', err));

    return (
        <>
            <Toaster />
            <GetToken />
        </>
    )
}

export { Firebase }
