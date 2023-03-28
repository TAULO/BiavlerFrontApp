<template>
    <div class="container d-flex flex-column align-items-center">
        <h2 class="display-6 mb-5 text-center">Bestyrrelse (under udvikling)</h2>
        <!-- ADMIN -->
        <button v-if="user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal"
            data-bs-target="#addCommitteeModal">Tilføj ny bestyrrelsesmedlem
        </button>
        <!-- modal -->
        <div class="modal fade modal-lg" id="addCommitteeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addCommitteeModal">Tilføj ny bestyrrelsesmedlem</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%"  id="basic-addon1">Navn</span>
                            <input type="text" class="form-control"
                                aria-describedby="basic-addon1" v-model="committeeMember.name">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%" id="basic-addon1">Rolle</span>
                            <input class="form-control"
                            aria-describedby="basic-addon1" v-model="committeeMember.role">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%" >Bio</span>
                            <textarea class="form-control" v-model="committeeMember.bio"></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%"  id="basic-addon1">e-mail</span>
                            <input type="email" class="form-control"
                            aria-describedby="basic-addon1" v-model="committeeMember.email">
                        </div>
                        <div class="input-group mb-3">
                            <!-- <label class="input-group-text btn btn-secondary border-1" for="files">vælg billede</label> -->
                            <input id="files" type="file" @change="getFilesOnChange($event)" >
                        </div>
                        <div class="d-flex flex-column justify-content-center align-content-center">
                            <p>Forhåndsvisning:</p>
                            <div class="">
                                <CommitteeMember :name=this.committeeMember.name :role="this.committeeMember.role" :bio="this.committeeMember.bio" :email="this.committeeMember.email" :image=imgSrc></CommitteeMember>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button class="btn btn-warning" @click="addCommitteeMember()">Tilføj</button>
                        <!-- <button class="btn btn-warning">Ændre</button> -->
                    </div>
                </div>
            </div>
        </div>
        <CommitteeMember name="Eksempel" role="Bestyrelsesmedlem" bio="Bio" email="foo@gmail.com" image="Bee.png"></CommitteeMember>
    </div>
</template>
<script>
    import CommitteeMember from '@/components/CommitteeMember.vue';

    export default {
        name: "committee-route",

        data() {
            return {
                committeeMember: {
                    name: "",
                    role: "",
                    bio: "",
                    email: "",
                    imgFile: "",
                    id: ""
                },
            }
        },

        components: {
            CommitteeMember
        },
        
        computed: {
            user() {
                return this.$store.getters.user
            },
        },

        methods: {
            addCommitteeMember() {
                console.log(this.committeeMember)
            },

            getFilesOnChange(event) {
                this.committeeMember.imgFile = event.target.files[0]
            }
        }
    }
</script>
<style scoped>
</style>