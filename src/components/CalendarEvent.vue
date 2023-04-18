<template>
    <div class="card m-4 p-3">
        <div class="card-body whitespace-fix">
            <!-- ADMIN -->
            <div class="d-flex justify-content-end" v-if="user.loggedIn">
                <i class="bi bi-arrow-clockwise position-absolute me-4" @click="$emit('openUpdateModal', id)"
                    data-bs-toggle="modal" data-bs-target="#addEventModal"></i>
                <i class="bi bi-trash-fill position-absolute" @click="$emit('deleteEvent', id, title)"></i>
            </div>
            <h5 class="card-title">
                {{ title }}
            </h5>
            <div class="d-flex">
                <h6 class="card-subtitle mb-4 text-muted">{{ dateConverter(startDate) }} </h6>
            </div>
            <!-- <div v-else class="mb-4 d-flex flex-column">
                <h6 class="card-subtitle text-muted">{{ dateConverter(startDate) }}</h6>
                <h6 class="card-subtitle text-muted mx-1 m-2"></h6>
                <h6 class="card-subtitle text-muted">{{ dateConverter(endDate) }}</h6>
            </div> -->
            <p class="card-text">
                {{ description }}
            </p>
            <!-- <div class="d-flex justify-content-end">
                <div class="btn btn-warning">Læs mere</div>
            </div> -->
        </div>
    </div>
</template>
<script>
    import { mapStores } from 'pinia'
    import { authStore } from '@/store'

    export default {
        name: "calendar-event-componnt",
        props: {
            id: String,
            title: String,
            startDate: String,
            endDate: String,
            description: String
        },

        computed: {
            ...mapStores(authStore),

            user() {
                return this.authStore.user
            },
        },

        methods: {
            dateConverter(dateString) {
                const danishDays = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
                const danishMonths = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August",
                    "September", "Oktober", "November", "December"
                ];

                // input date
                const date = new Date(dateString)
                const danishDay = danishDays[date.getDay()]
                const danishMonth = danishMonths[date.getMonth()]
                const dayOfMonth = date.getUTCDate()
                const year = date.getUTCFullYear()
                const month = date.getMonth()
                const hours = date.getHours()
                const minutes = date.getUTCMinutes()

                // current date
                const currDate = new Date(Date.now())
                const currDay = currDate.getDate()
                const currMonth = currDate.getMonth()

                if (currDay === dayOfMonth && currMonth === month) {
                    if (minutes !== 0) {
                        if (minutes < 10) {
                            return `I dag kl. ${hours}:0${minutes}`
                        } else {
                            return `I dag kl. ${hours}:${minutes}`
                        }
                    } else {
                        return `I dag kl. ${hours}`
                    }
                } else if (minutes !== 0) {
                    if (minutes < 10) {
                        return `${danishDay} d. ${dayOfMonth} ${danishMonth} ${year} kl. ${hours}:0${minutes}`
                    } else {
                        return `${danishDay} d. ${dayOfMonth} ${danishMonth} ${year} kl. ${hours}:${minutes}`
                    }
                } else {
                    return `${danishDay} d. ${dayOfMonth} ${danishMonth} ${year} kl. ${hours}`
                }
            },
        },
    }
</script>
<style scoped>
    .whitespace-fix {
        white-space: pre-line;
    }

    i:hover {
        opacity: 0.5;
        cursor: pointer;
    }
</style>