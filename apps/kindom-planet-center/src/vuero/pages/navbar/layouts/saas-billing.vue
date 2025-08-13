<script setup lang="ts">
import { useViewWrapper } from '/@vuero/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Saas Billing')

useHead({
  title: 'Saas Billing - Navbar - Vuero',
})
</script>

<template>
  <div class="page-content-inner">
    <SaasBillingApp />
  </div>
</template>
