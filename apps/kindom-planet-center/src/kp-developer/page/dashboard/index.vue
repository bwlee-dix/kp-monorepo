<script setup lang="ts">

import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Dashboard')

useHead({
  title: 'Dashboard - App name - KingdomPlanet',
})

const isReady = ref(false)

onMounted(() => {
  console.log("dashboard mounted")
  // Add a small delay to ensure layout is ready
  setTimeout(() => {
    isReady.value = true
  }, 100)
})
</script>

<template>
  <DeveloperSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <div
        v-if="!isReady"
        class="loading-placeholder"
      >
        <VLoader size="large" />
        <p>Loading dashboard...</p>
      </div>
      <AnalyticsDashboard v-else />
    </div>
  </DeveloperSideblockLayout>
</template>

<style lang="scss" scoped>
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  p {
    margin-top: 1rem;
    color: var(--light-text);
  }
}
</style>
