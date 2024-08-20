import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VueCookies from 'vue-cookies'

createApp(App).use(VueCookies).mount('#app')
