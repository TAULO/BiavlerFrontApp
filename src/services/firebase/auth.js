import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBtHuZxVsR36yNaAMOwuzoi-PkZJEAQ7bo",
  authDomain: "biavlerforening-66d6d.firebaseapp.com",
  projectId: "biavlerforening-66d6d",
  storageBucket: "biavlerforening-66d6d.appspot.com",
  messagingSenderId: "1075343159849",
  appId: "1:1075343159849:web:467c654f3a5c9cd0ea2238",
  measurementId: "G-RG0VSSFG70"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut } 