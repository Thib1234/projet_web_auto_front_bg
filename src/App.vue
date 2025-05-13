<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Titre et filtres -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Annonces de voitures</h1>
      
      <!-- Filtres -->
      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Filtres</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Marque -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Marque</label>
            <select v-model="filters.brand" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="">Toutes les marques</option>
              <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
          
          <!-- Modèle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
            <input type="text" v-model="filters.model" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Modèle">
          </div>
          
          <!-- Prix -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
            <div class="flex space-x-2">
              <input type="number" v-model="filters.min_price" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Min">
              <input type="number" v-model="filters.max_price" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Max">
            </div>
          </div>
          
          <!-- Année -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
            <div class="flex space-x-2">
              <input type="number" v-model="filters.min_year" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Min">
              <input type="number" v-model="filters.max_year" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" placeholder="Max">
            </div>
          </div>
          
          <!-- Type de carburant -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
            <select v-model="filters.fuel_type" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <option value="">Tous types</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="hybride">Hybride</option>
              <option value="electrique">Électrique</option>
            </select>
          </div>
        </div>
        
        <!-- Boutons de filtrage -->
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="resetFilters" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Réinitialiser
          </button>
          <button @click="applyFilters" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Appliquer
          </button>
        </div>
      </div>
    </div>
    
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    
    <!-- Liste des annonces -->
    <div v-else>
      <div v-if="ads.data && ads.data.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Carte d'annonce -->
        <div v-for="ad in ads.data" :key="ad.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <!-- Image principale -->
          <div class="relative h-48 bg-gray-200">
            <img 
              v-if="ad.photos && ad.photos.length > 0" 
              :src="'/storage/' + ad.photos[0].path" 
              :alt="`${ad.brand} ${ad.model}`" 
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              <span>Aucune image</span>
            </div>
            <div class="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-sm font-bold rounded">
              {{ formatPrice(ad.price) }} €
            </div>
          </div>
          
          <!-- Informations -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-1">{{ ad.brand }} {{ ad.model }}</h3>
            <div class="text-sm text-gray-600 mb-3">
              <span class="inline-block mr-3">{{ ad.year }}</span>
              <span class="inline-block mr-3">{{ formatNumber(ad.mileage) }} km</span>
              <span class="inline-block capitalize">{{ ad.fuel_type }}</span>
            </div>
            
            <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ ad.description }}</p>
            
            <div class="flex justify-between items-center mt-2">
              <button 
                @click="viewDetails(ad.id)" 
                class="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Voir détails
              </button>
              <button 
                @click="addToFavorites(ad.id)" 
                class="text-gray-400 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Message si aucune annonce -->
      <div v-else class="bg-gray-50 p-8 rounded-lg text-center">
        <p class="text-gray-600 text-lg">Aucune annonce ne correspond à vos critères.</p>
        <button @click="resetFilters" class="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Réinitialiser les filtres
        </button>
      </div>
      
      <!-- Pagination -->
      <div v-if="ads.data && ads.data.length > 0" class="mt-8 flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button 
            :disabled="!ads.prev_page_url" 
            @click="goToPage(ads.current_page - 1)" 
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <button 
            v-for="page in paginationPages" 
            :key="page" 
            @click="goToPage(page)" 
            :class="[
              page === ads.current_page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            ]"
          >
            {{ page }}
          </button>
          
          <button 
            :disabled="!ads.next_page_url" 
            @click="goToPage(ads.current_page + 1)" 
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// État
const ads = ref({});
const loading = ref(true);
const filters = reactive({
  brand: '',
  model: '',
  min_price: null,
  max_price: null,
  min_year: null,
  max_year: null,
  fuel_type: ''
});

// URL de base de l'API
const apiBaseUrl = 'http://127.0.0.1:8000/api';

// Marques disponibles
const availableBrands = ['Renault', 'Peugeot', 'Citroën', 'Ford', 'BMW', 'Audi', 'Volkswagen', 'Mercedes', 'Toyota', 'Nissan'];

// Pagination calculée
const paginationPages = computed(() => {
  if (!ads.value.last_page) return [];
  
  const currentPage = ads.value.current_page;
  const lastPage = ads.value.last_page;
  
  // Afficher 5 pages maximum
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }
  
  // Sinon, afficher les pages autour de la page actuelle
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  } else if (currentPage >= lastPage - 2) {
    return [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
  } else {
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }
});

// Récupération des annonces
const fetchAds = async (page = 1) => {
  loading.value = true;
  
  try {
    const params = { page };
    
    // Ajouter les filtres non vides
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null) {
        params[key] = filters[key];
      }
    });
    
    const response = await axios.get(`${apiBaseUrl}/ads`, { params });
    ads.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des annonces:', error);
  } finally {
    loading.value = false;
  }
};

// Application des filtres
const applyFilters = () => {
  fetchAds(1); // Retour à la première page avec les nouveaux filtres
};

// Réinitialisation des filtres
const resetFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key] = key.startsWith('min_') || key.startsWith('max_') ? null : '';
  });
  
  fetchAds(1);
};

// Navigation entre les pages
const goToPage = (page) => {
  if (page !== ads.value.current_page) {
    fetchAds(page);
  }
};

// Formatage du prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

// Formatage des nombres
const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

// Voir les détails d'une annonce
const viewDetails = (adId) => {
  router.push(`/ads/${adId}`);
};

// Ajouter aux favoris
const addToFavorites = (adId) => {
  console.log('Ajout aux favoris:', adId);
  // Exemple: await axios.post(`${apiBaseUrl}/favorites`, { ad_id: adId });
};

// Chargement initial
onMounted(() => {
  fetchAds();
});
</script>