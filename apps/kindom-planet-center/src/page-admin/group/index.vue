<script setup lang="ts">

import { useViewWrapper } from '../../stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Group')

useHead({
  title: 'Group - App name - KingdomPlanet',
})
</script>

<template>
  <AdminSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <TableListV2 />
    </div>
  </AdminSideblockLayout>
</template>
