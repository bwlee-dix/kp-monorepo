<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Profile Notifications')

useHead({
  title: 'Profile Notifications - Sidebar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <NotificationPage />
  </div>
</template>
