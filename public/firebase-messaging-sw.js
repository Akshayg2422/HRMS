// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js%27);
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js%27);
/* eslint-disable no-undef */

// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');


// eslint-disable-next-line react-hooks/rules-of-hooks


// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
  authDomain: "zenylog-a7515.firebaseapp.com",
  projectId: "zenylog-a7515",
  storageBucket: "zenylog-a7515.appspot.com",
  messagingSenderId: "220885026819",
  appId: "1:220885026819:web:e471e84513a5ab99542636",
  measurementId: "G-XEC0XF1H61"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Retrieve firebase messaging
// const messaging = firebase.messaging();

// navigator.serviceWorker.register('/public/firebase-messaging-sw.js')
//           .then(function (registration) {
//             // Registration was successful
//             console.log('firebase-message-sw :ServiceWorker registration successful with scope: ', registration.scope);
//             messaging.useServiceWorker(registration);
//           }, function (err) {
//             // registration failed :(
//             console.log('firebase-message-sw: ServiceWorker registration failed: ', err);
//           });



// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload,
//   );

//   // Schedule our own custom notification to show.
//   setTimeout(() => {
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: '/logo192.png', // This will only work when the webpage is opened. If you always want to show an image you should fetch it via URL.
//       tag: 'custom-notification',
//     };

//     // eslint-disable-next-line no-restricted-globals
//     self.registration.showNotification(
//       notificationTitle,
//       notificationOptions,
//     );
//   }, 30);

//   // Schedule closing all notifications that are not our own.
//   // This is necessary because if we don't close the other notifications the
//   // default one will appear and we will have duplicate notifications.
//   return new Promise(function (resolve, reject) {
//     resolve();

//     setTimeout(function () {
//       // eslint-disable-next-line no-restricted-globals
//       self.registration.getNotifications().then((notifications) => {
//         notifications.forEach((notification) => {
//           if (notification.tag !== 'custom-notification') {
//             notification.close();
//           }
//         });
//       });
//     }, 30);
//   });
// });

// eslint-disable-next-line no-restricted-globals
// self.addEventListener('notificationclick', function (event) {
//   console.log('On notification click: ', event, "scope", registration.scope);
//   event.notification.close();
//   // event.waitUntil(
//   //   clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsArr) => {
//   //     console.log('came');
//   //     console.log(clientsArr);
//   //     // If a Window tab matching the targeted URL already exists, focus that;
//   //     const hadWindowToFocus = clientsArr.some((windowClient) => {
//   //       console.log(windowClient.url + "====");
//   //       return windowClient.url === 'http://localhost:3000/dashboard'
//   //         ? (windowClient.focus(), true)
//   //         : false
//   //     });
//   //     // Otherwise, open a new tab to the applicable URL and focus it.
//   //     if (!hadWindowToFocus)
//   //       clients
//   //         .openWindow('http://localhost:3000/employee')
//   //         .then((windowClient) => (windowClient ? windowClient.focus() : null));
//   //   })
//   // );


// });