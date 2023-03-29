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
  doc
} from "firebase/firestore";

// firestore init
const db = getFirestore(app)

// ====================== EVENTS ======================
const calendarCol = "calendar"

async function addEvent(title, startDate, description) {
  try {
    await addDoc(collection(db, calendarCol), {
      title,
      startDate,
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

async function getEvents() {
  const events = []
  const querySnapshot = await getDocs(collection(db, calendarCol))
  querySnapshot.forEach((event) => {
    events.push({
      ...event.data(),
      id: event.id
    })
  })
  console.log(events)
  return events
}


async function addDocument(collectionId, { ...data }) {
  try {
    await addDoc(collection(db, collectionId), data)
    console.log("Added document to: " + collectionId)
  } catch (e) {
    console.log("Error adding event:", e)
  }
}

async function deleteDocument(collectionId, { docId }) {
  const docRef = doc(db, collectionId, docId)
  await deleteDoc(docRef)
    .then(() => console.log("Document deleted with id: " + docId + ". From: " + collectionId))
    .catch(e => console.log("Error deleting event:", e))
}

async function updateDocument(collectionId, docId, { ...data }) {
try {
    const docRef = doc(db, collectionId, docId)
    await setDoc(docRef, data)
    console.log("Updated document to: " + collectionId)
  } catch(e){
    console.log(e)
  }
}

async function fetchSingleDocument(collectionId, docId) {
  try {
    const docRef = doc(db, collectionId, docId)
    return (await getDoc(docRef)).data()
  } catch(e) {
    console.log(e)
  }
}

async function fetchDocuments(collectionId) {
  const colArr = []
  const querySnapshot = await getDocs(collection(db, collectionId))
  querySnapshot.forEach((col) => {
    colArr.push({
      ...col.data(),
      id: col.id
    })
  })
  console.log(colArr)
  return colArr
}

export {
  addEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
  addDocument,
  deleteDocument,
  updateDocument,
  fetchSingleDocument,
  fetchDocuments
}