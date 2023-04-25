import { expect } from "chai"
import { describe, it, beforeEach, afterEach } from "mocha"
import { logIn, logOut } from "../../services/firebase/auth"
import { uploadImages, getImageURL, deleteImage } from "../../services/firebase/storage";
import * as fs from 'fs'
import path from "path";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const storagePath = 'Test/'
const filePath = path.resolve(__dirname, '../../assets/test/test.rtf');

describe('Firebase storage', () => { 
    // beforeEach(async () => {
    //     await logIn(process.env.VUE_APP_EMAIL, process.env.VUE_APP_PASSWORD)
    // })

    // it('Should upload a single file to Firebase storage and deletes it afterwards', async () => {
    //     const fileContent =  fs.readFileSync(filePath, 'utf8');
    //     const buffer = Buffer.from(fileContent)

    //     await uploadImages(storagePath, [buffer])
    //     await deleteImage(storagePath, 'undefined')
    // })

    // it('Should fetch the image name from Firebase storage and deletes it afterwards', async () => {
    //     const fileContent =  fs.readFileSync(filePath, 'utf8');
    //     const buffer = Buffer.from(fileContent)

    //     await uploadImages(storagePath, [buffer])
    //     const file = await getImageURL({ storagePath, imageName: 'undefined' })
    //     expect(file.name).equal('undefined')
    //     await deleteImage(storagePath, 'undefined')
    // })

    // afterEach(async () => {
    //     await logOut()
    // })
 })