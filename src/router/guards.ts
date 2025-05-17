import useAuthStore from "@/utils/api/auth";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function requireAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    next({ name: "Login" });
    return;
  }
  next();
}

export function roleGuard(allowedRoles: string[]) {
  return (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();

    if (!authStore.isAuthenticated) {
      return next({ name: "Login" });
    }

    if (!allowedRoles.includes(authStore.userRole || "")) {
      return next({ name: "NotFound" });
    }

    next();
  };
}
