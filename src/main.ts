import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/js/bootstrap'
import router from '@/router/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
