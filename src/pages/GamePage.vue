<template>
  <NavBar />
  <div class="flex items-center justify-center mt-20">
    <div class="flex flex-col items-center justify-center min-h-screen bg-[#f9f4ef] text-center">
      <h1>Интерактивная игра, найди сырную хинкалю!</h1>
      <p class="mb-8 font-semibold text-gray-600">
        Найдите на картинке ниже сырную хинкалю и получите промокод на тарелку сырных хинкалей!
      </p>
      <section class="p-10 bg-white rounded-lg shadow-lg">
        <img src="/map.png" alt="Карта" usemap="#hinkali-map" class="border-4 border-[#ff5a00] rounded-lg" height="552"
          width="944" />
        <map class="cursor-pointer" name="hinkali-map">
          <area shape="poly" coords="505,97,588,223,416,207" alt="Хинкали с сыром"
            @click.prevent="handleClick('cheese')" />

          <area shape="poly" coords="241,45,319,219,188,165" alt="Хинкали с бараниной"
            @click.prevent="handleClick('sheepmeat')" />
          <area shape="poly" coords="516,271,440,420,604,411" alt="Хинкали с бараниной"
            @click.prevent="handleClick('sheepmeat')" />
          <area shape="poly" coords="313,275,234,374,419,407" alt="Хинкали с бараниной"
            @click.prevent="handleClick('sheepmeat')" />
          <area shape="poly" coords="584,35,651,151,528,134" alt="Хинкали с бараниной"
            @click.prevent="handleClick('sheepmeat')" />

          <area shape="poly" coords="393,18,327,142,476,133" alt="Хинкали со свининой / говядиной"
            @click.prevent="handleClick('meat')" />
          <area shape="poly" coords="679,221,577,326,756,357" alt="Хинкали со свининой / говядиной"
            @click.prevent="handleClick('meat')" />
          <area shape="poly" coords="203,179,127,297,276,274" alt="Хинкали со свининой / говядиной"
            @click.prevent="handleClick('meat')" />
          <area shape="poly" coords="686,110,761,217,592,224" alt="Хинкали со свининой / говядиной"
            @click.prevent="handleClick('meat')" />
          <area shape="poly" coords="359,169,482,280,344,297" alt="Хинкали со свининой / говядиной"
            @click.prevent="handleClick('meat')" />
        </map>
      </section>
    </div>
  </div>
  <HinkalFooter />
</template>

<script setup lang="ts">
import HinkalFooter from '../components/HinkalFooter.vue';
import NavBar from '../components/NavBar.vue';

function handleClick(type: string) {
  if (type === "cheese") {
    alert("Поздравляем! Вот ваш промокод - E1L7DL92OEQ !");
  } else if (type === "sheepmeat" || type === "meat") {
    alert("Не угадал :( попробуй ещё раз");
  }
}
</script>
