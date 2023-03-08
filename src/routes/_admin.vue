<template>
    <div class="container d-flex justify-content-center">
        <form @submit.prevent="signIn()" class="d-flex flex-column justify-content-center">
            <div class="mb-3">
                <label class="form-label">Brugernavn</label>
                <input class="form-control" type="email" v-model="email">
            </div>
            <div class="mb-3">
                <label class="form-label">Kodeord</label>
                <input class="form-control" type="password" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary mb-3">log på</button>
            <button @click="this.$store.dispatch('logOut')" class="btn btn-primary mb-3" v-show="user.loggedIn">log ud</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "admin-route",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        signIn() {
            this.$store.dispatch("logIn", {email: this.email, password: this.password})
        }
    }, 
    computed: {
        user() {
            return this.$store.getters.user
        }
    }
}
</script>

<style>

</style>