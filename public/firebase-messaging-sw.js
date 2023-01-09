importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging-compat.js')

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

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      image: payload.data.Image,
      data:payload.notification.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });


  self.addEventListener("notificationclick", (event) => {
    console.log("event",event)
    event.waitUntil(async function () {
        const allClients = await clients.matchAll({
            includeUncontrolled: true
        });
        console.log("allclient",allClients)
        let chatClient;
        let appUrl = "Profile";
        for (const client of allClients) {
 
            if(client['url'].indexOf(appUrl) >= 0) 
            {
                client.focus();
                chatClient = client;
                break;
            }
        }
        
        if (!chatClient) {
            chatClient = await clients.openWindow(appUrl);
        }
    }());
 


  });