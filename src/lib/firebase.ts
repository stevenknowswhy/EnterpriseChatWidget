import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6G2oc4FudGi4gokoyZYwn1sgKoe6WDyA",
  authDomain: "aiavataremployee.firebaseapp.com",
  projectId: "aiavataremployee",
  storageBucket: "aiavataremployee.firebasestorage.app",
  messagingSenderId: "492808486853",
  appId: "1:492808486853:web:822e97268e69d5324115ac",
  measurementId: "G-Z7HB7NWM58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
