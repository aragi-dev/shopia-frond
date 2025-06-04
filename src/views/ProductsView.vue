<template>
  <main class="text-center grid p-4 gap-4">
    <section class="grid gap-4 grid-flow-col w-full">
      <input
        type="text"
        id="search"
        placeholder="Buscar Producto..."
        name="search"
        v-model="searchTerm"
        class="py-2 px-4 border-1 border-zinc-700 text-zinc-400 rounded-md bg-zinc-900 focus:outline-none focus:border-zinc-500 ml-auto"
      />
      <button
        @click="isOpen = true"
        class="mr-auto rounded-md hover:scale-125 transform transition duration-200 ease-in-out"
        aria-label="Agregar producto"
      >
        <Icon name="add" size="34" css="fill-green-500" />
      </button>
    </section>
    <section class="flex flex-wrap justify-center gap-4 w-full">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="relative p-4 grid gap-4 rounded-2xl text-white w-50 h-60 mx-auto"
      >
        <img
          src="/producto.png"
          alt="Producto"
          class="absolute inset-0 w-50 h-60 object-cover rounded-2xl opacity-60"
        />
        <button
          class="ml-auto mb-auto mt-0 mr-0 z-0"
          aria-label="Opciones del producto"
        >
          <Icon name="options" css="fill-white" />
        </button>
        <div class="grid z-10">
          <h1 class="text-xl font-bold mb-auto z-20">{{ product.name }}</h1>
          <div class="grid grid-flow-col gap-2">
            <span class="text-zinc-200 mt-auto z-20">
              ${{ product.price }}
            </span>
            <span class="text-zinc-200 mt-auto z-20">
              Stock: {{ product.stock }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Modal :show="isOpen" title="Agregar Producto" @close="closeModal">
    <form @submit.prevent="addProduct" class="grid gap-4 max-w-96">
      <div class="grid grid-flow-col gap-4">
        <BaseInput
          label="Nombre"
          name="name"
          v-model="form.name"
          :error="fieldState.name.error"
          :touched="fieldState.name.touched"
          @blur="() => markTouched('name')"
        />
        <BaseInput
          label="Code"
          name="code"
          v-model="form.code"
          :error="fieldState.code.error"
          :touched="fieldState.code.touched"
          @blur="() => markTouched('code')"
        />
      </div>
      <div class="grid grid-flow-col gap-4">
        <BaseInput
          label="Precio Venta"
          name="price"
          type="number"
          v-model="form.price"
          :error="fieldState.price.error"
          :touched="fieldState.price.touched"
          @blur="() => markTouched('price')"
          min="0"
        />
        <BaseInput
          label="Precio Compra"
          name="cost"
          type="number"
          v-model="form.cost"
          :error="fieldState.cost.error"
          :touched="fieldState.cost.touched"
          @blur="() => markTouched('cost')"
        />
        <BaseInput
          label="Cantidad"
          name="stock"
          type="number"
          v-model="form.stock"
          :error="fieldState.stock.error"
          :touched="fieldState.stock.touched"
          @blur="() => markTouched('stock')"
        />
      </div>
      <textarea
        v-model.trim="form.description"
        id="description"
        rows="4"
        class="p-4 border-1 border-zinc-700 text-gray-400 rounded-2xl bg-zinc-800 focus:outline-none focus:border-zinc-500 w-full"
        placeholder="Descripcion del producto"
      />
      <div class="grid grid-flow-col grid-cols-12 gap-2">
        <button
          type="button"
          @click="resetForm"
          :disabled="!isFormDirty"
          aria-label="Limpiar formulario"
          class="p-2 rounded-2xl outline outline-zinc-700 bg-zinc-900 transition-all active:scale-90 flex w-full justify-center col-span-2 hover:bg-blue-900 cursor-pointer disabled:bg-zinc-900 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <Icon name="mop" size="24" css="fill-zinc-500" />
        </button>
        <button
          type="submit"
          :disabled="!isFormValid || loading"
          :class="[
            'text-gray-400 p-2 rounded-2xl outline outline-zinc-700 bg-green-900 transition-all active:scale-95 disabled:bg-zinc-900 disabled:opacity-20 col-span-10 w-full',
            loading
              ? 'cursor-wait animate-pulse'
              : isFormValid
                ? ''
                : 'cursor-not-allowed',
          ]"
        >
          <span
            v-if="loading"
            class="grid grid-flow-col text-center items-center gap-2"
          >
            <Icon
              name="spinner"
              size="20"
              css="fill-zinc-500 animate-spin ml-auto"
            />
            <p class="mr-auto">Guardando...</p>
          </span>
          <span v-else>Confirmar</span>
        </button>
      </div>
    </form>
  </Modal>
  <Notification
    :show="notification.show"
    :type="notification.type"
    :msg="notification.msg"
    @close="notification.show = false"
  />
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from "vue";
import useProductsStore from "@/services/product";
import Icon from "@/components/Icon.vue";
import Modal from "@/components/Modal.vue";
import Notification from "@/components/Notification.vue";
import { NotificationType } from "@/utils/enums/NotificationType";
import BaseInput from "@/components/BaseInput.vue";

const productStore = useProductsStore();
const searchTerm = ref("");
const isOpen = ref(false);
const loading = ref(false);

const fieldState = reactive({
  name: { error: false, touched: false },
  code: { error: false, touched: false },
  price: { error: false, touched: false },
  cost: { error: false, touched: false },
  stock: { error: false, touched: false },
});
const notification = ref({
  show: false,
  type: NotificationType.SUCCESS as NotificationType,
  msg: "Hola",
});
const form = reactive({
  name: "",
  code: "",
  price: 0,
  cost: 0,
  stock: 0,
  description: "",
});

function showNotification(type: typeof notification.value.type, msg: string) {
  notification.value = { show: true, type, msg };
  setTimeout(() => (notification.value.show = false), 3000);
}

function markTouched(field: keyof typeof fieldState) {
  fieldState[field].touched = true;
}

function validateForm() {
  fieldState.name.error = !form.name;
  fieldState.code.error = !form.code;
  fieldState.price.error = form.price < 1;
  fieldState.cost.error = form.cost < 1;
  fieldState.stock.error = form.stock < 1;
  return (
    !fieldState.name.error &&
    !fieldState.code.error &&
    !fieldState.price.error &&
    !fieldState.cost.error &&
    !fieldState.stock.error
  );
}

const isFormValid = computed(() => validateForm());
const isFormDirty = computed(
  () =>
    form.name ||
    form.code ||
    form.price !== 0 ||
    form.cost !== 0 ||
    form.stock !== 0 ||
    form.description
);

function resetFieldState() {
  (Object.keys(fieldState) as Array<keyof typeof fieldState>).forEach((k) => {
    fieldState[k].error = false;
    fieldState[k].touched = false;
  });
}

function resetForm() {
  Object.assign(form, {
    name: "",
    code: "",
    price: 0,
    cost: 0,
    stock: 0,
    description: "",
  });
  resetFieldState();
}

const addProduct = async () => {
  (Object.keys(fieldState) as Array<keyof typeof fieldState>).forEach(
    (k) => (fieldState[k].touched = true)
  );
  if (validateForm()) {
    loading.value = true;
    try {
      await productStore.addProduct({
        name: form.name,
        code: form.code,
        price: form.price,
        cost: form.cost,
        stock: form.stock,
        description: form.description,
      });
      showNotification(
        NotificationType.SUCCESS,
        "Producto guardado correctamente"
      );
      resetForm();
      isOpen.value = false;
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      showNotification(
        NotificationType.ERROR,
        "Hubo un error al guardar el producto"
      );
    } finally {
      loading.value = false;
    }
  } else {
    showNotification(
      NotificationType.WARNING,
      "Completa todos los campos correctamente"
    );
  }
};

onMounted(async () => {
  await productStore.fetchProducts();
});

const filteredProducts = computed(() => {
  const products = productStore.products;
  if (!searchTerm.value) return products;
  return products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const closeModal = () => {
  isOpen.value = false;
  resetFieldState();
};
</script>
<style>
/* Disable spinners en inputs type number*/
/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>