export default [
  {
    path: '/conversion',
    name: 'conversion',
    component: () => import('@/views/conversion/Conversion.vue'),
    meta: {
      pageTitle: 'Conversion',
      breadcrumb: [
        {
          text: 'Conversion',
          active: true,
        },
      ],
    },
  },
  {
    path: '/conversion/create',
    name: 'conversion-create',
    component: () => import('@/views/conversion/FormConversion.vue'),
    meta: {
      pageTitle: 'Conversion',
      breadcrumb: [
        {
          text: 'Conversion',
          to: { name: 'conversion' },
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/conversion/:id',
    name: 'conversion-edit',
    component: () => import('@/views/conversion/FormConversion.vue'),
    meta: {
      pageTitle: 'Conversion',
      breadcrumb: [
        {
          text: 'Conversion',
          to: { name: 'conversion' },
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
