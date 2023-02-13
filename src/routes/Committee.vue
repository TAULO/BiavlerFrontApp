<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2>Bestyrrelse</h2>
        <div class="d-flex">
            <CommitteeMember></CommitteeMember>
        </div>
    </div>
</template>
<script>
    import CommitteeMember from '@/components/CommitteeMember.vue';

    export default {
        name: "committee-route",
        components: {
            CommitteeMember
        }
    }
</script>
<style scoped>
</style>