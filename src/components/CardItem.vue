<template>
  <div class="flex flex-col items-center h-full p-6 text-center bg-white rounded-lg shadow-lg">
    <img :src="card.image" :alt="card.title" class="object-cover w-full mb-4 rounded-md h-60" />
    <div class="flex-grow mb-2 text-lg text-gray-800">
      {{ card.title }}
    </div>
    <div class="flex items-center justify-center gap-4 mb-4">
      <span class="text-base text-gray-500 line-through">
        {{ card.oldPrice }} ₽
      </span>
      <span class="text-lg font-semibold text-red-600">
        {{ card.newPrice }} ₽
      </span>
    </div>
    <div class="flex items-center gap-2 mt-auto">
      <MyButton @click="decrement"
        class="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded hover:bg-gray-300">
        -
      </MyButton>
      <input type="text" v-model.number="quantity" min="1" class="w-12 text-center border border-gray-300 rounded" />
      <MyButton @click="quantity++"
        class="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded hover:bg-gray-300">
        +
      </MyButton>
    </div>
    <MyButton @click="cartStore.addCardToCart(card, quantity)"
      class="py-3 mt-4 font-bold text-white uppercase bg-blue-600 rounded px-7 hover:bg-blue-700">
      + в корзину
    </MyButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

defineProps({
  card: {
    type: Object,
    required: true
  }
});

const quantity = ref(1);

function decrement() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

</script>
