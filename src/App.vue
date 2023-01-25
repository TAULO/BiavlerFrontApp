<template>
    <div class="dashboard">
        <Dashboard></Dashboard>
        <Header></Header>
        <div class="dashboard-app">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Dashboard,
    Header
  }
}
</script>

<style>
    a {
        text-decoration: none;
        background-color: transparent;
    }
    body {
        margin: 0;
        font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #515151;
        text-align: left;
        background-color: #efeff1
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
    }

   .dashboard {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    min-height: 100vh;
    }

.dashboard-app {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 2;
    -webkit-flex-grow: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    margin-top: 84px;
}

@media (min-width: 992px) {
    .dashboard-app {
        margin-left: 238px;
    }

    .dashboard-compact .dashboard-app {
        margin-left: 0;
    }
}


</style>


