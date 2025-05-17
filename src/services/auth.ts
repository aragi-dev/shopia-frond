import { defineStore } from "pinia";
import api from "@/api/shopiaApi";
import type User from "@/type/iUser";

const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
    isSeller: (state) => state.user?.role === "seller",
    userRole: (state) => state.user?.role || null,
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post("login", { email, password });
      const { token, user } = data.data;
      this.token = token;
      this.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export default useAuthStore;