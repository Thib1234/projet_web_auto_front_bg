<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Filtres</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Marque -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Marque</label>
        <select 
          v-model="localFilters.brand" 
          @change="updateFilters"
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
          v-model="localFilters.model" 
          @change="updateFilters"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          :disabled="!localFilters.brand"
        >
          <option value="">Tous les modèles</option>
          <option v-for="model in availableModels" :key="model" :value="model">{{ model }}</option>
        </select>
        <div v-if="loadingModels" class="mt-1 text-xs text-blue-600">
          Chargement des modèles...
        </div>
      </div>
      
      <!-- ... Autres filtres (Prix, Année, Carburant, Transmission) ... -->
    </div>
    
    <!-- Bouton de réinitialisation -->
    <div class="mt-4 flex justify-end">
      <button @click="$emit('reset-filters')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
        Réinitialiser les filtres
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  filters: {
    type: Object,
    required: true
  },
  availableBrands: {
    type: Array,
    default: () => []
  },
  availableModels: {
    type: Array,
    default: () => []
  },
  availableYears: {
    type: Array,
    default: () => []
  },
  availableFuelTypes: {
    type: Array,
    default: () => []
  },
  availableTransmissions: {
    type: Array,
    default: () => []
  },
  loadingModels: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:filters', 'filter-change', 'reset-filters']);

// Créer une copie locale des filtres
const localFilters = reactive({ ...props.filters });

// Observer les changements de props et mettre à jour les filtres locaux
watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters);
}, { deep: true });

// Mettre à jour les filtres et émettre l'événement de changement
const updateFilters = () => {
  emit('update:filters', localFilters);
  emit('filter-change');
};

// Observer les changements locaux et émettre les mises à jour
watch(localFilters, (newFilters) => {
  emit('update:filters', newFilters);
}, { deep: true });
</script>