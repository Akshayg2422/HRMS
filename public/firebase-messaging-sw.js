// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js%27);
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js%27);

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
  authDomain: "zenylog-a7515.firebaseapp.com",
  projectId: "zenylog-a7515",
  storageBucket: "zenylog-a7515.appspot.com",
  messagingSenderId: "220885026819",
  appId: "1:220885026819:web:e471e84513a5ab99542636",
  measurementId: "G-XEC0XF1H61"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  console.log("clickedNotification", clickedNotification);
  clickedNotification.close();
  // Use the data stored in the notification to navigate to the specified URL
})

