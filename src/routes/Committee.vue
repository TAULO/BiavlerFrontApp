<template>
    <div class="container">
        <h2 class="display-6 mb-5 text-center d-flex flex-column align-items-center">Bestyrrelse (under udvikling)</h2>
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <CommitteeMember name="Eksempel" role="Bestyrrelsemedlem" email="foo@gmail.com" image="Bee.png">
                </CommitteeMember>
            </div>
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