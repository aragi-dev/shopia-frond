import routes from "@/router/routers";
import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "@/utils/api/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.roles as string[] | undefined;

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: "Login" });
  }

  if (allowedRoles && !allowedRoles.includes(authStore.userRole || "")) {
    return next({ name: "NotFound" });
  }

  next();
});

export default router;
