<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Dashboard')

useHead({
  title: 'Dashboard - App name - KingdomPlanet',
})
</script>

<template>
  <div class="page-content-inner">
    <AnalyticsDashboard />
  </div>
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
