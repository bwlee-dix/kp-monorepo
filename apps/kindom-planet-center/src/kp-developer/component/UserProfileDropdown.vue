<script setup lang="ts">
import { useUserSession } from '../store/userSession'

const userSession = useUserSession()
const router = useRouter()

function logout() {
  userSession.logoutUser()
  router.push('/')
}
</script>

<template>
  <VDropdown
    right
    spaced
    class="user-dropdown"
    @contextmenu.prevent
    @dragstart.prevent
    @selectstart.prevent
  >
    <template #button="{ toggle }">
      <a
        role="button"
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar
          :picture="userSession.user?.avatar ?? '/images/avatars/svg/vuero-1.svg'"
        />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar
          size="large"
          :picture="userSession.user?.avatar ?? '/images/avatars/svg/vuero-1.svg'"
        />

        <div class="meta">
          <span class="user-name">{{ userSession.user?.name ?? 'Tester' }}</span>
          <span class="email">{{ userSession.user?.email ?? 'kp@kp.com' }}</span>
        </div>
      </div>

      <hr class="dropdown-divider" />

      <a href="/mypage/basic" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-user-alt" />
        </div>
        <div class="meta">
          <span>Basic Information</span>
          <span>View your basic information</span>
        </div>
      </a>

      <a href="/mypage/developer" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-briefcase" />
        </div>
        <div class="meta">
          <span>Developer Information</span>
          <span>View your developer information</span>
        </div>
      </a>

      <a href="/mypage/reward" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-users-alt" />
        </div>
        <div class="meta">
          <span>Rewards</span>
          <span>View your rewards</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <div class="dropdown-item is-button">
        <VButton
          class="logout-button"
          icon="feather:log-out"
          color="primary"
          role="menuitem"
          raised
          fullwidth
          @click="logout"
        >
          Logout
        </VButton>
      </div>
    </template>
  </VDropdown>
</template>

<style scoped lang="scss">
.user-dropdown {
  .dropdown-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;

    .meta {
      display: flex;
      flex-direction: column;

      .user-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--dark-text);
        text-align: left;
      }

      .email {
        font-size: 14px;
        font-weight: 400;
        color: var(--light-text);
        text-align: left;
      }
    }
  }
}
</style>
