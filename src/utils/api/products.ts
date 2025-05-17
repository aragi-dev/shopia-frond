import { defineStore } from "pinia";
import api from "@/utils/api/balseApi";

export interface Products {
  id: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  description: string;
  purchase_price: string;
  price: string;
  stock: number;
}

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
