// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'
import { useAuth } from './composables/useAuth'

// Configuration globale d'axios
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8000'

// Vérifier si le token existe dans le localStorage
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Créer l'application
const app = createApp(App)
app.use(router)

// Initialiser l'authentification avec votre composable
const { initAuth } = useAuth()
initAuth().then(() => {
  app.mount('#app')
}).catch((error) => {
  console.error('Erreur lors de l\'initialisation:', error)
  app.mount('#app')
})