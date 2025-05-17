import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import useAuthStore from "@/utils/api/auth";
import api from "@/utils/api/balseApi";

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.use(router);

const authStore = useAuthStore()
if (authStore.token) {
  api.defaults.headers.common.Authorization = `Bearer ${authStore.token}`
}

app.mount("#app");
