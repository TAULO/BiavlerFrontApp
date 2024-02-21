<template>
    <div class="main">
        <Dashboard></Dashboard>
        <div class="container-fluid">
            <Header></Header>
            <div class="hero">
                <router-view></router-view>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { authStore } from '@/store';
    import Dashboard from './components/Dashboard.vue';
    import Header from './components/Header.vue';
    import Footer from './components/Footer.vue';

    export default {
        name: 'App',
        components: {
            Dashboard,
            Header,
            Footer
        },
        computed: {
            ...mapStores(authStore)
        },

        beforeMount() {
            this.authStore.authChanged()
        }
    }
</script>

<style>
    .main {
        display: flex;
        flex-wrap: nowrap;
        height: 100vh;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: scroll;
        margin-left: 260px; /* same as the width of the sidenav */
    }

    body {
        margin: 0;
        line-height: 1.5;
        background-color: #f4f4f4;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
    }

    a {
        text-decoration: none;
    }

    .hero {
        height: 80%;
        width: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }

    /* media-q for smaller screen sizes */
    @media only screen and (max-width: 1140px) {
        .main {
            display: flex;
            flex-wrap: nowrap;
            height: 100vh;
            max-height: 100vh;
            overflow-x: auto;
            overflow-y: scroll;
            margin-left: 50px; /* same as the width of the sidenav */
        }
    }
</style>