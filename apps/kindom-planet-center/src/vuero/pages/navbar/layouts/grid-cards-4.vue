<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Grid Cards 4')

useHead({
  title: 'Grid Cards 4 - Navbar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <CardsGridV4 />
  </div>
</template>
