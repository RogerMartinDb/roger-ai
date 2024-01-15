import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import DrawView from '../views/DrawView.vue'
import TranslateView from '../views/TranslateView.vue'
import PlaygroundView from '../views/PlaygroundView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChatView
    },
    {
      path: '/draw',
      name: 'draw',
      component: DrawView
    },
    {
      path: '/translate',
      name: 'translate',
      component: TranslateView
    },
    {
      path: '/playground',
      name: 'playground',
      component: PlaygroundView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
