// router/guards.js
import { useAuthStore } from '@/stores/auth'

export const requireAuth = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export const requireAdmin = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else if (!authStore.isAdmin) {
    next({ name: 'Home' }) // Rediriger vers l'accueil si pas admin
  } else {
    next()
  }
}

export const redirectIfAuthenticated = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
}