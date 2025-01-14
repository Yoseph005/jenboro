// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "jenboro-c668b.firebaseapp.com",
  projectId: "jenboro-c668b",
  storageBucket: "jenboro-c668b.firebasestorage.app",
  messagingSenderId: "378814898016",
  appId: "1:378814898016:web:444e51698da6347a8bc805",
  measurementId: "G-S8MK18BWZ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);