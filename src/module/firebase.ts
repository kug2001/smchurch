// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA67iNTDFeuoNlD3tA_pP-gw1jNSuxcvvo',
  authDomain: 'smchurch-7c8ab.firebaseapp.com',
  projectId: 'smchurch-7c8ab',
  storageBucket: 'smchurch-7c8ab.appspot.com',
  messagingSenderId: '635348709301',
  appId: '1:635348709301:web:6132428e7c0051cb60b3fc',
  measurementId: 'G-7WXSKREMB1'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
