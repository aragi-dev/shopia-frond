import type { RouteRecordRaw } from "vue-router";

// Base
const Main = () => import("@/layouts/MainLayout.vue");
const login = () => import("@/views/LoginView.vue");
const NotFound = () => import("@/views/NotFoundView.vue");

// Views
const Home = () => import("@/views/HomeView.vue");
const Products = () => import("@/views/ProductsView.vue");
const Test2 = () => import("@/views/TestView2.vue");

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
        },
      },
      {
        path: "test",
        name: "Test",
        component: Products,
        meta: { 
          title: "Test 1",
          requiresAuth: true,
        },
      },
      {
        path: "test2",
        name: "Test2",
        component: Test2,
        meta: { 
          title: "Test 2",
          requiresAuth: true,
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
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: NotFound,
    meta: { title: "Not Found" },
  },
];

export default routerOptions;
