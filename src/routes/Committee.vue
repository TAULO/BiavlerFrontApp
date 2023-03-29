<template>
    <div class="container d-flex flex-column">
        <h2 class="display-6 mb-5 text-center">Bestyrrelse (under udvikling)</h2>
        <!-- ADMIN -->
        <button v-if="user.loggedIn" class="btn btn-warning m-3 align-self-center" data-bs-toggle="modal"
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
                        <div class="d-flex flex-column justify-self-center">
                            <p>Forhåndsvisning:</p>
                            <div class="col-lg-5">
                                <CommitteeMember :name="this.committeeMember.name || 'Navn'" :role="this.committeeMember.role || 'Rolle'" :bio="this.committeeMember.bio || 'Bio'" :email="this.committeeMember.email || 'eksempel@mail.dk'" :image="this.committeeMember.imgSrc || 'https://randomuser.me/api/portraits/men/62.jpg'"></CommitteeMember>
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
        <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-5 col-md-6 col-sm-10">
                <CommitteeMember :name="this.committeeMember.name || 'Navn'" :role="this.committeeMember.role || 'Rolle'" :bio="this.committeeMember.bio || 'Bio'" :email="this.committeeMember.email || 'eksempel@mail.dk'" :image="this.committeeMember.imgSrc || 'https://randomuser.me/api/portraits/men/62.jpg'"></CommitteeMember>
            </div>
        </div>
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