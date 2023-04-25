<template>
    <div class="container d-flex justify-content-center">
        <form class="d-flex flex-column justify-content-center">
            <div class="mb-3">
                <label class="form-label">Brugernavn</label>
                <input class="form-control" type="email" v-model="email">
            </div>
            <div class="mb-3">
                <label class="form-label">Kodeord</label>
                <input class="form-control" type="password" v-model="password">
            </div>
            <button @click.prevent="signIn()" type="submit" @click="test" class="btn btn-primary mb-3"
                v-if="!user.loggedIn" data-bs-dismiss="alert">log på</button>
            <button @click="signOut()" class="btn btn-primary mb-3 btn-danger" v-show="user.loggedIn">log ud</button>
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
                    toastError('Forkert email eller kodeord')
                }

            },
            async signOut() {
                try {
                    await this.authStore.logOut()
                    toastSuccess('Du er logget ud')
                } catch(e) {
                    toastError('Der skete en fejl')
                }
            }
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