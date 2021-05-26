
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'casosdeuso', component: () => import('pages/CasosDeUso.vue') },
      { path: 'casosdeuso/:id', name:'casoid', component: () => import('pages/CasosDeUso.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
