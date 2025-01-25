<template>
  <NavBar />
  <div class="flex flex-col items-center min-h-screen text-gray-800 bg-gray-100">
    <div class="max-w-2xl p-8 mt-20 mb-10 bg-white shadow-lg rounded-xl">
      <h1 class="mb-5 text-2xl font-bold text-center text-gray-700">Оформление заказа</h1>
      <form @submit.prevent="makeOrder" name="checkout" method="post" action="/checkout" class="space-y-6">
        <section class="mb-6">
          <h2 class="pb-2 mb-4 text-xl font-semibold text-gray-600 border-b border-gray-300">Контактные данные</h2>
          <div class="mb-4">
            <label for="name" class="block mb-1 font-medium">Имя*</label>
            <MyInput v-model="order.name" id="name" name="name" type="text" required
              class="w-full p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-1 font-medium">E-mail*</label>
            <MyInput v-model="order.email" id="email" name="email" type="email" required
              class="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label for="phone" class="block mb-1 font-medium">Телефон*</label>
            <MyInput v-model="order.phone" id="phone" name="phone" type="tel" required
              class="w-full p-2 border rounded-md" />
          </div>
        </section>

        <section class="mb-6">
          <h2 class="pb-2 mb-4 text-xl font-semibold text-gray-600 border-b border-gray-300">Адрес доставки</h2>
          <div class="mb-4">
            <label for="street" class="block mb-1 font-medium">Улица*</label>
            <MyInput v-model="address.street" id="street" name="street" type="text"
              placeholder="Пример: г. Москва, ул. Мира" required class="w-full p-2 border rounded-md" />
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="house" class="block mb-1 font-medium">Дом*</label>
              <MyInput v-model="address.house" id="house" name="house" type="text" required
                class="w-full p-2 border rounded-md" />
            </div>
            <div class="flex-1">
              <label for="floor" class="block mb-1 font-medium">Этаж</label>
              <MyInput v-model="address.floor" id="floor" name="floor" type="text"
                class="w-full p-2 border rounded-md" />
            </div>
            <div class="flex-1">
              <label for="apartment" class="block mb-1 font-medium">Кв./Офис*</label>
              <MyInput v-model="address.apartment" id="apartment" name="apartment" type="text"
                class="w-full p-2 border rounded-md" />
            </div>
          </div>
        </section>

        <section class="mb-6">
          <h2 class="pb-2 mb-4 text-xl font-semibold text-gray-600 border-b border-gray-300">Дата и время доставки</h2>
          <div class="mb-4">
            <input v-model="order.deliveryASAP" id="timeSoon" type="radio" name="delivery_time" :value="true" />
            <label for="timeSoon" class="ml-2">Как можно скорее</label>
          </div>
          <div class="mb-4">
            <input v-model="order.deliveryASAP" id="timeChoose" type="radio" name="delivery_time" :value="false" />
            <label for="timeChoose" class="ml-2">Выбрать время</label>
          </div>

          <div v-if="!order.deliveryASAP" class="flex gap-4">
            <div class="flex-1">
              <label for="delivery_date" class="block mb-1 font-medium">Дата</label>
              <MyInput v-model="order.deliveryDate" id="delivery_date" name="delivery_date" type="date"
                class="w-full p-2 border rounded-md" />
            </div>
            <div class="flex-1">
              <label for="delivery_time" class="block mb-1 font-medium">Время</label>
              <select id="delivery_time" name="delivery_time" class="w-full p-2 border rounded-md">
                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>
          </div>
        </section>


        <section class="mb-6">
          <h2 class="pb-2 mb-4 text-xl font-semibold text-gray-600 border-b border-gray-300">Способы оплаты</h2>
          <div class="mb-4">
            <MyInput v-model="order.paymentMethod" id="cash" type="radio" name="payment_method" value="cash" checked />
            <label for="cash" class="ml-2">Наличными курьеру</label>
          </div>
          <div>
            <MyInput v-model="order.paymentMethod" id="card" type="radio" name="payment_method" value="card" />
            <label for="card" class="ml-2">Банковской картой</label>
          </div>
        </section>

        <section class="mb-6">
          <label for="comments" class="block mb-2 font-medium">Комментарий к заказу</label>
          <textarea v-model="order.comments" id="comments" name="comments"
            class="w-full h-20 p-2 border border-gray-400 rounded-md"></textarea>
        </section>

        <section class="flex gap-4 mb-6">
          <div>
            <input id="sms_agree" type="checkbox" name="sms_agree" />
            <label for="sms_agree" class="ml-2">Согласен на SMS</label>
          </div>
          <div>
            <input id="email_agree" type="checkbox" name="email_agree" />
            <label for="email_agree" class="ml-2">Согласен на email рассылку</label>
          </div>
        </section>

        <section class="text-center">
          <div class="mb-6 text-left">
            <p class="text-lg font-semibold">Сумма заказа: <strong>{{ totalAmount }} ₽</strong></p>
          </div>
          <MyButton type="submit" class="w-full py-3 rounded-md hover:bg-red-600">
            Подтвердить заказ
          </MyButton>
        </section>
      </form>
    </div>
  </div>
  <HinkalFooter />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import axios from 'axios';
import type { Order } from '../types/order';
import HinkalFooter from '../components/HinkalFooter.vue';
import NavBar from '../components/NavBar.vue';

const authStore = useAuthStore();
const cartStore = useCartStore();

const person = authStore.personCredentials;
const totalAmount = cartStore.totalAmount;

const address = ref({
  street: '',
  house: '',
  floor: '',
  apartment: '',
});

const order: Order = {
  name: person.name,
  email: person.email,
  phone: person.phone,
  address: computed(() => {
    const parts = [
      address.value.street,
      address.value.house ? `д. ${address.value.house}` : '',
      address.value.floor ? `эт. ${address.value.floor}` : '',
      address.value.apartment ? `кв./офис ${address.value.apartment}` : '',
    ];
    return parts.filter(part => part).join(', ');
  }).value, // Преобразуем в строку
  deliveryASAP: true,
  deliveryDate: null,
  paymentMethod: 'cash',
  comments: '',
  amount: totalAmount,
  orderItemsList: computed(() =>
    cartStore.cart.map(item => ({
      khinkaliId: item.id,
      quantity: item.quantity,
    }))
  ).value, // Преобразуем в массив
};

const timeOptions = computed(() => {
  const times: string[] = [];
  for (let hour = 9; hour <= 21; hour++) {
    times.push(`${hour}:00`);
    if (hour < 21) times.push(`${hour}:30`);
  }
  return times;
});

async function makeOrder(): Promise<void> {
  try {
    const response = await axios.post('http://localhost:8080/api/orders', order, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      cartStore.clearCart();
      const result = response.data;
      console.log(result);
    } else {
      console.log(`Error: ${response.status}\n${response.data}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Ошибка HTTP: ${error.response?.status || error.message}`);
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  }
}
</script>
