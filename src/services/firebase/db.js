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

async function addDocument(collectionId, { ...data }) {
  try {
    return await addDoc(collection(db, collectionId), data)
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
  return colArr
}

export {
  addDocument,
  deleteDocument,
  updateDocument,
  fetchSingleDocument,
  fetchDocuments
}