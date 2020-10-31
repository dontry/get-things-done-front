import * as firebase from 'firebase';
// import config from '../firebase-config.json'

const config = {
  apiKey: 'AIzaSyCgnxU6qtlxe4qJl-p5sR4y_nhlCtTG9tU',
  authDomain: 'get-things-done-b4cd8.firebaseapp.com',
  databaseURL: 'https://get-things-done-b4cd8.firebaseio.com',
  projectId: 'get-things-done-b4cd8',
  storageBucket: 'get-things-done-b4cd8.appspot.com',
  messagingSenderId: '424193496408',
  appId: '1:424193496408:web:2bf5c9ef4a0dc8aa0f012d',
  measurementId: 'G-92PBQY8X92',
};

firebase.initializeApp(config);

export const messaging = firebase.messaging();

export function initializeMessaging() {
  messaging
    .getToken({ vapidKey: process.env.VAPIDKEY })
    .then(currentToken => {
      console.log('token:', currentToken);
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err);
    });

  messaging.onMessage(
    payload => new Notification(payload.notification.title, payload.notification),
  );
}
