<template>
    <header class="container-fluid">
        <div class="position-absolute">
            <div v-if="user.loggedIn" class="mt-1">
                Du er logget ind som: {{ user.data.email }}
            </div>  
            <div>
                <button @click.prevent="signOut()" class="btn btn-danger mt-2" v-show="user.loggedIn">log ud</button>
            </div>
        </div>
        <!-- <hr> -->
        <img src="../assets/flyingBee.png" alt="" class="bee float-end">
    </header>
</template>

<script>
import { mapStores } from 'pinia';
import { authStore } from '@/store';
import { toastError, toastSuccess } from '../services/toasty.js'

    export default {
        name: "header-comonent",
        computed: {
            ...mapStores(authStore),

            user() {
                return this.authStore.user
            }
        },
        methods: {
            async signOut() {
                try {
                    await this.authStore.logOut()
                    toastSuccess('Du er logget ud')
                } catch(e) {
                    toastError('Der skete en fejl', 5000)
                }
            }
        }
    }
</script>

<style scoped>
    .bee {
        height: 100px;
        transform: rotate(260deg);
        width: auto;
        z-index: 999;
    }

    hr {
        transform: translateY(66px);
    }

    header {
        width: 100%;
        height: 100px;
    }

    @media only screen and (max-width: 1140px) {
        .bee {
            height: 80px;
            width: auto;
            transform: translateX(10px) rotate(300deg);
        }
    }

    @media only screen and (max-width: 720px) {
        .bee {
            height: 50px;
            width: auto;
            transform: translateX(10px) rotate(300deg);
        }
    }
</style>