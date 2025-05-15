<script setup lang="ts">
import Nav from "@/components/MainNav.vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const INACTIVITY_LIMIT = 60 * 1; // 1 hora
// 2. Estado de última actividad
let lastActivity = Date.now();

// 3. Función para resetear el contador
function resetActivity() {
  lastActivity = Date.now();
}

// 4. Función para chequear inactividad
function checkInactivity() {
  const secondsIdle = (Date.now() - lastActivity) / 1000;
  if (secondsIdle > INACTIVITY_LIMIT && auth.isAuthenticated) {
    auth.logout();
    router.push({ name: "Login" });
  }
}

onMounted(() => {
  // Escuchamos los eventos que consideremos “actividad”
  window.addEventListener("click", resetActivity);
  window.addEventListener("keydown", resetActivity);
  window.addEventListener("mousemove", resetActivity);

  // Chequeamos cada minuto
  const intervalId = setInterval(checkInactivity, 60 * 1000);

  // Limpiamos al desmontar
  onBeforeUnmount(() => {
    window.removeEventListener("click", resetActivity);
    window.removeEventListener("keydown", resetActivity);
    window.removeEventListener("mousemove", resetActivity);
    clearInterval(intervalId);
  });
});
</script>
<template>
  <main class="grid gap-4 p-4">
    <Nav/>
    <router-view />
  </main>
</template>
