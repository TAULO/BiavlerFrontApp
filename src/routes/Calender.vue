<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2 class="display-6">Kommende begivenheder</h2>
        <button v-if="!user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal"
            data-bs-target="#addEventModal">Tilføj ny begivenhed
        </button>
        <div class="modal modal-lg fade" id="addEventModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addEventModal">Tilføj ny begivenhed</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Overskrift</span>
                            <input type="text" class="form-control" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Start tidspunkt</span>
                            <input type="datetime-local" class="form-control" aria-label="Username"
                                aria-describedby="basic-addon1">
                            <span class="input-group-text" id="basic-addon1">Slut tidspunkt (optimal)</span>
                            <input type="datetime-local" class="form-control" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Beskrivelse</span>
                            <textarea class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button type="button" class="btn btn-warning">Tilføj</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container m-4 card p-1" v-for="(item, index) in test" :key="index">
            <div class="card-body">
                <div class="d-flex justify-content-end" v-if="!user.loggedIn">
                    <i class="bi bi-trash-fill position-absolute"></i>
                </div>
                <h5 class="card-title">
                    {{ item.title }}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ item.date }}</h6>
                <p class="card-text">
                    {{ item.description }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "calender-route",
        data() {
            return {
                test: [{
                    id: 1,
                    title: "Test test",
                    date: "Lørdag d. 17 juni kl. 8:30",
                    description: "En grævling har gnavet sig ind til vinterkosttiskud 2014 med varmt forår var hvepseår og flere familier i Sødnge bigård belv røvet ud.2015 med meget koldt og vådt forår og sommeren var bogstavelig talt uden hvepse.  Dronningen rystes / flyttes ned i nederste kasse og gitteret flyttes ned på denne kasse, som bliverdet nye vinterleje. Bierne bygger måske dronningeceller over gitteret og det forklares, hvorfor det ikke udløser en sværm, men at det kan medføre andre konsekvenser, hvis disse dronningecellerikke fjernes efter dag 5 til 8. "
                }]
            }
        },

        computed: {
            user() {
                return this.$store.getters.user
            }
        }
    }
</script>
<style scoped>
i {
    margin-right: 10px;
}

i:hover {
    color:red;
    opacity: 0.5;
    cursor: pointer;
}

</style>