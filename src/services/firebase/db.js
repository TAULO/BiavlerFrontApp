import {
  app
} from './firebaseInit'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  where
} from "firebase/firestore";

const db = getFirestore(app)
const calendarCol = "calendar"

async function addEvent(title, startDate, endDate, description) {
  try {
    await addDoc(collection(db, calendarCol), {
      title,
      startDate,
      endDate,
      description
    })
    console.log("Added event with title: " + title)
  } catch (e) {
    console.log("Error adding event:", e)
  }
}

async function deleteEvent(docId) {
  const docRef = doc(db, calendarCol, docId)
  await deleteDoc(docRef)
    .then(() => console.log("Document deleted with id: " + docId))
    .catch(e => console.log("Error deleting event:", e))
}

async function getEvent(docId) {
  try {
    const docRef = doc(db, calendarCol, docId)
    return (await getDoc(docRef)).data()
  } catch(e) {
    console.log(e)
  }
}

async function getEvents() {
  const events = []
  const querySnapshot = await getDocs(collection(db, calendarCol))
  querySnapshot.forEach((event) => {
    events.push({
      ...event.data(),
      id: event.id
    })
  })
  return events
}

async function updateEvent(docId, title, startDate, endDate, description) {
  try {
    const docRef = doc(db, calendarCol, docId)
    await setDoc(docRef, {
      title,
      startDate,
      endDate,
      description
    })
  } catch(e){
    console.log(e)
  }
}

async function searcEventQuery(title) {
  const q = query(collection(calendarCol, db), where('title', '==', title))
  const filteredEvents = []
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((event) => {
    filteredEvents.push({
      ...event.data(),
      id: event.id
    })
  })
  return filteredEvents
}


export {
  addEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
  searcEventQuery
}