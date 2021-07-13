export default [
  {
    path: '/create-company',
    name: 'create-company',
    component: () => import('@/views/user/CreateCompany.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/create-branch',
    name: 'create-branch',
    component: () => import('@/views/user/CreateBranch.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/create-unit',
    name: 'create-unit',
    component: () => import('@/views/user/CreateUnit.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/choose-branch',
    name: 'choose-branch',
    component: () => import('@/views/user/ChooseBranch.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/choose-unit',
    name: 'choose-unit',
    component: () => import('@/views/user/ChooseUnit.vue'),
    meta: {
      layout: 'full',
    },
  },
]
