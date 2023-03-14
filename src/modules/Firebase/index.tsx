import { ImageView } from '@components';
import { goTo, ROUTE, useNav } from '@utils';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import GetToken from './GetToken';
import { onMessageListener } from './OnMessage';

const MAX_LENGTH = 70

const Firebase = () => {
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


    onMessageListener()
        .then((payload: any) => {
            let content = { title: payload?.notification?.title, body: payload?.notification?.body, icon: payload.notification.icon || payload.notification.image, }
            setNotification([...notification, content]);
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
