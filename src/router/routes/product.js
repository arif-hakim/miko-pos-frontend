export default [
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/product/Product.vue'),
    meta: {
    },
  },
  {
    path: '/product/create',
    name: 'product-create',
    component: () => import('@/views/product/FormProduct.vue'),
    meta: {
    },
  },
  {
    path: '/product/:id',
    name: 'product-create',
    component: () => import('@/views/product/FormProduct.vue'),
    meta: {
    },
  },
  {
    path: '/product/:id/stock-history',
    name: 'update-stock',
    component: () => import('@/views/product/ProductStockHistory.vue'),
    meta: {
    },
  },
  {
    path: '/product/:id/:operation-stock',
    name: 'update-stock',
    component: () => import('@/views/product/FormProductStock.vue'),
    meta: {
    },
  },
]