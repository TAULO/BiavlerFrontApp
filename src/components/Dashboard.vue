<template>
    <div class="dashboard d-flex flex-column flex-shrink-0 bg-gradient">
        <router-link to="/" class="brand-style d-flex align-items-center mb-3 mb-md-0 me-md-auto test">
            <img src="../assets/bee.png" alt="" class="bee">
            <div class="headline-text">
                <span>RINGE OG OMEGNS <br> BIAVLERFORENING</span>
            </div>
        </router-link>
        <hr class="line">
        <ul class="nav nav-pills pills-style flex-column mb-auto">
            <DashboardItem icon="bi bi-house-door-fill test" path="/om" text="Om os" @click="setNavActive()"
                :isActive="active.about"></DashboardItem>
            <DashboardItem icon="bi bi-mortarboard-fill" path="/kursus" text="Kursus i biavl" @click="setNavActive()"
                :isActive="active.course"></DashboardItem>
            <DashboardItem icon="bi bi-calendar2-event-fill icon-" path="/kalender" text="Kalender"
                @click="setNavActive()" :isActive="active.calender"></DashboardItem>
            <DashboardItem icon="bi bi-people-fill" path="/bestyrelse" text="Bestyrelse" @click="setNavActive()"
                :isActive="active.committee"></DashboardItem>
            <DashboardItem icon="bi bi-collection-fill" path="/aaret-i-bigaarden" text="Året i bigården"
                @click="setNavActive()" :isActive="active.apiary"></DashboardItem>
            <DashboardItem icon="bi bi-book-half" path="/opskrifter" text="Opskrifter" @click="setNavActive()"
                :isActive="active.recipes"></DashboardItem>
            <DashboardItem icon="bi bi-images" path="/galleri" text="Galleri" @click="setNavActive()"
                :isActive="active.galleri"></DashboardItem>
        </ul>
        <hr class="line">
        <div class="icon-link">
            <IconLink to="https://www.facebook.com/groups/391008191016453" icon="bi bi-facebook" class="fb-icon-link">
            </IconLink>
            <!-- <a href="">min bier</a> -->
            <IconLink to="" icon="bi bi-instagram" class="instagram-icon-link"></IconLink>
        </div>
    </div>
</template>

<script>
    import DashboardItem from './DashboardItem.vue';
    import IconLink from './IconLink.vue';

    export default {
        name: 'dashboard-component',
        data() {
            return {
                active: {
                    about: true,
                    course: false,
                    calender: false,
                    committee: false,
                    apiary: false,
                    recipes: false,
                    galleri: false
                }
            }
        },
        components: {
            DashboardItem,
            IconLink
        },
        methods: {
            setNavActive() {
                this.active = {
                    ...this.active = false
                }
                this.active[this.$route.name] = true
            }
        }
    }
</script>

<style>
    .dashboard {
        background-color: #f3ac19;
        width: 280px;
        /* this value must match margin-left at app.vue */
        height: 100%;
        overflow-x: hidden;
        position: fixed;
        top: 0;
        left: 0;
        padding: 1rem;
    }

    .line {
        color: #6a6e69
    }

    a {
        text-decoration: none;
        color: #6a6e69
    }

    .nav-pills .nav-link.active {
        background-color: #f4f4f4;
        color: #656563;
    }

    .brand-style {
        color: #656563;
        font-weight: bold;
    }

    .button {
        font-size: 20px;
        color: #656563;
    }

    .icon-link {
        display: flex;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0px;
        padding: 0px;
    }

    .bee {
        width: 50px; 
        height: 50px;
    }

    /* media-q for smaller screen sizes */
    @media only screen and (max-width: 767px) {
        .dashboard {
            background-color: #f3ac19;
            width: 50px;
            /* this value must match margin-left at app.vue */
            height: 100%;
            overflow-x: hidden;
            position: fixed;
            top: 0;
            left: 0;
            padding: 0px;
        }

        .fb-icon-link {
            margin-left: 21px;
            margin-bottom: 20px;
        }

        .instagram-icon-link {
            display: none;
        }       

        .headline-text {
            display: none;
        }

        .bee {
            height: 35px;
            width: auto;
            transform: translate(7px, 10px);
        }

        .line {
            margin: 5px;
        }
    }
</style>