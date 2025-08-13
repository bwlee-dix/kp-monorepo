<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Kingdom Planet Dev')
useHead({
  title: 'Dashboard - App name - KingdomPlanet',
})
</script>

<template>
  <DeveloperSideblockLayout theme="curved" open-on-mounted>
    <RouterView />
  </DeveloperSideblockLayout>
</template>

<style scoped></style>
