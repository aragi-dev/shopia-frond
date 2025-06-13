<template>
  <main class="h-svh grid place-items-center gap-12">
    <h1 class="text-4xl text-zinc-300 font-bold mx-auto mt-auto">
      Iniciar Sesión
    </h1>
    <div class="grid mb-auto">
      <form @submit.prevent="login" class="grid gap-4 grid-flow-row">
        <InputNumber
          label="Code"
          name="code"
          maxlength="6"
          v-model="form.code"
          :error="fieldState.code.error"
          :touched="fieldState.code.touched"
          @blur="() => markTouched('code')"
        />
        <button
          type="submit"
          :disabled="!isFormValid || loading"
          :class="[
            'text-zinc-900 p-2 rounded-lg outline outline-zinc-700 bg-zinc-300 transition-all active:scale-95 disabled:bg-zinc-900 disabled:text-zinc-500 disabled:opacity-20 w-full mt-2',
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
            <p class="mr-auto">Validando...</p>
          </span>
          <span v-else>Validar</span>
        </button>
      </form>
      <Notification
        :show="notification.show"
        :type="notification.type"
        :msg="notification.msg"
        @close="notification.show = false"
      />
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import Icon from "@/components/Icon.vue";
import useAuthStore from "@/services/auth";
import Notification from "@/components/Notification.vue";
import InputNumber from "@/components/InputNumber.vue";
import { NotificationType } from "@/utils/enums/NotificationType";

const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const fieldState = reactive({
  code: { error: false, touched: false },
});

const notification = ref({
  show: false,
  type: NotificationType.SUCCESS as NotificationType,
  msg: "Hola",
});

const form = reactive({
  code: "",
});

function showNotification(type: typeof notification.value.type, msg: string) {
  notification.value = { show: true, type, msg };
  setTimeout(() => (notification.value.show = false), 3000);
}

function markTouched(field: keyof typeof fieldState) {
  fieldState[field].touched = true;
}

function validateForm() {
  const code = form.code.trim();
  const isValid = /^\d{6}$/.test(code);
  fieldState.code.error = !isValid;

  return isValid;
}


const isFormValid = computed(() => validateForm());

function resetFieldState() {
  (Object.keys(fieldState) as Array<keyof typeof fieldState>).forEach((k) => {
    fieldState[k].error = false;
    fieldState[k].touched = false;
  });
}

function resetForm() {
  Object.assign(form, {
    code: "",
  });
  resetFieldState();
}

const login = async () => {
  (Object.keys(fieldState) as Array<keyof typeof fieldState>).forEach(
    (k) => (fieldState[k].touched = true)
  );
  if (validateForm()) {
    loading.value = true;
    try {
      await auth.login({ code: form.code });
      router.push({ name: "Home" });
      resetForm();
    } catch (error: unknown) {
      let mensaje = "Hubo un error al inicar session";
      if (error instanceof Error) {
        mensaje = error.message;
      }
      showNotification(NotificationType.ERROR, mensaje);
    } finally {
      loading.value = false;
    }
  }
};
</script>
