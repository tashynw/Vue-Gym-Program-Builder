import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createVuestic } from 'vuestic-ui'

createApp(App).use(router).use(createVuestic()).mount('#app')
