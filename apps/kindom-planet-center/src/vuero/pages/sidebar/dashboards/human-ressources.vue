<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('HR Dashboard')

useHead({
  title: 'HR Dashboard - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <HumanRessourcesDashboard />
  </div>
</template>
