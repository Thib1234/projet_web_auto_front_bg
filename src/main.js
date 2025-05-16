import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

// Configuration globale d'axios
axios.defaults.withCredentials = true; // Important pour les cookies CSRF
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Remplacez par l'URL de votre API

// Vérifier si le token existe dans le localStorage
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Créer l'application
const app = createApp(App);
app.use(router);
app.mount('#app');