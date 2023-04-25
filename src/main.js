import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import MasonryWall from '@yeger/vue-masonry-wall'

const pinia = createPinia()

createApp(App).use(router).use(MasonryWall).use(pinia).mount('#app')
