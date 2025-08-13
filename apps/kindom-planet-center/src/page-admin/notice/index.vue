<script setup lang="ts">

import { useViewWrapper } from '../../stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Notice')

useHead({
  title: 'Notice - App name - KingdomPlanet',
})
</script>

<template>
  <AdminSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <ViewListV3 :active-tab="activeTab" />
    </div>
  </AdminSideblockLayout>
</template>
