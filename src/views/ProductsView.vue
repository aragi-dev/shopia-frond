<template>
  <section class="text-center grid p-4 gap-4">
    <input
      type="text"
      id="search"
      placeholder="Buscar Producto..."
      name="search"
      class="py-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500 mx-auto"
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
  <div class="relative p-4 grid gap-4 rounded-xl overflow-hidden text-white w-50 h-60">
    <img
      src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
      alt=""
      class="absolute inset-0 w-50 h-60 object-cover opacity-40 z-0 border"
    />
    <button class="z-10 ml-auto mb-auto mt-0 mr-0">...</button>
    <h1 class="z-10 text-xl font-bold mt-auto mr-auto mb-0">name</h1>
    <span class="z-10 text-zinc-200">description is long</span>
    <span class="z-10 mb-0 mt-auto ml-auto mr-0 h-4">20</span>
  </div>
  </section>
      <div class="flex-shrink-0 m-6 relative overflow-hidden rounded-lg max-w-xs shadow-lg">
        <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
            style="transform: scale(1.5); opacity: 0.1;">
            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
        </svg>
        <div class="relative pt-10 px-10 flex items-center justify-center">
            <img class="absolute w-40 h-40 object-cover" src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png" alt="">
        </div>
        <div class="relative text-white px-6 pb-6 mt-6">
            <span class="block opacity-75 -mb-1">Indoor</span>
            <div class="flex justify-between">
                <span class="block font-semibold text-xl">Peace Lily</span>
                <span class="bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import useProductsStore from "@/services/product";

const productStore = useProductsStore();
const searchTerm = ref("");

onMounted(async () => {
  await productStore.fetchProducts();
});

const filteredProducts = computed(() => {
  const products = productStore.products;
  if (!searchTerm.value) return products;
  return products.filter((p) => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});
</script>