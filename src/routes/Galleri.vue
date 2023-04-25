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
            <template v-if="hasImages">
                <div class="row" v-if="!loading">
                    <div v-if="error.hasError">
                        {{ error.message }}
                    </div>
                    <!-- <template v-for="(image, index) in fetchImages()" :key="index"> -->
                    <!-- ADMIN -->
                    <!-- <GalleryImage v-if="user.loggedIn" :imgUrl="image.url" :title="image.name"
                            :modalTarget="'#modal-target' + index" @deleteImage="deleteImage(image.name)"
                            @selectMultipleImages="selectMultipleImages(image, $event)"></GalleryImage>
                        <GalleryImage v-else :imgUrl="image.url" :title="image.name"
                            :modalTarget="'#modal-target' + index"></GalleryImage> -->
                    <!-- full image modal -->
                    <masonry-wall :items="fetchImages()" :column-width="300" :gap="16">
                        <template #default="{ item, index }">
                            <div>
                                <!-- ADMIN -->
                                <GalleryImage v-if="user.loggedIn" :imgUrl="item.url" :title="item.name" :ref="item.name"
                                    :modalTarget="'#modal-target' + index" @deleteImage="deleteImage(item.name)"
                                    @selectMultipleImages="selectMultipleImages(item, $event)"></GalleryImage>
                                <GalleryImage v-else :imgUrl="item.url" :title="item.name"
                                    :modalTarget="'#modal-target' + index"></GalleryImage>
                            </div>
                            <div class="modal fade" :id="'modal-target' + index">
                                <div class="modal-dialog modal-fullscreen d-flex justify-content-center">
                                    <div class="d-flex row justify-content-center align-items-center">
                                        <img :src="item.url" class="img-fluid p-10 modal-image">
                                    </div>
                                </div>
                            </div>
                        </template>
                    </masonry-wall>
                    <!-- </template> -->
                </div>
                <div class="spinner-border" role="status" v-else>
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
            <div v-else class="text-center mt-5">
                Ingen billeder tilføjet endnu
            </div>
        </div>
    </div>
</template>
<script>
    import { mapStores } from 'pinia';
    import { storageStore, authStore } from '@/store';
    import GalleryImage from '@/components/GalleryImage.vue'
    import StoragePaths from '@/services/firebase/constans/StoragePaths';
    import {
        toastSuccess,
        toastError,
        toastWarning
    } from '../services/toasty.js'

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
                        toastError('Der skete en fejl')
                        this.hasLoaded = true
                        this.error.hasError = true
                        this.error.message = e
                    }, 5000)
                }
            },

            async uploadImages() {
                try {
                    this.hasLoaded = false
                    await this.storageStore.uploadImages({ storagePath: StoragePaths.GALLERY, files: this.files })
                    this.files = []
                    this.hasLoaded = true
                    toastSuccess('Billede(r) tilføet')
                } catch (e) {
                    setTimeout(() => {
                        this.hasLoaded = true
                        toastError('Der skete en fejl')
                    }, 5000)
                }
            },

            deleteImage(imageName) {
                try {
                    this.storageStore.deleteImage({ storagePath: StoragePaths.GALLERY, imageName })
                    toastWarning('Billede slettet')
                } catch (e) {
                    toastError('Der skete en fejl')
                }
            },

            async deleteMultipleImages() {
                try {
                    this.hasLoaded = false
                    this.storageStore.deleteImages({ storagePath: StoragePaths.GALLERY, images: this.deleteImages })
                    this.deleteImages = []
                    this.hasLoaded = true
                    toastWarning('Billeder slettet')
                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        this.hasLoaded = true
                        toastError('Der skete en fejl')
                    }, 5000)
                }
            },

            // TODO: find a smarter solution for this
            selectMultipleImages(image) {
                const index = this.deleteImages.indexOf(image)
                const imageName = image.name
                const imageUrl = image.url

                const imageNode = this.$refs[imageName].$refs[imageUrl]
                if (index === -1) {
                    this.deleteImages.push(image)
                    imageNode.style.opacity = "0.5"
                } else {
                    this.deleteImages.splice(index, 1)
                    imageNode.style.opacity = "1"
                }
            },

            getFilesOnChange(event) {
                this.files = event.target.files
            },
        },

        computed: {
            ...mapStores(storageStore, authStore),

            images() {
                return this.storageStore.images
            },

            hasImages() {
                return this.images.length > 0
            },

            user() {
                return this.authStore.user
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
            this.storageStore.getImagesUrl({storagePath: StoragePaths.GALLERY}).then(() => this.hasLoaded = true)
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