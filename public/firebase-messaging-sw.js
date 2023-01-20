importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
  authDomain: "zenylog-a7515.firebaseapp.com",
  projectId: "zenylog-a7515",
  storageBucket: "zenylog-a7515.appspot.com",
  messagingSenderId: "220885026819",
  appId: "1:220885026819:web:e471e84513a5ab99542636",
  measurementId: "G-XEC0XF1H61"
};

// firebase.initializeApp(firebaseConfig);
firebase.initializeApp({
  messagingSenderId: "220885026819",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }
  return self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action)
  }
  event.notification.close()
})

  // navigator.serviceWorker.addEventListener('notificationclick', function(event) {
  //   event.notification.close();
  //   event.waitUntil(
  //     clients.openWindow("/")
  //   );
  // });