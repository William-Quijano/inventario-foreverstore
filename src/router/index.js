import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "productos" },
    component: () => import(/* webpackChunkName: "layout" */ "../views/layout"),

    children: [
      {
        path: "/productos",
        name: "productos",
        component: () =>
            import(/* webpackChunkName: "profiles" */ "@/views/Productos/ProductosComponent.vue"),
      },
      {
        path: "/clientes",
        name: "clientes",
        component: () =>
            import(/* webpackChunkName: "profiles" */ "@/views/Clientes/ClientesComponent.vue"),
      },
      {
        path: "/entregas",
        name: "entregas",
        component: () =>
            import(/* webpackChunkName: "profiles" */ "@/views/Entregas/EntregasComponent.vue"),
      },

    ],
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL || "/",
  routes,
});


// router.beforeEach(async (to, from, next) => {
//   if (to.fullPath === "/") {
//     next("/");
//     const token = localStorage.getItem("token");
//     if (!token) {
//       //  next("/login");
//       return;
//     }
//   }
//   if (await Vue.prototype.canNext(to)) {
//     next();
//   } else {
//     //next("/forbidden");
//   }
// });

export default router;
