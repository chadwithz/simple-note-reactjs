import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBNytva2adTaXSAZ1f4eD8tfsxNelcvWcc",
  authDomain: "simple-note-reactjs-b292d.firebaseapp.com",
  projectId: "simple-note-reactjs-b292d",
  storageBucket: "simple-note-reactjs-b292d.appspot.com",
  messagingSenderId: "961897259257",
  appId: "1:961897259257:web:df564ab2bbfb5135950228",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
