import { app } from './firebaseInit'
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

const auth = getAuth();

// returns true or false whether not user succeded to log in
async function logIn(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.log(e)
      throw ('Der skete en fejl ved login. Kig efter korrekt e-mail eller password og prøv igen.')
    }
}

async function logOut() {
    try {
        await signOut(auth)
        console.log("user logged out")
    } catch(e) {
        throw "Der skete en fejl ved logud"
    }
}

export { app, auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, logIn, logOut } 