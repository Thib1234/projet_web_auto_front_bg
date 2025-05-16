import { ref } from 'vue';
import axios from 'axios';

// URL de base de l'API
const apiBaseUrl = 'http://127.0.0.1:8000/api';

export function useCarListings() {
  // État
  const ads = ref({ data: [] });
  const loading = ref(true);
  const loadingModels = ref(false);
  
  // État pour les filtres dynamiques
  const availableBrands = ref([]);
  const availableModels = ref([]);
  const availableYears = ref([]);
  const availableFuelTypes = ref([]);
  const availableTransmissions = ref(['manuelle', 'automatique', 'semi-automatique']);
  
  // Formatage du prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Formatage des nombres
  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };
  
  // Récupération des annonces avec filtres
  const fetchAds = async (page = 1, filterParams = {}) => {
    loading.value = true;
    
    try {
      const params = { page, ...filterParams };
      
      const response = await axios.get(`${apiBaseUrl}/ads`, { params });
      ads.value = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Charger les valeurs disponibles pour les filtres
  const loadFilterOptions = async () => {
    try {
      // Essayer d'abord l'endpoint dédié s'il existe
      const response = await axios.get(`${apiBaseUrl}/ads/filter-options`);
      
      if (response.data) {
        // Utiliser les données renvoyées
        availableBrands.value = response.data.brands || [];
        availableFuelTypes.value = response.data.fuel_types || [];
        
        // Générer les années de 1990 à l'année actuelle
        const currentYear = new Date().getFullYear();
        availableYears.value = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
      }
    } catch (error) {
      console.warn('Aucun endpoint pour les options de filtrage, utilisation de valeurs par défaut');
      
      try {
        // Fallback : extraire les marques et carburants des données actuelles
        const adsResponse = await axios.get(`${apiBaseUrl}/ads`);
        if (adsResponse.data && adsResponse.data.data) {
          const allAds = adsResponse.data.data;
          
          // Extraire les marques et carburants uniques
          const brands = [...new Set(allAds.map(ad => ad.brand))];
          const fuelTypes = [...new Set(allAds.map(ad => ad.fuel_type))];
          
          if (brands.length > 0) availableBrands.value = brands;
          if (fuelTypes.length > 0) availableFuelTypes.value = fuelTypes;
        }
      } catch (fallbackError) {
        console.error('Erreur lors de la récupération des données:', fallbackError);
      }
      
      // Valeurs par défaut
      if (availableBrands.value.length === 0) {
        availableBrands.value = ['Renault', 'Peugeot', 'Citroën', 'Ford', 'BMW', 'Audi', 'Volkswagen', 'Mercedes', 'Toyota', 'Nissan'];
      }
      
      if (availableFuelTypes.value.length === 0) {
        availableFuelTypes.value = ['essence', 'diesel', 'hybride', 'electrique'];
      }
      
      // Générer les années de 1990 à l'année actuelle
      const currentYear = new Date().getFullYear();
      availableYears.value = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);
    }
  };
  
  // Charger les modèles disponibles pour une marque sélectionnée
  const loadModelsForBrand = async (brand) => {
    if (!brand) {
      availableModels.value = [];
      return;
    }
    
    loadingModels.value = true;
    
    try {
      // Essayer d'abord l'endpoint dédié
      const response = await axios.get(`${apiBaseUrl}/ads/models`, {
        params: { brand }
      });
      
      if (response.data && response.data.models) {
        availableModels.value = response.data.models;
      }
    } catch (error) {
      console.warn('Aucun endpoint pour les modèles, utilisation de filtrage direct');
      
      try {
        // Fallback : filtrer les annonces par marque et extraire les modèles
        const adsResponse = await axios.get(`${apiBaseUrl}/ads`, {
          params: { brand }
        });
        
        if (adsResponse.data && adsResponse.data.data) {
          const models = [...new Set(adsResponse.data.data.map(ad => ad.model))];
          availableModels.value = models;
        }
      } catch (fallbackError) {
        console.error('Erreur lors de la récupération des modèles:', fallbackError);
        availableModels.value = [];
      }
    } finally {
      loadingModels.value = false;
    }
  };
  
  return {
    ads,
    loading,
    loadingModels,
    availableBrands,
    availableModels,
    availableYears,
    availableFuelTypes,
    availableTransmissions,
    formatPrice,
    formatNumber,
    fetchAds,
    loadFilterOptions,
    loadModelsForBrand
  };
}