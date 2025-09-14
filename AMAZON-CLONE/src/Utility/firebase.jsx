// firebase.js
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBGSzPhDODvDUY3hgqeF4LEc52n7JqVrmA",
  authDomain: "clone-6f1b6.firebaseapp.com",
  projectId: "clone-6f1b6",
  storageBucket: "clone-6f1b6.appspot.com",
  messagingSenderId: "331747574931",
  appId: "1:331747574931:web:cd2c4338d31f86e6807966",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
