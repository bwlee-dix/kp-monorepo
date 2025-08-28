<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <button class="dds-button">
    {{ text }}
  </button>
</template>

<style scoped></style>
