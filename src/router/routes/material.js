export default [
  {
    path: '/material',
    name: 'material',
    component: () => import('@/views/material/Material.vue'),
    meta: {
    },
  },
  {
    path: '/material/create',
    name: 'material-create',
    component: () => import('@/views/material/FormMaterial.vue'),
    meta: {
    },
  },
  {
    path: '/material/:id',
    name: 'material-create',
    component: () => import('@/views/material/FormMaterial.vue'),
    meta: {
    },
  },
  {
    path: '/material/:id/stock-history',
    name: 'update-stock',
    component: () => import('@/views/material/MaterialStockHistory.vue'),
    meta: {
    },
  },
  {
    path: '/material/:id/:operation-stock',
    name: 'update-stock',
    component: () => import('@/views/material/FormMaterialStock.vue'),
    meta: {
    },
  },
]