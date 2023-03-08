<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
export default {
    name: "about-route",
    computed: {
        user () {
            return this.$store.getters.user
        }
    }
}

</script>

<style>

</style>