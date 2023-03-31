import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging,async (payload) => {
      console.log("payload------->", payload)
     await resolve(payload);
    });
  });