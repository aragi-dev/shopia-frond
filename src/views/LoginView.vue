<template>
  <main class="h-svh grid place-items-center">
    <h1 class="text-4xl text-zinc-500 font-bold mx-auto">Login</h1>
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
        <button
          type="submit"
          :disabled="!isFormValid"
          class="text-gray-400 p-2 rounded-md outline outline-zinc-700 bg-blue-900 transition-all active:scale-95 disabled:bg-zinc-900 disabled:opacity-20 focus:scale-110"
        >
          Confirmar
        </button>
      </form>
      <!-- <span class="text-zinc-400 font-bold mx-auto my-4">-o-</span>
      <section class="grid grid-flow-col gap-4 place-content-center">
        <button
          placeholder="Google"
          class="border-1 border-zinc-600 text-white p-2 rounded-md transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:scale-110"
        >
          <Icon name="google" size="24" color="fill-zinc-500" />
        </button>
        <button
          placeholder="Facebook"
          class="border-1 border-zinc-600 text-white p-2 rounded-md transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:scale-110"
        >
          <Icon name="facebook" size="24" color="fill-zinc-500" />
        </button>
        <button
          placeholder="Github"
          class="border-1 border-zinc-600 text-white p-2 rounded-md transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:scale-110"
        >
          <Icon name="github" size="24" color="fill-zinc-500" />
        </button>
      </section> -->
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// import Icon from "@/components/Icon.vue";
import useAuthStore from "@/stores/auth";

const username = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();
const isFormValid = computed(() => username.value.trim() && password.value.trim());

const login = async () => {
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
  box-shadow: 0 0 0px 20px rgb(42, 52, 63) inset !important;
  -webkit-text-fill-color: #7f7f91 !important;
  border: 1px solid #ffffff !important;
}
</style>
