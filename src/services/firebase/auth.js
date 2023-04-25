import { app } from './firebaseInit'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

const auth = getAuth();

// returns true or false whether not user succeded to log in
async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Signed in')
    } catch (e) {
      console.log(e)
      throw (e)
    }
}

async function logOut() {
    try {
        await signOut(auth)
        console.log("user logged out")
    } catch(e) {
      console.log(e)
      throw e
    }
}

export { app, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, logIn, logOut } 