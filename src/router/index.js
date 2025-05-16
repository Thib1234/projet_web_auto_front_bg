import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import ('@/views/HomeView.vue')
  },
  {
    path: '/ads',
    name: 'car-listings',
    component: () => import('@/views/CarListings.vue')
  },
  {
    path: '/ads/:id',
    name: 'car-details',
    component: () => import('@/views/CarDetails.vue')
  },
  // Routes additionnelles
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router