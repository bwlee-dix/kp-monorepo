<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'
import UserProfileDropdown from '../component/UserProfileDropdown.vue'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('My Page')

useHead({
  title: 'My Page - Admin - Kingdom Planet',
})

const isDesktopSideblockOpen = ref(false)
</script>
<template>
  <div class="sidebar-layout">
    <div class="page-content-inner">
      <div class="account-wrapper">
        <VPageContent class="is-relative">
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
              <div class="wallet-container">
                <img src="/images/kp_logo_single.png" alt="KCP" />
                <span class="wallet-balance">2.5 KPC</span>
              </div>
              <UserProfileDropdown />
            </Toolbar>
          </div>

          <slot />
        </VPageContent>

        <div class="columns">
          <div class="column is-3">
            <div class="account-box is-navigation">
              <VBlock title="Administrator" subtitle="Software Engineer" center>
                <template #icon>
                  <VAvatar
                    size="large"
                    picture="/images/avatars/svg/vuero-1.svg"
                    badge="/images/icons/flags/united-states-of-america.svg"
                    @contextmenu.prevent
                    @dragstart.prevent
                    @selectstart.prevent
                  />
                </template>
              </VBlock>

              <div class="account-menu">
                <RouterLink
                  to="/mypage/adminInfo"
                  class="account-menu-item"
                  @contextmenu.prevent
                  @dragstart.prevent
                  @selectstart.prevent
                >
                  <VIcon icon="lucide:user" class="icon" />
                  <span>Administrator Information</span>
                </RouterLink>
                <RouterLink
                  to="/mypage/wallet"
                  class="account-menu-item"
                  @contextmenu.prevent
                  @dragstart.prevent
                  @selectstart.prevent
                >
                  <VIcon icon="lucide:computer" class="icon" />
                  <span>My Wallet</span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="column is-9">
            <RouterView v-slot="{ Component }">
              <Transition name="fade-fast" mode="out-in">
                <component :is="Component" />
              </Transition>
            </RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';

.is-navbar {
  .account-wrapper {
    margin-top: 30px;
  }
}

.page-content-inner {
  display: flex;
  width: 100%;

  .form-layout {
    width: 100%;
    max-width: initial;
    margin: 0;

    .form-body {
      .form-fieldset {
        max-width: initial;
        margin: 0;
      }
    }
  }
  .page-content {
    padding: initial;
  }
  .account-wrapper {
    width: 100%;
    padding: 60px;

    .account-box {
      @include vuero-s-card;

      &.is-navigation {
        .media-flex-center {
          padding-bottom: 20px;

          .flex-meta {
            span {
              &:first-child {
                font-size: 1.3rem;
              }
            }
          }
        }

        .account-menu {
          .account-menu-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border: 1px solid transparent;
            border-radius: 8px;
            margin-bottom: 5px;
            transition: all 0.3s; // transition-all test

            gap: 8px;
            .icon {
              color: var(--light-text);
              width: 16px;
              height: 16px;
            }

            &.router-link-exact-active {
              box-shadow: var(--light-box-shadow);
              border-color: var(--fade-grey-dark-3);

              span,
              i {
                color: var(--primary);
              }

              .end {
                display: block;
              }
            }

            &:not(.router-link-exact-active) {
              &:hover {
                background: var(--fade-grey-light-3);
              }
            }

            i {
              margin-inline-end: 8px;
              font-size: 1.1rem;
              color: var(--light-text);

              &.fas,
              .fal,
              .far {
                font-size: 0.9rem;
              }
            }

            span {
              font-family: var(--font-alt);
              font-size: 0.95rem;
              color: var(--dark-text);
            }

            .end {
              margin-inline-start: auto;
              display: none;
            }
          }
        }
      }

      &.is-form {
        padding: 0;

        &.is-footerless {
          padding-bottom: 20px;
        }

        .form-head,
        .form-foot {
          padding: 12px 20px;

          .form-head-inner,
          .form-foot-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .form-head {
          border-bottom: 1px solid var(--fade-grey-dark-3);
          transition: all 0.3s; // transition-all test

          &.is-stuck {
            background: var(--white);
            padding-inline-end: 80px;
            border-inline-start: 1px solid var(--fade-grey-dark-3);
          }

          .left {
            h3 {
              font-family: var(--font-alt);
              font-size: 1.2rem;
              line-height: 1.3;
            }

            p {
              font-size: 0.95rem;
            }
          }
        }

        .form-foot {
          border-top: 1px solid var(--fade-grey-dark-3);
        }

        .form-body {
          padding: 20px;

          .fieldset {
            padding: 20px 0;
            max-width: 480px;
            margin: 0 auto;

            .fieldset-heading {
              margin-bottom: 20px;

              h4 {
                font-family: var(--font-alt);
                font-weight: 600;
                font-size: 1rem;
              }

              p {
                font-size: 0.9rem;
              }
            }

            .v-avatar {
              position: relative;
              display: block;
              margin: 0 auto;

              .edit-button {
                position: absolute;
                bottom: 0;
                inset-inline-end: 0;
              }
            }

            .setting-list {
              .setting-form {
                text-align: center;

                .filepond-profile-wrap {
                  margin: 0 auto 10px !important;
                }
              }

              .setting-item {
                display: flex;
                align-items: center;
                margin-bottom: 24px;

                .icon-wrap {
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 50px;
                  min-width: 50px;
                  height: 50px;
                  border-radius: var(--radius-rounded);
                  background: var(--fade-grey-light-2);
                  border: 1px solid var(--fade-grey-dark-3);
                  color: var(--light-text);

                  &.has-img {
                    border-color: var(--primary);

                    img {
                      width: 36px;
                      min-width: 36px;
                      height: 36px;
                    }
                  }

                  i {
                    font-size: 1.4rem;
                  }
                }

                img {
                  display: block;
                  width: 50px;
                  min-width: 50px;
                  height: 50px;
                  border-radius: var(--radius-rounded);
                  border: 1px solid transparent;
                }

                .meta {
                  margin-inline-start: 10px;

                  > span {
                    font-family: var(--font);
                    display: block;

                    &:first-child {
                      font-family: var(--font-alt);
                      font-weight: 600;
                      color: var(--dark-text);
                      font-size: 0.9rem;
                    }

                    &:nth-child(2),
                    &:nth-child(3) {
                      font-size: 0.85rem;
                      color: var(--light-text);

                      i {
                        position: relative;
                        top: -2px;
                        font-size: 4px;
                        margin: 0 6px;
                      }
                    }

                    &:nth-child(3) {
                      color: var(--primary);
                    }

                    span {
                      display: inline-block;
                    }
                  }
                }

                .end {
                  margin-inline-start: auto;
                }
              }
            }
          }
        }
      }
    }
  }
}

.is-dark {
  .account-wrapper {
    .account-box {
      @include vuero-card--dark;

      &.is-navigation {
        .account-menu {
          .account-menu-item {
            span {
              color: var(--fade-grey-dark-3);
            }

            &.router-link-exact-active {
              background: var(--dark-sidebar-light-8);
              border-color: var(--dark-sidebar-light-12);

              i,
              span {
                color: var(--primary);
              }
            }

            &:not(.router-link-exact-active) {
              &:hover {
                background: var(--dark-sidebar-light-10);
              }
            }
          }
        }
      }

      &.is-form {
        .form-head,
        .form-foot {
          border-color: var(--dark-sidebar-light-12);
        }

        .form-head {
          &.is-stuck {
            background: var(--dark-sidebar);
            border-color: var(--dark-sidebar-light-6);
          }

          .left {
            h3 {
              color: var(--dark-dark-text);
            }
          }
        }

        .form-body {
          .fieldset {
            .fieldset-heading {
              h4 {
                color: var(--dark-dark-text);
              }
            }

            .setting-list {
              .setting-item {
                > img,
                > .icon-wrap,
                > .icon-wrap img {
                  border-color: var(--dark-sidebar-light-12);
                }

                > .icon-wrap {
                  background: var(--dark-sidebar-light-2);
                }

                .meta {
                  > span {
                    &:nth-child(3) {
                      color: var(--primary);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
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
