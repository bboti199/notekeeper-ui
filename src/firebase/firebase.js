import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAZqFxYrXYRStRSFN_CxOTJ8Iw3IOXsdMQ',
  authDomain: 'notekeeper-f3be5.firebaseapp.com',
  databaseURL: 'https://notekeeper-f3be5.firebaseio.com',
  projectId: 'notekeeper-f3be5',
  storageBucket: 'notekeeper-f3be5.appspot.com',
  messagingSenderId: '916222461689',
  appId: '1:916222461689:web:a8cfe2d52e285cbf824428',
  measurementId: 'G-443SHBMT7R',
};

export const Firebase = firebase.initializeApp(firebaseConfig);
