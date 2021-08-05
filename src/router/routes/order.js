export default [
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/Order.vue'),
    meta: {
    },
  },
  {
    path: '/order/create',
    name: 'order',
    component: () => import('@/views/order/FormOrder.vue'),
    meta: {
      contentClass: 'ecommerce-application',
    },
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('@/views/order/OrderDetail.vue'),
    meta: {
      
    },
  },
]
