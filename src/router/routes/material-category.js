export default [
  {
    path: '/material-category',
    name: 'material-category',
    component: () => import('@/views/materialCategory/MaterialCategory.vue'),
    meta: {
      pageTitle: 'Raw Material',
      breadcrumb: [
        {
          text: 'Category',
          active: true,
        },
      ],
    },
  },
  {
    path: '/material-category/create',
    name: 'material-category-create',
    component: () => import('@/views/materialCategory/FormMaterialCategory.vue'),
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
    path: '/material-category/:id',
    name: 'material-category-edit',
    component: () => import('@/views/materialCategory/FormMaterialCategory.vue'),
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
