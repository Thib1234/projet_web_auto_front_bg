<!-- RegisterPage.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link 
            to="/login" 
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            connectez-vous à votre compte existant
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Votre nom complet"
            />
            <div v-if="errors.name" class="text-red-500 text-xs mt-1">
              {{ errors.name }}
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              placeholder="votre@email.com"
            />
            <div v-if="errors.email" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.phone }"
              placeholder="Votre numéro de téléphone"
            />
            <div v-if="errors.phone" class="text-red-500 text-xs mt-1">
              {{ errors.phone }}
            </div>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Adresse (optionnel)</label>
            <textarea
              id="address"
              v-model="form.address"
              rows="2"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.address }"
              placeholder="Votre adresse"
            ></textarea>
            <div v-if="errors.address" class="text-red-500 text-xs mt-1">
              {{ errors.address }}
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Au moins 8 caractères"
            />
            <div v-if="errors.password" class="text-red-500 text-xs mt-1">
              {{ errors.password }}
            </div>
          </div>

          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.password_confirmation }"
              placeholder="Confirmez votre mot de passe"
            />
            <div v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">
              {{ errors.password_confirmation }}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Création du compte...' : 'Créer mon compte' }}
          </button>
        </div>
      </form>

      <!-- Message d'erreur global -->
      <div 
        v-if="errors.global" 
        class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
      >
        <div class="text-sm text-red-700">
          {{ errors.global }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: 'Home' })
  }
})

const handleRegister = async () => {
  authStore.clearErrors()

  const success = await authStore.register(form)

  if (success) {
    router.push({ 
      name: 'Login', 
      query: { registered: 'success' } 
    })
  }
}
</script>