<template>
    <div class="container d-flex flex-column align-items-center text-center">
        <!-- <div class="display-6 mb-5">Året i Bigården</div> -->
        <div>Kommer snart...</div>
        <!-- ADMIN -->
        <!-- <button v-if="user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal"
            data-bs-target="#addCommitteeModal">Tilføj ny bestyrrelsesmedlem
        </button> -->
        <!-- modal -->
        <!-- <div class="modal fade modal-lg" id="addCommitteeModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addCommitteeModal">Tilføj ny bestyrrelsesmedlem</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%" id="basic-addon1">Navn</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%" id="basic-addon1">Rolle</span>
                            <input class="form-control" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%">Bio</span>
                            <textarea class="form-control"></textarea>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="min-width: 10%" id="basic-addon1">e-mail</span>
                            <input type="email" class="form-control" aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <input id="files" type="file">
                        </div>
                        <div class="d-flex flex-column justify-content-center align-content-center">
                            <p>Forhåndsvisning:</p>
                            <div class="">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button class="btn btn-warning">Tilføj</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    export default {
        name: "apiary-route",
        computed: {
            user() {
                return this.$store.getters.user
            },
        },
    }
</script>
<style>

</style>