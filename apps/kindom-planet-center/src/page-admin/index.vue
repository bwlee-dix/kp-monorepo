<script setup lang="ts">
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  router.replace("/auth")
})
</script>

<template>
  <div />
</template>
