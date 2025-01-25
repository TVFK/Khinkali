<template>
  <input :value="modelValue" @input="updateInput"
    class="border border-gray-400 rounded-md focus:outline-none focus:ring-2" type="text">
</template>

<script setup lang="ts">
defineOptions({
  name: 'MyInput',
});

defineProps<{
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

function updateInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>
