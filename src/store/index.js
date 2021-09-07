import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import user from './user'
import company from './company'
import branch from './branch'
import unit from './unit'
import category from './category'
import product from './product'
import material from './material'
import materialCategory from './materialCategory'
import transaction from './transaction'
import cart from './cart'
import conversion from './conversion'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    company,
    branch,
    unit,
    category,
    product,
    material,
    transaction,
    cart,
    materialCategory,
    conversion,
    
    // Template Dependency
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
