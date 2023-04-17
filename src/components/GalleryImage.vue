<template>
    <!-- <div class="col-lg-4 col-md-6 col-sm-12 mb-4"> -->
        <div class="d-flex justify-content-end position-relative" v-if="user.loggedIn"
            @click="$emit('selectMultipleImages', $event)">
            <i class="bi bi-x-circle-fill m-2 me-3 fs-2 position-absolute text-warning delete-icon"></i>
        </div>
        <img :src="imgUrl" class="w-100 shadow rounded" :alt="title" :data-bs-target="modalTarget"
            data-bs-toggle="modal" :ref="imgUrl"/>
    <!-- </div> -->
</template>

<script>
    export default {
        name: "gallery-image-component",

        props: {
            title: String,
            imgUrl: String,
            modalTarget: String,
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

    /* img {
        max-height: 100px!important;
        max-height: 400px;
        object-fit: cover;
    } */

    img:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    .delete-icon {
        z-index: 10;
    }
</style>