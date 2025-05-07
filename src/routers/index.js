import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/_404.vue'
import useCore from '@/store/core.pinia.js'
import DashboardView from '@/pages/dashboard/DashboardView.vue'
import AppView from '@/pages/AppView.vue'
import navigations from '@/routers/navigations.js'
import AuthRegisterComponent from '../pages/auth/register/AuthRegisterComponent.vue'
import AuthLoginView from '../pages/auth/login/AuthLoginView.vue'

const AuthView = () => import('@/pages/auth/AuthView.vue')

const accessNavigation = navigations.filter((item) => item.meta.showMenu)

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HR',
      component: AppView,
      redirect: { name: 'AuthView' },
      children: [
        {
          path: 'auth',
          name: 'AuthView',
          component: AuthView,
          redirect: {
            name: 'AuthLogin',
          },
          children: [
            {
              path: 'login',
              name: 'AuthLogin',
              component: AuthLoginView,
            },
            {
              path: 'register',
              name: 'AuthRegisterWithEri',
              component: AuthRegisterComponent,
            },
          ]
        },

        {
          path: 'dashboard',
          name: 'DashboardView',
          component: DashboardView,
          redirect: { name: accessNavigation[0]?.name },
          children: accessNavigation
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
      name: 'DashboardNotFound'
    }
  ]
})

const routerFactory = (i18n) => {
  router.beforeEach((to, from, next) => {
    document.title = i18n.t(`menu.${to.name}`)
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      if (to.path.includes('dashboard')) {
        return next()
      } else {
        return next({ name: 'DashboardView' })
      }
    } else {
      if (!to.path.includes('dashboard')) {
        return next()
      } else {
        return next({ name: 'AuthView' })
      }
    }
    return next()
  })
  return router
}

export default routerFactory
