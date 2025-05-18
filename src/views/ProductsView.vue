<template>
  <main class="text-center grid p-4 gap-4">
    <section class="grid gap-4 grid-flow-col w-full">
      <input type="text" id="search" placeholder="Buscar Producto..." name="search"
        class="py-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500 ml-auto" />
      <button @click="isOpen = true"
        class="mr-auto rounded-md hover:scale-125 transform transition duration-200 ease-in-out">
        <Icon name="add" size="34" css="fill-green-500" />
      </button>
    </section>
    <section class="flex flex-wrap justify-center gap-4 w-full">
      <div v-for="product in filteredProducts" :key="product.id"
        class="relative p-4 grid gap-4 rounded-2xl text-white w-50 h-60 mx-auto">
        <img src="/producto.png" alt="Producto"
          class="absolute inset-0 w-50 h-60 object-cover rounded-2xl opacity-60" />
        <button class="ml-auto mb-auto mt-0 mr-0 z-0">
          <Icon name="options" css="fill-white" />
        </button>
        <div class="grid z-10">
          <h1 class="text-xl font-bold mb-auto z-20">{{ product.name }}</h1>
          <div class="grid grid-flow-col gap-2">
            <span class="text-zinc-200 mt-auto z-20">${{ product.price }}</span>
            <span class="text-zinc-200 mt-auto z-20">Stock: {{ product.stock }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Modal :show="isOpen" title="Agregar Producto" @close="isOpen = false">
    <form @submit.prevent="addProduct" class="grid gap-4 max-w-96">
      <div class="grid grid-flow-col gap-4">
        <div class="grid gap-1">
          <label for="name" class="text-gray-400 ml-1">Nombre</label>
          <input type="text" v-model.trim="name" name="name"
            class="py-2 px-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full" />
        </div>
        <div class="grid gap-1">
          <label for="code" class="text-gray-400 ml-1">Code</label>
          <input type="text" v-model.trim="code" name="code"
            class="py-2 px-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full" />
        </div>
      </div>
      <div class="grid grid-flow-col gap-4">
        <div class="grid gap-1">
          <label for="price" class="text-gray-400 ml-1">Precio Venta</label>
          <input type="number" name="price" v-model.number="price" min="0"
            class="py-2 px-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full" />
        </div>
        <div class="grid gap-1">
          <label for="cost" class="text-gray-400 ml-1">Precio Compra</label>
          <input type="number" name="cost" v-model.number="cost"
            class="py-2 px-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full" />
        </div>
        <div class="grid gap-1">
          <label for="stock" class="text-gray-400 ml-1">Cantidad</label>
          <input type="number" name="stock" v-model.number="stock"
            class="py-2 px-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full" />
        </div>
      </div>
      <textarea id="description" rows="4"
        class="p-4 border-1 border-zinc-700 text-gray-400 rounded-md bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full"
        placeholder="Descripcion del producto" />
      <button type="submit" :disabled="!isFormValid"
        class="text-gray-400 p-2 rounded-md outline outline-zinc-700 bg-blue-900 transition-all active:scale-95 disabled:bg-zinc-900 disabled:opacity-20">
        Confirmar
      </button>
    </form>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import useProductsStore from "@/services/product";
import Icon from "@/components/Icon.vue";
import Modal from "@/components/Modal.vue";

const productStore = useProductsStore();
const searchTerm = ref("");
const isOpen = ref(false);

const name = ref("");
const code = ref("");
const price = ref(0);
const cost = ref(0);
const stock = ref(0);
const description = ref("");

const resetForm = () => {
  name.value = "";
  code.value = "";
  price.value = 0;
  cost.value = 0;
  stock.value = 0;
  description.value = "";
};

const isFormValid = computed(() => name.value.trim() && code.value && price.value > 0 && cost.value > 0 && stock.value > 0);

const addProduct = async () => {
  if (!isFormValid.value) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }
  try {
    await productStore.addProduct({
      name: name.value,
      code: code.value,
      price: price.value,
      cost: cost.value,
      stock: stock.value,
      description: description.value,
    });
    resetForm();
    isOpen.value = false;
  } catch (error) {
    console.error(error);
    alert("Error al agregar producto");
  }
};
onMounted(async () => {
  await productStore.fetchProducts();
});

const filteredProducts = computed(() => {
  const products = productStore.products;
  if (!searchTerm.value) return products;
  return products.filter((p) => p.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
});
</script>