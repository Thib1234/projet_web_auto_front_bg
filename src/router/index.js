import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

// Gardes de route
const requireAuth = (to, from, next) => {
  const { isLoggedIn } = useAuth()
  
  if (!isLoggedIn.value) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const requireAdmin = (to, from, next) => {
  const { isLoggedIn, user } = useAuth() // Changé: récupérer user aussi
  
  if (!isLoggedIn.value) { // Changé: ajouter .value
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    // Changé: vérifier les rôles correctement
    const isAdmin = user.value?.roles?.some(role => role.name === 'admin') || false
    if (!isAdmin) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}

const redirectIfAuthenticated = (to, from, next) => {
  const { isLoggedIn } = useAuth() // Changé: utiliser destructuring pour cohérence
  
  if (isLoggedIn.value) { // Changé: ajouter .value
    next({ name: 'home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  
  // Routes publiques des annonces
  {
    path: '/ads',
    name: 'car-listings',
    component: () => import('@/views/CarListings.vue')
  },
  {
    path: '/ads/:id',
    name: 'car-details',
    component: () => import('@/views/CarDetails.vue'),
    props: true
  },
  
  // Routes d'authentification (redirige si déjà connecté)
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: redirectIfAuthenticated,
    meta: { 
      title: 'Connexion',
      hideNavigation: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    beforeEnter: redirectIfAuthenticated,
    meta: { 
      title: 'Inscription',
      hideNavigation: true
    }
  },
  
  // Routes protégées (nécessitent une authentification)
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Mon profil',
      requiresAuth: true
    }
  },
  {
    path: '/my-ads',
    name: 'my-ads',
    component: () => import('@/views/MyAds.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Mes annonces',
      requiresAuth: true
    }
  },
  {
    path: '/ads/create',
    name: 'create-ad',
    component: () => import('@/views/CreateAd.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Créer une annonce',
      requiresAuth: true
    }
  },
  {
    path: '/ads/:id/edit',
    name: 'edit-ad',
    component: () => import('@/views/EditAd.vue'),
    beforeEnter: requireAuth,
    props: true,
    meta: { 
      title: 'Modifier l\'annonce',
      requiresAuth: true
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/views/Favorites.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Mes favoris',
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Mon panier',
      requiresAuth: true
    }
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/Transactions.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Mes transactions',
      requiresAuth: true
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/Checkout.vue'),
    beforeEnter: requireAuth,
    meta: { 
      title: 'Commande',
      requiresAuth: true
    }
  },
  
  // Routes administrateur
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    beforeEnter: requireAdmin,
    meta: { 
      title: 'Administration',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/views/admin/AdminUsers.vue'),
    beforeEnter: requireAdmin,
    meta: { 
      title: 'Gestion des utilisateurs',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/admin/contacts',
    name: 'admin-contacts',
    component: () => import('@/views/admin/AdminContacts.vue'),
    beforeEnter: requireAdmin,
    meta: { 
      title: 'Messages de contact',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  
  // Route de contact (publique)
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue'),
    meta: { 
      title: 'Nous contacter'
    }
  },
  
  // Route 404 (doit être en dernier)
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { 
      title: 'Page non trouvée'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard global pour gérer les titres de page
router.beforeEach((to, from, next) => {
  // Mettre à jour le titre de la page
  if (to.meta.title) {
    document.title = `${to.meta.title} - Mon App`
  } else {
    document.title = 'Mon App'
  }
  
  next()
})

// Guard global pour vérifier l'authentification au chargement
router.beforeEach(async (to, from, next) => {
  const { user, initAuth } = useAuth() // Changé: utiliser destructuring cohérent
  
  // Si c'est le premier chargement et qu'on a un token, initialiser l'auth
  if (!user.value && localStorage.getItem('token')) { // Changé: ajouter .value
    try {
      await initAuth()
    } catch (error) {
      console.error('Erreur d\'initialisation de l\'authentification:', error)
    }
  }
  
  next()
})

export default router