<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Welcome')

useHead({
  title: 'Welcome - Navbar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <OnboardingStandard />
  </div>
</template>
