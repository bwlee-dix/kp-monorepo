<script setup lang="ts">

import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Dashboard')

useHead({
  title: 'Dashboard - App name - KingdomPlanet',
})
</script>

<template>
  <AdminSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <AnalyticsDashboard />
    </div>
  </AdminSideblockLayout>
</template>
