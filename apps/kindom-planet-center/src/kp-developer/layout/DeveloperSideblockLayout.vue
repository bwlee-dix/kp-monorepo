<script setup lang="ts">
import type { SideblockTheme } from '/@dds/components/navigation/desktop/Sideblock.vue'
import { useKpPanels } from '../composable/panels'
import WalletPanel from '../component/WalletPanel.vue'

import { useViewWrapper } from '/@dds/stores/viewWrapper'
import UserProfileDropdown from '../component/UserProfileDropdown.vue'
import Toolbar from '../component/Toolbar.vue'
import { useDarkmode } from '/@dds/stores/darkmode'

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
const panels = useKpPanels()
const route = useRoute()
const darkmode = useDarkmode()

const isMobileSideblockOpen = ref(false)
const isDesktopSideblockOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSideblock)

const body = 'body'

watchPostEffect(() => {
  viewWrapper.setPushedBlock(isDesktopSideblockOpen.value ?? false)
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

onMounted(() => {
  viewWrapper.setPushed(false)
})
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay" />

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
      </template>

      <template #bottom-links>
        <li>
          <a aria-label="View settings" href="#">
            <i aria-hidden="true" class="iconify" data-icon="feather:settings" />
          </a>
        </li>
      </template>
    </MobileSidebar>

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

    <CircularMenu />

    <Transition name="slide-x">
      <Sideblock v-if="isDesktopSideblockOpen" :theme="props.theme">
        <template #header>
          <RouterLink to="/" class="sidebar-block-logo">
            <img
              :src="`/images/${
                darkmode.isDark ? 'kp_logo_dark.png' : 'kp_logo_light.png'
              }`"
              alt="kp-logo"
              class="logo"
            />
          </RouterLink>
          <h3>Developer</h3>
        </template>
        <template #menu>
          <VDropdown title="GMMA" full-width spaced>
            <template #content>
              <a href="#" class="dropdown-item is-media">
                <img class="item-img" src="/images/gmma_v2.png" alt="" />
                <div class="meta">
                  <span>GMMA</span>
                </div>
              </a>
              <a href="#" class="dropdown-item is-media">
                <img class="item-img" src="/images/kosta-v2.png" alt="" />
                <div class="meta">
                  <span>KOSTA</span>
                </div>
              </a>
            </template>
          </VDropdown>
        </template>

        <template #links>
          <li>
            <RouterLink :to="`/${body}/dashboard`" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:grid" />
              </span>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="`/${body}/app`" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:box" />
              </span>
              App
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="`/${body}/user`" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:users" />
              </span>
              User
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="`/${body}/api`" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:list" />
              </span>
              API
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="`/${body}/log`" class="single-link">
              <span class="icon">
                <i class="iconify" data-icon="feather:alert-circle" />
              </span>
              Log
            </RouterLink>
          </li>
        </template>

        <template #bottom-links>
          <UserProfileDropdown up />
          <LayoutSwitcher />
        </template>
      </Sideblock>
    </Transition>

    <WalletPanel />

    <VViewWrapper full>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot />
        </template>
        <VPageContent v-else class="is-relative">
          <div class="page-title has-text-centered">
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
              <div class="wallet-container" @click="panels.setActive('wallet')">
                <img src="/images/kp_logo_single.png" alt="KCP" />
                <span class="wallet-balance">52.0 KCP</span>
              </div>
              <UserProfileDropdown />
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

.logo {
  border-radius: 4px;
}
</style>
