<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
    <!-- Image principale -->
    <div class="relative h-68 bg-gray-200">
      <img 
        v-if="ad.photos && ad.photos.length > 0"
        :src="getPhotoUrl(ad.photos[0].path)"
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
      
      <!-- Badge du nombre de photos -->
      <div v-if="ad.photos && ad.photos.length > 1" class="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
        {{ ad.photos.length }}
      </div>
    </div>
    
    <!-- Informations principales -->
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-800 mb-2">{{ ad.brand }} {{ ad.model }}</h3>
      
      <!-- Informations clés en ligne -->
      <div class="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          <span>{{ ad.year }}</span>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>{{ formatNumber(ad.mileage) }} km</span>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.343-4 3.657-4a8 8 0 017.657 7.657z"></path>
          </svg>
          <span>{{ getFuelTypeLabel(ad.fuel_type) }}</span>
        </div>
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{{ getTransmissionLabel(ad.transmission) }}</span>
        </div>
      </div>
      
      <!-- Description tronquée -->
      <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ ad.description }}</p>
      
      <!-- Boutons d'action -->
      <div class="flex justify-between items-center">
        <button 
          @click="$emit('view-details')"
          class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Voir détails
        </button>
        <button 
          @click="$emit('add-to-favorites')"
          class="text-gray-400 hover:text-red-500 transition-colors p-2"
          :title="'Ajouter aux favoris'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

defineProps({
  ad: {
    type: Object,
    required: true
  }
});

defineEmits(['view-details', 'add-to-favorites']);

// Fonction pour construire l'URL des photos (identique à CarDetails)
const getPhotoUrl = (path) => {
  return `${axios.defaults.baseURL}/storage/${path}`;
};

// Formatage du prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

// Formatage des nombres
const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

// Labels pour les types de carburant
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

// Labels pour les transmissions
const getTransmissionLabel = (transmission) => {
  const labels = {
    'manual': 'Manuelle',
    'automatic': 'Automatique',
    'semi-automatic': 'Semi-automatique'
  };
  return labels[transmission] || transmission;
};
</script>

<style scoped>
/* Style pour la hauteur fixe des cartes */
.h-68 {
  height: 17rem; /* 272px */
}

/* Style pour limiter le texte à 2 lignes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover effect pour la carte */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Style pour les icônes */
svg {
  flex-shrink: 0;
}

/* Animation pour le bouton favoris */
button:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>