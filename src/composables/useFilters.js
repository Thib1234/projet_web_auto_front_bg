import { reactive, computed } from 'vue';

export function useFilters({ fetchAds }) {
  // Filtres
  const filters = reactive({
    brand: '',
    model: '',
    min_price: null,
    max_price: null,
    min_year: null,
    max_year: null,
    fuel_type: '',
    transmission: ''
  });
  
  // Libellés des filtres pour l'affichage
  const filterLabels = {
    brand: 'Marque',
    model: 'Modèle',
    min_price: 'Prix min',
    max_price: 'Prix max',
    min_year: 'Année min',
    max_year: 'Année max',
    fuel_type: 'Carburant',
    transmission: 'Transmission'
  };
  
  // Computed pour les filtres actifs
  const activeFilters = computed(() => {
    const active = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        active[key] = value;
      }
    });
    
    return active;
  });
  
  const hasActiveFilters = computed(() => {
    return Object.keys(activeFilters.value).length > 0;
  });
  
  // Méthodes pour l'affichage des filtres
  const getFilterLabel = (key) => {
    return filterLabels[key] || key;
  };
  
  const formatFilterValue = (key, value) => {
    if (key === 'min_price' || key === 'max_price') {
      return `${new Intl.NumberFormat('fr-FR').format(value)} €`;
    }
    if (key === 'fuel_type' || key === 'transmission') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };
  
  // Retirer un filtre spécifique
  const removeFilter = (key) => {
    filters[key] = key.startsWith('min_') || key.startsWith('max_') ? null : '';
    handleFilterChange();
  };
  
  // Debouncing pour éviter trop d'appels API lors de la saisie
  let debounceTimer;
  const debounceFilterChange = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleFilterChange();
    }, 500); // Délai de 500ms
  };
  
  // Gestion du changement de filtre (appelé automatiquement)
  const handleFilterChange = () => {
    const filterParams = {};
    
    // Ajouter les filtres non vides
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '' && filters[key] !== null) {
        filterParams[key] = filters[key];
      }
    });
    
    fetchAds(1, filterParams); // Revenir à la première page avec les nouveaux filtres
  };
  
  // Réinitialisation des filtres
  const resetFilters = () => {
    Object.keys(filters).forEach(key => {
      filters[key] = key.startsWith('min_') || key.startsWith('max_') ? null : '';
    });
    
    fetchAds(1);
  };
  
  return {
    filters,
    filterLabels,
    activeFilters,
    hasActiveFilters,
    getFilterLabel,
    formatFilterValue,
    removeFilter,
    debounceFilterChange,
    handleFilterChange,
    resetFilters
  };
}