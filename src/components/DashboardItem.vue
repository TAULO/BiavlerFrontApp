<template>
    <nav class="dashboard-nav-list">
        <router-link :to="path" :class="isActive ? 'dashboard-nav-item active' : 'dashboard-nav-item'">
            {{ text }} 
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "dashboard-item-component",
    props: {
        text: String,
        path: String,
        isActive: Boolean,
    }
}
</script>

<style scoped>
    .dashboard-nav-list {
       display: -webkit-box;
       display: -webkit-flex;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-orient: vertical;
       -webkit-box-direction: normal;
       -webkit-flex-direction: column;
       -ms-flex-direction: column;
       flex-direction: column;
   }
   .dashboard-nav-item {
       min-height: 56px;
       padding: 8px 20px 8px 70px;
       display: -webkit-box;
       display: -webkit-flex;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-align: center;
       -webkit-align-items: center;
       -ms-flex-align: center;
       align-items: center;
       letter-spacing: 0.02em;
       transition: ease-out 0.5s;
       color: #fff;
   }
   .dashboard-nav-item i {
       width: 36px;
       font-size: 19px;
       margin-left: -40px;
   }
   .dashboard-nav-item:hover {
       background: rgba(0, 0, 0, 0.1);
   }
   .active {
       background: rgba(0, 0, 0, 0.1);
   }
</style>