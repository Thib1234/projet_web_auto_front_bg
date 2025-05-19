<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Chargement -->
        <div v-if="loadingAd" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- Erreur de chargement -->
        <div v-else-if="loadError" class="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.354 4h13.856C19.6 6.667 18.54 8 17 8H7C5.46 8 4.4 6.667 5.17 4z"></path>
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
          <p class="text-red-700">{{ loadError }}</p>
          <router-link
            to="/ads"
            class="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retour aux annonces
          </router-link>
        </div>

        <!-- Formulaire de modification -->
        <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- En-tête -->
          <div class="bg-green-600 px-6 py-4">
            <h1 class="text-2xl font-bold text-white">Modifier l'annonce</h1>
            <p class="text-green-100 mt-1">{{ form.brand }} {{ form.model }}</p>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <!-- Informations de base -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Marque -->
              <div>
                <label for="brand" class="block text-sm font-medium text-gray-700 mb-2">
                  Marque *
                </label>
                <input
                  id="brand"
                  v-model="form.brand"
                  type="text"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.brand }"
                  placeholder="Ex: Renault, Peugeot..."
                />
                <div v-if="errors.brand" class="text-red-500 text-sm mt-1">
                  {{ errors.brand }}
                </div>
              </div>

              <!-- Modèle -->
              <div>
                <label for="model" class="block text-sm font-medium text-gray-700 mb-2">
                  Modèle *
                </label>
                <input
                  id="model"
                  v-model="form.model"
                  type="text"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.model }"
                  placeholder="Ex: Clio, 208..."
                />
                <div v-if="errors.model" class="text-red-500 text-sm mt-1">
                  {{ errors.model }}
                </div>
              </div>

              <!-- Année -->
              <div>
                <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
                  Année *
                </label>
                <input
                  id="year"
                  v-model.number="form.year"
                  type="number"
                  required
                  :min="1900"
                  :max="new Date().getFullYear() + 1"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.year }"
                  placeholder="Ex: 2020"
                />
                <div v-if="errors.year" class="text-red-500 text-sm mt-1">
                  {{ errors.year }}
                </div>
              </div>

              <!-- Kilométrage -->
              <div>
                <label for="mileage" class="block text-sm font-medium text-gray-700 mb-2">
                  Kilométrage (km) *
                </label>
                <input
                  id="mileage"
                  v-model.number="form.mileage"
                  type="number"
                  required
                  min="0"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.mileage }"
                  placeholder="Ex: 50000"
                />
                <div v-if="errors.mileage" class="text-red-500 text-sm mt-1">
                  {{ errors.mileage }}
                </div>
              </div>

              <!-- Prix -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
                  Prix (€) *
                </label>
                <input
                  id="price"
                  v-model.number="form.price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.price }"
                  placeholder="Ex: 15000"
                />
                <div v-if="errors.price" class="text-red-500 text-sm mt-1">
                  {{ errors.price }}
                </div>
              </div>

              <!-- Type de carburant -->
              <div>
                <label for="fuel_type" class="block text-sm font-medium text-gray-700 mb-2">
                  Carburant *
                </label>
                <select
                  id="fuel_type"
                  v-model="form.fuel_type"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.fuel_type }"
                >
                  <option value="">Sélectionnez un carburant</option>
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                </select>
                <div v-if="errors.fuel_type" class="text-red-500 text-sm mt-1">
                  {{ errors.fuel_type }}
                </div>
              </div>

              <!-- Transmission -->
              <div>
                <label for="transmission" class="block text-sm font-medium text-gray-700 mb-2">
                  Transmission *
                </label>
                <select
                  id="transmission"
                  v-model="form.transmission"
                  required
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  :class="{ 'border-red-500': errors.transmission }"
                >
                  <option value="">Sélectionnez une transmission</option>
                  <option value="Manuel">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
                <div v-if="errors.transmission" class="text-red-500 text-sm mt-1">
                  {{ errors.transmission }}
                </div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                v-model="form.description"
                required
                rows="5"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                :class="{ 'border-red-500': errors.description }"
                placeholder="Décrivez votre véhicule en détail..."
              ></textarea>
              <div v-if="errors.description" class="text-red-500 text-sm mt-1">
                {{ errors.description }}
              </div>
            </div>

            <!-- Photos existantes -->
            <div v-if="existingPhotos.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Photos actuelles
              </label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="photo in existingPhotos"
                  :key="photo.id"
                  class="relative group"
                >
                  <img
                    :src="getPhotoUrl(photo.path)"
                    :alt="`Photo ${photo.id}`"
                    class="w-full h-24 object-cover rounded-md shadow"
                  />
                  <button
                    type="button"
                    @click="removeExistingPhoto(photo.id)"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Nouvelles photos -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Ajouter de nouvelles photos
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span>Téléchargez des photos</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/jpg"
                        @change="handleFileSelection"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">ou glissez-déposez</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG jusqu'à 2MB chacune</p>
                </div>
              </div>
              
              <!-- Prévisualisation des nouvelles photos -->
              <div v-if="newFiles.length > 0" class="mt-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    v-for="(file, index) in newFiles"
                    :key="index"
                    class="relative group"
                  >
                    <img
                      :src="file.preview"
                      :alt="`Nouvelle photo ${index + 1}`"
                      class="w-full h-24 object-cover rounded-md shadow"
                    />
                    <button
                      type="button"
                      @click="removeNewFile(index)"
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-if="errors.photos" class="text-red-500 text-sm mt-1">
                {{ errors.photos }}
              </div>
            </div>

            <!-- Message d'erreur global -->
            <div v-if="errors.global" class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">
                    Erreur lors de la modification
                  </h3>
                  <div class="mt-2 text-sm text-red-700">
                    {{ errors.global }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex justify-between pt-6 border-t border-gray-200">
              <router-link
                :to="`/ads/${adId}`"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Annuler
              </router-link>
              <button
                type="submit"
                :disabled="loading"
                class="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Modification en cours...
                </span>
                <span v-else>Sauvegarder les modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const { isLoggedIn, user } = useAuth();

// ID de l'annonce
const adId = route.params.id;

// État du composant
const loadingAd = ref(true);
const loading = ref(false);
const loadError = ref(null);
const existingPhotos = ref([]);
const newFiles = ref([]);
const photosToDelete = ref([]);

// Formulaire reactif
const form = reactive({
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  mileage: '',
  price: '',
  fuel_type: '',
  transmission: '',
  description: ''
});

// Erreurs
const errors = reactive({});

// Vérifier l'authentification au montage
onMounted(async () => {
  if (!isLoggedIn.value) {
    router.push('/login?redirect=' + route.fullPath);
    return;
  }
  
  await loadAd();
});

// Charger l'annonce existante
const loadAd = async () => {
  try {
    loadingAd.value = true;
    loadError.value = null;
    
    const response = await axios.get(`/api/ads/${adId}`);
    const ad = response.data;
    
    // Vérifier que l'utilisateur est le propriétaire
    if (ad.user_id !== user.value.id) {
      loadError.value = "Vous n'êtes pas autorisé à modifier cette annonce.";
      return;
    }
    
    // Remplir le formulaire avec les données existantes
    Object.keys(form).forEach(key => {
      if (ad[key] !== undefined) {
        form[key] = ad[key];
      }
    });
    
    // Charger les photos existantes
    existingPhotos.value = ad.photos || [];
    
  } catch (error) {
    console.error('Erreur lors du chargement de l\'annonce:', error);
    if (error.response && error.response.status === 404) {
      loadError.value = 'Cette annonce n\'existe pas.';
    } else if (error.response && error.response.status === 403) {
      loadError.value = 'Vous n\'êtes pas autorisé à modifier cette annonce.';
    } else {
      loadError.value = 'Une erreur est survenue lors du chargement de l\'annonce.';
    }
  } finally {
    loadingAd.value = false;
  }
};

// Obtenir l'URL d'une photo
const getPhotoUrl = (path) => {
  return `${axios.defaults.baseURL}/storage/${path}`;
};

// Gestion de la sélection de nouveaux fichiers
const handleFileSelection = (event) => {
  const files = Array.from(event.target.files);
  
  files.forEach(file => {
    // Vérification de la taille (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      errors.photos = 'Les fichiers doivent faire moins de 2MB chacun';
      return;
    }
    
    // Création de la prévisualisation
    const reader = new FileReader();
    reader.onload = (e) => {
      newFiles.value.push({
        file: file,
        preview: e.target.result
      });
    };
    reader.readAsDataURL(file);
  });
  
  // Vider l'input pour permettre la sélection du même fichier
  event.target.value = '';
};

// Supprimer un nouveau fichier sélectionné
const removeNewFile = (index) => {
  newFiles.value.splice(index, 1);
};

// Marquer une photo existante pour suppression
const removeExistingPhoto = (photoId) => {
  const photoIndex = existingPhotos.value.findIndex(photo => photo.id === photoId);
  if (photoIndex !== -1) {
    existingPhotos.value.splice(photoIndex, 1);
    photosToDelete.value.push(photoId);
  }
};

// Effacer les erreurs
const clearErrors = () => {
  Object.keys(errors).forEach(key => delete errors[key]);
};

// Soumission du formulaire
const handleSubmit = async () => {
  loading.value = true;
  clearErrors();
  
  try {
    // Créer un FormData pour inclure les fichiers
    const formData = new FormData();
    
    // Ajouter les données du formulaire
    Object.keys(form).forEach(key => {
      if (form[key] !== '' && form[key] !== null) {
        formData.append(key, form[key]);
      }
    });
    
    // Ajouter les nouvelles photos
    newFiles.value.forEach((fileObj, index) => {
      formData.append(`photos[${index}]`, fileObj.file);
    });
    
    // Ajouter les IDs des photos à supprimer
    if (photosToDelete.value.length > 0) {
      photosToDelete.value.forEach((photoId, index) => {
        formData.append(`photos_to_delete[${index}]`, photoId);
      });
    }
    
    formData.append('_method', 'PUT');
    
    // Envoyer la requête
    const response = await axios.post(`/api/ads/${adId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Rediriger vers la page de détail de l'annonce
    router.push(`/ads/${adId}`);
    
  } catch (error) {
    console.error('Erreur lors de la modification de l\'annonce:', error);
    
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        // Erreurs de validation Laravel
        Object.keys(error.response.data.errors).forEach(key => {
          errors[key] = error.response.data.errors[key][0];
        });
      } else if (error.response.data.message) {
        errors.global = error.response.data.message;
      }
    } else {
      errors.global = 'Une erreur est survenue lors de la modification de l\'annonce.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
.transition-opacity {
  transition: opacity 0.2s ease;
}
</style>