<script setup lang="ts">
import { useUserSession } from '/@dds/stores/userSession'

const userSession = useUserSession()
const router = useRouter()

function logout() {
  userSession.logoutUser()
  router.push('/')
}
</script>

<template>
  <VDropdown right spaced class="user-dropdown profile-dropdown">
    <template #button="{ toggle }">
      <a
        role="button"
        tabindex="0"
        class="is-trigger dropdown-trigger"
        aria-haspopup="true"
        @keydown.space.prevent="toggle"
        @click="toggle"
      >
        <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
      </a>
    </template>

    <template #content>
      <div class="dropdown-head">
        <VAvatar size="large" picture="/images/avatars/svg/vuero-1.svg" />

        <div class="meta">
          <span class="user-name">Administrator</span>
          <span class="email">admin@kingdompla.net</span>
        </div>
      </div>

      <hr class="dropdown-divider" />

      <a href="/mypage/adminInfo" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-user-alt" />
        </div>
        <div class="meta">
          <span>Profile</span>
          <span>View my profile</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a href="/mypage/wallet" role="menuitem" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-wallet" />
        </div>
        <div class="meta">
          <span>Wallet</span>
          <span>View my rewards</span>
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
