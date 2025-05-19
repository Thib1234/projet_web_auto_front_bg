<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        
        <!-- En-tête -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Une question ? Un problème ? Notre équipe est là pour vous aider. 
            N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- Informations de contact -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-3xl shadow-sm p-8 space-y-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              
              <!-- Adresse -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p class="text-gray-600">
                    123 Rue des Automobiles<br>
                    1000 Bruxelles, Belgique
                  </p>
                </div>
              </div>

              <!-- Téléphone -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <p class="text-gray-600">
                    <a href="tel:+3225551234" class="hover:text-blue-600 transition-colors">
                      +32 2 555 12 34
                    </a>
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                  <p class="text-gray-600">
                    <a href="mailto:contact@automarket.be" class="hover:text-blue-600 transition-colors">
                      contact@automarket.be
                    </a>
                  </p>
                </div>
              </div>

              <!-- Horaires -->
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 mb-1">Horaires</h3>
                  <div class="text-gray-600 text-sm space-y-1">
                    <p>Lundi - Vendredi : 9h - 18h</p>
                    <p>Samedi : 10h - 16h</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>

              <!-- Réseaux sociaux -->
              <div class="pt-6 border-t border-gray-100">
                <h3 class="font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                <div class="flex space-x-4">
                  <a href="#" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.74-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.029 12.017z"/>
                    </svg>
                  </a>
                  <a href="#" class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de contact -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-3xl shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Nom et Email -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      :class="{ 'border-red-300 bg-red-50': errors.name }"
                      placeholder="Votre nom complet"
                    />
                    <div v-if="errors.name" class="text-red-600 text-sm font-medium mt-1">
                      {{ errors.name }}
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                      Adresse email *
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      :class="{ 'border-red-300 bg-red-50': errors.email }"
                      placeholder="votre@email.com"
                    />
                    <div v-if="errors.email" class="text-red-600 text-sm font-medium mt-1">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>

                <!-- Téléphone et Sujet -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      :class="{ 'border-red-300 bg-red-50': errors.phone }"
                      placeholder="+32 2 555 12 34"
                    />
                    <div v-if="errors.phone" class="text-red-600 text-sm font-medium mt-1">
                      {{ errors.phone }}
                    </div>
                  </div>

                  <div>
                    <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      v-model="form.subject"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                      :class="{ 'border-red-300 bg-red-50': errors.subject }"
                    >
                      <option value="">Choisissez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="technical">Problème technique</option>
                      <option value="account">Compte utilisateur</option>
                      <option value="ad">Problème avec une annonce</option>
                      <option value="payment">Questions de paiement</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                    <div v-if="errors.subject" class="text-red-600 text-sm font-medium mt-1">
                      {{ errors.subject }}
                    </div>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    required
                    rows="6"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors resize-none"
                    :class="{ 'border-red-300 bg-red-50': errors.message }"
                    placeholder="Décrivez votre demande en détail..."
                  ></textarea>
                  <div v-if="errors.message" class="text-red-600 text-sm font-medium mt-1">
                    {{ errors.message }}
                  </div>
                  <div class="text-sm text-gray-500 mt-1">
                    {{ form.message.length }}/1000 caractères
                  </div>
                </div>

                <!-- Checkbox acceptation -->
                <div class="flex items-start space-x-3">
                  <input
                    id="privacy"
                    v-model="form.acceptPrivacy"
                    type="checkbox"
                    required
                    class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="privacy" class="text-sm text-gray-600">
                    J'accepte que mes données personnelles soient utilisées pour traiter ma demande. *
                    <a href="/privacy" class="text-blue-600 hover:underline">Politique de confidentialité</a>
                  </label>
                </div>

                <!-- Messages de réponse -->
                <div v-if="responseMessage" class="rounded-2xl p-6 border-l-4" :class="{
                  'bg-green-50 border-green-400': responseMessage.type === 'success',
                  'bg-red-50 border-red-400': responseMessage.type === 'error'
                }">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6" :class="{
                        'text-green-500': responseMessage.type === 'success',
                        'text-red-500': responseMessage.type === 'error'
                      }" viewBox="0 0 20 20" fill="currentColor">
                        <path v-if="responseMessage.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <h3 class="text-base font-semibold" :class="{
                        'text-green-800': responseMessage.type === 'success',
                        'text-red-800': responseMessage.type === 'error'
                      }">
                        {{ responseMessage.title }}
                      </h3>
                      <p class="mt-1 text-sm" :class="{
                        'text-green-700': responseMessage.type === 'success',
                        'text-red-700': responseMessage.type === 'error'
                      }">
                        {{ responseMessage.message }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Bouton d'envoi -->
                <div class="flex justify-end pt-6">
                  <button
                    type="submit"
                    :disabled="loading || !form.acceptPrivacy"
                    class="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span v-if="loading" class="inline-flex items-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                    <span v-else>
                      <svg class="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                      Envoyer le message
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-16">
          <div class="bg-white rounded-3xl shadow-sm p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Questions fréquemment posées</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-for="faq in faqs" :key="faq.id" class="space-y-4">
                <h3 class="font-semibold text-gray-900">{{ faq.question }}</h3>
                <p class="text-gray-600 text-sm">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

// État du composant
const loading = ref(false);
const responseMessage = ref(null);

// Formulaire
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  acceptPrivacy: false
});

// Erreurs
const errors = reactive({});

// FAQ
const faqs = ref([
  {
    id: 1,
    question: "Comment puis-je créer une annonce ?",
    answer: "Connectez-vous à votre compte, cliquez sur 'Créer une annonce' et suivez les étapes du formulaire."
  },
  {
    id: 2,
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui, nous utilisons un chiffrement SSL et respectons strictement votre vie privée selon notre politique de confidentialité."
  },
  {
    id: 3,
    question: "Comment contacter un vendeur ?",
    answer: "Sur la page de l'annonce, utilisez le bouton 'Contacter le vendeur' pour envoyer un message direct."
  },
  {
    id: 4,
    question: "Puis-je modifier mon annonce ?",
    answer: "Oui, dans votre profil, section 'Mes annonces', vous pouvez modifier ou supprimer vos annonces."
  },
  {
    id: 5,
    question: "Y a-t-il des frais pour publier ?",
    answer: "La publication d'annonces de base est gratuite. Des options premium sont disponibles pour plus de visibilité."
  },
  {
    id: 6,
    question: "Comment signaler une annonce frauduleuse ?",
    answer: "Utilisez le bouton 'Signaler' sur l'annonce ou contactez-nous directement avec les détails."
  }
]);

// Actions
const submitForm = async () => {
  loading.value = true;
  clearErrors();
  responseMessage.value = null;

  try {
    await axios.post('/api/contact', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message
    });

    responseMessage.value = {
      type: 'success',
      title: 'Message envoyé avec succès !',
      message: 'Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.'
    };

    // Réinitialiser le formulaire
    Object.keys(form).forEach(key => {
      if (key !== 'acceptPrivacy') {
        form[key] = '';
      }
    });
    form.acceptPrivacy = false;

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        // Erreurs de validation
        Object.keys(error.response.data.errors).forEach(key => {
          errors[key] = error.response.data.errors[key][0];
        });
      } else {
        responseMessage.value = {
          type: 'error',
          title: 'Erreur lors de l\'envoi',
          message: error.response.data.message || 'Une erreur est survenue. Veuillez réessayer.'
        };
      }
    } else {
      responseMessage.value = {
        type: 'error',
        title: 'Erreur de connexion',
        message: 'Impossible d\'envoyer votre message. Vérifiez votre connexion internet.'
      };
    }
  } finally {
    loading.value = false;
  }
};

const clearErrors = () => {
  Object.keys(errors).forEach(key => delete errors[key]);
};
</script>

<style scoped>
/* Styles personnalisés */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Animation pour les éléments */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
/* Effet de survol pour les liens sociaux */
.social-link {
  transform: scale(1);
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: scale(1.1);
}

/* Style pour le compteur de caractères */
.character-count {
  transition: color 0.3s ease;
}

.character-count.near-limit {
  color: #f59e0b;
}

.character-count.at-limit {
  color: #ef4444;
}
</style>