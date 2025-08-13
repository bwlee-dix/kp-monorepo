<script setup lang="ts">
import type { SideblockTheme } from '/@vuero/components/navigation/desktop/Sideblock.vue'
import { usePanels } from '../stores/panels'
import { useViewWrapper } from '../stores/viewWrapper'

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
const panels = usePanels()
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
        <RouterLink
          to="/"
          class="navbar-item is-brand"
        >
          <AnimatedLogo
            width="38px"
            height="38px"
          />
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
          <RouterLink
            to="/dashboard"
            class="single-link"
          >
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:grid"
              />
            </span>
            Dashboard
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/member"
            class="single-link"
          >
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:user"
              />
            </span>
            Member
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/group"
            class="single-link"
          >
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:users"
              />
            </span>
            Group
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/notice"
            class="single-link"
          >
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:users"
              />
            </span>
            Notice
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/event"
            class="single-link"
          >
            <span class="icon">
              <i
                class="iconify"
                data-icon="feather:users"
              />
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
            @keydown.space.prevent="panels.setActive('search')"
            @click="panels.setActive('search')"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:search"
            />
          </a>
        </li>
        <li>
          <a
            aria-label="View settings"
            href="#"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:settings"
            />
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
      <Sideblock
        v-if="isDesktopSideblockOpen"
        :theme="props.theme"
      >
        <template #header>
          <RouterLink
            to="/"
            class="sidebar-block-logo"
          >
            <AnimatedLogo width="36px" />
          </RouterLink>
          <h3>KP Admin</h3>
        </template>
        <template #menu>
          <VDropdown
            title="GMMA"
            spaced
          >
            <template #content>
              <a
                href="#"
                class="dropdown-item is-media"
              >
                <img
                  class="item-img"
                  src="/images/avatars/svg/vuero-1.svg"
                  alt=""
                >
                <div class="meta">
                  <span>Erik K.</span>
                  <span>New York, NY</span>
                </div>
              </a>
              <a
                href="#"
                class="dropdown-item is-media is-active"
              >
                <img
                  class="item-img"
                  src="/demo/avatars/7.jpg"
                  alt=""
                >
                <div class="meta">
                  <span>Alice C.</span>
                  <span>San Diego, CA</span>
                </div>
              </a>
              <a
                href="#"
                class="dropdown-item is-media"
              >
                <img
                  class="item-img"
                  src="/demo/avatars/25.jpg"
                  alt=""
                >
                <div class="meta">
                  <span>Melany W.</span>
                  <span>San Jose, CA</span>
                </div>
              </a>
              <hr class="dropdown-divider">
              <a
                href="#"
                class="dropdown-item is-media"
              >
                <img
                  class="item-img"
                  src="/demo/avatars/9.jpg"
                  alt=""
                >
                <div class="meta">
                  <span>Anna B</span>
                  <span>San Francisco, CA</span>
                </div>
              </a>
            </template>
          </VDropdown>
        </template>

        <template #links>
          <li>
            <RouterLink
              to="/dashboard"
              class="single-link"
            >
              <span class="icon">
                <i
                  class="iconify"
                  data-icon="feather:grid"
                />
              </span>
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/member"
              class="single-link"
            >
              <span class="icon">
                <i
                  class="iconify"
                  data-icon="feather:user"
                />
              </span>
              Member
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/group"
              class="single-link"
            >
              <span class="icon">
                <i
                  class="iconify"
                  data-icon="feather:users"
                />
              </span>
              Group
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/notice"
              class="single-link"
            >
              <span class="icon">
                <i
                  class="iconify"
                  data-icon="feather:bell"
                />
              </span>
              Notice
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/event"
              class="single-link"
            >
              <span class="icon">
                <i
                  class="iconify"
                  data-icon="feather:calendar"
                />
              </span>
              Event
            </RouterLink>
          </li>
        </template>

        <template #bottom-links>
          <UserProfileDropdown up />
          <LayoutSwitcher />
        </template>
      </Sideblock>
    </Transition>

    <LanguagesPanel />
    <ActivityPanel />
    <SearchPanel />
    <TaskPanel />

    <VViewWrapper full>
      <VPageContentWrapper>
        <template v-if="props.nowrap">
          <slot />
        </template>
        <VPageContent
          v-else
          class="is-relative"
        >
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
                    <i
                      aria-hidden="true"
                      class="icon-line-top"
                    />
                    <i
                      aria-hidden="true"
                      class="icon-line-center"
                    />
                    <i
                      aria-hidden="true"
                      class="icon-line-bottom"
                    />
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
              <ToolbarNotification />

              <a
                class="toolbar-link right-panel-trigger"
                aria-label="View activity panel"
                tabindex="0"
                role="button"
                @keydown.space.prevent="panels.setActive('activity')"
                @click="panels.setActive('activity')"
              >
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:grid"
                />
              </a>
            </Toolbar>
          </div>

          <slot />
        </VPageContent>
      </VPageContentWrapper>
    </VViewWrapper>
  </div>
</template>
