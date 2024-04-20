// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8tAbfuaWO7yaTsQyZWbgLCT3QZbbFChI",
  authDomain: "hackaton-7d4e7.firebaseapp.com",
  databaseURL: "https://hackaton-7d4e7-default-rtdb.firebaseio.com",
  projectId: "hackaton-7d4e7",
  storageBucket: "hackaton-7d4e7.appspot.com",
  messagingSenderId: "424746376312",
  appId: "1:424746376312:web:a3a5bdfe7bcd7125b8618d",
  measurementId: "G-41ZZDT9T67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
