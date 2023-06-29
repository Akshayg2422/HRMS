import { setNotificationCount } from '../../store/notifications/actions';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging,async (payload) => {
     await resolve(payload);
    });
  });
