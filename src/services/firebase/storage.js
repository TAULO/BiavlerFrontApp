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

// const galleryRef = ref(storageRef, 'Gallery/');
// const committeeMembersRef = ref(storageRef, "CommitteeMembers/")
// const recipesRef = ref(storageRef, "Recipes/")

// async function uploadImages(files) {
//     try {
//         if (!files || typeof files !== 'object') {
//             throw "Fejl"
//         }
//         for (let i = 0; i < files.length; i++) {
//             const imageRef = ref(storageRef, "Gallery/" + files[i].name)
//             const metadata = {
//                 name: files[i].name,
//                 size: files[i].size,
//                 contentType: files[i].type
//             }
//             await uploadBytes(imageRef, files[i], metadata)
//         } 
//     } catch(e) {
//         console.log(e)
//         throw "Noget gik galt ved upload af billederne"
//     }
// }

// works like a charm 
async function uploadImages(storagePath, files) {
    try {
        if (!files || typeof files !== 'object') {
            throw console.log('err')
        }
        if (files.length > 1) {
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
        } else {
            const imageRef = ref(storageRef, `${storagePath}/${files.name}`)
            const metadata = {
                name: files.name,
                size: files.size,
                contentType: files.type
            }
            await uploadBytes(imageRef, files, metadata)
            console.log("Uploaded: " + files.name + " to " + storagePath)
        }
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved upload af billederne"
    }
}

async function deleteImage(storagePath, imageName) {
    try {
        const imageRef = ref(storageRef, storagePath + imageName)
        await deleteObject(imageRef)
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billedet"
    }
}

async function deleteImages(storagePath, images) {
    try {
        console.log(storagePath)
        for (let i = 0; i < images.length; i++) {
            const imageName = images[i].name
            const imageRef = ref(storageRef, storagePath + imageName)
            await deleteObject(imageRef)
        }
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved sletning af billederne"
    }
}


async function getImagesUrl({ storagePath }) {
    const path = ref(storageRef, storagePath);
    try {
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
    } catch(e) {
        console.log(e)
        throw "Noget gik galt ved hentning af billederne"
    }
}


export {
    getImagesUrl,
    uploadImages,
    deleteImage,
    deleteImages,
}