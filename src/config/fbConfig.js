import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyDvbOThY7-3BkI-7Q1q5u1CY2EaLLaHIFg',
  authDomain: 'finpal-d05f7.firebaseapp.com',
  projectId: 'finpal-d05f7',
  storageBucket: 'finpal-d05f7.appspot.com',
  messagingSenderId: '941474186586',
  appId: '1:941474186586:web:8d2e757d272f8da8cd9f63',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

export default firebase;
