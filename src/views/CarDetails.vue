<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="ad" class="max-w-6xl mx-auto">
        <!-- Navigation de retour -->
        <div class="mb-6">
          <router-link
            to="/ads"
            class="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Retour aux annonces
          </router-link>
        </div>

        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Header avec infos principales -->
          <div class="bg-blue-600 text-white p-6">
            <h1 class="text-3xl font-bold">{{ ad.brand }} {{ ad.model }}</h1>
            <p class="text-blue-100 text-lg mt-1">{{ ad.year }} • {{ formatMileage(ad.mileage) }} km</p>
            <div class="mt-4">
              <span class="text-3xl font-bold">{{ formatPrice(ad.price) }} €</span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            <!-- Photos -->
            <div class="lg:col-span-2">
              <div v-if="ad.photos && ad.photos.length > 0" class="space-y-4">
                <!-- Photo principale -->
                <div class="aspect-video rounded-lg overflow-hidden">
                  <img
                    :src="getPhotoUrl(ad.photos[selectedPhotoIndex].path)"
                    :alt="`${ad.brand} ${ad.model}`"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Miniatures -->
                <div v-if="ad.photos.length > 1" class="grid grid-cols-5 gap-2">
                  <button
                    v-for="(photo, index) in ad.photos"
                    :key="photo.id"
                    @click="selectedPhotoIndex = index"
                    class="aspect-video rounded-md overflow-hidden border-2 transition-all"
                    :class="{
                      'border-blue-500': index === selectedPhotoIndex,
                      'border-gray-200 hover:border-gray-300': index !== selectedPhotoIndex
                    }"
                  >
                    <img
                      :src="getPhotoUrl(photo.path)"
                      :alt="`Photo ${index + 1}`"
                      class="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>

              <!-- Message si pas de photos -->
              <div v-else class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <p>Aucune photo disponible</p>
                </div>
              </div>

              <!-- Description -->
              <div class="mt-8">
                <h2 class="text-2xl font-semibold mb-4">Description</h2>
                <p class="text-gray-700 whitespace-pre-line">{{ ad.description }}</p>
              </div>
            </div>

            <!-- Informations et actions -->
            <div class="space-y-6">
              <!-- Caractéristiques -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Caractéristiques</h3>
                <dl class="space-y-3">
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Année</dt>
                    <dd class="font-medium">{{ ad.year }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Kilométrage</dt>
                    <dd class="font-medium">{{ formatMileage(ad.mileage) }} km</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Carburant</dt>
                    <dd class="font-medium">{{ getFuelTypeLabel(ad.fuel_type) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-gray-600">Transmission</dt>
                    <dd class="font-medium">{{ getTransmissionLabel(ad.transmission) }}</dd>
                  </div>
                </dl>
              </div>

              <!-- Vendeur -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-4">Vendeur</h3>
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-lg">
                      {{ ad.user?.name?.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div>
                    <p class="font-medium">{{ ad.user?.name }}</p>
                    <p class="text-gray-600 text-sm">Membre depuis {{ formatDate(ad.user?.created_at) }}</p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-3">
                <button
                  @click="toggleFavorite"
                  class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  :disabled="favoriteLoading"
                >
                  <svg class="w-5 h-5 mr-2" :class="{ 'text-red-500': isFavorite }" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                  {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
                </button>

                <button
                  @click="contactSeller"
                  class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Contacter le vendeur
                </button>

                <!-- Actions du propriétaire -->
                <div v-if="isOwner" class="space-y-2 pt-4 border-t border-gray-200">
                  <button
                    @click="editAd"
                    class="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    Modifier l'annonce
                  </button>
                  <button
                    @click="deleteAd"
                    class="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Supprimer l'annonce
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="max-w-2xl mx-auto text-center">
        <div class="bg-red-50 border border-red-200 rounded-md p-6">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.354 4h13.856C19.6 6.667 18.54 8 17 8H7C5.46 8 4.4 6.667 5.17 4z"></path>
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">Annonce introuvable</h3>
          <p class="text-red-700">{{ error }}</p>
          <router-link
            to="/ads"
            class="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retour aux annonces
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const { user, isLoggedIn } = useAuth();

// État du composant
const ad = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedPhotoIndex = ref(0);
const isFavorite = ref(false);
const favoriteLoading = ref(false);

// Computed
const isOwner = computed(() => {
  return isLoggedIn.value && user.value && ad.value && user.value.id === ad.value.user_id;
});

// Méthodes de formatage
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

const formatMileage = (mileage) => {
  return new Intl.NumberFormat('fr-FR').format(mileage);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
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

const getTransmissionLabel = (transmission) => {
  const labels = {
    'manual': 'Manuelle',
    'automatic': 'Automatique',
    'semi-automatic': 'Semi-automatique'
  };
  return labels[transmission] || transmission;
};

const getPhotoUrl = (path) => {
  return `${axios.defaults.baseURL}/storage/${path}`;
};

// Actions
const fetchAd = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`/api/ads/${route.params.id}`);
    ad.value = response.data;
    
    // Vérifier si l'annonce est en favoris
    if (isLoggedIn.value) {
      checkFavoriteStatus();
    }
  } catch (err) {
    console.error('Erreur lors du chargement de l\'annonce:', err);
    if (err.response && err.response.status === 404) {
      error.value = 'Cette annonce n\'existe pas ou a été supprimée.';
    } else {
      error.value = 'Une erreur est survenue lors du chargement de l\'annonce.';
    }
  } finally {
    loading.value = false;
  }
};

const checkFavoriteStatus = async () => {
  try {
    const response = await axios.get(`/api/favorites/check/${ad.value.id}`);
    isFavorite.value = response.data.isFavorite;
  } catch (err) {
    console.error('Erreur lors de la vérification des favoris:', err);
  }
};

const toggleFavorite = async () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  try {
    favoriteLoading.value = true;
    if (isFavorite.value) {
      await axios.delete(`/api/favorites/${ad.value.id}`);
      isFavorite.value = false;
    } else {
      await axios.post('/api/favorites', { ad_id: ad.value.id });
      isFavorite.value = true;
    }
  } catch (err) {
    console.error('Erreur lors de la gestion des favoris:', err);
  } finally {
    favoriteLoading.value = false;
  }
};

const contactSeller = () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  // Rediriger vers la page de contact ou ouvrir un modal
  router.push(`/contact/seller/${ad.value.user.id}`);
};

const editAd = () => {
  router.push(`/ads/${ad.value.id}/edit`);
};

const deleteAd = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
    try {
      await axios.delete(`/api/ads/${ad.value.id}`);
      router.push('/ads');
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Une erreur est survenue lors de la suppression.');
    }
  }
};

// Chargement initial
onMounted(() => {
  fetchAd();
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>