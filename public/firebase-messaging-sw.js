importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");

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

// // Project Settings => Add Firebase to your web app
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
  // do what you want
  // ...
});
