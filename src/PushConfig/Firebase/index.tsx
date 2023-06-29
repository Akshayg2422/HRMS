// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive
import { getFcmToken } from '../../store/auth/actions';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useDispatch } from 'react-redux';

const firebaseConfig = {
    apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
    authDomain: "zenylog-a7515.firebaseapp.com",
    projectId: "zenylog-a7515",
    storageBucket: "zenylog-a7515.appspot.com",
    messagingSenderId: "220885026819",
    appId: "1:220885026819:web:e471e84513a5ab99542636",
    measurementId: "G-XEC0XF1H61"
};


initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()
    try {
        const currentToken = await getToken(messaging, { vapidKey: "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk" });
        if (currentToken) {
            dispatch(getFcmToken(currentToken));
            // console.log(currentToken + 'device token');
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker messaging.onBackgroundMessage handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });