<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Profile Settings')

useHead({
  title: 'Profile Settings - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <SettingsProfile />
  </div>
</template>
