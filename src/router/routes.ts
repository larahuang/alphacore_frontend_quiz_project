import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'Login',
      },
    ],
  },
  {
    path: '/admin/',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: 'index',
        name: 'Admin',
        component: () => import('pages/Dashboard/orderLists.vue'),
        meta: { title: 'admin', requiresAuth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
