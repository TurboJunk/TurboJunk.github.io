import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getMessaging, onBackgroundMessage, isSupported } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-sw.js';

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

const app = initializeApp({
	apiKey: "AIzaSyCP02QG2IdPr6qd2Fzt8BDKEjJ3fr-xnvg",
	authDomain: "angularpwa-5b819.firebaseapp.com",
	projectId: "angularpwa-5b819",
	storageBucket: "angularpwa-5b819.appspot.com",
	messagingSenderId: "360873304245",
	appId: "1:360873304245:web:c9144d9307983d2c995efc",
	measurementId: "G-K1YN8X21MP",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
      self.registration.showNotification(title, { body, icon: image });
    });

  }

});
