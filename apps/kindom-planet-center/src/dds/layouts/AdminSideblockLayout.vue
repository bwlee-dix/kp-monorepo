<script setup lang="ts">
import type { SideblockTheme } from '/@dds/components/navigation/desktop/Sideblock.vue'
import { usePanel } from '/@src/kp-admin/store/panel'
import { useViewWrapper } from '/@dds/stores/viewWrapper'
import AdminProfileDropdown from '../../kp-admin/component/AdminProfileDropdown.vue'
import WalletPanel from '/@src/kp-admin/component/WalletPanel.vue'

const props = withDefaults(
  defineProps<{
    theme?: SideblockTheme
    defaultSideblock?: string
    closeOnChange?: boolean
    openOnMounted?: boolean
    nowrap?: boolean
  }>(),
  {
    defaultSideblock: 'dashboard',
    theme: 'default',
  }
)

const viewWrapper = useViewWrapper()
const panel = usePanel()
const route = useRoute()
const isMobileSideblockOpen = ref(false)
const isDesktopSideblockOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSideblock)

/**
 * watchPostEffect callback will be executed each time dependent reactive values has changed
 */
watchPostEffect(() => {
  viewWrapper.setPushedBlock(isDesktopSideblockOpen.value ?? false)
})
onMounted(() => {
  viewWrapper.setPushed(false)
})
watch(
  () => route.fullPath,
  () => {
    isMobileSideblockOpen.value = false

    if (props.closeOnChange && isDesktopSideblockOpen.value) {
      isDesktopSideblockOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay" />

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    >
      <template #brand>
        <RouterLink to="/" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <NotificationsMobileDropdown />
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSideblockOpen"
      @toggle="isMobileSideblockOpen = !isMobileSideblockOpen"
    >
      <template #links>
        <li>
          <RouterLink to="/dashboard" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:grid" />
            </span>
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/member" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:user" />
            </span>
            Member
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/group" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:users" />
            </span>
            Group
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/notice" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:users" />
            </span>
            Notice
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/event" class="single-link">
            <span class="icon">
              <i class="iconify" data-icon="feather:users" />
            </span>
            Event
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a
            aria-label="Display search panel"
            tabindex="0"
            role="button"
            @keydown.space.prevent="panel.setActive('search')"
            @click="panel.setActive('search')"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:search" />
          </a>
        </li>
        <li>
          <a aria-label="View settings" href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings" />
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <Transition name="slide-x">
      <LayoutsMobileSubsidebar
        v-if="isMobileSideblockOpen && activeMobileSubsidebar === 'layout'"
      />
      <DashboardsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'dashboard'"
      />
      <ComponentsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'components'"
      />
      <ElementsMobileSubsidebar
        v-else-if="isMobileSideblockOpen && activeMobileSubsidebar === 'elements'"
      />
    </Transition>

    <!-- Desktop navigation -->
    <CircularMenu />

    <Transition name="slide-x">
      <Sideblock v-if="isDesktopSideblockOpen" :theme="props.theme">
        <template #header>
          <RouterLink to="/app-list" class="sidebar-block-logo">
            <img src="/images/kp_logo.png" alt="" class="logo" />
          </RouterLink>
          <h3>KP Admin</h3>
        </template>
        <template #menu>
          <VDropdown title="Apps" spaced>
            <template #content>
              <a href="#" class="dropdown-item is-media">
                <img class="item-img" src="/images/gmma_v2.png" alt="" />
                <div class="meta">
                  <span>GMMA - Onnuri</span>
                  <span>New York, USA</span>
                </div>
              </a>
              <a href="#" class="dropdown-item is-media">
                <img class="item-img" src="/images/gmma_v2.png" alt="" />
                <div class="meta">
                  <span>GMMA - Somang</span>
                  <span>New York, USA</span>
                </div>
              </a>
              <a href="#" class="dropdown-item is-media is-active">
                <img class="item-img" src="/images/kosta-v2.png" alt="" />
                <div class="meta">
                  <span>KOSTA</span>
                  <span>Seoul, KOR</span>
                </div>
              </a>
              <hr class="dropdown-divider" />
              <a href="#" class="dropdown-item is-media">
                <img class="item-img" src="/images/logo_type_deepenqt.svg" alt="" />
                <div class="meta">
                  <span>DeepenQT</span>
                  <span>San Francisco, USA</span>
                </div>
              </a>
            </template>
          </VDropdown>
        </template>

        <template #links>
          <li>
            <RouterLink to="/dashboard" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:grid" />
              </span>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/member" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:user" />
              </span>
              Member
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/group" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:users" />
              </span>
              Group
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/notice" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:bell" />
              </span>
              Notice
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/event" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:calendar" />
              </span>
              Event
            </RouterLink>
          </li>
        </template>
      </Sideblock>
    </Transition>

    <LanguagesPanel />
    <WalletPanel />

    <VViewWrapper full>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot />
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              tabindex="0"
              role="button"
              @keydown.space.prevent="isDesktopSideblockOpen = !isDesktopSideblockOpen"
              @click="isDesktopSideblockOpen = !isDesktopSideblockOpen"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSideblockOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top" />
                    <i aria-hidden="true" class="icon-line-center" />
                    <i aria-hidden="true" class="icon-line-bottom" />
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">
                {{ viewWrapper.pageTitle }}
              </h1>
            </div>

            <Toolbar class="desktop-toolbar">
              <div class="wallet-container" @click="panel.setActive('wallet')">
                <img src="/images/kp_logo_single.png" alt="KPC" />
                <span class="wallet-balance">2.5 KPC</span>
              </div>
              <AdminProfileDropdown />
            </Toolbar>
          </div>

          <slot />
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  padding: 40px;
}
.wallet-container {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 0 8px;
  background-color: var(--placeload-nuance-from);
  cursor: pointer;

  .wallet-balance {
    font-size: 16px;
    font-weight: 500;
    color: var(--dark-text);
  }
}
</style>
