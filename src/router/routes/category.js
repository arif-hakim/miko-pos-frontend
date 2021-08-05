export default [
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/Category.vue'),
    meta: {
    },
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: () => import('@/views/category/FormCategory.vue'),
    meta: {
    },
  },
  {
    path: '/category/:id',
    name: 'category-edit',
    component: () => import('@/views/category/FormCategory.vue'),
    meta: {
    },
  },
]
