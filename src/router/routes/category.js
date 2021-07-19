export default [
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/Category.vue'),
    meta: {
      pageTitle: 'Category',
      breadcrumb: [
        {
          text: 'Category',
          active: true,
        },
      ],
    },
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: () => import('@/views/category/FormCategory.vue'),
    meta: {
      pageTitle: 'Category',
      breadcrumb: [
        {
          text: 'Category',
          to: { name: 'category' },
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/category/:id',
    name: 'category-edit',
    component: () => import('@/views/category/FormCategory.vue'),
    meta: {
      pageTitle: 'Category',
      breadcrumb: [
        {
          text: 'Category',
          to: { name: 'category' },
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
