<script setup lang="ts">
import { useLayoutSwitcher } from '/@vuero/stores/layoutSwitcher'
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const layoutSwitcher = useLayoutSwitcher()
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Maps 1')

useHead({
  title: 'Maps 1 - Navbar - Vuero',
})
</script>

<template>
  <component
    :is="layoutSwitcher.dynamicLayoutComponent as any"
    v-bind="layoutSwitcher.dynamicLayoutProps"
    nowrap
  >
    <MapsDashboard />
  </component>
</template>
