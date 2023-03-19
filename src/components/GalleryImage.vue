<template>
    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <!-- <div class="d-flex justify-content-end text-warning" v-if="user.loggedIn" @click="$emit('deleteImage')">
            <i class="bi bi-x-circle-fill position-absolute m-2"></i>
        </div> -->
        <img v-if="user.loggedIn" :src="imgUrl" class="w-100 shadow-1-strong rounded mb-4" :alt="title" @click="$emit('selectMultipleImages', $event)" />
        <img v-else :src="imgUrl" class="w-100 shadow-1-strong rounded mb-4" :alt="title" />
    </div>
</template>

<script>
    export default {
        name: "gallery-image-component",

        props: {
            title: String,
            imgUrl: String,
        },

        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    }
</script>

<style scoped>
    i:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    img:hover {
        opacity: 0.5;
        cursor: pointer;
    }
</style>