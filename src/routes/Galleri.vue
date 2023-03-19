<template>
    <div class="container">
        <div class="d-flex flex-column align-items-center text-center">
            <div class="display-6 mb-5">Galleri (under udvikling)</div>
            <div v-if="user.loggedIn">
                <input type="file" multiple @change="getFilesOnChange">
                <button v-show="hasFiles" @click="uploadImages($event)" class="btn btn-warning m-3">upload</button>
                <button v-if="hasDeletedImages" @click="deleteMultipleImages()" class="btn btn-warning m-3">slet markeret</button>
            </div>
            <template v-if="images.length > 0">
                <div class="row" v-if="this.hasLoaded">
                    <template v-for="(image, index) in images" :key="index">
                        <GalleryImage v-if="user.loggedIn" :imgUrl="image.url" :title="image.name" @deleteImage="deleteImage(image.name)" @selectMultipleImages="selectMultipleImages(image, $event)"></GalleryImage>
                        <GalleryImage v-else :imgUrl="image.url" :title="image.name"></GalleryImage>
                    </template>
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
    import GalleryImage from '@/components/GalleryImage.vue';

    export default {
        name: "galleri-route",
        data() {
            return {
                hasLoaded: false,
                files: [],
                deleteImages: [],
                isAdded: false
            }
        },

        components: {
            GalleryImage
        },

        methods: {
            uploadImages() {
                this.$store.dispatch('uploadImages', {
                    files: this.files
                })
                this.files = []
            },

            deleteImage(imageName) {
                this.$store.dispatch('deleteImage', {
                    imageName
                })
            },

            deleteMultipleImages() {
                this.$store.dispatch('deleteImages', {
                    images: this.deleteImages
                })
                this.deleteImages = []
            },

            selectMultipleImages(image, event) {
                const index = this.deleteImages.indexOf(image)

                if (index === -1) {
                    this.deleteImages.push(image)
                    event.target.style.opacity = "0.5"
                } else {
                    this.deleteImages.splice(index, 1)
                    event.target.style.opacity = "1"
                }
            },  

            getFilesOnChange(event) {
                this.files = event.target.files
            }
        },

        computed: {
            images() {
                return this.$store.getters.images
            },

            user() {
                return this.$store.getters.user
            },

            hasDeletedImages() {
                return this.deleteImages.length > 0
            },

            hasFiles() {
                return this.files.length > 0
            }
        },

        created() {
            this.$store.dispatch('getImagesUrl')
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

</style>