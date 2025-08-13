<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Utility Invoice')

useHead({
  title: 'Utility Invoice - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <Invoice />
  </div>
</template>
