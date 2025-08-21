<script setup lang="ts">
import { useDarkmode } from '/@dds/stores/darkmode'
import sleep from '/@dds/utils/sleep'

const isLoading = ref<boolean>(false)
const darkmode = useDarkmode()
const router = useRouter()
import { useCreditcardMask } from '/@dds/composable/useCreditcardMask'
import { useNotyf } from '/@dds/composable/useNotyf'

const notyf = useNotyf()

const {
  creditcardIcon,
  creditcardLogo,
  creditcardColor,
  creditcardMaskCVC,
  creditcardMaskDate,
  creditcardMaskNumber,
  creditcardMaskNumberOnAccept,
} = useCreditcardMask()

const isCardFlipped = ref(false)
const creditcardInput = reactive({
  number: '',
  name: '',
  cvc: '',
  expiry: '',
})

const testCards = [
  '4000056655665556',
  '5200828282828210',
  '371449635398431',
  '6011000990139424',
  '30569309025904',
  '3566002020360505',
  '6200000000000005',
  '6759649826438453',
]
const randomCard = () => {
  const randomNumber = Math.floor(Math.random() * testCards.length)
  if (creditcardInput.number.replace(/\s/g, '') !== testCards[randomNumber]) {
    creditcardInput.number = testCards[randomNumber]
  }
}
useHead({
  title: 'Register Developer - Kingdom Planet',
})

const companySize = ref<string>('')
const businessType = ref<string>('')

const onSubmit = async () => {
  if (!isLoading.value) {
    isLoading.value = true
    await sleep(500)
    router.push('/register-wallet')
    notyf.success('Register developer success!')

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
            <h2>Hello Developer.</h2>
            <p>Please register your developer account</p>
          </div>

          <div class="form-card">
            <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
              <div class="form-outer">
                <div class="form-header stuck-header">
                  <div class="form-header-inner">
                    <div class="left">
                      <h3>Register developer</h3>
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
                        <h4>Personal Info</h4>
                        <p>This helps us to know you</p>
                      </div>

                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <VField>
                            <VLabel>First Name</VLabel>
                            <VControl icon="feather:user">
                              <VInput
                                type="text"
                                placeholder=""
                                autocomplete="given-name"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <VLabel>Last Name</VLabel>
                            <VControl icon="feather:user">
                              <VInput
                                type="text"
                                placeholder=""
                                autocomplete="family-name"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-12">
                          <VField>
                            <VLabel>Email Address</VLabel>
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
                    </div>
                    <div class="fieldset">
                      <div class="fieldset-heading">
                        <h4>Company Info</h4>
                        <p>Tell us about your company</p>
                      </div>

                      <div class="columns is-multiline">
                        <div class="column is-6">
                          <VField>
                            <VLabel>Company Name</VLabel>
                            <VControl icon="feather:briefcase">
                              <VInput
                                type="text"
                                placeholder=""
                                autocomplete="organization"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField>
                            <VLabel>Company Phone</VLabel>
                            <VControl icon="feather:phone">
                              <VInput
                                type="tel"
                                placeholder=""
                                autocomplete="tel"
                                inputmode="tel"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField v-slot="{ id }">
                            <VLabel>Company Size</VLabel>
                            <VControl>
                              <Multiselect
                                v-model="companySize"
                                :attrs="{ id }"
                                placeholder="Select a size"
                                :options="[
                                  '1-5 Employees',
                                  '5-25 Employees',
                                  '25-50 Employees',
                                  '50-100 Employees',
                                  '100+ Employees',
                                ]"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField v-slot="{ id }">
                            <VLabel>Business Type</VLabel>
                            <VControl>
                              <Multiselect
                                v-model="businessType"
                                :attrs="{ id }"
                                placeholder="Select a type"
                                :options="[
                                  'Government',
                                  'Medical',
                                  'Finance',
                                  'Services',
                                  'Technology',
                                ]"
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
                    </div>
                  </div>
                  <div class="row">
                    <div class="payment-container-title">
                      <h3>Payment information</h3>
                    </div>

                    <VCreditCard
                      :color="'orange'"
                      :flipped="isCardFlipped"
                      :name="creditcardInput.name"
                      :number="creditcardInput.number"
                      :cvc="creditcardInput.cvc"
                      :expiry="creditcardInput.expiry"
                      @flip="isCardFlipped = !isCardFlipped"
                    >
                      <div v-if="creditcardLogo" id="ccsingle" v-html="creditcardLogo" />
                    </VCreditCard>

                    <div class="form-container">
                      <div class="columns is-multiline">
                        <div class="column is-12">
                          <VField id="name" label="Name">
                            <VControl>
                              <VInput
                                v-model="creditcardInput.name"
                                autocomplete="cc-given-name"
                                maxlength="20"
                                type="text"
                                placeholder="The name on the card"
                                @focus="isCardFlipped = false"
                              />
                              <VField id="cardnumber" v-slot="{ id }" label="Card Number">
                                <VControl>
                                  <VIMaskInput
                                    :id="id"
                                    v-model="creditcardInput.number"
                                    class="input"
                                    autocomplete="cc-number"
                                    :options="creditcardMaskNumber"
                                    placeholder="Credit card number"
                                    @focus="isCardFlipped = false"
                                    @accept="creditcardMaskNumberOnAccept"
                                  />
                                  <div
                                    id="creditcardIcon"
                                    class="creditcardIcon"
                                    v-html="creditcardIcon"
                                  />
                                </VControl>
                              </VField>
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-12"></div>
                        <div class="column is-6">
                          <VField id="expirationdate" v-slot="{ id }" label="Expiration">
                            <VControl>
                              <VIMaskInput
                                :id="id"
                                v-model="creditcardInput.expiry"
                                autocomplete="cc-exp"
                                class="input"
                                :options="creditcardMaskDate"
                                placeholder="MM / YY"
                                @focus="isCardFlipped = false"
                              />
                            </VControl>
                          </VField>
                        </div>
                        <div class="column is-6">
                          <VField id="securitycode" v-slot="{ id }" label="CVC">
                            <VControl>
                              <VIMaskInput
                                :id="id"
                                v-model="creditcardInput.cvc"
                                autocomplete="cc-csc"
                                class="input"
                                :options="creditcardMaskCVC"
                                placeholder="3 digits code"
                                @focus="isCardFlipped = true"
                              />
                            </VControl>
                          </VField>
                        </div>
                      </div>
                    </div>
                    <div class="payment-form"></div>
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
    gap: 24px;

    .fieldset {
      .fieldset-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
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
  max-width: 1200px;
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
      width: 100%;
      margin: 6rem auto 0;

      .auth-head {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
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
</style>
