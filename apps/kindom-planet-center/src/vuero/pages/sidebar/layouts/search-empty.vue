<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Search Empty')

useHead({
  title: 'Search Empty - Sidebar - Vuero',
})
</script>

<template>
  <div class="tabs-wrapper is-triple-slider is-squared is-inverted">
    <div class="page-content-inner">
      <EmptySearch />
    </div>
  </div>
</template>
