// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCcdp-uzqLkCKYLsT2sON6yhIBNhg91z0",
  authDomain: "referral-application-48db0.firebaseapp.com",
  projectId: "referral-application-48db0",
  storageBucket: "referral-application-48db0.appspot.com",
  messagingSenderId: "317057858676",
  appId: "1:317057858676:web:47c0690b38f4338447a521",
  measurementId: "G-7T7RXRL340"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);