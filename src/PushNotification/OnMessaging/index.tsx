import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });