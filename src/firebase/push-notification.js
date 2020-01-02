import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/messaging";

const firebaseUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD_PSGBBfsUAzDrFe_vEld2kUdOlf1U4co",
    authDomain: "opeqe-c5738.firebaseapp.com",
    databaseURL: "https://opeqe-c5738.firebaseio.com",
    projectId: "opeqe-c5738",
    storageBucket: "opeqe-c5738.appspot.com",
    messagingSenderId: "677038427149",
    appId: "1:677038427149:web:921dd794be295eb2509944",
    measurementId: "G-FG1KSDXJR7"
  };

  // Project Settings => Add Firebase to your web app
  firebase.initializeApp(firebaseConfig);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(firebaseUrl, {
        scope: `${process.env.PUBLIC_URL}/firebase-cloud-messaging-push-scope`,
        updateViaCache: "none"
      })
      .then(registration => {
        firebase.analytics();

        const msg = firebase.messaging();

        msg.useServiceWorker(registration);

        msg.onMessage(payload => {
          const { body, icon, title, click_action } = payload.notification;
          let action = click_action || null;
          const options = {
            body,
            icon,
            actions: [
              {
                action,
                title
              }
            ]
          };
          registration.showNotification(title, options);
        });
      })
      .catch(er => console.log("error => ", er));

    window.onload = () => askPermission();
  }
};

export const askPermission = async () => {
  try {
    const msg = firebase.messaging();
    await msg.requestPermission();
    const token = await msg.getToken();
    subscribeTokenToTopic(token, "all");
  } catch (error) {
    console.error(error);
  }
};

export const subscribeTokenToTopic = (token, topic) => {
  fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "key=AAAAnaKijA0:APA91bHsp_OYVeK4FQsoQrdzbE_6e4RkzJFRHsUya2qn-T7ZOKcm_n9t2Njgk94bfJNqZOF39CD_09ms4FXaI9j9yKGXp95nhK4yBszv2a17FUCVrd8AQJd884AyXo3tOa1g_iSXCWlI"
    }
  })
    .then(res => {
      const { status, text } = res;
      if (status < 200 || status >= 400)
        console.error(`Error subscribing to topic: ${status} - ${text}`);
    })
    .catch(err => console.error(err));
};
