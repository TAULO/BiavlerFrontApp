import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

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

export { app, auth, signInWithEmailAndPassword, signOut}

// class Auth {
//     signIn(email, password) {
//         signInWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//             const user = userCredential.user;
//             console.log(user, email, password)
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             throw new error(errorCode + " " + errorMessage)
//           })
//     }
    
//     logout() {
//         signOut(auth).then(() => {
//           }).catch((error) => {
//             throw new error(error)
//           })
//     }

//     userStateChanged() {
//         onAuthStateChanged(auth, user => {
//             if (user) {
//                 console.log(user)
//             } else {
//                 console.log("user is not signed in")
//             }
//             })
//     }

//     getUser() {
//         return auth.currentUser
//     }
// }

// export default Auth

// const self = {
//     signIn,
//     logout
// }

// export default self