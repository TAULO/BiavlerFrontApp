<template>
    <li class="nav-item">
        <router-link :to="path" :class="isActive ? 'nav-link active' : 'nav-link'">
            <i :class="icon"></i>
            <div class="nav-link-text">{{ text }}</div>
        </router-link>
    </li>
</template>

<script>
    export default {
        name: "dashboard-item-component",
        props: {
            text: String,
            path: String,
            isActive: Boolean,
            icon: String
        }
    }
</script>

<style scoped>
    .nav-link {
        color: #656563;
        display: flex;
    }

    .nav-link:hover,
    .nav-link:active {
        background-color: #f4f4f4;
    }

    i {
        margin-right: 10px;
    }

    /* media-q for smaller screen sizes */
    @media only screen and (max-width: 767px) {
        .nav-link-text {
            display: none;
        }

        div {
            padding: 0px;
        }
    }
</style>