<template>
  <section class="p-4 text-center grid gap-4">
    <input
      type="text"
      id="search"
      placeholder="Buscar Producto..."
      name="search"
      class="p-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500 w-full"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-zinc-800 text-amber-50 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <p class="text-sm">{{ product.description }}</p>
        <p class="mt-2">Precio: ${{ product.price }}</p>
        <p>Stock: {{ product.stock }}</p>
      </div>
      <p v-if="!filteredProducts.length" class="col-span-full text-center text-zinc-400">No se encontraron productos.</p>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import useProductsStore from "@/stores/products";

const productStore = useProductsStore();
const searchTerm = ref("");

onMounted(async()  => {
  await productStore.fetchProducts();
});

const filteredProducts = computed(() => {
  const products = productStore.products;
  if (!searchTerm.value) return products;
  return products.filter((p) => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});
</script>