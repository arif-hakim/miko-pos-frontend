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
      pageTitle: 'Create New Order',
      contentClass: 'ecommerce-application',
      breadcrumb: [
        {
          text: 'Order',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
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
