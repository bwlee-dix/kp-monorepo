<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Soccer')

useHead({
  title: 'Soccer - Navbar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <SoccerDashboard />
  </div>
</template>
