<template>
  <div class="flex flex-col items-center justify-center h-screen bg-zinc-900">
    <h1 class="text-4xl font-bold text-zinc-500"><span class="text-red-500">404</span> - No Existe</h1>
    <p class="mt-4 text-lg text-gray-500">
      La pagina que tu estas buscando no existe.
    </p>
    <router-link to="/" class="mt-4 grid grid-flow-col">
      <p class="m-auto text-blue-500 font-semibold hover:text-blue-400 hover:cursor-pointer">
        Pagina de inicio
      </p>
    </router-link>
  </div>
</template>
