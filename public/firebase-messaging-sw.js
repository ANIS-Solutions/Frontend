importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBZYDLDtUMNzq6Pg91up3QMDLtFeMIag3c",
  authDomain: "anis-dev.firebaseapp.com",
  projectId: "anis-dev",
  storageBucket: "anis-dev.firebasestorage.app",
  messagingSenderId: "440061838057",
  appId: "1:440061838057:web:fd8132569f1ca8a9b7e678",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification?.title ?? 'New notification',
    { body: payload.notification?.body, icon: '/imgs/Logo.jpeg' }
  );

  self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    .then((clients) => {
      clients.forEach((client) =>
        client.postMessage({ type: 'FCM_NOTIFICATION', payload })
      );
    });
});
