<template>
  <div class="pagination flex justify-center my-8">
    <nav class="flex items-center gap-1">
      <!-- Bouton précédent -->
      <button 
        class="pagination-button px-3 py-2 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasPrev"
        @click="$emit('go-to-page', currentPage - 1)"
        aria-label="Page précédente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <!-- Pages -->
      <template v-for="page in paginationPages" :key="page">
        <button 
          class="pagination-button px-4 py-2 rounded border hover:bg-gray-100"
          :class="{ 'bg-blue-600 text-white hover:bg-blue-700': page === currentPage }"
          @click="$emit('go-to-page', page)"
        >
          {{ page }}
        </button>
      </template>
      
      <!-- Bouton suivant -->
      <button 
        class="pagination-button px-3 py-2 rounded border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasNext"
        @click="$emit('go-to-page', currentPage + 1)"
        aria-label="Page suivante"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
  hasPrev: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  },
  paginationPages: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['go-to-page']);
</script>

<style scoped>
.pagination-button {
  transition: all 0.2s ease;
}

.pagination-button:not(:disabled):hover {
  transform: translateY(-1px);
}

.pagination-button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>