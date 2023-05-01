import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"


const firebaseConfig = {
  apiKey: "AIzaSyAgoLwc3rSGERRzfh5hrZOpk6U_q6aPsuQ",
  authDomain: "zenylog-a7515.firebaseapp.com",
  projectId: "zenylog-a7515",
  storageBucket: "zenylog-a7515.appspot.com",
  messagingSenderId: "220885026819",
  appId: "1:220885026819:web:e471e84513a5ab99542636",
  measurementId: "G-XEC0XF1H61"
};


export const config = initializeApp(firebaseConfig)

export const messaging = getMessaging(config)
