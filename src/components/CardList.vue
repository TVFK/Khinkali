<template>
  <div class="grid grid-cols-1 gap-6 px-4 md:grid-cols-3">
    <CardItem v-for="card in cards" :card="card" :key="card.id" />
  </div>
</template>

<script setup>
import CardItem from './CardItem.vue';

defineProps({
  cards: {
    type: Array,
    required: true
  }
});
</script>
