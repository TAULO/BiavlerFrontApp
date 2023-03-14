<template>
    <div class="container d-flex flex-column justify-content-center align-items-center">
        <h2 class="display-6">Kommende begivenheder (under udvikling)</h2>
        <button v-if="user.loggedIn" class="btn btn-warning m-3" data-bs-toggle="modal"
            data-bs-target="#addEventModal">Tilføj ny begivenhed
        </button>
        <div class="modal modal-lg fade" id="addEventModal">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addEventModal">Tilføj ny begivenhed</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Overskrift</span>
                            <input type="text" class="form-control" aria-label="Username" v-model="event.title"
                                aria-describedby="basic-addon1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Start tidspunkt</span>
                            <input type="datetime-local" class="form-control" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="event.startDate">
                            <span class="input-group-text" id="basic-addon1">Slut tidspunkt (optimal)</span>
                            <input type="datetime-local" class="form-control" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="event.endDate">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Beskrivelse</span>
                            <textarea class="form-control" v-model="event.description"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Luk</button>
                        <button type="button" class="btn btn-warning" @click="addEvent()">Tilføj</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="hasLoaded">
            <div class="m-4 card p-1" v-for="(event, index) in events" :key="index">
                <div class="card-body whitespace-fix">
                    <div class="d-flex justify-content-end" v-if="user.loggedIn" @click="deleteEvent(event.id, event.title)">
                        <i class="bi bi-trash-fill position-absolute"></i>
                    </div>
                    <h5 class="card-title">
                        {{ event.title }}
                    </h5>
                    <div class="d-flex" v-if="event.endDate !== null">
                        <h6 class="card-subtitle mb-2 text-muted">{{ event.startDate?.replace("T", " ") }}</h6>
                        <h6 class="card-subtitle text-muted mx-1">til</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{{ event.endDate?.replace("T", " ") }}</h6>
                    </div>
                    <h6 v-else class="card-subtitle mb-2 text-muted">{{ event.startDate?.replace("T", " ") }}</h6>
                    <p class="card-text">
                        {{ event.description }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "calender-route",
        data() {
            return {
                hasLoaded: false,
                event: {
                    title: "",
                    startDate: null,
                    endDate: null,
                    description: "",
                    id: ""
                },
            }
        },

        computed: {
            user() {
                return this.$store.getters.user
            },

            events() {
                return this.$store.getters.events
            }
        },
    
        // TODO: move add event methods to state 
        methods: {
            addEvent() {
                const { title, startDate, endDate, description } = this.event
                this.$store.dispatch('addEvent', { title, startDate, endDate, description })
                this.clearInputFields()
            },

            deleteEvent(docId, eventTitle) {
                if(confirm("Er du sikker på at du vil slette " + eventTitle + "?")) {
                    this.$store.dispatch('deleteEvent', { docId })
                }
            },

            clearInputFields() {
                this.event = {
                    title: "",
                    startDate: null,
                    endDate: null,
                    description: ""
                }
            }
        },

        created() {
            this.$store.dispatch('fetchEvents')
                .then(() => {
                    this.hasLoaded = true
                })
        }
    }
</script>
<style scoped>
    i {
        margin-right: 10px;
    }

    i:hover {
        color: red;
        opacity: 0.5;
        cursor: pointer;
    }

    .whitespace-fix {
        white-space: pre-line;
    }   

    textarea {
        height: 200px;
    }
</style>