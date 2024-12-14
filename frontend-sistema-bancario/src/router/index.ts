import { createRouter, createWebHistory } from 'vue-router'
import ContaForm from '../components/ContaForm.vue'
import TransacaoForm from '../components/TransacaoForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ContaForm,
    },
    {
      path: '/transacaoForm',
      name: 'Transacao',
      component: TransacaoForm 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
