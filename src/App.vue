<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation / Header -->
    <TheHeader />
    
    <!-- Contenu principal -->
    <main>
      <!-- Version corrigée du router-view sans utiliser v-slot -->
      <router-view></router-view>
    </main>
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
</script>

<style>
/* Styles globaux */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #3b82f6; /* blue-500 */
  --primary-color-dark: #2563eb; /* blue-600 */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #374151; /* gray-700 */
  background-color: #f9fafb; /* gray-50 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>