<template>
  <NavBar @toggle-cart="toggleCartVisibility" />
  <CartPopup v-if="isCartVisible" @close="toggleCartVisibility" />

  <div class="font-sans text-gray-800 mb-7">
    <header class="flex flex-col items-center text-center py-36 bg-gradient-to-r from-beige-200 to-beige-50 bg-pattern">
      <h2 class="mb-4 text-3xl font-bold">
        Мы открытлись Хинкали-Дон!
      </h2>
      <MyButton @click="showModal = true"
        class="px-6 py-3 text-white uppercase bg-orange-500 rounded hover:bg-orange-600">
        ЗАКАЗАТЬ
      </MyButton>
    </header>

    <MyModal v-if="showModal" :isVisible="showModal" @close="showModal = false" />

    <main class="space-y-16">
      <section id="about_us" class="max-w-4xl p-8 mx-auto text-center bg-gray-100 rounded-lg shadow-lg">
        <h1 class="mb-6 text-3xl">О нас</h1>
        <p class="mb-6 text-lg italic">
          Наша хинкальная - это место, где вы можете попробовать настоящие
          грузинские хинкали, приготовленные по особому рецепту. У нас вы
          сможете познать новую степень наслаждения от хинкалей!
        </p>
        <video controls class="mx-auto rounded-md shadow-md">
          <source src="/hinkali.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </section>

      <section class="max-w-6xl px-4 mx-auto">
        <h1 id="menu" class="mb-8 text-center">Меню</h1>
        <CardList :cards="cards" />
      </section>

      <section class="text-center">
        <h1 class="mb-6">Наше расположение</h1>
        <p class="max-w-2xl mx-auto mb-8 text-lg italic">
          Мы находимся на самой вершине Эвереста. Лишь достойным дано насладиться
          божественным вкусом наших хинкалей!
        </p>
        <div class="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61460.04835130504!2d86.94334612652821!3d28.010881014744477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2z0JTQttC-0LzQvtC70YPQvdCz0LzQsA!5e0!3m2!1sru!2sru!4v1731615332644!5m2!1sru!2sru"
            width="700" height="500" class="border-0 rounded-lg shadow-lg" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </main>
  </div>

  <HinkalFooter />
</template>

<script setup>
import CardList from "@/components/CardList.vue";
import CartPopup from "@/components/CartPopup.vue";
import HinkalFooter from "@/components/HinkalFooter.vue";
import NavBar from "@/components/NavBar.vue";
import MyModal from "@/components/UI/MyModal.vue";
import { reactive, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const isCartVisible = ref(false);
const showModal = ref(false);
const cards = reactive([
  { id: 1, title: "АКЦИЯ 3 вида мяса по 10: баранина, телятина, свинина", oldPrice: 2900, newPrice: 2100, image: "/menu/hinkali.jpg" },
  { id: 2, title: "АКЦИЯ 3 вида по 10 шт: свинина-говядина, баранина, сырные", oldPrice: 3000, newPrice: 2200, image: "/menu/hinkal-mix.jpg" },
  { id: 3, title: "АКЦИЯ 4 вида мяса по 10шт: свинина, телятина, баранина, курица", oldPrice: 4000, newPrice: 3100, image: "/menu/hinkali-na-tarelke.jpg" },
  { id: 4, title: "Хинкали жаренные с бараниной - 90 г", oldPrice: 110, newPrice: 90, image: "/menu/hinkali-fried.jpg" },
  { id: 5, title: "Хинкали с сыром - 90 г", oldPrice: 100, newPrice: 85, image: "/menu/chiken_pig.jpg" },
  { id: 6, title: "Хинкали со свининой и говядиной - 90 г", oldPrice: 95, newPrice: 75, image: "/menu/beef_pig.jpeg" },
]);

function toggleCartVisibility() {
  isCartVisible.value = !isCartVisible.value;
};
</script>

<style scoped>
.bg-pattern {
  background-image: url('/pattern.png'), linear-gradient(to right, #f5f5dc 0%, #faebd7 100%);
  background-size: contain;
}
</style>
