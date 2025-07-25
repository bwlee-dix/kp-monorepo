<script setup lang="ts">

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Member')

useHead({
  title: 'Member - App name - KingdomPlanet',
})
</script>

<template>
  <AdminSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <TableListV1 />
    </div>
  </AdminSideblockLayout>
</template>
