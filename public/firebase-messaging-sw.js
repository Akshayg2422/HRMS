import { goTo, ROUTE, useNav } from "@utils";

importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
  authDomain: "zenylog-a7515.firebaseapp.com",
  projectId: "zenylog-a7515",
  storageBucket: "zenylog-a7515.appspot.com",
  messagingSenderId: "220885026819",
  appId: "1:220885026819:web:e471e84513a5ab99542636",
  measurementId: "G-XEC0XF1H61"
});

importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

firebase.initializeApp({
  // Your Firebase configuration
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {};

  // Handle background message
  if (payload.notification === undefined) {
    // Add your own code to handle the background message
    console.log('Received background message:', payload);
    return;
  }

  // Handle notification
  event.waitUntil(
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      image: payload.notification.image,
      vibrate: payload.notification.vibrate,
      data: payload.data,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const payload = event.notification.data;

  // Handle notification click
  if (payload && payload.screen) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];

          if (client.url === payload.screen && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(payload.screen);
        }
      })
    );
  }
});
