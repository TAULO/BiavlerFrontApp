<template>
    <div class="container d-flex justify-content-center">
        <form class="d-flex flex-column justify-content-center">
            <div v-show="!user.loggedIn">
                <div class="mb-3">
                    <label class="form-label">Brugernavn</label>
                    <input class="form-control" type="email" v-model="email">
                </div>
                <div class="mb-3">
                    <label class="form-label">Kodeord</label>
                    <input class="form-control" type="password" v-model="password">
                </div>
            </div>
            <button @click.prevent="signIn()" type="submit" class="btn btn-primary mb-3"
                v-if="!user.loggedIn" data-bs-dismiss="alert">log på</button>
                <h3 v-show="user.loggedIn">
                    Du er logget ind
                </h3>
        </form>
    </div>
</template>

<script>
    import { authStore } from '@/store'
    import { mapStores } from 'pinia'
    import { toastSuccess, toastError } from '../services/toasty.js'

    export default {
        name: "admin-route",
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            async signIn() {
                try {
                    await this.authStore.logIn({ email: this.email, password: this.password })
                    toastSuccess('Logget ind som: ' + this.email)
                } catch(e) {
                    console.log(e)
                    toastError('Forkert email eller kodeord', 5000)
                }

            },
        },
        computed: {
            ...mapStores(authStore),
            
            user() {
                return this.authStore.user
            },
        },
    }
</script>

<style scoped>

</style>