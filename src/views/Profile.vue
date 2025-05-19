<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        
        <!-- En-tête du profil avec plus d'espacement -->
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden mb-12">
          <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-16 relative">
            <!-- Décoration de fond -->
            <div class="absolute inset-0 bg-black bg-opacity-5"></div>
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
            
            <div class="relative flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0 md:space-x-10">
              <!-- Avatar avec plus de style -->
              <div class="relative flex-shrink-0">
                <div class="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white ring-opacity-20">
                  <span class="text-5xl font-bold text-blue-600">
                    {{ user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <button
                  @click="openAvatarModal"
                  class="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Informations utilisateur avec plus d'espacement -->
              <div class="text-white flex-1">
                <h1 class="text-4xl md:text-5xl font-bold mb-3">{{ user?.name }}</h1>
                <p class="text-blue-100 text-xl mb-2">{{ user?.email }}</p>
                <div class="flex items-center space-x-2 text-blue-200">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <span>Membre depuis {{ formatDate(user?.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation par onglets redesignée -->
        <div class="bg-white rounded-3xl shadow-sm mb-8">
          <nav class="flex flex-wrap justify-center md:justify-start px-8 py-6 border-b border-gray-100">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="flex items-center space-x-3 px-6 py-4 m-2 text-sm font-medium rounded-2xl transition-all duration-200"
              :class="{
                'bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-100': activeTab === tab.id,
                'text-gray-600 hover:text-gray-900 hover:bg-gray-50': activeTab !== tab.id
              }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon"></path>
              </svg>
              <span>{{ tab.name }}</span>
              <span v-if="tab.count !== undefined" class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                {{ tab.count }}
              </span>
            </button>
          </nav>

          <!-- Contenu des onglets avec plus d'espacement -->
          <div class="p-8 md:p-12">
            
            <!-- Onglet Informations personnelles -->
            <div v-show="activeTab === 'personal'">
              <div class="max-w-4xl">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Informations personnelles</h2>
                
                <form @submit.prevent="updateProfile" class="space-y-8">
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Nom -->
                    <div class="space-y-3">
                      <label for="name" class="block text-sm font-semibold text-gray-700">
                        Nom complet *
                      </label>
                      <input
                        id="name"
                        v-model="profileForm.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                        :class="{ 'border-red-300 bg-red-50': profileErrors.name }"
                      />
                      <div v-if="profileErrors.name" class="text-red-600 text-sm font-medium">
                        {{ profileErrors.name }}
                      </div>
                    </div>

                    <!-- Email -->
                    <div class="space-y-3">
                      <label for="email" class="block text-sm font-semibold text-gray-700">
                        Adresse email *
                      </label>
                      <input
                        id="email"
                        v-model="profileForm.email"
                        type="email"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                        :class="{ 'border-red-300 bg-red-50': profileErrors.email }"
                      />
                      <div v-if="profileErrors.email" class="text-red-600 text-sm font-medium">
                        {{ profileErrors.email }}
                      </div>
                    </div>

                    <!-- Téléphone -->
                    <div class="space-y-3">
                      <label for="phone" class="block text-sm font-semibold text-gray-700">
                        Téléphone
                      </label>
                      <input
                        id="phone"
                        v-model="profileForm.phone"
                        type="tel"
                        class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                        :class="{ 'border-red-300 bg-red-50': profileErrors.phone }"
                      />
                      <div v-if="profileErrors.phone" class="text-red-600 text-sm font-medium">
                        {{ profileErrors.phone }}
                      </div>
                    </div>

                    <!-- Adresse -->
                    <div class="space-y-3">
                      <label for="address" class="block text-sm font-semibold text-gray-700">
                        Adresse
                      </label>
                      <input
                        id="address"
                        v-model="profileForm.address"
                        type="text"
                        class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                        :class="{ 'border-red-300 bg-red-50': profileErrors.address }"
                      />
                      <div v-if="profileErrors.address" class="text-red-600 text-sm font-medium">
                        {{ profileErrors.address }}
                      </div>
                    </div>
                  </div>

                  <!-- Message de succès/erreur avec plus de style -->
                  <div v-if="profileMessage" class="rounded-2xl p-6 border-l-4" :class="{
                    'bg-green-50 border-green-400': profileMessage.type === 'success',
                    'bg-red-50 border-red-400': profileMessage.type === 'error'
                  }">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <svg class="h-6 w-6" :class="{
                          'text-green-500': profileMessage.type === 'success',
                          'text-red-500': profileMessage.type === 'error'
                        }" viewBox="0 0 20 20" fill="currentColor">
                          <path v-if="profileMessage.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-semibold" :class="{
                          'text-green-800': profileMessage.type === 'success',
                          'text-red-800': profileMessage.type === 'error'
                        }">
                          {{ profileMessage.text }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Bouton de sauvegarde avec plus de style -->
                  <div class="flex justify-end pt-6">
                    <button
                      type="submit"
                      :disabled="profileLoading"
                      class="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <span v-if="profileLoading" class="inline-flex items-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sauvegarde en cours...
                      </span>
                      <span v-else>Sauvegarder les modifications</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- Onglet Mes annonces avec design cards amélioré -->
            <div v-show="activeTab === 'ads'">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 space-y-4 sm:space-y-0">
                <h2 class="text-2xl font-bold text-gray-900">Mes annonces</h2>
                <router-link
                  to="/ads/create"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Créer une annonce
                </router-link>
              </div>

              <!-- Liste des annonces avec cartes améliorées -->
              <div v-if="userAds.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <div
                  v-for="ad in userAds"
                  :key="ad.id"
                  class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-gray-900">{{ ad.brand }} {{ ad.model }}</h3>
                    <span class="text-blue-600 font-bold text-lg bg-blue-50 px-3 py-1 rounded-lg">{{ formatPrice(ad.price) }} €</span>
                  </div>
                  <p class="text-gray-600 mb-4 flex items-center space-x-4">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      {{ ad.year }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      {{ formatNumber(ad.mileage) }} km
                    </span>
                  </p>
                  <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span class="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {{ formatDate(ad.created_at) }}
                    </span>
                    <div class="flex space-x-3">
                      <router-link
                        :to="`/ads/${ad.id}`"
                        class="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                      >
                        Voir
                      </router-link>
                      <router-link
                        :to="`/ads/${ad.id}/edit`"
                        class="text-green-600 hover:text-green-800 text-sm font-medium hover:underline"
                      >
                        Modifier
                      </router-link>
                      <button
                        @click="deleteUserAd(ad.id)"
                        class="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- État vide amélioré -->
              <div v-else class="text-center py-20">
                <div class="bg-gray-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                  <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Aucune annonce pour le moment</h3>
                <p class="text-gray-600 mb-8 max-w-md mx-auto">Commencez à vendre en créant votre première annonce. C'est simple et rapide !</p>
                <router-link
                  to="/ads/create"
                  class="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Créer ma première annonce
                </router-link>
              </div>
            </div>

            <!-- Onglet Favoris avec design similaire -->
            <div v-show="activeTab === 'favorites'">
              <h2 class="text-2xl font-bold text-gray-900 mb-10">Mes favoris</h2>

              <div v-if="favoriteAds.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <div
                  v-for="favorite in favoriteAds"
                  :key="favorite.id"
                  class="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-gray-900">{{ favorite.ad.brand }} {{ favorite.ad.model }}</h3>
                    <span class="text-blue-600 font-bold text-lg bg-blue-50 px-3 py-1 rounded-lg">{{ formatPrice(favorite.ad.price) }} €</span>
                  </div>
                  <p class="text-gray-600 mb-4 flex items-center space-x-4">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      {{ favorite.ad.year }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      {{ formatNumber(favorite.ad.mileage) }} km
                    </span>
                  </p>
                  <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span class="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      Ajouté le {{ formatDate(favorite.created_at) }}
                    </span>
                    <div class="flex space-x-3">
                      <router-link
                        :to="`/ads/${favorite.ad.id}`"
                        class="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                      >
                        Voir
                      </router-link>
                      <button
                        @click="removeFavorite(favorite.id)"
                        class="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-20">
                <div class="bg-gray-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                  <svg class="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Aucun favori</h3>
                <p class="text-gray-600 mb-8 max-w-md mx-auto">Découvrez et sauvegardez vos annonces préférées pour les retrouver facilement.</p>
                <router-link
                  to="/ads"
                  class="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Parcourir les annonces
                </router-link>
              </div>
            </div>

            <!-- Onglet Paramètres avec design amélioré -->
            <div v-show="activeTab === 'settings'">
              <h2 class="text-2xl font-bold text-gray-900 mb-10">Paramètres du compte</h2>

              <!-- Changement de mot de passe -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 mb-8 border border-gray-200">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Changer le mot de passe</h3>
                <form @submit.prevent="changePassword" class="space-y-6">
                  <div class="space-y-3">
                    <label class="block text-sm font-semibold text-gray-700">
                      Mot de passe actuel
                    </label>
                    <input
                      v-model="passwordForm.current_password"
                      type="password"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                  <div class="space-y-3">
                    <label class="block text-sm font-semibold text-gray-700">
                      Nouveau mot de passe
                    </label>
                    <input
                      v-model="passwordForm.password"
                      type="password"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                  <div class="space-y-3">
                    <label class="block text-sm font-semibold text-gray-700">
                      Confirmer le nouveau mot de passe
                    </label>
                    <input
                      v-model="passwordForm.password_confirmation"
                      type="password"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    :disabled="passwordLoading"
                    class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {{ passwordLoading ? 'Modification...' : 'Changer le mot de passe' }}
                  </button>
                </form>
              </div>

              <!-- Suppression du compte avec design d'alerte -->
              <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 border-2 border-red-200">
                <h3 class="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.354 4h13.856C19.6 6.667 18.54 8 17 8H7C5.46 8 4.4 6.667 5.17 4z"></path>
                  </svg>
                  Zone dangereuse
                </h3>
                <p class="text-red-700 mb-6 text-base">
                  La suppression de votre compte est définitive et irréversible. Toutes vos données, annonces et favoris seront perdus définitivement.
                </p>
                <button
                  @click="showDeleteModal = true"
                  class="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de suppression amélioré -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.354 4h13.856C19.6 6.667 18.54 8 17 8H7C5.46 8 4.4 6.667 5.17 4z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Supprimer le compte</h3>
          <div class="mb-8">
            <p class="text-gray-600 text-base">
              Êtes-vous absolument sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues définitivement.
            </p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
            >
              Annuler
            </button>
            <button
              @click="deleteAccount"
              class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Supprimer définitivement
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';

const router = useRouter();
const { user, isLoggedIn, logout } = useAuth();

// État du composant
const activeTab = ref('personal');
const showDeleteModal = ref(false);
const profileLoading = ref(false);
const passwordLoading = ref(false);
const profileMessage = ref(null);
const userAds = ref([]);
const favoriteAds = ref([]);

// Formulaires
const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
});

const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
});

// Erreurs
const profileErrors = reactive({});
const passwordErrors = reactive({});

// Tabs configuration avec les icônes corrigées
const tabs = computed(() => [
  {
    id: 'personal',
    name: 'Informations personnelles',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'ads',
    name: 'Mes annonces',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    count: userAds.value.length
  },
  {
    id: 'favorites',
    name: 'Favoris',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    count: favoriteAds.value.length
  },
  {
    id: 'settings',
    name: 'Paramètres',
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
  }
]);

// Méthodes de formatage
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

// Actions
const loadUserData = async () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  // Remplir le formulaire avec les données utilisateur
  if (user.value) {
    profileForm.name = user.value.name || '';
    profileForm.email = user.value.email || '';
    profileForm.phone = user.value.phone || '';
    profileForm.address = user.value.address || '';
  }

  // Charger les annonces de l'utilisateur
  try {
    const adsResponse = await axios.get('/api/user/ads');
    userAds.value = adsResponse.data;
  } catch (error) {
    console.error('Erreur lors du chargement des annonces:', error);
  }

  // Charger les favoris
  try {
    const favoritesResponse = await axios.get('/api/favorites');
    favoriteAds.value = favoritesResponse.data;
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error);
  }
};

const updateProfile = async () => {
  profileLoading.value = true;
  Object.keys(profileErrors).forEach(key => delete profileErrors[key]);
  profileMessage.value = null;

  try {
    const response = await axios.put('/api/user/profile', profileForm);
    
    // Mettre à jour les données utilisateur dans le store
    Object.assign(user.value, response.data);
    
    profileMessage.value = {
      type: 'success',
      text: 'Profil mis à jour avec succès !'
    };

    // Faire disparaître le message après 3 secondes
    setTimeout(() => {
      profileMessage.value = null;
    }, 3000);

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach(key => {
          profileErrors[key] = error.response.data.errors[key][0];
        });
      } else {
        profileMessage.value = {
          type: 'error',
          text: error.response.data.message || 'Une erreur est survenue'
        };
      }
    } else {
      profileMessage.value = {
        type: 'error',
        text: 'Une erreur est survenue lors de la mise à jour du profil.'
      };
    }
  } finally {
    profileLoading.value = false;
  }
};

const changePassword = async () => {
  passwordLoading.value = true;
  Object.keys(passwordErrors).forEach(key => delete passwordErrors[key]);

  try {
    await axios.put('/api/user/password', passwordForm);
    
    // Réinitialiser le formulaire
    Object.keys(passwordForm).forEach(key => {
      passwordForm[key] = '';
    });

    profileMessage.value = {
      type: 'success',
      text: 'Mot de passe changé avec succès !'
    };

    setTimeout(() => {
      profileMessage.value = null;
    }, 3000);

  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach(key => {
          passwordErrors[key] = error.response.data.errors[key][0];
        });
      } else {
        profileMessage.value = {
          type: 'error',
          text: error.response.data.message || 'Erreur lors du changement de mot de passe'
        };
      }
    } else {
      profileMessage.value = {
        type: 'error',
        text: 'Une erreur est survenue lors du changement de mot de passe.'
      };
    }
  } finally {
    passwordLoading.value = false;
  }
};

const deleteUserAd = async (adId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
    try {
      await axios.delete(`/api/ads/${adId}`);
      userAds.value = userAds.value.filter(ad => ad.id !== adId);
      
      profileMessage.value = {
        type: 'success',
        text: 'Annonce supprimée avec succès !'
      };

      setTimeout(() => {
        profileMessage.value = null;
      }, 3000);

    } catch (error) {
      console.error('Erreur lors de la suppression de l\'annonce:', error);
      profileMessage.value = {
        type: 'error',
        text: 'Erreur lors de la suppression de l\'annonce.'
      };
    }
  }
};

const removeFavorite = async (favoriteId) => {
  try {
    await axios.delete(`/api/favorites/${favoriteId}`);
    favoriteAds.value = favoriteAds.value.filter(fav => fav.id !== favoriteId);
    
    profileMessage.value = {
      type: 'success',
      text: 'Annonce retirée des favoris !'
    };

    setTimeout(() => {
      profileMessage.value = null;
    }, 3000);

  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error);
    profileMessage.value = {
      type: 'error',
      text: 'Erreur lors de la suppression du favori.'
    };
  }
};

const deleteAccount = async () => {
  try {
    await axios.delete('/api/user/account');
    await logout();
    router.push('/');
  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    profileMessage.value = {
      type: 'error',
      text: 'Erreur lors de la suppression du compte.'
    };
    showDeleteModal.value = false;
  }
};

const openAvatarModal = () => {
  // TODO: Implémenter l'upload d'avatar
  console.log('Upload d\'avatar à implémenter');
};

// Chargement initial
onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
/* Animations personnalisées */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Style pour les bordures des inputs */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Style pour les transitions hover */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Style pour les cartes avec effet d'élévation */
.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Style pour l'effet backdrop blur du modal */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>