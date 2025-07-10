import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import AppNavbar from './components/Navbar.vue'

const app = createApp(App)
app.component('AppNavbar', AppNavbar) // đăng ký global component AppNavbar
app.mount('#app')
