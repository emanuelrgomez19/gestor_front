
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'casosdeuso/nueva/:id', name:'casoidnuevo', component: () => import('src/pages/NuevaHistoria.vue') },
      { path: 'escenario/nueva/:id', name:'escearioidnuevo', component: () => import('src/pages/NuevoEscenario.vue') },
      { path: 'casosdeuso/edit/:id', name:'casoidedit', component: () => import('pages/EditHistoria.vue') },
      { path: 'casosdeuso/:id', name:'casoid', component: () => import('pages/Historias.vue') },
      { path: 'escenario/:id', name:'escenarioid', component: () => import('pages/Escenario.vue') },
      { path: '/proyectos/:id', name:'proyectoid', component: () => import('pages/ProyectoEdit.vue') },
      { path:'/reportes', name:'reportes1', component:() => import('pages/Reportes.vue') },
      { path: 'casosdeuso/nueva/:id', name:'nuevaHistoria', component: () => import('pages/NuevaHistoria.vue') },
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
