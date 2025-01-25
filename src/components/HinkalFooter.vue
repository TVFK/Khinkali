<template>
  <footer id="footer" class="w-full bg-pattern">
    <div class="flex flex-col items-center max-w-5xl gap-5 p-6 mx-auto text-center">
      <p class="text-base leading-6">
        © 2024 Хинкали-Дон. Все права дон защищены дон
      </p>
      <div class="text-base leading-6">
        <p>
          Телефон: <a href="tel:+71234567890" class="hover:underline">+7 (123) 456-78-90</a>
        </p>
        <p>
          Email: <a href="mailto:hinkal@vkusno.com" class="hover:underline">hinkal@vkusno.com</a>
        </p>
      </div>
      <div class="flex gap-4">
        <a href="https://rutube.ru/video/e6925c117fd5b81df9364d729b5588d8/" target="_blank"
          class="px-4 py-2 bg-[#4c75a3] text-white font-bold rounded-md text-sm transition hover:bg-[#3a5a79]">
          ВКонтакте
        </a>
        <a href="https://rutube.ru/video/e6925c117fd5b81df9364d729b5588d8/" target="_blank"
          class="px-4 py-2 bg-[#0088cc] text-white font-bold rounded-md text-sm transition hover:bg-[#005f8e]">
          Телеграм
        </a>
        <a href="https://rutube.ru/video/e6925c117fd5b81df9364d729b5588d8/" target="_blank"
          class="px-4 py-2 bg-[#ff0000] text-white font-bold rounded-md text-sm transition hover:bg-[#cc0000]">
          YouTube
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg-pattern {
  background-image: url('/pattern.png'), linear-gradient(to right, #f5f5dc 0%, #faebd7 100%);
  background-size: contain;
}
</style>
