<template>
  <main class="h-svh grid place-items-center">
    <h1 class="text-4xl text-purple-400 font-bold mx-auto">Register</h1>
    <div class="grid mb-auto">
      <form @submit.prevent="login" class="grid gap-4">
        <input
          v-model="username"
          type="text"
          id="user"
          placeholder="Usuario"
          name="username"
          autocomplete="username"
          class="p-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500"
          required
        />
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Contrasenia"
          name="password"
          autocomplete="current-password"
          class="p-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500"
          required
        />
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          placeholder="Confirmar contrasenia"
          name="confirmPassword"
          autocomplete="current-password"
          class="p-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500"
          required
        />
        <button
          type="submit"
          :disabled="!isFormValid"
          class="text-gray-400 p-2 rounded-md outline outline-zinc-700 bg-blue-900 transition-all active:scale-95 disabled:bg-zinc-900 disabled:opacity-20 focus:scale-110"
        >
          Confirmar
        </button>
      </form>
      <router-link
        to="/home"
        class="py-2 px-3 rounded-lg transition-transform hover:cursor-pointer hover:scale-125"
      >
        home
      </router-link>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/services/auth";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const auth = useAuthStore();
const isFormValid = computed(
  () =>
    username.value.trim() &&
    password.value.trim() &&
    confirmPassword.value.trim()
);

const login = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }
  try {
    await auth.login(username.value, password.value);
    router.push({ name: "Home" });
  } catch (error) {
    console.error(error);
    alert("Error al iniciar sesión");
  }
};
</script>
<style scoped>
input:-webkit-autofill {
  box-shadow: 0 0 0px 20px rgb(28, 34, 41) inset !important;
  -webkit-text-fill-color: #7f7f91 !important;
  border: 1px solid #ffffff !important;
}
</style>
