<script setup lang="ts">
import Nav from "@/components/MainNav.vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/utils/api/auth";

const router = useRouter();
const auth = useAuthStore();

const INACTIVITY_LIMIT = 60 * 60;

let lastActivity = Date.now();

function resetActivity() {
  lastActivity = Date.now();
}

function checkInactivity() {
  const secondsIdle = (Date.now() - lastActivity) / 1000;
  if (secondsIdle > INACTIVITY_LIMIT && auth.isAuthenticated) {
    auth.logout();
    router.push({ name: "Login" });
  }
}

onMounted(() => {
  window.addEventListener("click", resetActivity);
  window.addEventListener("keydown", resetActivity);
  window.addEventListener("mousemove", resetActivity);

  const intervalId = setInterval(checkInactivity, 60 * 1000);

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