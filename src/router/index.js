import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/sign-in',
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
