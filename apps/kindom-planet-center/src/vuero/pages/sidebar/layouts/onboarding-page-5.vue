<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Onboarding Page 5')

useHead({
  title: 'Onboarding Page 5 - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <OnboardingV5 />
  </div>
</template>
