import {
    app
} from './firebaseInit'
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

async function uploadImages(storagePath, files) {
    try {
        if (!files || typeof files !== 'object') {
            throw console.log('Wrong type')
        }
        // REMOVE IF ONLY 1 FILE
        for (let i = 0; i < files.length; i++) {
            const imageRef = ref(storageRef, `${storagePath}/${files[i].name}`)
            const metadata = {
                name: files[i].name,
                size: files[i].size,
                contentType: files[i].type
            }
            await uploadBytes(imageRef, files[i], metadata)
            console.log("Uploaded: " + files[i].name + " to " + storagePath)
        }
    } catch (e) {
        console.log(e)
        throw "Noget gik galt ved upload af billederne"
    }
}

async function deleteImage(storagePath, imageName) {
    try {
        const imageRef = ref(storageRef, storagePath + imageName)
        await deleteObject(imageRef)
    } catch (e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billedet"
    }
}

async function deleteImages(storagePath, images) {
    try {
        for (let i = 0; i < images.length; i++) {
            const imageName = images[i].name
            const imageRef = ref(storageRef, storagePath + imageName)
            await deleteObject(imageRef)
        }
    } catch (e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billederne"
    }
}

async function getImagesUrl({
    storagePath
}) {
    try {
        const path = ref(storageRef, storagePath);
        const images = []
        const items = (await listAll(path)).items
        for (let i = 0; i < items.length; i++) {
            const url = await getDownloadURL(ref(path, items[i].name))
            images.push({
                name: items[i].name,
                url
            })
        }
        console.log(images)
        return images
    } catch (e) {
        console.log(e)
        throw "Noget gik galt ved hentning af billederne"
    }
}

async function getImageURL({
    storagePath,
    imageName
}) {
    try {
        const path = ref(storageRef, storagePath);
        const url = await getDownloadURL(ref(path, imageName))
        return {
            name: imageName,
            url
        }
    } catch (e) {
        console.log(e)
        throw "Noget gik galt ved hentning af billederne"
    }
}


export {
    getImagesUrl,
    getImageURL,
    uploadImages,
    deleteImage,
    deleteImages,
}