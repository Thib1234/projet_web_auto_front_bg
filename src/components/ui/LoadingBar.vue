<template>
  <div class="loading-bar-container mb-6">
    <div class="loading-bar-bg h-1 w-full bg-gray-200 rounded overflow-hidden">
      <div class="loading-bar-progress h-full bg-blue-600 rounded"></div>
    </div>
  </div>
</template>

<script setup>
// Pas de props ou d'événements spécifiques nécessaires pour ce composant simple
</script>

<style scoped>
.loading-bar-progress {
  width: 20%;
  animation: loading-bar-animation 1.5s infinite ease-in-out;
  transform-origin: left center;
}

@keyframes loading-bar-animation {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(350%);
  }
  100% {
    transform: translateX(800%);
  }
}
</style>