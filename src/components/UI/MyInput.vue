<template>
  <input :value="modelValue" @input="updateInput"
    class="border border-gray-400 rounded-md focus:outline-none focus:ring-2" type="text">
</template>

<script setup>
defineOptions({
  name: 'MyInput',
});

defineProps({
  modelValue: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

function updateInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>
