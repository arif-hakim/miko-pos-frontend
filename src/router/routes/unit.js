export default [
  {
    path: '/unit',
    name: 'unit',
    component: () => import('@/views/unit/Unit.vue'),
    meta: {
    },
  },
  {
    path: '/unit/create',
    name: 'unit-create',
    component: () => import('@/views/unit/FormUnit.vue'),
    meta: {
    },
  },
  {
    path: '/unit/:id',
    name: 'unit-form',
    component: () => import('@/views/unit/FormUnit.vue'),
    meta: {
    },
  },
]
