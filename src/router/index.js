import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from 'firebase/auth'
import { ElMessage } from 'element-plus'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import DownloadMapView from '../views/DownloadMapView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    //   // component: AboutView,
    // },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationView,
      // component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/download-map',
      name: 'download-map',
      component: DownloadMapView,
      // component: () => import('../views/DownloadMapView.vue'),
      meta: {
        requiredAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      ElMessage.info('Login First, You do not have access!!!')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
