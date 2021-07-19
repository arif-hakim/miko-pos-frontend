export default [
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/Order.vue'),
    meta: {
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
