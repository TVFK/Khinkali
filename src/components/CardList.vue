<template>
  <div class="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
    <CardItem v-for="card in cards" :card="card" :key="card.id" />
  </div>
</template>

<script setup lang="ts">
import CardItem from './CardItem.vue';

defineProps<{
  cards: {
    id: number;
    title: string;
    oldPrice: number;
    newPrice: number;
    image: string;
  }[];
}>();
</script>
