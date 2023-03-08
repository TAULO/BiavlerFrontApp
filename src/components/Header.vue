<template>
    <header class="container-fluid">
        <img src="../assets/flyingBee.png" alt="" class="bee float-end">
    </header>
</template>
<script>
export default {
    name: "header-comonent",
    beforeMount() {
        this.$store.dispatch('authChanged')
    }
}
</script>
<style scoped>
   
    .bee {
        height: 100px;
        transform: rotate(260deg);
    }
    header {
        width: 100%;
        height: 100px;
    }
</style>