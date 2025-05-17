import type { RouteRecordRaw } from "vue-router";

// Base
const Main = () => import("@/layouts/MainLayout.vue");
const login = () => import("@/views/LoginView.vue");
const NotFound = () => import("@/views/NotFoundView.vue");

// Views
const Home = () => import("@/views/HomeView.vue");
const Products = () => import("@/views/ProductsView.vue");
const SeleView = () => import("@/views/SeleView.vue");

const routerOptions: RouteRecordRaw[] = [
  {
    path: "/",
    component: Main,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "Home",
          requiresAuth: true,
          roles: ["admin", "seller"],
        },
      },
      {
        path: "products",
        name: "Products",
        component: Products,
        meta: {
          title: "Products",
          requiresAuth: true,
          roles: ["admin"],
        },
      },
      {
        path: "sele",
        name: "Sele",
        component: SeleView,
        meta: {
          title: "Sele",
          requiresAuth: true,
          roles: ["admin", "seller"],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: login,
    meta: { title: "Login" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "Not Found" },
  },
];

export default routerOptions;