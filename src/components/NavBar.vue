<template>
  <nav
    class="rounded-b-xl fixed top-0 z-50 flex items-center justify-between w-3/4 p-2 transform -translate-x-1/2 bg-[#F5F5F5] shadow-md left-1/2">
    <div class="logo">
      <img src="/logo.ico" alt="Логотип" class="h-8" />
    </div>
    <ul class="flex p-0 m-0 space-x-6 list-none nav-links">
      <li>Доставка с 9:00 до 21:00</li>
      <li>
        <RouterLink to="/" class="hover:underline">Главная</RouterLink>
      </li>
      <li>
        <a href="#menu" class="hover:underline">Меню</a>
      </li>
      <li>
        <RouterLink to="/game" class="hover:underline">Наша игра</RouterLink>
      </li>
      <li>
        <a href="#footer" class="hover:underline">Контакты</a>
      </li>
    </ul>
    <div class="flex items-center space-x-6 contact-info">
      <a href="tel:+79637102793" class="text-sm text-gray-700">+7 (123) 456-78-90</a>
      <a href="#cart" class="flex items-center" @click.prevent="$emit('toggle-cart')">
        <img src="/cart.png" alt="Корзина" class="h-6" />
        <span class="ml-2 text-gray-800">{{ cartStore.totalAmount }} ₽</span>
      </a>
      <MyButton v-if="authStore.isAuth" @click="authStore.logout()"
        class="flex items-center justify-center h-8 px-4 text-sm">
        {{ authStore.personCredentials.name }}
      </MyButton>
      <MyButton v-else @click="$router.push('/login')" class="flex items-center justify-center h-8 px-4 text-sm">Вход
      </MyButton>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

const authStore = useAuthStore();
const cartStore = useCartStore();

const emit = defineEmits < {
  (e: "toggle-cart"): void;
}> ();
</script>
