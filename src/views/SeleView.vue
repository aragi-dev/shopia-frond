<template>
  <section class="grid gap-4 grid-flow-col w-full">
    <input type="text" id="search" placeholder="Buscar Producto..." name="search"
      class="py-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500 ml-auto" />
    <button class="mr-auto hover:scale-125 transform transition duration-200 ease-in-out">
      <Icon name="search" css="fill-zinc-900 bg-blue-500 p-1 rounded-md" size="30" />
    </button>
  </section>
  <main class="w-full px4 min-h-[calc(100vh-10.5rem)] grid rounded-md">
    <table class="w-full mx-auto">
      <thead>
        <tr>
          <th class="text-gray-400">Nombre</th>
          <th class="text-gray-400">Codigo</th>
          <th class="text-gray-400">Precio</th>
          <th class="text-gray-400">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.cost }}</td>
          <td>{{ product.stock }}</td>
        </tr>
      </tbody>
    </table>
    <button type="submit"
      class="text-gray-400 p-2 rounded-md outline outline-zinc-700 bg-green-900 transition-all active:scale-95 disabled:bg-zinc-900 disabled:opacity-20 mt-auto">
      Vender
    </button>
  </main>
</template>
<script setup lang="ts">
import Icon from '@/components/Icon.vue';
</script>