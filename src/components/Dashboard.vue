<template>
    <div class="dashboard-nav">
    <header>
        <router-link to="/" class="brand-logo"><i class="fas fa-anchor"></i> <span>RINGE OG OMEGNS <br> BIAVLERFORENING</span></router-link>
    </header>
        <div class="nav-item-divider"></div>
        <DashboardItem path="/om" text="Om os" :isActive="isActive"></DashboardItem>
        <DashboardItem path="/kursus" text="Kursus i biavling"></DashboardItem>
        <DashboardItem path="/kalender" text="Kalender"></DashboardItem>
        <DashboardItem path="/bestyrelse" text="Bestyrelse"></DashboardItem>
        <DashboardItem path="/aaret-i-bigaarden" text="Året i bigården"></DashboardItem>
        <DashboardItem path="/opskrifter" text="Opskrifter"></DashboardItem>
        <DashboardItem path="/galleri" text="Galleri"></DashboardItem>
    </div>
</template>
   
<script>
    import DashboardItem from './DashboardItem.vue';

   export default {
     name: 'dashboard-component',
     data() {
        return {
            isActive: true
        }
     },
     components: {
        DashboardItem,
     }
   }
</script>
   
<style scoped>
   .dashboard-nav {
       min-width: 238px;
       position: fixed;
       left: 0;
       top: 0;
       bottom: 0;
       overflow: auto;
   }
   
   .dashboard-compact .dashboard-nav {
       display: none;
   }
   
   .dashboard-nav header {
       min-height: 84px;
       padding: 8px 27px;
       display: -webkit-box;
       display: -webkit-flex;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-pack: center;
       -webkit-justify-content: center;
       -ms-flex-pack: center;
       justify-content: center;
       -webkit-box-align: center;
       -webkit-align-items: center;
       -ms-flex-align: center;
       align-items: center;
   }
   .dashboard-nav header .menu-toggle {
       display: none;
       margin-right: auto;
   }
   .dashboard-nav a {
       color: #515151;
   }
   .dashboard-nav a:hover {
       text-decoration: none;
   }
   .dashboard-nav {
       background-color: #eb9a0b;
   }
   .dashboard-nav a {
       color: #fff;
   }
   .brand-logo {
    margin-top: 18px;
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    font-size: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    color: #515151;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
   }
    .brand-logo:focus, .brand-logo:active, .brand-logo:hover {
    color: #dbdbdb;
    text-decoration: none;
   }
   
   .brand-logo i {
    color: #d2d1d1;
    font-size: 27px;
    margin-right: 10px;
   }
   
   .dashboard-nav .dashboard-nav-dropdown-toggle:after {
    border-top-color: rgba(255, 255, 255, 0.72);
   }
   
   .menu-toggle:hover, .menu-toggle:active, .menu-toggle:focus {
    text-decoration: none;
    color: #875de5;
   }

   .nav-item-divider {
    height: 1px;
    margin: 1rem 0;
    overflow: hidden;
    background-color: rgba(236, 238, 239, 0.3);
   }
   
   @media (max-width: 992px) {
    .dashboard-nav {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1070;
    }

    .dashboard-nav.mobile-show {
        display: block;
    }
}
   
   @media (max-width: 992px) {
    .dashboard-nav header .menu-toggle {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
}
</style>
   