<template>
    <div class="dashboard d-flex flex-column flex-shrink-0 bg-gradient">
        <router-link to="/" class="brand-style d-flex align-items-center">
            <img src="../assets/bee.png" alt="" class="bee">
            <div class="headline-text" @click="setHome()" style="margin-left: 10px;">
                <span>Ringe & Omegns<br>Biavlerforening</span>
            </div>
        </router-link>
        <hr class="line">
        <ul class="nav nav-pills pills-style flex-column mb-auto">
            <DashboardItem icon="bi bi-house-door-fill" path="/om" text="Om os" @click="setNavActive()"
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
            <a href="https://minebier.dk/da/" target="_">
                <img src="../assets/minebier-logo.png" alt="" style="height: 30px; margin-bottom: 5px;" class="instagram-icon-link">
            </a>
            <!-- <IconLink to="https://minebier.dk/da/" class="instagram-icon-link"></IconLink> -->
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
                    about: false,
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
            setHome() {
                this.active = {
                    ...this.active = false
                }
                this.active['about'] = true
            },

            setNavActive() {
                this.active = {
                    ...this.active = false
                }
                this.active[this.$route.name] = true
            }
        },

        mounted() {
            setTimeout(() => {
                if (this.$route.name === 'home') {
                    this.setHome()
                } else {
                    this.setNavActive()
                }
            }, 500)
        }
    }
</script>

<style>
    .dashboard {
        background-color: #f3ac19;
        width: 260px; /* this value must match margin-left at app.vue */
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

    .fb-icon-link {
        color: #656563;
    }

    .fb-icon-link:hover {
        color: #4267B2;
        opacity: 1!important;
        cursor: pointer;
    }

    /* bee link */
    .instagram-icon-link {
        /* color: #656563!important; */
    }
    
    /* bee link */
    .instagram-icon-link:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    /* media-q for smaller screen sizes */
    @media only screen and (max-width: 1140px) {
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

        .brand-style {
            margin-bottom: 20px;
        }
    }
</style>