<template>
    <div class="dashboard d-flex flex-column flex-shrink-0 p-3 bg-gradient">
        <router-link to="/" class="brand-style d-flex align-items-center mb-3 mb-md-0 me-md-auto"> 
            <img src="../assets/bee.png" alt="" width="50" height="50">
            <span>RINGE OG OMEGNS <br> BIAVLERFORENING</span>
        </router-link>
        <hr class="line">
        <ul class="nav nav-pills pills-style flex-column mb-auto">
            <DashboardItem icon="bi bi-house-door-fill" path="/om" text="Om os" :isActive="isActive"></DashboardItem>
            <DashboardItem icon="bi bi-mortarboard-fill" path="/kursus" text="Kursus i biavl"></DashboardItem>
            <DashboardItem icon="bi bi-calendar2-event-fill" path="/kalender" text="Kalender"></DashboardItem>
            <DashboardItem icon="bi bi-people-fill" path="/bestyrelse" text="Bestyrelse"></DashboardItem>
            <DashboardItem icon="bi bi-collection-fill" path="/aaret-i-bigaarden" text="Året i bigården"></DashboardItem>
            <DashboardItem icon="bi bi-book-half" path="/opskrifter" text="Opskrifter"></DashboardItem>
            <DashboardItem icon="bi bi-images" path="/galleri" text="Galleri"></DashboardItem>
        </ul>
        <hr class="line">
        <div class="icon-link">
            <IconLink to="https://www.facebook.com/groups/391008191016453" icon="bi bi-facebook"></IconLink>
            <!-- <a href="">minebier.dk</a> -->
            <IconLink to="" icon="bi bi-instagram"></IconLink>
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
            isActive: true,
        }
     },
     components: {
        DashboardItem,
        IconLink
     }
   }
</script>

<style>
    .dashboard {
        background-color: #f3ac19;
        width: 280px;
        height: 100%;
        overflow-x: hidden;
        position: fixed;
        top: 0;
        left: 0;
    }
    .line{
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
</style>
   