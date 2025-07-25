<script setup lang="ts">
import { useDarkmode } from '/@src/stores/darkmode'
import { useUserSession } from '/@src/stores/userSession'
import { useNotyf } from '/@src/composable/useNotyf'
import sleep from '/@src/utils/sleep'
import { onMounted } from 'vue'

const isLoading = ref(false)
const darkmode = useDarkmode()
const router = useRouter()
const route = useRoute()
const notyf = useNotyf()
const userSession = useUserSession()
const redirect = route.query.redirect as string

onMounted(() => {
  router.replace("/auth")
})
</script>

<template>
  <div />
</template>
