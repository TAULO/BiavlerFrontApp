import { app } from './firebaseInit'
import {
    getStorage,
    ref,
    getDownloadURL,
    listAll,
    uploadBytes,
    deleteObject
} from "firebase/storage";

const storage = getStorage(app);

const storageRef = ref(storage)

const galleryRef = ref(storageRef, 'Gallery/');

async function uploadImages(files) {
    try {
        if (!files || typeof files !== 'object') {
            throw "Fejl"
        }
        for (let i = 0; i < files.length; i++) {
            const imageRef = ref(storageRef, "Gallery/" + files[i].name)
            const metadata = {
                name: files[i].name,
                size: files[i].size,
                contentType: files[i].type
            }
            await uploadBytes(imageRef, files[i], metadata)
        } 
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved upload af billederne"
    }
}

async function deleteImage(imageName) {
    try {
        const imageRef = ref(storageRef, "Gallery/" + imageName)
        await deleteObject(imageRef)
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billedet"
    }
}

async function deleteImages(images) {
    try {
        for (let i = 0; i < images.length; i++) {
            const imageName = images[i].name
            const imageRef = ref(storageRef, "Gallery/" + imageName)
            await deleteObject(imageRef)
        }
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billederne"
    }
}

async function getImagesUrl() {
    try {
        const images = []
        const items = (await listAll(galleryRef)).items
        for (let i = 0; i < items.length; i++) {
            const url = await getDownloadURL(ref(galleryRef, items[i].name))
            images.push({
                name: items[i].name,
                url
            })
        }
        return images
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved hentning af billederne"
    }
}


export {
    getImagesUrl,
    uploadImages,
    deleteImage,
    deleteImages
}