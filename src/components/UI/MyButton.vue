<template>
  <button class="text-white bg-teal-400 border rounded-lg cursor-pointer">
    <slot></slot>
  </button>
</template>

<script setup>
defineOptions({
  name: 'MyButton'
})
</script>
