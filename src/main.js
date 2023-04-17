import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuex from 'vuex'
import store from './store'
import MasonryWall from '@yeger/vue-masonry-wall'




createApp(App).use(router).use(Vuex).use(store).use(MasonryWall).mount('#app')
