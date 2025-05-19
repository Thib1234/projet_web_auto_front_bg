<template>
  <div class="active-filters bg-gray-100 p-4 rounded-lg mb-6">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-gray-600 font-medium">Filtres actifs:</span>
      
      <div v-for="(value, key) in activeFilters" :key="key" class="filter-tag">
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
          {{ filterLabels[key] }}: {{ formatFilterValue(key, value) }}
          <button 
            @click="removeFilter(key)"
            class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-label="Supprimer ce filtre"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
      
      <button 
        @click="removeAllFilters"
        class="ml-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none underline"
      >
        Effacer tous les filtres
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeFilters: {
    type: Object,
    required: true
  },
  filterLabels: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['remove-filter']);

// Fonction pour supprimer un filtre individuel
const removeFilter = (key) => {
  emit('remove-filter', key);
};

// Fonction pour supprimer tous les filtres
const removeAllFilters = () => {
  emit('remove-filter', 'all');
};

// Fonction pour formater la valeur du filtre selon son type
const formatFilterValue = (key, value) => {
  // Si la valeur est un prix, on peut le formater avec un symbole €
  if (key === 'minPrice' || key === 'maxPrice') {
    return `${value} €`;
  }
  
  // Si la valeur est une année
  if (key === 'minYear' || key === 'maxYear') {
    return value;
  }
  
  // Pour les autres valeurs
  return value;
};
</script>

<style scoped>
.filter-tag {
  transition: all 0.2s ease;
}

.filter-tag:hover {
  transform: translateY(-1px);
}
</style>