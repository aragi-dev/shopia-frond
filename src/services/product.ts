import { defineStore } from "pinia";
import api from "@/api/shopiaApi";
import type Products from "@/type/IProduct";

const useProductsStore = defineStore("products", {
  state: () => ({ products: [] as Products[] }),
  actions: {
    async fetchProducts() {
      const { data } = await api.get("products");
      this.products = data.data;
    },
  },
});

export default useProductsStore;
