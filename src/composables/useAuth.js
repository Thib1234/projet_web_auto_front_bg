// src/composables/useAuth.js
import { ref, reactive, computed } from 'vue';
import axios from 'axios';

// URL de base de l'API
const apiBaseUrl = 'http://127.0.0.1:8000/api';

export function useAuth() {
  // État de l'authentification
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const errors = reactive({});
  const loading = ref(false);
  
  // Initialiser l'état d'authentification
  const initAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
      try {
        await getUser();
      } catch (error) {
        // Si l'API renvoie une erreur, le token est probablement invalide
        logout();
      }
    }
  };
  
  // Définir l'en-tête d'autorisation pour axios
  const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
  
  // Récupérer les données de l'utilisateur connecté
  const getUser = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/user`);
      user.value = response.data;
      return user.value;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error;
    }
  };
  
  // Connexion
  const login = async (credentials) => {
    loading.value = true;
    errors.value = {};
    
    try {
      // Connexion avec votre API
      const response = await axios.post(`${apiBaseUrl}/login`, credentials);
      
      // Stocker le token dans le localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.access_token);
        setAuthHeader(response.data.access_token);
      }
      
      // Stocker les données utilisateur
      if (response.data.user) {
        user.value = response.data.user;
      } else {
        // Si l'API ne renvoie pas directement l'utilisateur, récupérez-le
        await getUser();
      }
      
      return true;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      if (error.response && error.response.data) {
        // Gérer les erreurs de validation
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach(key => {
            errors[key] = error.response.data.errors[key][0];
          });
        } else if (error.response.data.message) {
          errors.global = error.response.data.message;
        }
      } else {
        errors.global = 'Une erreur est survenue. Veuillez réessayer.';
      }
      
      return false;
    } finally {
      loading.value = false;
    }
  };
  
  // Inscription
  const register = async (userData) => {
    loading.value = true;
    errors.value = {};
    
    try {
      // Inscription avec votre API
      const response = await axios.post(`${apiBaseUrl}/register`, userData);
      
      // Stocker le token dans le localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuthHeader(response.data.token);
      }
      
      // Stocker les données utilisateur
      if (response.data.user) {
        user.value = response.data.user;
      } else {
        // Si l'API ne renvoie pas directement l'utilisateur, récupérez-le
        await getUser();
      }
      
      return true;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      
      if (error.response && error.response.data) {
        // Gérer les erreurs de validation
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach(key => {
            errors[key] = error.response.data.errors[key][0];
          });
        } else if (error.response.data.message) {
          errors.global = error.response.data.message;
        }
      } else {
        errors.global = 'Une erreur est survenue. Veuillez réessayer.';
      }
      
      return false;
    } finally {
      loading.value = false;
    }
  };
  
  // Déconnexion
  const logout = async () => {
    try {
      // Appeler l'API de déconnexion si l'utilisateur est connecté
      if (isLoggedIn.value) {
        await axios.post(`${apiBaseUrl}/logout`);
      }
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    } finally {
      // Supprimer le token et nettoyer l'état
      localStorage.removeItem('token');
      setAuthHeader(null);
      user.value = null;
    }
  };
  
  return {
    user,
    isLoggedIn,
    errors,
    loading,
    login,
    register,
    logout,
    getUser,
    initAuth
  };
}