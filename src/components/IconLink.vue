<template>
    <a type="button" :href="to" target="_blank">
        <i :class="icon"></i>
    </a>
</template>

<script>
    export default {
        name: "icon-link-comp",
        props: {
            to: String,
            icon: String
        }
    }
</script>

<style scoped>
    a {
        margin-right: 20px;
    }
    a:hover {
        opacity: 0.5;
    }
</style>