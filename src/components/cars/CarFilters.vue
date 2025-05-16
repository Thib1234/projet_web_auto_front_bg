<template>
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
      
      <!-- Prix Min -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Prix minimum</label>
        <input
          type="number"
          v-model.number="filters.min_price"
          @input="debounceFilterChange"
          placeholder="Min €"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      
      <!-- Prix Max -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Prix maximum</label>
        <input
          type="number"
          v-model.number="filters.max_price"
          @input="debounceFilterChange"
          placeholder="Max €"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      
      <!-- Année Min -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Année min</label>
        <select
          v-model.number="filters.min_year"
          @change="handleFilterChange"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option :value="null">Toutes</option>
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      
      <!-- Année Max -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Année max</label>
        <select
          v-model.number="filters.max_year"
          @change="handleFilterChange"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option :value="null">Toutes</option>
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      
      <!-- Type de carburant -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
        <select
          v-model="filters.fuel_type"
          @change="handleFilterChange"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Tous</option>
          <option v-for="fuel in availableFuelTypes" :key="fuel" :value="fuel">{{ fuel }}</option>
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
          <option v-for="trans in availableTransmissions" :key="trans" :value="trans">{{ trans }}</option>
        </select>
      </div>
    </div>
    
    <!-- Bouton de réinitialisation -->
    <div class="mt-4 flex justify-end">
      <button 
        @click="$emit('reset-filters')" 
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Réinitialiser les filtres
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

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

// Émettre les événements pour les parents
const emit = defineEmits(['update:filters', 'filter-change', 'reset-filters', 'debounce-filter-change']);

// Exposer les fonctions du composable parent pour pouvoir les utiliser ici
const handleFilterChange = () => {
  emit('filter-change');
};

const debounceFilterChange = () => {
  emit('debounce-filter-change');
};
</script>