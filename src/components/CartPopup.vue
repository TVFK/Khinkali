<template>
  <div
    class="fixed top-[52px] right-[13.7%] w-[400px] max-h-[500px] bg-white shadow-lg rounded-lg flex flex-col p-4 overflow-y-auto z-50">
    <div class="flex items-center justify-between pb-2 mb-4 border-b border-gray-200">
      <h2 class="text-xl font-bold">Корзина</h2>
      <button @click="$emit('close')" class="text-xl text-gray-500 hover:text-gray-800">&times;</button>
    </div>

    <div v-if="cartStore.isEmpty()" class="text-center text-gray-500">
      Корзина пуста
    </div>
    <div v-else>
      <div v-for="(item) in cartStore.cart" :key="item.id"
        class="flex items-center justify-between py-2 mb-2 border-b border-gray-200">
        <img :src="item.image" :alt="item.title" class="object-cover w-12 h-12 rounded" />

        <span class="flex-1 ml-4 text-sm font-medium text-gray-800">
          {{ item.title }}
        </span>

        <div class="flex items-center gap-2">
          <button @click="cartStore.updateCardQuantity(item.id, -1)"
            class="flex items-center justify-center w-6 h-6 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">
            -
          </button>
          <span class="w-6 text-center">{{ item.quantity }}</span>
          <button @click="cartStore.updateCardQuantity(item.id, 1)"
            class="flex items-center justify-center w-6 h-6 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">
            +
          </button>
        </div>

        <span class="w-20 text-sm font-medium text-right text-gray-700">
          {{ item.price * item.quantity }} ₽
        </span>

        <button @click="cartStore.removeCard(item.id)"
          class="px-2 py-1 ml-4 text-sm text-white bg-red-500 rounded hover:bg-red-600">
          Удалить
        </button>
      </div>
    </div>

    <div v-if="!cartStore.isEmpty()" class="mt-4">
      <div class="flex items-center justify-between mb-4 text-lg font-bold">
        <span>Общая сумма:</span>
        <span>{{ cartStore.totalAmount }} ₽</span>
      </div>

      <MyButton @click="checkout" class="w-full py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
        Оформить заказ
      </MyButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const router = useRouter();
const emit = defineEmits(["close"]);

function checkout() {
  if (!cartStore.isEmpty()) {
    router.push("/order");
  } else {
    alert('Ваша корзина пуста!');
  }
}
</script>
