<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Sales Dashboard')

useHead({
  title: 'Sales Dashboard - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <SalesDashboard />
  </div>
</template>
