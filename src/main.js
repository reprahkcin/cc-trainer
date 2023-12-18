import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store/store.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import the router from /src/router/index.js
import router from '@/router/index.js'

const app = createApp(App);

// Use the store and router plugins
app.use(store);
app.use(router);

// Mount the app after setting up plugins
app.mount('#app');

// Dispatch the 'shuffleDeck' action after mounting
store.dispatch('shuffleDeck');
store.dispatch('shufflePinochle');
