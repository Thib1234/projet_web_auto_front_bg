<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
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
        <span class="inline-block mr-3">{{ formatNumber(ad.mileage) }} km </span>
        <span class="inline-block capitalize"> {{ ad.fuel_type }}</span>
      </div>
      
      <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ ad.description }}</p>
      
      <div class="flex justify-between items-center mt-2">
        <button 
          @click="$emit('view-details')" 
          class="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Voir détails
        </button>
        <button 
          @click="$emit('add-to-favorites')" 
          class="text-gray-400 hover:text-red-500"
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
defineProps({
  ad: {
    type: Object,
    required: true
  }
});

defineEmits(['view-details', 'add-to-favorites']);

// Formatage du prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

// Formatage des nombres
const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};
</script>

<style scoped>
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