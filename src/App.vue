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
            <select 
              v-model="filters.brand" 
              @change="handleFilterChange"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Toutes les marques</option>
              <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
          </div>
          
          <!-- Modèle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
            <select 
              v-model="filters.model" 
              @change="handleFilterChange"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              :disabled="!filters.brand"
            >
              <option value="">Tous les modèles</option>
              <option v-for="model in availableModels" :key="model" :value="model">{{ model }}</option>
            </select>
            <div v-if="loadingModels" class="mt-1 text-xs text-blue-600">
              Chargement des modèles...
            </div>
          </div>
          
          <!-- Prix -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
            <div class="flex space-x-2">
              <input 
                type="number" 
                v-model.number="filters.min_price" 
                @input="debounceFilterChange"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                placeholder="Min"
              >
              <input 
                type="number" 
                v-model.number="filters.max_price" 
                @input="debounceFilterChange"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
                placeholder="Max"
              >
            </div>
          </div>
          
          <!-- Année -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
            <div class="flex space-x-2">
              <select 
                v-model="filters.min_year" 
                @change="handleFilterChange"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Min</option>
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
              </select>
              <select 
                v-model="filters.max_year" 
                @change="handleFilterChange"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="">Max</option>
                <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>
          
          <!-- Type de carburant -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
            <select 
              v-model="filters.fuel_type" 
              @change="handleFilterChange"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Tous types</option>
              <option v-for="fuelType in availableFuelTypes" :key="fuelType" :value="fuelType">
                {{ fuelType.charAt(0).toUpperCase() + fuelType.slice(1) }}
              </option>
            </select>
          </div>
          
          <!-- Transmission -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
            <select 
              v-model="filters.transmission" 
              @change="handleFilterChange"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Toutes</option>
              <option v-for="transmission in availableTransmissions" :key="transmission" :value="transmission">
                {{ transmission.charAt(0).toUpperCase() + transmission.slice(1) }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Bouton de réinitialisation seulement -->
        <div class="mt-4 flex justify-end">
          <button @click="resetFilters" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
    
    <!-- Indicateur de chargement subtil -->
    <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
      <div class="h-1 bg-blue-500 animate-pulse"></div>
    </div>
    
    <!-- Résumé des filtres actifs -->
    <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap gap-2">
      <div 
        v-for="(value, key) in activeFilters" 
        :key="key"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
      >
        <span>{{ getFilterLabel(key) }}: {{ formatFilterValue(key, value) }}</span>
        <button 
          @click="removeFilter(key)" 
          class="ml-2 text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Compteur de résultats -->
    <div class="mb-6 text-gray-600">
      {{ ads.total || 0 }} annonce(s) trouvée(s)
    </div>
    
    <!-- Liste des annonces avec transitions -->
    <transition-group 
      name="ad-list" 
      tag="div" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div 
        v-if="!loading && (!ads.data || ads.data.length === 0)" 
        key="empty-state"
        class="col-span-full bg-gray-50 p-8 rounded-lg text-center"
      >
        <p class="text-gray-600 text-lg">Aucune annonce ne correspond à vos critères.</p>
        <button @click="resetFilters" class="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Réinitialiser les filtres
        </button>
      </div>
      
      <!-- Carte d'annonce -->
      <div 
        v-for="ad in ads.data" 
        :key="ad.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <!-- Image principale -->
        <div class="relative h-68 bg-gray-200">
          <img 
            v-if="ad.photos && ad.photos.length > 0" 
            :src="`http://127.0.0.1:8000/storage/${ad.photos[0].path}`" 
            :alt="`${ad.brand} ${ad.model}`" 
            class="w-full h-full object-cover"
            loading="lazy"
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
    </transition-group>
    
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
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// État
const ads = ref({ data: [] });
const loading = ref(true);
const loadingModels = ref(false);

// Filtres
const filters = reactive({
  brand: '',
  model: '',
  min_price: null,
  max_price: null,
  min_year: null,
  max_year: null,
  fuel_type: '',
  transmission: ''
});

// URL de base de l'API
const apiBaseUrl = 'http://127.0.0.1:8000/api';

// État pour les filtres dynamiques
const availableBrands = ref([]);
const availableModels = ref([]);
const availableYears = ref([]);
const availableFuelTypes = ref([]);
const availableTransmissions = ref(['manuelle', 'automatique', 'semi-automatique']);

// Libellés des filtres pour l'affichage
const filterLabels = {
  brand: 'Marque',
  model: 'Modèle',
  min_price: 'Prix min',
  max_price: 'Prix max',
  min_year: 'Année min',
  max_year: 'Année max',
  fuel_type: 'Carburant',
  transmission: 'Transmission'
};

// Computed pour les filtres actifs
const activeFilters = computed(() => {
  const active = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null) {
      active[key] = value;
    }
  });
  
  return active;
});

const hasActiveFilters = computed(() => {
  return Object.keys(activeFilters.value).length > 0;
});

// Méthodes pour l'affichage des filtres
const getFilterLabel = (key) => {
  return filterLabels[key] || key;
};

const formatFilterValue = (key, value) => {
  if (key === 'min_price' || key === 'max_price') {
    return `${formatPrice(value)} €`;
  }
  if (key === 'fuel_type' || key === 'transmission') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
};

// Retirer un filtre spécifique
const removeFilter = (key) => {
  filters[key] = key.startsWith('min_') || key.startsWith('max_') ? null : '';
  handleFilterChange();
};

// Debouncing pour éviter trop d'appels API lors de la saisie
let debounceTimer;
const debounceFilterChange = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    handleFilterChange();
  }, 500); // Délai de 500ms
};

// Charger les valeurs disponibles pour les filtres
const loadFilterOptions = async () => {
  try {
    // Essayer d'abord l'endpoint dédié s'il existe
    const response = await axios.get(`${apiBaseUrl}/ads/filter-options`);
    
    if (response.data) {
      // Utiliser les données renvoyées
      availableBrands.value = response.data.brands || [];
      availableFuelTypes.value = response.data.fuel_types || [];
      
      // Générer les années de 1990 à l'année actuelle
      const currentYear = new Date().getFullYear();
      availableYears.value = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
    }
  } catch (error) {
    console.warn('Aucun endpoint pour les options de filtrage, utilisation de valeurs par défaut');
    
    try {
      // Fallback : extraire les marques et carburants des données actuelles
      const adsResponse = await axios.get(`${apiBaseUrl}/ads`);
      if (adsResponse.data && adsResponse.data.data) {
        const allAds = adsResponse.data.data;
        
        // Extraire les marques et carburants uniques
        const brands = [...new Set(allAds.map(ad => ad.brand))];
        const fuelTypes = [...new Set(allAds.map(ad => ad.fuel_type))];
        
        if (brands.length > 0) availableBrands.value = brands;
        if (fuelTypes.length > 0) availableFuelTypes.value = fuelTypes;
      }
    } catch (fallbackError) {
      console.error('Erreur lors de la récupération des données:', fallbackError);
    }
    
    // Valeurs par défaut
    if (availableBrands.value.length === 0) {
      availableBrands.value = ['Renault', 'Peugeot', 'Citroën', 'Ford', 'BMW', 'Audi', 'Volkswagen', 'Mercedes', 'Toyota', 'Nissan'];
    }
    
    if (availableFuelTypes.value.length === 0) {
      availableFuelTypes.value = ['essence', 'diesel', 'hybride', 'electrique'];
    }
    
    // Générer les années de 1990 à l'année actuelle
    const currentYear = new Date().getFullYear();
    availableYears.value = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
  }
};

// Charger les modèles disponibles pour une marque sélectionnée
const loadModelsForBrand = async (brand) => {
  if (!brand) {
    availableModels.value = [];
    return;
  }
  
  loadingModels.value = true;
  
  try {
    // Essayer d'abord l'endpoint dédié
    const response = await axios.get(`${apiBaseUrl}/ads/models`, {
      params: { brand }
    });
    
    if (response.data && response.data.models) {
      availableModels.value = response.data.models;
    }
  } catch (error) {
    console.warn('Aucun endpoint pour les modèles, utilisation de filtrage direct');
    
    try {
      // Fallback : filtrer les annonces par marque et extraire les modèles
      const adsResponse = await axios.get(`${apiBaseUrl}/ads`, {
        params: { brand }
      });
      
      if (adsResponse.data && adsResponse.data.data) {
        const models = [...new Set(adsResponse.data.data.map(ad => ad.model))];
        availableModels.value = models;
      }
    } catch (fallbackError) {
      console.error('Erreur lors de la récupération des modèles:', fallbackError);
      availableModels.value = [];
    }
  } finally {
    loadingModels.value = false;
  }
};

// Mettre à jour les modèles lorsque la marque change
watch(() => filters.brand, (newBrand) => {
  filters.model = ''; // Réinitialiser le modèle
  if (newBrand) {
    loadModelsForBrand(newBrand);
  } else {
    availableModels.value = [];
  }
});

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

// Récupération des annonces avec filtres
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

// Gestion du changement de filtre (appelé automatiquement)
const handleFilterChange = () => {
  fetchAds(1); // Revenir à la première page avec les nouveaux filtres
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
  loadFilterOptions();
  fetchAds();
});
</script>

<style scoped>
/* Animations pour la liste d'annonces */
.ad-list-enter-active,
.ad-list-leave-active {
  transition: all 0.3s ease;
}

.ad-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.ad-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.ad-list-move {
  transition: transform 0.5s ease;
}

/* Style pour les images lazy loading */
img {
  transition: opacity 0.3s ease;
}

img[loading] {
  opacity: 0;
}

img:not([loading]) {
  opacity: 1;
}
</style>