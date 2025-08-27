<script setup lang="ts">
import { useDarkmode } from '/@dds/stores/darkmode'
import { useNotyf } from '/@dds/composable/useNotyf'
import KpWallet from '../../component/KpWallet.vue'
import sleep from '/@dds/utils/sleep'

const router = useRouter()
const darkmode = useDarkmode()
const notyf = useNotyf()

const isLoading = ref<boolean>(false)
const isCardFlipped = ref<boolean>(false)

useHead({
  title: 'Create Wallet - Kingdom Planet',
})

const generatePrivateKey = (): string => {
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const walletName = ref<string>('')
const walletAddress = ref<string>('')
const privateKey = ref<string>(generatePrivateKey())

const clickCopy = (): void => {
  navigator.clipboard.writeText(privateKey.value)
  notyf.success('Copied to clipboard')
}

const onSubmit = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    await sleep(500)
    router.push('/app-list')
    notyf.success('Register wallet success!')

    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="register-wrapper-inner is-single">
      <div class="auth-nav">
        <div class="left" />
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

      <div class="single-form-wrap">
        <div class="inner-wrap">
          <div class="auth-head">
            <h2>Create your Wallet</h2>
            <p>We will provide rewards for your activities in KP through this wallet!</p>
          </div>
          <div class="wallet-container">
            <KpWallet
              :color="'cyan'"
              :flipped="isCardFlipped"
              :name="walletName"
              :address="walletAddress"
              :privateKey="privateKey"
              @flip="isCardFlipped = !isCardFlipped"
            />
          </div>
          <div class="form-card">
            <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
              <div class="form-outer">
                <div class="form-header stuck-header">
                  <div class="form-header-inner">
                    <div class="left">
                      <h3>Wallet Info</h3>
                    </div>
                    <div class="right">
                      <div class="buttons">
                        <VButton
                          :loading="isLoading"
                          type="submit"
                          color="primary"
                          raised
                        >
                          Submit
                        </VButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="row">
                    <div class="fieldset">
                      <div class="fieldset-heading">
                        <h4>Wallet Required Info</h4>
                        <p>
                          Please fill in the following information to register your
                          wallet.
                        </p>
                      </div>

                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <VField>
                            <VLabel>Wallet Name</VLabel>
                            <VControl icon="lucide:wallet-cards">
                              <VInput
                                type="text"
                                placeholder=""
                                v-model="walletName"
                                autocomplete="given-name"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <VLabel>Wallet Address</VLabel>
                            <VControl icon="lucide:mailbox">
                              <VInput
                                type="text"
                                placeholder=""
                                v-model="walletAddress"
                                autocomplete="family-name"
                                @input="
                                  (e: Event) =>
                                    (walletAddress = (
                                      e.target as HTMLInputElement
                                    ).value.replace(/\s/g, ''))
                                "
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-12">
                          <VField>
                            <VLabel>Private Key</VLabel>
                            <VControl icon="lucide:key-round">
                              <div class="private-key-container">
                                <VInput
                                  v-model="privateKey"
                                  type="text"
                                  placeholder="Private key will be generated automatically"
                                  inputmode="text"
                                  readonly
                                  disabled
                                />
                                <VButton
                                  type="button"
                                  color="info"
                                  @click="clickCopy"
                                  class="regenerate-btn"
                                  icon="lucide:copy"
                                >
                                  Copy
                                </VButton>
                              </div>
                            </VControl>
                          </VField>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="fieldset">
                      <div class="fieldset-heading">
                        <h4>Optional Info</h4>
                        <p>Tell us about your more information (Optional)</p>
                      </div>

                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <VField>
                            <VLabel>Email</VLabel>
                            <VControl icon="lucide:mail">
                              <VInput
                                type="text"
                                placeholder=""
                                autocomplete="email"
                                inputmode="email"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <VLabel>Email</VLabel>
                            <VControl icon="lucide:mail">
                              <VInput
                                type="text"
                                placeholder=""
                                autocomplete="email"
                                inputmode="email"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-12">
                          <VField>
                            <VLabel>Company Email</VLabel>
                            <VControl icon="feather:mail">
                              <VInput
                                type="email"
                                placeholder=""
                                autocomplete="email"
                                inputmode="email"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-row {
  display: flex;
  flex-direction: row;
  gap: 48px;
  padding: 24px;
  width: 100%;

  .row {
    display: flex;
    flex-direction: column;
    gap: 48px;

    .fieldset {
      .fieldset-heading {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding-bottom: 16px;
      }
    }
    .payment-container-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding-bottom: 16px;

      span {
        cursor: pointer;
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
}
.form-layout {
  max-width: 800px;
  margin: 0 auto;
}
.register-wrapper-inner {
  overflow: hidden !important;
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
    /* margin-top: 10px; */

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
  .register-wrapper-inner {
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

.register-wrapper-inner {
  .single-form-wrap {
    min-height: 690px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-wrap {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
      margin: 6rem auto 0;

      .auth-head {
        max-width: 480px;
        width: 100%;
        margin: 0 auto;
        /* margin-bottom: 2rem; */
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 4px;

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

      .wallet-container {
        display: flex;
        justify-content: center;
        align-items: center;
        .wallet-graphic-container {
          width: 100%;
          max-width: 260px;
        }
      }

      .form-card {
        margin-bottom: 6rem;
      }
    }
  }
}

.is-dark {
  .register-wrapper-inner {
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

  .register-wrapper-inner {
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

  .register-wrapper-inner {
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

// 개인키 컨테이너 스타일
.private-key-container {
  display: flex;
  gap: 12px;
  align-items: center;

  .v-input {
    flex: 1;
  }

  .regenerate-btn {
    padding: 0 12px 0 16px;
    min-height: initial;
  }
}
</style>
