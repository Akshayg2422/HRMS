import { setNotificationCount } from '../../store/notifications/actions';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const messaging = getMessaging();
const pathname = window.location.pathname

export const onMessageListener = () =>{
  new Promise((resolve) => {
    onMessage(messaging,async (payload) => {
      console.log("payload------->", payload)
     await resolve(payload);
    });
  });
}