// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGSzPhDODvDUY3hgqeF4LEc52n7JqVrmA",
  authDomain: "clone-6f1b6.firebaseapp.com",
  projectId: "clone-6f1b6",
  storageBucket: "clone-6f1b6.appspot.com",
  messagingSenderId: "331747574931",
  appId: "1:331747574931:web:cd2c4338d31f86e6807966",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
