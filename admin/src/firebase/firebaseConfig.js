import firebase from "firebase";
// import {firebseAuth} from 'firebase/compat/firestore'


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDxeNeypzQe1B8j4gmsfyDlLjP2F2nV3Ew",
  authDomain: "chat-realtime-94c1b.firebaseapp.com",
  projectId: "chat-realtime-94c1b",
  storageBucket: "chat-realtime-94c1b.appspot.com",
  messagingSenderId: "399161260975",
  appId: "1:399161260975:web:c1bbe8f08998e072128d5a",
  measurementId: "G-68EDG1SWEQ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
