<script setup lang="ts">
import { useDarkmode } from '/@dds/stores/darkmode'

import sleep from '/@dds/utils/sleep'
import { useNotyf } from '/@dds/composable/useNotyf'
import { popovers } from '/@dds/data/users/userPopovers'

const notyf = useNotyf()
const router = useRouter()

const isLoading = ref(false)
const darkmode = useDarkmode()

const accept = async () => {
  isLoading.value = true

  await sleep()
  router.push('/builder')

  isLoading.value = false
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-wrapper-inner is-single">
      <!--Fake navigation-->
      <div class="auth-nav">
        <div class="left" />
        <div class="center">
          <RouterLink to="/" class="header-item">
            <AnimatedLogo width="38px" height="38px" />
          </RouterLink>
        </div>
        <div class="right">
          <label
            class="ml-auto dark-mode"
            tabindex="0"
            role="button"
            @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
          >
            <input
              data-cy="dark-mode-toggle"
              type="checkbox"
              :checked="!darkmode.isDark"
              @change="darkmode.onChange"
            />
            <span />
          </label>
        </div>
      </div>
      <div class="page-content-inner">
        <div class="action-page-wrapper action-page-v1">
          <div class="wrapper-inner">
            <div class="action-box">
              <div class="box-content">
                <VAvatar
                  size="big"
                  picture="/demo/avatars/16.jpg"
                  badge="/demo/photos/apps/9.png"
                />

                <h3 class="dark-inverted">
                  Jason G. has invited you to the
                  <span class="is-dark-primary">Banking Solution Website</span>
                  project.
                </h3>

                <div class="sender-message is-dark-card-bordered is-dark-bg-4">
                  <h4 class="dark-inverted">Message from Jason</h4>
                  <p>
                    Hey Erik, It would be really cool if you could give us a hand on this
                    project. There are a lot of tasks popping out every day and I feel the
                    team is getting a bit overwhelmed. We'd love to have you board.
                  </p>
                </div>
                <div class="people-wrap">
                  <div class="people">
                    <div>
                      <Tippy class="has-help-cursor" interactive placement="bottom">
                        <VAvatar size="small" picture="/demo/avatars/21.jpg" />
                        <template #content>
                          <UserPopoverContent :user="popovers.user21" />
                        </template>
                      </Tippy>
                    </div>

                    <div>
                      <Tippy class="has-help-cursor" interactive placement="bottom">
                        <VAvatar size="small" color="h-purple" initials="SC" />
                        <template #content>
                          <UserPopoverContent :user="popovers.user120" />
                        </template>
                      </Tippy>
                    </div>

                    <div>
                      <Tippy class="has-help-cursor" interactive placement="bottom">
                        <VAvatar size="small" picture="/demo/avatars/39.jpg" />
                        <template #content>
                          <UserPopoverContent :user="popovers.user39" />
                        </template>
                      </Tippy>
                    </div>
                  </div>
                  <div class="people-text">
                    <p>And 5 others are already members of this project</p>
                  </div>
                </div>
                <div class="buttons">
                  <VButton dark-outlined> Decline </VButton>
                  <VButton
                    color="primary"
                    :loading="isLoading"
                    raised
                    tabindex="0"
                    @keydown.space.prevent="accept"
                    @click="accept"
                  >
                    Accept
                  </VButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';

.page-content-inner {
  padding: 6rem 4rem;
}
.auth-wrapper-inner {
  overflow: visible !important;
  height: 100%;
  padding: 0;
  margin: 0;

  &.is-gapless:not(:last-child) {
    margin-bottom: 0 !important;
  }

  &.is-single {
    background: var(--widget-grey);
    min-height: 100vh;
  }

  .hero-banner {
    background: var(--widget-grey);

    img {
      max-width: 550px;
      margin: 0 auto;
    }
  }

  .hero-heading {
    position: relative;
    max-width: 360px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0 0;

    .auth-logo {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dark-mode {
        transform: scale(0.6);
        z-index: 2;
        margin-inline-start: 0 !important;
      }

      svg {
        height: 42px;
        width: 42px;
      }

      .top-logo {
        height: 42px;
      }
    }
  }

  .hero {
    &.is-white {
      background: var(--white);
    }

    .hero-body {
      .login {
        padding: 10px 0;
      }

      .auth-content {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        margin-top: -40px;
        margin-bottom: 40px;

        h2 {
          font-size: 2rem;
          font-family: var(--font);
          line-height: 1;
        }

        p {
          font-size: 1rem;
          margin-bottom: 8px;
          color: var(--muted-grey);
        }

        a {
          font-size: 0.9rem;
          font-family: var(--font-alt);
          font-weight: 500;
          color: var(--primary);
        }
      }

      .auth-form-wrapper {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
      }
    }
  }

  .forgot-link {
    margin-top: 10px;

    a {
      font-family: var(--font-alt);
      font-size: 0.9rem;
      color: var(--light-text);
      transition: color 0.3s;

      &:hover,
      &:focus {
        color: var(--primary);
      }
    }
  }

  .setting-item {
    display: flex;
    align-items: center;
    padding: 10px 0;

    .setting-meta {
      font-family: var(--font);
      color: var(--light-text);
      margin-inline-start: 8px;
    }
  }

  .v-button {
    min-height: 44px;
  }
}

.is-dark {
  .auth-wrapper-inner {
    .hero-banner {
      background: var(--dark-sidebar-light-4);
    }

    .hero {
      &.is-white {
        background: var(--dark-sidebar-dark-4);
      }

      .hero-body {
        .auth-content {
          h2 {
            color: var(--dark-dark-text);
          }

          a {
            color: var(--primary);
          }
        }
      }
    }

    .forgot-link {
      a:hover {
        color: var(--primary);
      }
    }
  }
}

.auth-nav {
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .left,
  .right {
    display: flex;
    align-items: center;
    width: 20%;
  }

  .right {
    justify-content: flex-end;

    .dark-mode {
      transform: scale(0.7);
    }
  }

  .center {
    flex-grow: 2;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: block;
        width: 100%;
        max-width: 80px;
      }
    }
  }
}

.auth-wrapper-inner {
  .single-form-wrap {
    min-height: 690px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-wrap {
      width: 100%;
      margin: 6rem auto 0;

      .auth-head {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        margin-top: 6rem;
        margin-bottom: 2rem;
        text-align: center;

        h2 {
          font-size: 2rem;
          font-family: var(--font);
          line-height: 1;
        }

        p {
          font-size: 1rem;
          margin-bottom: 8px;
          color: var(--muted-grey);
        }

        a {
          font-size: 0.9rem;
          font-family: var(--font-alt);
          font-weight: 500;
          color: var(--primary);
        }
      }

      .form-card {
        margin-bottom: 6rem;

        .v-button {
          margin-top: 10px;
        }
      }
    }
  }
}

.is-dark {
  .auth-wrapper-inner {
    &.is-single {
      background: var(--dark-sidebar-light-4);

      .single-form-wrap {
        .inner-wrap {
          .auth-head {
            h2 {
              color: var(--dark-dark-text);
            }

            a {
              color: var(--primary);
            }
          }

          .form-card {
            background: var(--dark-sidebar-dark-4);
            border-color: var(--dark-sidebar-light-1);
          }
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .avatar-carousel {
    &.resized-mobile {
      max-width: 300px;
    }

    .slick-custom {
      display: none !important;
    }

    .image-wrapper img {
      height: auto;
    }
  }

  .auth-wrapper-inner {
    .hero {
      .hero-body {
        .auth-content {
          text-align: center !important;
        }
      }
    }

    .single-form-wrap {
      .inner-wrap {
        .form-card {
          padding: 40px;
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .modern-login {
    .top-logo {
      svg {
        height: 60px;
        width: 60px;
      }
    }

    .dark-mode {
      top: -58px;
      inset-inline-end: 30%;
    }

    .columns {
      display: flex;
      height: 100vh;
    }
  }

  .auth-wrapper-inner {
    .hero {
      .hero-body {
        .auth-content {
          text-align: center !important;
        }
      }
    }
  }

  .signup-columns {
    max-width: 460px;
    margin: 0 auto;
  }
}

.action-page-wrapper {
  &.action-page-v1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 540px;
    min-height: 560px;
    margin: 0 auto;

    .wrapper-inner {
      .action-box {
        @include vuero-s-card;

        padding: 40px;

        .box-content {
          text-align: center;
          font-family: var(--font);

          .v-avatar {
            display: block;
            margin: 0 auto 8px;
          }

          h3 {
            font-family: var(--font-alt);
            font-weight: 600;
            max-width: 320px;
            margin: 0 auto 16px;

            span {
              color: var(--primary);
            }
          }

          .sender-message {
            text-align: inset-inline-start;
            padding: 20px;
            border: 1px solid var(--fade-grey-dark-3);
            max-width: 360px;
            margin: 0 auto;
            border-radius: var(--radius-large);
            box-shadow: var(--light-box-shadow);

            h4 {
              font-family: var(--font-alt);
              font-size: 0.7rem;
              font-weight: 500;
              color: var(--dark-text);
              text-transform: uppercase;
              margin-bottom: 6px;
            }

            p {
              font-size: 0.9rem;
            }
          }

          .people-wrap {
            .people {
              display: flex;
              justify-content: center;
              padding: 16px 0 8px;

              .v-avatar {
                margin: 0 4px;
              }
            }

            .people-text {
              p {
                font-size: 0.9rem;
              }
            }
          }

          .buttons {
            margin: 0 auto;
            display: flex;
            justify-content: center;
            padding-top: 30px;

            .button {
              margin: 0 4px;
              min-width: 150px;
            }
          }
        }
      }
    }
  }
}

.is-dark {
  .action-page-wrapper {
    &.action-page-v1 {
      .wrapper-inner {
        .action-box {
          @include vuero-card--dark;
        }
      }

      .wrapper-outer {
        @include vuero-card--dark;
      }
    }
  }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (width <= 767px) {
  .action-page-wrapper {
    &.action-page-v1 {
      .wrapper-inner {
        .action-box {
          padding: 20px;

          .box-content {
            .buttons {
              .button {
                min-width: 130px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .action-page-wrapper {
    &.action-page-v1 {
      .wrapper-inner {
        .action-box {
          .box-content {
            .buttons {
              .button {
                min-width: 130px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
