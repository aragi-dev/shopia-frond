import routes from "@/router/routers";
import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'Login' })
  }
  next()
})

export default router;
