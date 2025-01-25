<template>
  <div v-if="isVisible"
    class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50"
    @click="closeModal">
    <div class="relative p-6 text-center bg-white rounded-lg w-80" @click.stop>
      <button class="absolute text-xl text-gray-500 top-2 right-2 hover:text-gray-800" @click="closeModal">
        &times;
      </button>

      <h2 class="mb-4 text-xl font-bold">Введите номер телефона</h2>
      <form @submit.prevent="submitForm">
        <MyInput v-focus type="tel" v-model="phoneNumber"
          class="w-full p-3 mb-4 border border-gray-300 rounded focus:ring focus:ring-blue-300"
          placeholder="Ваш номер телефона" required />
        <MyButton type="submit"
          class="w-full py-2 text-white transition-colors bg-green-500 rounded hover:bg-green-600">
          Перезвоните мне
        </MyButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyInput from './MyInput.vue';
import MyButton from './MyButton.vue';

const phoneNumber = ref<string>("");

defineProps<{
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

function closeModal() {
  emit('close');
}

function submitForm() {
  alert(
    `Ваш номер телефона (${phoneNumber.value}) отправлен. Мы вам перезвоним в ближайшее время!`
  );
  closeModal();
  phoneNumber.value = "";
}
</script>
