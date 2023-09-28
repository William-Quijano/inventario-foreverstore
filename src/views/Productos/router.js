export default [

  {
    path: "/productos",
    name: "productos",
    component: () =>
        import(/* webpackChunkName: "profiles" */ "./components/ProductosComponent.vue"),
  },
  {
    path: "/clientes",
    name: "clientes",
    component: () =>
        import(/* webpackChunkName: "profiles" */ "./components/ClientesComponent.vue"),
  },
  {
    path: "/entregas",
    name: "entregas",
    component: () =>
        import(/* webpackChunkName: "profiles" */ "./components/EntregasComponent.vue"),
  },

]
