import { expect } from "chai"
import { describe, it, beforeEach, afterEach } from "mocha"
import { addDocument, fetchSingleDocument, deleteDocument, updateDocument } from "../../services/firebase/db"
import { logIn, logOut } from "../../services/firebase/auth"
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const TestCollection = 'testCollection'

// NOTE: Throw an exception in db witch test cases will catch
describe('Firebase Firestore', () => {
    // beforeEach(async () => {
    //     await logIn(process.env.VUE_APP_EMAIL, process.env.VUE_APP_PASSWORD)
    // })

    // it('Should add a single document to firestore and delete it afterwards', async () => {
    //     const data = { test: 'test', obj: { foo: 'bar' }, arr: [1, 2, 3] }
    //     const res = await addDocument(TestCollection, data)
    //     const doc = await fetchSingleDocument(TestCollection, res.id)
    //     expect(doc).to.deep.equal(data);

    //     // delete test document after test
    //     await deleteDocument(TestCollection, { docId: res.id })
    // })

    // it('Should update a single document from firestore and delete it afterwards', async () => {
    //     const data = { test: 'test', obj: { foo: 'bar' }, arr: [1, 2, 3] }
    //     const newData = { test: 'updatedTest', obj: { foo: 'bar' }, arr: [1, 2, 3] }

    //     const res = await addDocument(TestCollection, data)
    //     // update document
    //     await updateDocument(TestCollection, res.id, newData)
    //     const doc = await fetchSingleDocument(TestCollection, res.id)
    //     expect(doc).to.deep.equal(newData);

    //     // delete test document after test
    //     await deleteDocument(TestCollection, { docId: res.id })
    // })

    // afterEach(async () => {
    //     await logOut()
    // })
})