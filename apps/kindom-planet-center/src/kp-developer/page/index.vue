<script setup lang="ts">
import { onMounted } from 'vue'


const router = useRouter()
const route = useRoute()


onMounted(() => {
  router.replace("/auth")
})
</script>

<template>
  <div />
</template>
