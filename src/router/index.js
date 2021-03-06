import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, noActiveBranch, noActiveUnit, isInitCompanyNeeded, isInitBranchNeeded, isInitUnitNeeded } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'
import order from './routes/order'
import category from './routes/category'
import product from './routes/product'
import material from './routes/material'
import materialCategory from './routes/material-category'
import conversion from './routes/conversion'
import user from './routes/user'
import branch from './routes/branch'
import unit from './routes/unit'
import company from './routes/company'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
      },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      meta: {
        pageTitle: 'Dashboard',
      },
    },
    {
      path: '/make-order',
      name: 'make-order',
      component: () => import('@/views/order/MakeOrder.vue'),
      meta: {
        layout: 'make-order',
        contentClass: 'ecommerce-application',
      },
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/pages/authentication/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/register',
      name: 'auth-register',
      component: () => import('@/views/pages/authentication/Register.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    ...materialCategory,
    ...category,
    ...order,
    ...product,
    ...material,
    ...user,
    ...branch,
    ...unit,
    ...apps,
    ...company,
    ...conversion,
    {
      path: '*',
      redirect: 'error-404',
    },
    // ...dashboard,
    // ...pages,
    // ...chartsMaps,
    // ...formsTable,
    // ...uiElements,
    // ...others,
  ],
})

router.beforeEach(async (to, _, next) => {
  const isLoggedIn = await isUserLoggedIn()
  if (['/make-order'].includes(to.path)) return next()
  if (['/login', '/register'].includes(to.path)) {
    if (isLoggedIn) return next('/')
    return next()
  }

  if (!isLoggedIn && !to.meta.redirectIfLoggedIn) return next('/login')

  // ==============
  // COMPANY INIT
  // ==============
  if (to.path === '/create-company') {
    if (isInitCompanyNeeded()) return next()
    else return next('/')
  }
  if (isInitCompanyNeeded()) return next('/create-company')
  
  // ==============
  // BRANCH INIT
  // ==============
  if (to.path === '/create-branch') {
    return next()
  }
  if (isInitBranchNeeded()) return next('/create-branch')


  if (to.path === '/choose-branch') {
    if (noActiveBranch()) return next()
    else return next('/')
  }
  if (noActiveBranch()) return next('/choose-branch')
  
  // ==============
  // UNIT INIT
  // ==============
  if (to.path === '/create-unit') {
    return next()
  }
  if (isInitUnitNeeded()) return next('/create-unit')
  
  if (to.path === '/choose-unit') {
    if (noActiveUnit()) return next()
    else return next('/')
  }
  if (noActiveUnit()) return next('/choose-unit')

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
