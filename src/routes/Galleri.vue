<template>
    <div class="container">
        <div class="d-inline-flex flex-column align-items-center w-100">
            <!-- <div class="display-6 mb-5 text-center">Galleri</div> -->
            <!-- ADMIN -->
            <div v-if="user.loggedIn" class="row">
                <div class="d-flex justify-content-center align-items-center flex-column">
                    <input type="file" multiple @change="getFilesOnChange" class="mb-1">
                    <button v-show="hasFiles" @click="uploadImages($event)" class="btn btn-warning m-3">upload</button>
                    <button v-if="hasDeletedImages" @click="deleteMultipleImages()" class="btn btn-warning m-3">Slet
                        markeret ({{ deleteImages.length }})</button>
                </div>
            </div>
            <template v-if="images.length >= 0">
                <div class="row" v-if="!loading">
                    <div v-if="error.hasError">
                        {{ error.message }}
                    </div>
                    <template v-for="(image, index) in fetchImages()" :key="index">
                        <!-- ADMIN -->
                        <GalleryImage v-if="user.loggedIn" :imgUrl="image.url" :title="image.name"
                            :modalTarget="'#modal-target' + index" @deleteImage="deleteImage(image.name)"
                            @selectMultipleImages="selectMultipleImages(image, $event)"></GalleryImage>
                        <GalleryImage v-else :imgUrl="image.url" :title="image.name"
                            :modalTarget="'#modal-target' + index"></GalleryImage>
                        <!-- full image modal -->
                        <div class="modal fade" :id="'modal-target' + index">
                            <div class="modal-dialog modal-fullscreen d-flex justify-content-center">
                                <div class="d-flex row justify-content-center align-items-center">
                                    <img :src="image.url" class="img-fluid p-10 modal-image">
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="spinner-border" role="status" v-else>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <div v-if="!hasImages" class="text-center mt-5">
                Ingen billeder tilføjet endnu
            </div>
        </div>
    </div>
</template>
<script>
    import GalleryImage from '@/components/GalleryImage.vue'

    export default {
        name: "galleri-route",
        data() {
            return {
                hasLoaded: false,
                files: [],
                deleteImages: [],
                error: {
                    message: "",
                    hasError: false
                },
                modalTarget: ""
            }
        },

        components: {
            GalleryImage,
        },

        methods: {
            fetchImages() {
                try {
                    return this.images
                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        window.alert(e)
                        this.hasLoaded = true
                        this.error.hasError = true
                        this.error.message = e
                    }, 5000)
                }
            },

            async uploadImages() {
                try {
                    this.hasLoaded = false
                    await this.$store.dispatch('uploadImages', {
                        storagePath: 'Gallery/',
                        files: this.files
                    })
                    this.files = []
                    this.hasLoaded = true
                } catch (e) {
                    setTimeout(() => {
                        window.alert(e)
                        this.hasLoaded = true
                    }, 5000)
                }
            },

            deleteImage(imageName) {
                this.$store.dispatch('deleteImage', {
                    storagePath: 'Gallery/',
                    imageName
                })
            },

            async deleteMultipleImages() {
                try {
                    this.hasLoaded = false
                    await this.$store.dispatch('deleteImages', { storagePath: 'Gallery/', images: this.deleteImages })
                    this.deleteImages = []
                    this.hasLoaded = true
                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        window.alert(e)
                        this.hasLoaded = true
                    }, 5000)
                }
            },

            // TODO: change fethcing of iamgeNode
            selectMultipleImages(image, event) {
                const index = this.deleteImages.indexOf(image)
                // should hit image node - will fail if change of html
                const imageNode = event.target.parentNode.parentNode.childNodes[1]
                console.log(imageNode)
                if (index === -1) {
                    this.deleteImages.push(image)
                    imageNode.style.opacity = "0.5"
                } else {
                    this.deleteImages.splice(index, 1)
                    imageNode.style.opacity = "1"
                    console.log(imageNode)
                }
            },

            getFilesOnChange(event) {
                this.files = event.target.files
            },
        },

        computed: {
            images() {
                return this.$store.getters.images
            },

            hasImages() {
                return this.images.length > 0
            },

            user() {
                return this.$store.getters.user
            },

            hasDeletedImages() {
                return this.deleteImages.length > 0
            },

            hasFiles() {
                return this.files.length > 0
            },

            loading() {
                return !this.hasLoaded
            }
        },

        created() {
            this.$store.dispatch('getImagesUrl', { storagePath: 'Gallery/' })
                .then(() => {
                    this.hasLoaded = true
                })
        }
    }
</script>

<style scoped>
    .spinner-border {
        margin-top: 100px;
    }

    .modal-image {
        padding: 0px !important;
    }
</style>