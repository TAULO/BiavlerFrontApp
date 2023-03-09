<template>
    <header class="container-fluid">
        <div v-if="user.loggedIn">
            Du er logget ind som: {{ user.data.email }}
        </div>
        <img src="../assets/flyingBee.png" alt="" class="bee float-end">
    </header>
</template>

<script>
    export default {
        name: "header-comonent",
        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    }
</script>

<style scoped>
    .bee {
        height: 100px;
        transform: rotate(260deg);
        width: auto;
    }

    header {
        width: 100%;
        height: 100px;
    }

    @media only screen and (max-width: 767px) {
        .bee {
            height: 50px;
            width: auto;
            transform: translateX(40px) rotate(300deg);
        }
    }
</style>