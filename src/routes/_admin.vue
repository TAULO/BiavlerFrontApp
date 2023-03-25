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
                    await this.$store.dispatch("logIn", {
                        email: this.email,
                        password: this.password
                    })
                } catch(e) {
                    window.alert(e)
                }

            },
            async signOut() {
                await this.$store.dispatch('logOut')
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
        },
    }
</script>

<style scoped>

</style>