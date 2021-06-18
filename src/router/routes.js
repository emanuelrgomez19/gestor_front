
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'casosdeuso', component: () => import('src/pages/NuevaHistoria.vue') },
      { path: 'casosdeuso/:id', name:'casoid', component: () => import('src/pages/Historias.vue') },
      { path: 'casosdeuso/nueva/:id', name:'nuevaHistoria', component: () => import('src/pages/NuevaHistoria.vue') },
      { path:'/reportes', name:'reportes1', component:() => import('src/pages/Reportes.vue')}

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
