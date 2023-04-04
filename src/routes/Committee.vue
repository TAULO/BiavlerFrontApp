<template>
    <div class="container d-flex flex-column">
        <h2 class="display-6 mb-5 text-center">Bestyrelse</h2>
        <!-- ADMIN -->
        <button v-if="user.loggedIn" class="btn btn-warning m-3 align-self-center" data-bs-toggle="modal"
            data-bs-target="#committeeModal" @click="openCreateModal()">Tilføj ny bestyrelsesmedlem
        </button>
        <!-- modal -->
        <div class="modal fade modal-lg" id="committeeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 v-if="!shouldUpdate" class="modal-title fs-5" id="committeeModal">Tilføj ny bestyrelsesmedlem</h1>
                        <h1 v-else class="modal-title fs-5" id="committeeModal">Opdater bestyrelsesmedlem</h1>
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
                            <input id="files" type="file" @change="changeImageOnChange($event)" >
                        </div>
                        <div class="d-flex flex-column justify-self-center">
                            <p>Forhåndsvisning:</p>
                            <div class="col-lg-5">
                                <CommitteeMember :name="this.committeeMember.name || 'Navn'" :role="this.committeeMember.role || 'Rolle'" :bio="this.committeeMember.bio || 'Bio'" :email="this.committeeMember.email || 'eksempel@mail.dk'" :hasLoadedImage="hasLoadedImage" :image="this.previewImage?.url"></CommitteeMember>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button v-if="!shouldUpdate" class="btn btn-warning" @click="addCommitteeMember()">Tilføj</button>
                        <button v-else class="btn btn-warning" @click="updateCommitteeMember()">Ændre</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="hasCommitteeMembers" class="row justify-content-center">
            <template v-for="(member, index) in committeeMembers" :key="index">
                <div v-if="hasLoaded" class="col-xl-4 col-lg-5 col-md-10 col-sm-10">
                    <CommitteeMember :name="member.name" :role="member.role" :bio="member.bio" :email="member.email" :image="member.image.url" :id="member.id" :hasLoadedImage="this.hasLoadedImage" @deleteCommitteeMember="deleteCommitteeMember(member.id, member.name, member.image)" @openUpdateModal="openUpdateModal(member.id)"></CommitteeMember>
                </div>
                <div v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </template>
        </div>
        <div v-else class="d-flex justify-content-center">
            Ingen bestyrelsesmedlemmer tilføjet endnu
        </div>
    </div>
</template>
<script>
    import CommitteeMember from '@/components/CommitteeMember.vue';

    export default {
        name: "committee-route",

        data() {
            return {
                tempFileArr: [],
                shouldUpdate: false,
                hasLoaded: false,
                hasLoadedImage: false,
                previewImage: {},
                committeeMember: {
                    name: "",
                    role: "",
                    bio: "",
                    email: "",
                    image: {},
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

            images() {
                return this.$store.getters.images
            },

            committeeMembers() {
                return this.$store.getters.committeeMembers
            },

            hasCommitteeMembers() {
                return this.committeeMembers.length > 0
            }
        },

        methods: {
            async addCommitteeMember() {
                this.shouldUpdate = false
                let { name, role, bio, email, image } = this.committeeMember

                // returns the last item of array, which is the one I need
                // image = this.tempFileArr.pop()
                image = this.previewImage

                // context.dispatch('uploadImages', { storagePath: 'CommitteeMembers/', files: image })
                this.$store.dispatch('addCommitteeMember', {
                    name,
                    role,
                    bio,
                    email,
                    image
                }).then(async () => {
                    await this.$store.dispatch('deleteImages', {
                        storagePath: 'CommitteeMembers',
                        files: this.tempFileArr
                    })
                    this.clearInputFields()
                })
            },

            async deleteCommitteeMember(docId, name, image) {
                await this.$store.dispatch('deleteCommitteeMember', {
                    docId,
                    imageName: image.name
                })
            },
            
            async updateCommitteeMember() {
                const { id, name, role, bio, email, image } = this.committeeMember
                await this.$store.dispatch('updateCommitteeMember', {
                    docId: id,
                    name,
                    role,
                    bio,
                    email,
                    image
                })
                this.clearInputFields()
            },  

            async getCommitteeMember(docId) {
                return await this.$store.dispatch('getCommiteeMember', { docId })
            },

            changeImageOnChange(event) {
                this.previewImage = event.target.files[0]
                this.hasLoadedImage = true
                this.$store.dispatch('uploadImages', {
                    storagePath: 'CommitteeMembers',
                    files: this.previewImage
                }).then(async () => {
                    this.hasLoadedImage = true
                    const currFileURL = await this.$store.dispatch('getImageURL', {
                        storagePath: 'CommitteeMembers',
                        imageName: this.previewImage.name
                    })
                    this.hasLoadedImage = false
                    this.tempFileArr.push(this.previewImage)
                    this.previewImage = currFileURL
                })
            },

            fetchImage() {
                try {
                    return this.images
                } catch (e) {
                    console.log(e)
                    setTimeout(() => {
                        window.alert(e)
                        this.hasLoaded = true
                        this.error.hasError = true
                        this.error.message = e
                    }, 5000)
                }
            },

            openCreateModal() {
                this.shouldUpdate = false
                this.clearInputFields()
            }, 

            async openUpdateModal(docId) {
                this.shouldUpdate = true
                const currMember = await this.getCommitteeMember(docId)
                this.committeeMember = { ...currMember, id: docId }
                const { image } = this.committeeMember
                this.previewImage = image
            }, 

            clearInputFields() {
                this.committeeMember = {
                    name: "",
                    role: "",
                    bio: "",
                    email: "",
                    image: {},
                    id: ""
                }
            }
        },

        created() {
            this.$store.dispatch('fetchCommitteeMembers')
                .then(() => {
                    this.hasLoaded = true
            })
        }
    }
</script>
<style scoped>
</style>