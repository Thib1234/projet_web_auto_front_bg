<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Titre et filtres -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Annonces de voitures</h1>
      
      <!-- Filtres -->
      <CarFilters 
  v-model:filters="filters"
  :available-brands="availableBrands"
  :available-models="availableModels"
  :available-years="availableYears"
  :available-fuel-types="availableFuelTypes"
  :available-transmissions="availableTransmissions"
  :loading-models="loadingModels"
  @filter-change="handleFilterChange"
  @debounce-filter-change="debounceFilterChange"
  @reset-filters="resetFilters"
/>
    </div>

    <!-- Indicateur de chargement subtil -->
    <LoadingBar v-if="loading" />

    <!-- Résumé des filtres actifs -->
    <ActiveFilters 
      v-if="hasActiveFilters" 
      :active-filters="activeFilters"
      :filter-labels="filterLabels"
      @remove-filter="removeFilter"
    />

    <!-- Compteur de résultats -->
    <div class="mb-6 text-gray-600">
      {{ ads.total || 0 }} annonce(s) trouvée(s)
    </div>

    <!-- Liste des annonces avec transitions -->
    <CarList 
      :ads="ads.data" 
      :loading="loading"
      @view-details="viewDetails"
      @add-to-favorites="addToFavorites"
      @reset-filters="resetFilters"
    />

    <!-- Pagination -->
    <Pagination 
      v-if="ads.data && ads.data.length > 0" 
      :current-page="ads.current_page"
      :last-page="ads.last_page"
      :has-prev="!!ads.prev_page_url"
      :has-next="!!ads.next_page_url"
      :pagination-pages="paginationPages"
      @go-to-page="goToPage"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCarListings } from '@/composables/useCarListings';
import { useFilters } from '@/composables/useFilters';

// Composants
import CarFilters from '@/components/cars/CarFilters.vue';
import ActiveFilters from '@/components/cars/ActiveFilters.vue';
import CarList from '@/components/cars/CarList.vue';
import Pagination from '@/components/ui/Pagination.vue';
import LoadingBar from '@/components/ui/LoadingBar.vue';

const router = useRouter();

// Utilisation des composables
const { 
  ads, loading, loadingModels,
  availableBrands, availableModels, availableYears, availableFuelTypes, availableTransmissions,
  fetchAds, loadFilterOptions, loadModelsForBrand
} = useCarListings();

const {
  filters, filterLabels, activeFilters, hasActiveFilters,
  getFilterLabel, formatFilterValue, removeFilter,
  resetFilters, handleFilterChange, debounceFilterChange
} = useFilters({ fetchAds });

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

// Navigation entre les pages
const goToPage = (page) => {
  if (page !== ads.value.current_page) {
    fetchAds(page);
  }
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

// Mettre à jour les modèles lorsque la marque change
watch(() => filters.brand, (newBrand) => {
  filters.model = ''; // Réinitialiser le modèle
  if (newBrand) {
    loadModelsForBrand(newBrand);
  } else {
    availableModels.value = [];
  }
});

// Chargement initial
onMounted(() => {
  loadFilterOptions();
  fetchAds();
});
</script>