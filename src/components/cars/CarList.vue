<template>
  <transition-group 
    name="ad-list" 
    tag="div" 
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <div 
      v-if="!loading && (!ads || ads.length === 0)" 
      key="empty-state"
      class="col-span-full bg-gray-50 p-8 rounded-lg text-center"
    >
      <p class="text-gray-600 text-lg">Aucune annonce ne correspond à vos critères.</p>
      <button @click="$emit('reset-filters')" class="mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
        Réinitialiser les filtres
      </button>
    </div>
    
    <!-- Carte d'annonce -->
    <CarCard 
      v-for="ad in ads" 
      :key="ad.id" 
      :ad="ad"
      @view-details="$emit('view-details', ad.id)"
      @add-to-favorites="$emit('add-to-favorites', ad.id)"
    />
  </transition-group>
</template>

<script setup>
import CarCard from '@/components/cars/CarCard.vue';

defineProps({
  ads: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['view-details', 'add-to-favorites', 'reset-filters']);
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
</style>