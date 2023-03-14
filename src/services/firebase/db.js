import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

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

const db = getFirestore(app)
const calendarCol = "calendar"

async function addEvent(title, startDate, endDate, description) {
  try {
    const ref = await addDoc(collection(db, calendarCol), {
        title,
        startDate,
        endDate,
        description
    })
    console.log("Added event with id: " + ref.id)
  } catch(e) {
    console.log("Error adding event:", e)
  }
}

async function deleteEvent(docId) {
    const docRef = doc(db, calendarCol, docId)
    await deleteDoc(docRef)
    .then(() => console.log("document deleted with id: " + docId))
    .catch(e => console.log("Error deleting event:", e))
    
}

async function getEvents() {
    const events = []
    const querySnapshot = await getDocs(collection(db, calendarCol))
    querySnapshot.forEach((event) => {
        events.push({...event.data(), id: event.id})
    })
    return events
}

async function searcEventQuery(title) {
    const q = query(collection(calendarCol, db), where('title', '==', title))
    const filteredEvents = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((event) => {
        filteredEvents.push({...event.data(), id: event.id})
    })
    return filteredEvents
}

export { addEvent, getEvents, deleteEvent, searcEventQuery }