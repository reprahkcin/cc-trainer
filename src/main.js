import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store/store.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

store.dispatch('shuffleDeck');

createApp(App).use(store).mount('#app')