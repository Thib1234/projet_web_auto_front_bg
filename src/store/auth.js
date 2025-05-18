// stores/auth.js
import { defineStore } from 'pinia'
import { useAuth } from '@/composables/useAuth'

export const useAuthStore = defineStore('auth', () => {
  // Utiliser votre composable existant
  const auth = useAuth()

  // Exposer toutes les fonctionnalités de useAuth
  return {
    // État
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    errors: auth.errors,
    loading: auth.loading,
    
    // Actions
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
    getUser: auth.getUser,
    initAuth: auth.initAuth
  }
})