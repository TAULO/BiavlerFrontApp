<template>
    <div class="container d-flex flex-column align-items-center">
        <h2 class="display-6 mb-5 text-center">Bestyrrelse (under udvikling)</h2>
            <CommitteeMember name="Foobar Bar Foo" role="Bestyrelsesmedlem" bio="Sint ea enim ex velit quis aliqua nulla consequat mollit laboris nulla minim anim pariatur." email="foo@gmail.com" image="Bee.png"></CommitteeMember>
            <CommitteeMember name="Foobar Bar Foo" role="Bestyrelsesmedlem" bio="Sint ea enim ex velit quis aliqua nulla consequat mollit laboris nulla minim anim pariatur. Pariatur aliquip elit tempor esse nostrud do cillum dolore. Sint ea enim ex velit quis aliqua nulla consequat mollit laboris nulla minim anim pariatur. Pariatur aliquip elit tempor esse nostrud do cillum dolore. Sint reprehenderit qui amet velit duis eiusmod veniam anim ea est." email="foo@gmail.com" image="Bee.png"></CommitteeMember>
            <CommitteeMember name="Foobar Bar Foo" role="Bestyrelsesmedlem" bio="" email="foo@gmail.com" image="Bee.png"></CommitteeMember>
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