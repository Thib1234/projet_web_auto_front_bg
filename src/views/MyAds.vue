<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-7xl mx-auto">
        
        <!-- En-tête -->
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 class="text-4xl font-bold text-white mb-3">Mes annonces</h1>
                <p class="text-blue-100 text-lg">
                  Gérez toutes vos annonces depuis cette page
                </p>
              </div>
              <div class="mt-6 md:mt-0">
                <router-link
                  to="/ads/create"
                  class="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Créer une nouvelle annonce
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Total</h3>
                <p class="text-3xl font-bold text-blue-600">{{ stats.total }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Actives</h3>
                <p class="text-3xl font-bold text-green-600">{{ stats.active }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900">Vues totales</h3>
                <p class="text-3xl font-bold text-yellow-600">{{ stats.views }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtres et tri -->
        <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <!-- Filtre par statut -->
              <select
                v-model="filters.status"
                @change="applyFilters"
                class="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
              >
                <option value="">Tous les statuts</option>
                <option value="active">Actives</option>
                <option value="pending">En attente</option>
                <option value="sold">Vendues</option>
                <option value="expired">Expirées</option>
              </select>

              <!-- Tri -->
              <select
                v-model="sort"
                @change="applyFilters"
                class="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
              >
                <option value="created_at_desc">Plus récentes</option>
                <option value="created_at_asc">Plus anciennes</option>
                <option value="price_desc">Prix décroissant</option>
                <option value="price_asc">Prix croissant</option>
                <option value="views_desc">Plus vues</option>
              </select>
            </div>

            <!-- Recherche -->
            <div class="relative">
              <input
                v-model="searchQuery"
                @input="debounceSearch"
                type="text"
                placeholder="Rechercher dans mes annonces..."
                class="pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 w-full md:w-80"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Chargement -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>

        <!-- Liste des annonces -->
        <div v-else-if="filteredAds.length > 0" class="space-y-6">
          <div
            v-for="ad in filteredAds"
            :key="ad.id"
            class="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div class="md:flex">
              <!-- Image -->
              <div class="md:w-72 h-48 md:h-auto relative">
                <img
                  v-if="ad.photos && ad.photos.length > 0"
                  :src="getPhotoUrl(ad.photos[0].path)"
                  :alt="`${ad.brand} ${ad.model}`"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>

                <!-- Badge statut -->
                <div class="absolute top-4 left-4">
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    :class="getStatusClass(ad.status)"
                  >
                    {{ getStatusLabel(ad.status) }}
                  </span>
                </div>

                <!-- Badge nombre de photos -->
                <div v-if="ad.photos && ad.photos.length > 1" class="absolute bottom-4 right-4">
                  <span class="bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    {{ ad.photos.length }}
                  </span>
                </div>
              </div>

              <!-- Contenu -->
              <div class="flex-1 p-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">
                      {{ ad.brand }} {{ ad.model }}
                    </h3>
                    <div class="flex flex-wrap items-center text-gray-600 space-x-4 mb-3">
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        {{ ad.year }}
                      </span>
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        {{ formatNumber(ad.mileage) }} km
                      </span>
                      <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.343-4 3.657-4a8 8 0 017.657 7.657z"></path>
                        </svg>
                        {{ getFuelTypeLabel(ad.fuel_type) }}
                      </span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-3xl font-bold text-blue-600">{{ formatPrice(ad.price) }} €</p>
                    <p class="text-sm text-gray-500 mt-1">
                      Créée le {{ formatDate(ad.created_at) }}
                    </p>
                  </div>
                </div>

                <p class="text-gray-600 mb-6 line-clamp-2">{{ ad.description }}</p>

                <!-- Statistiques et actions -->
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  <div class="flex space-x-6 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      {{ ad.views || 0 }} vues
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      {{ ad.favorites_count || 0 }} favoris
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      {{ ad.contacts_count || 0 }} contacts
                    </span>
                  </div>

                  <div class="flex space-x-3">
                    <router-link
                      :to="`/ads/${ad.id}`"
                      class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      Voir
                    </router-link>
                    <router-link
                      :to="`/ads/${ad.id}/edit`"
                      class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                    >
                      Modifier
                    </router-link>
                    <button
                      @click="toggleStatus(ad)"
                      :disabled="statusLoading === ad.id"
                      class="px-4 py-2 rounded-lg font-medium transition-colors"
                      :class="ad.status === 'active' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'"
                    >
                      {{ ad.status === 'active' ? 'Suspendre' : 'Activer' }}
                    </button>
                    <button
                      @click="deleteAd(ad.id)"
                      class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- État vide -->
        <div v-else class="text-center py-20">
          <div class="bg-gray-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            {{ searchQuery || filters.status ? 'Aucun résultat' : 'Aucune annonce' }}
          </h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            {{ searchQuery || filters.status 
                ? 'Essayez de modifier vos critères de recherche ou vos filtres.' 
                : 'Commencez à vendre en créant votre première annonce. C\'est simple et rapide !' 
            }}
          </p>
          <router-link
            v-if="!searchQuery && !filters.status"
            to="/ads/create"
            class="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Créer ma première annonce
          </router-link>
        </div>

        <!-- Modal de confirmation suppression -->
        <div v-if="deleteModal.show" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Supprimer l'annonce</h3>
              <div class="mb-8">
                <p class="text-gray-600 text-base">
                  Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.
                </p>
              </div>
              <div class="flex space-x-4">
                <button
                  @click="deleteModal.show = false"
                  class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Annuler
                </button>
                <button
                  @click="confirmDelete"
                  :disabled="deleteModal.loading"
                  class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {{ deleteModal.loading ? 'Suppression...' : 'Supprimer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';

const router = useRouter();
const { isLoggedIn } = useAuth();

// État du composant
const loading = ref(true);
const statusLoading = ref(null);
const ads = ref([]);
const searchQuery = ref('');
const deleteModal = reactive({
  show: false,
  adId: null,
  loading: false
});

// Filtres et tri
const filters = reactive({
  status: ''
});
const sort = ref('created_at_desc');

// Statistiques calculées
const stats = computed(() => {
  const total = ads.value.length;
  const active = ads.value.filter(ad => ad.status === 'active').length;
  const views = ads.value.reduce((sum, ad) => sum + (ad.views || 0), 0);
  
  return { total, active, views };
});

// Annonces filtrées
const filteredAds = computed(() => {
  let filtered = [...ads.value];
  
  // Filtre par statut
  if (filters.status) {
    filtered = filtered.filter(ad => ad.status === filters.status);
  }
  
  // Recherche textuelle
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(ad => 
      ad.brand.toLowerCase().includes(query) ||
      ad.model.toLowerCase().includes(query) ||
      ad.description.toLowerCase().includes(query)
    );
  }
  
  // Tri
  const [sortField, sortDirection] = sort.value.split('_');
  filtered.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'created_at') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'desc') {
      return bValue > aValue ? 1 : -1;
    } else {
      return aValue > bValue ? 1 : -1;
    }
  });
  
  return filtered;
});

// Méthodes de formatage
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const getFuelTypeLabel = (fuelType) => {
  const labels = {
    'gasoline': 'Essence',
    'diesel': 'Diesel',
    'hybrid': 'Hybride',
    'electric': 'Électrique',
    'lpg': 'GPL',
    'other': 'Autres'
  };
  return labels[fuelType] || fuelType;
};

const getStatusLabel = (status) => {
  const labels = {
    'active': 'Active',
    'pending': 'En attente',
    'sold': 'Vendue',
    'expired': 'Expirée',
    'suspended': 'Suspendue'
  };
  return labels[status] || status;
};

const getStatusClass = (status) => {
  const classes = {
    'active': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'sold': 'bg-blue-100 text-blue-800',
    'expired': 'bg-red-100 text-red-800',
    'suspended': 'bg-gray-100 text-gray-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getPhotoUrl = (path) => {
  return `${axios.defaults.baseURL}/storage/${path}`;
};

// Actions
const loadAds = async () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  try {
    loading.value = true;
    const response = await axios.get('/api/user/ads');
    ads.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des annonces:', error);
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  // Les filtres sont automatiquement appliqués via les computed
};

// Debounce pour la recherche
let searchTimeout;
const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    // La recherche est automatiquement appliquée via le computed
  }, 300);
};

const toggleStatus = async (ad) => {
  try {
    statusLoading.value = ad.id;
    const newStatus = ad.status === 'active' ? 'suspended' : 'active';
    
    await axios.patch(`/api/ads/${ad.id}/status`, { status: newStatus });
    
    // Mettre à jour localement
    ad.status = newStatus;
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error);
  } finally {
    statusLoading.value = null;
  }
};

const deleteAd = (adId) => {
  deleteModal.adId = adId;
  deleteModal.show = true;
};

const confirmDelete = async () => {
  try {
    deleteModal.loading = true;
    await axios.delete(`/api/ads/${deleteModal.adId}`);
    
    // Retirer l'annonce de la liste
    ads.value = ads.value.filter(ad => ad.id !== deleteModal.adId);
    
    deleteModal.show = false;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  } finally {
    deleteModal.loading = false;
  }
};

// Chargement initial
onMounted(() => {
  loadAds();
});
</script>

<style scoped>
/* Style pour limiter le texte à 2 lignes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations personnalisées */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Style pour les inputs avec focus */
input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Animation pour les cartes */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}
</style>