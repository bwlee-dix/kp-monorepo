<script setup lang="ts">
import { useLayoutSwitcher } from '/@vuero/stores/layoutSwitcher'
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const layoutSwitcher = useLayoutSwitcher()
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Maps 2')

useHead({
  title: 'Maps 2 - Navbar - Vuero',
})
</script>

<template>
  <component
    :is="layoutSwitcher.dynamicLayoutComponent as any"
    v-bind="layoutSwitcher.dynamicLayoutProps"
    nowrap
  >
    <MapsDashboard reversed />
  </component>
</template>
