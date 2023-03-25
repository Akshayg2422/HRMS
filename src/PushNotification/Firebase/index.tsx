// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useDispatch } from 'react-redux'
import { getFcmToken, webPushRegister } from '../../../src/store/auth/actions'



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

function urlBase64ToUint8Array(base64String: any) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4)
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    var rawData = window.atob(base64)
    var outputArray = new Uint8Array(rawData.length)

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray;
}

function loadVersionBrowser() {
    if ("userAgentData" in navigator) {
        // navigator.userAgentData is not available in
        // Firefox and Safari
        const uaData: any = navigator.userAgentData;
        // Outputs of navigator.userAgentData.brands[n].brand are e.g.
        // Chrome: 'Google Chrome'
        // Edge: 'Microsoft Edge'
        // Opera: 'Opera'
        let browsername;
        let browserversion;
        let chromeVersion = null;
        for (var i = 0; i < uaData.brands.length; i++) {
            let brand = uaData.brands[i].brand;
            browserversion = uaData.brands[i].version;
            if (brand.match(/opera|chrome|edge|safari|firefox|msie|trident/i) !== null) {
                // If we have a chrome match, save the match, but try to find another match
                // E.g. Edge can also produce a false Chrome match.
                if (brand.match(/chrome/i) !== null) {
                    chromeVersion = browserversion;
                }
                // If this is not a chrome match return immediately
                else {
                    browsername = brand.substr(brand.indexOf(' ') + 1);
                    return {
                        name: browsername,
                        version: browserversion
                    }
                }
            }
        }
        // No non-Chrome match was found. If we have a chrome match, return it.
        if (chromeVersion !== null) {
            return {
                name: "chrome",
                version: chromeVersion
            }
        }
    }
    // If no userAgentData is not present, or if no match via userAgentData was found,
    // try to extract the browser name and version from userAgent
    const userAgent = navigator.userAgent;
    var ua = userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return { name: 'Opera', version: tem[1] };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return {
        name: M[0],
        version: M[1]
    };
};


const applicationServerKey = "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk"


export const requestForToken = async (dashboardDetails: any) => {

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./firebase-messaging-sw.js")
            .then(async function (registration) {
                console.log("Registration successful, scope is:", registration.scope);
                getToken(messaging, { vapidKey: "BPXo_a_-7x6w9d8P5CoFLfq_Y0rg2IsCg-Qsvm8n31h0lGyQFo7eq3rkgepLrzLi2TstqYCGaY9YSqjkre65PYk", serviceWorkerRegistration: registration })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log('current token for client: ', currentToken);

                            if (registration) {
                                const browser = loadVersionBrowser();

                                registration.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(applicationServerKey)
                                }).then(async function (sub: any) {

                                    const key = sub.getKey("p256dh");
                                    const auth = sub.getKey("auth");
                                    const encryptKey: any = new Uint8Array(key)
                                    const encryptAuth: any = new Uint8Array(auth)

                                    var endpointParts = sub.endpoint.split('/');
                                    var registration_id = endpointParts[endpointParts.length - 1];
                                    const params = {
                                        'browser': browser.name.toUpperCase(),
                                        'p256dh': btoa(String.fromCharCode.apply(null, encryptKey)),
                                        'auth': btoa(String.fromCharCode.apply(null, encryptAuth)),
                                        'name': dashboardDetails?.user_details?.name,
                                        'registration_id': currentToken,
                                        application_id: "1:220885026819:web:e471e84513a5ab99542636"
                                    };
                                    await localStorage.setItem('registrationDetails', JSON.stringify(params));
                                })
                                    .catch(function (err: any) {
                                        console.log(':^(', err);
                                    });
                            }

                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                    });
            })
            .catch(function (err) {
                console.log("Service worker registration failed, error:", err);
            });
    }

};


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });


