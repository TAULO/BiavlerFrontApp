import {
    initializeApp
} from "firebase/app";
import {
    getStorage,
    ref,
    getDownloadURL,
    listAll,
    uploadBytes,
    deleteObject
} from "firebase/storage";


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

const storage = getStorage(app);

const storageRef = ref(storage)

const galleryRef = ref(storageRef, 'Gallery/');

async function uploadImages(files) {
    for (let i = 0; i < files.length; i++) {
        const imageRef = ref(storageRef, "Gallery/" + files[i].name)
        const metadata = {
            name: files[i].name,
            size: files[i].size,
            contentType: files[i].type
        }
        await uploadBytes(imageRef, files[i], metadata)
    }
}

async function deleteImage(imageName) {
    const imageRef = ref(storageRef, "Gallery/" + imageName)
    await deleteObject(imageRef)
}

async function deleteImages(images) {
    for (let i = 0; i < images.length; i++) {
        const imageName = images[i].name
        const imageRef = ref(storageRef, "Gallery/" + imageName)
        await deleteObject(imageRef)
    }
}

async function getImagesUrl() {
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
}


export {
    getImagesUrl,
    uploadImages,
    deleteImage,
    deleteImages
}