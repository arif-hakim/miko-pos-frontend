export default [
  {
    path: '/branch',
    name: 'branch',
    component: () => import('@/views/branch/Branch.vue'),
    meta: {
    },
  },
  {
    path: '/branch/create',
    name: 'branch-create',
    component: () => import('@/views/branch/FormBranch.vue'),
    meta: {
    },
  },
  {
    path: '/branch/:id',
    name: 'branch-form',
    component: () => import('@/views/branch/FormBranch.vue'),
    meta: {
    },
  },
]
