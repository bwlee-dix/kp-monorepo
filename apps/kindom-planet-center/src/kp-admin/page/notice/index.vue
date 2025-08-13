<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Notice')

const activeTab = ref<string>('all')

useHead({
  title: 'Notice - App name - KingdomPlanet',
})
</script>

<template>
  <AdminSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <div class="page-content-inner">
      <ViewListV3 :active-tab="activeTab" />
    </div>
  </AdminSideblockLayout>
</template>
