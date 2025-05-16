<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <span class="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
            <span class="ml-2 text-xl font-bold text-gray-800">AutoMarket</span>
          </router-link>
        </div>

        <!-- Navigation principale - Desktop -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.route"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-blue-600 font-semibold': isActive(item.route) }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Actions utilisateur -->
        <div class="flex items-center">
          <!-- Bouton "Déposer une annonce" -->
          <router-link
            to="/ads/create"
            class="mr-4 hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Déposer une annonce
          </router-link>

          <!-- Profil / Connexion -->
          <div v-if="isLoggedIn" class="relative">
            <button
              ref="userMenuButton"
              @click="toggleUserMenu"
              class="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
              aria-label="Menu utilisateur"
              :aria-expanded="userMenuOpen"
            >
              <span class="mr-1">{{ user.name }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Menu déroulant utilisateur -->
            <div
              v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <router-link
                v-for="item in userMenuItems"
                :key="item.name"
                :to="item.route"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {{ item.name }}
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Déconnexion
              </button>
            </div>
          </div>

          <router-link
            v-else
            to="/login"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
          >
            Connexion
          </router-link>

          <!-- Menu mobile (hamburger) -->
          <button
            @click="toggleMobileMenu"
            class="ml-4 md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Menu mobile"
            :aria-expanded="mobileMenuOpen"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
        <transition
        enter-active-class="transition-opacity ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="mobileMenuOpen" class="md:hidden py-2 space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.route"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            :class="{ 'text-blue-600 bg-gray-50': isActive(item.route) }"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>

          <router-link
            to="/ads/create"
            class="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 rounded-md"
            @click="mobileMenuOpen = false"
          >
            Déposer une annonce
          </router-link>

          <div v-if="isLoggedIn" class="border-t border-gray-200 pt-2 mt-2">
            <router-link
              v-for="item in userMenuItems"
              :key="item.name"
              :to="item.route"
              class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              @click="mobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
            <button
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

// État local
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const userMenuButton = ref(null);

// Route actuelle
const route = useRoute();
const router = useRouter();

// Utilisation du composable d'authentification
const { user, isLoggedIn, logout } = useAuth();

// Éléments de navigation
const navigationItems = [
  { name: 'Accueil', route: '/' },
  { name: 'Rechercher', route: '/ads' },
  { name: 'Comment ça marche', route: '/how-it-works' },
  { name: 'À propos', route: '/about' },
  { name: 'Contact', route: '/contact' },
];

// Éléments du menu utilisateur
const userMenuItems = [
  { name: 'Mon profil', route: '/profile' },
  { name: 'Mes annonces', route: '/my-ads' },
  { name: 'Mes favoris', route: '/favorites' },
  { name: 'Messages', route: '/messages' },
];

// Vérifier si un lien est actif
const isActive = (routePath) => {
  if (routePath === '/' && route.path === '/') {
    return true;
  }
  if (routePath !== '/' && route.path.startsWith(routePath)) {
    return true;
  }
  return false;
};

// Basculer le menu mobile
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value && userMenuOpen.value) {
    userMenuOpen.value = false;
  }
};

// Basculer le menu utilisateur
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

// Déconnexion
const handleLogout = async () => {
  await logout();
  userMenuOpen.value = false;
  mobileMenuOpen.value = false;
  router.push('/');
};

// Fermer le menu utilisateur lors d'un clic à l'extérieur
const handleOutsideClick = (event) => {
  if (
    userMenuOpen.value &&
    userMenuButton.value &&
    !userMenuButton.value.contains(event.target)
  ) {
    userMenuOpen.value = false;
  }
};

// Ajouter et nettoyer l'écouteur d'événements
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
/* Styles spécifiques au header */
:where(.router-link-active) {
  position: relative;
}

/* Indicateur d'onglet actif pour les liens de navigation desktop */
@media (min-width: 768px) {
  :where(.router-link-active)::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: currentColor;
  }
}

/* Animation du menu mobile */
.transition-opacity {
  transition-property: opacity;
}
</style>