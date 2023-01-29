<template>
    <li class="nav-item">
        <router-link :to="path" :class="isActive ? 'nav-link active' : 'nav-link'">
            <i :class="icon"></i>{{ text }} 
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
        color:#656563;
    }
    .nav-link:hover,
    .nav-link:active {
        background-color: #f4f4f4;
    }

    i {
        margin-right: 10px;
    }
</style>