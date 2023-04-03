<template>
    <div class="card mb-3 text-center">
         <!-- ADMIN -->
        <div class="d-flex justify-content-end" v-if="user.loggedIn">
            <!-- <i class="bi bi-arrow-clockwise position-absolute" data-bs-toggle="modal" data-bs-target="#committeeModal" @click="$emit('openUpdateModal', id)" style="margin-right: 10%; margin-top: 2%;"></i> -->
            <i class="bi bi-trash-fill position-absolute" style="margin-right: 2%; margin-top: 2%;" @click="$emit('deleteCommitteeMember', id, name, image)"></i>
        </div>
        <!-- image -->
        <div v-if="hasLoadedImage" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <img v-else class="card-img-top rounded-circle align-self-center shadow-sm" :src="image" alt="">
       <div class="card-body">
            <h4 class="card-title">
                {{ name }}
            </h4>
            <div class="card-subtitle text-muted">
                {{ role }}
            </div>
            <hr>
            <p>{{ bio }}</p>
       </div>
       <div class="card-booter text-muted mb-2">
            {{ email }}
       </div>
    </div>
</template>
<script>
    export default {
        name: "committee-member-component",

        props: {
            hasLoadedImage: Boolean,
            isPreview: Boolean,

            image: String,
            name: String,
            role: String,
            bio: String,
            email: String,
            id: String
        },

        computed: {
            user() {
                return this.$store.getters.user
            },
        },
    }
</script>

<style scoped>
    .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        padding: 10px;
    }

    img {
        height: 130px;
        width: auto;
        object-fit: cover;
        border: 4px solid #fff;
    }

    i:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    @media only screen and (max-width: 500px) {
        .card-title {
            font-size: medium;
        }

        .card {
            /* width: 100%!important; */
            font-size: small;
        }
    }

    /* @media only screen and (max-width: 1100px) {
        img {
            height: 130px;
            width: auto;
            margin-bottom: 30px;
        }
    } */

</style>