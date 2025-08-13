<script setup lang="ts">
import type { VAvatarProps, VAvatarColor } from '/@src/components/base/avatar/VAvatar.vue'
import { projects } from '/@src/data/layouts/card-grid-v3'


import { useDarkmode } from '/@src/stores/darkmode'
import sleep from '/@src/utils/sleep'


import { popovers } from '/@src/data/users/userPopovers'

const selectedColor = ref('')
const calendarTarget = ref('')
const notificationMedium = ref('')
const notificationTarget = ref('')

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})


const onSubmit = () => {
  console.log('Form submitted!')
}
const isLoading = ref(false)
const darkmode = useDarkmode()
const router = useRouter()

useHead({
  title: 'Register Developer - Kingdom Planet',
})


const isBigFormOpen = ref(false)
const filters = ref('')
const isB2C = ref(true);
const filteredData = computed(() => {
  if (!filters.value) {
    return projects
  } else {
    return projects.filter((item) => {
      return (
        item.name.match(new RegExp(filters.value, 'i')) ||
        item.remaining.match(new RegExp(filters.value, 'i'))
      )
    })
  }
})

const valueSingle = ref(0)
const optionsSingle = [
  'All Projects',
  'Web Apps',
  'Mobile Apps',
  'Dashboards',
  'Landing Pages',
]

function getAvatarData(user: any): VAvatarProps {
  return {
    picture: user?.picture,
    initials: user?.initials,
    color: user?.color as VAvatarColor,
  }
}

const clickNewAppSubmit = async () => {
    isLoading.value = true;

    await sleep(1000)

    router.push("/app")
    isLoading.value = false;


}
const  clickApp =(id: string) =>{
  router.push("/dashboard")
}
const clickWebBuilder = () => {
    router.push("/builder")

}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-wrapper-inner is-single">
      <!--Fake navigation-->
      <div class="auth-nav">
        <div class="left" />
        <div class="center">
          <RouterLink
            to="/"
            class="header-item"
          >
            <AnimatedLogo
              width="38px"
              height="38px"
            />
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
            >
            <span />
          </label>
        </div>
      </div>

      <!--Single Centered Form-->
      <div class="page-content-inner">
        <form
          method="post"
          novalidate
          class="form-layout is-stacked"
          @submit.prevent="onSubmit"
        >
          <div class="form-outer">
            <div
              :class="[isStuck && 'is-stuck']"
              class="form-header stuck-header"
            >
              <div class="form-header-inner">
                <div class="left">
                  <h3>Input Service Info</h3>
                </div>
                <div class="right">
                  <div class="buttons">
                    <VButton
                      type="submit"
                      color="primary"
                      raised
                    >
                      Schedule
                    </VButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-body">
              <div class="form-section">
                <div class="columns is-multiline">
                  <div class="column is-12">
                    <VField label="App Name *">
                      <VControl>
                        <VInput
                          type="text"
                          placeholder="Ex: A cool project"
                        />
                      </VControl>
                    </VField>
                  </div>

                  <div class="column is-12">
                    <VField label="App Name *">
                      <VControl>
                        <VRadio
                          v-model="isB2C"
                          value="true"
                          label="B2C"
                          name="solid_squared_radio"
                          color="primary"
                          square
                          solid
                        />

                        <VRadio
                          v-model="isB2C"
                          value="false"
                          label="B2B"
                          name="solid_squared_radio"
                          color="primary"
                          square
                          solid
                        />
                      </VControl>
                    </VField>
                  </div>
                  <div class="column is-6">
                    <VField
                      class="is-image-select"
                      label="App Member"
                    >
                      <VControl>
                        <Multiselect
                          placeholder="Select employees"
                          track-by="name"
                          label="name"
                          :search="true"
                          :options="[
                            {
                              value: 'alice',
                              name: 'Alice Carasca',
                              image: '/demo/avatars/7.jpg',
                            },
                            {
                              value: 'erik',
                              name: 'Erik Kovalsky',
                              image: '/images/avatars/svg/vuero-1.svg',
                            },
                            {
                              value: 'melany',
                              name: 'melany Wallace',
                              image: '/demo/avatars/25.jpg',
                            },
                            {
                              value: 'tara',
                              name: 'Tara Svenson',
                              image: '/demo/avatars/13.jpg',
                            },
                            {
                              value: 'mary',
                              name: 'Mary Lebowski',
                              image: '/demo/avatars/5.jpg',
                            },
                            {
                              value: 'irina',
                              name: 'Irina Vierbovsky',
                              image: '/demo/avatars/23.jpg',
                            },
                            {
                              value: 'jonathan',
                              name: 'Jonathan Krugger',
                              image: '/demo/avatars/32.jpg',
                            },
                          ]"
                          :max-height="145"
                        >
                          <template #singlelabel="{ value }">
                            <div class="multiselect-single-label">
                              <img
                                class="select-label-icon"
                                :src="value.image"
                                alt=""
                              >
                              {{ value.name }}
                            </div>
                          </template>
                          <template #option="{ option }">
                            <img
                              class="select-option-icon"
                              :src="option.image"
                              alt=""
                            >
                            {{ option.name }}
                          </template>
                        </Multiselect>
                      </VControl>
                    </VField>
                  </div>
                  <div class="column is-6">
                    <VField
                      class="is-image-select"
                      label="App Type *"
                    >
                      <VControl>
                        <Multiselect
                          placeholder="Select language"
                          track-by="name"
                          label="name"
                          :search="true"
                          :options="[
                            {
                              value: 'javascript',
                              name: 'Javascript',
                              image: '/images/icons/stacks/js.svg',
                            },
                            {
                              value: 'reactjs',
                              name: 'ReactJS',
                              image: '/images/icons/stacks/reactjs.svg',
                            },
                            {
                              value: 'vuejs',
                              name: 'VueJS',
                              image: '/images/icons/stacks/vuejs.svg',
                            },
                          ]"
                          :max-height="145"
                        >
                          <template #singlelabel="{ value }">
                            <div class="multiselect-single-label">
                              <img
                                class="select-label-icon"
                                :src="value.image"
                                alt=""
                              >
                              {{ value.name }}
                            </div>
                          </template>
                          <template #option="{ option }">
                            <img
                              class="select-option-icon"
                              :src="option.image"
                              alt=""
                            >
                            {{ option.name }}
                          </template>
                        </Multiselect>
                      </VControl>
                    </VField>
                  </div>
                </div>
              </div>
              <div class="form-section is-grey">
                <div class="form-section-header">
                  <div class="left">
                    <h3>Field Detail</h3>
                  </div>
                  <div class="right">
                    <VButton
                      dark-outlined
                      color="danger"
                    >
                      Delete
                    </VButton>
                  </div>
                </div>

                <div class="form-section-inner is-horizontal">
                  <VField
                    horizontal
                    label="Name"
                  >
                    <VControl
                      icon="feather:map-pin"
                      fullwidth
                    >
                      <VInput
                        type="text"
                        placeholder="e.g. Conference room"
                      />
                    </VControl>
                  </VField>
                  <VField
                    horizontal
                    label="Description"
                  >
                    <VControl fullwidth>
                      <VTextarea
                        class="textarea"
                        rows="4"
                        placeholder="Tell us about any details you'd like us to know..."
                        autocomplete="off"
                        autocapitalize="off"
                        spellcheck="true"
                      />
                    </VControl>
                  </VField>
                  <VField
                    v-slot="{ id }"
                    horizontal
                    label="Type"
                  >
                    <VControl fullwidth>
                      <Multiselect
                        v-model="calendarTarget"
                        :attrs="{ id }"
                        placeholder="Pick a field type"
                        :options="['Text', 'Number', 'Date', 'Address', 'Radio', 'Multi-Select']"
                      />
                    </VControl>
                  </VField>

                  <VField
                    horizontal
                    label="Meeting URL"
                  >
                    <VControl
                      icon="feather:map-pin"
                      fullwidth
                    >
                      <VInput
                        type="url"
                        placeholder="https://zoom.com/m/156546"
                        inputmode="url"
                      />
                    </VControl>
                  </VField>
                  <VField
                    v-slot="{ id }"
                    horizontal
                    label="Clendar"
                  >
                    <VControl fullwidth>
                      <Multiselect
                        v-model="calendarTarget"
                        :attrs="{ id }"
                        placeholder="Pick a calendar"
                        :options="['My Calendar', 'Team Calendar', 'Company Calendar']"
                      />
                    </VControl>
                  </VField>

                  <VField
                    horizontal
                    label="Description"
                  >
                    <VControl fullwidth>
                      <VTextarea
                        class="textarea"
                        rows="4"
                        placeholder="Tell us about any details you'd like us to know..."
                        autocomplete="off"
                        autocapitalize="off"
                        spellcheck="true"
                      />
                      <a class="add-link">Add Attachments</a>
                    </VControl>
                  </VField>
                </div>
              </div>

              <div class="form-section is-grey">
                <div class="form-section-header">
                  <div class="left">
                    <h3>Meeting details</h3>
                  </div>
                  <div class="right">
                    <VButton dark-outlined>
                      Add People
                    </VButton>
                  </div>
                </div>

                <div class="form-section-inner is-horizontal">
                  <VField
                    v-slot="{ id }"
                    horizontal
                    label="Participants"
                  >
                    <VControl>
                      <div class="participants">
                        <div>
                          <Tippy
                            class="has-help-cursor"
                            interactive
                            placement="top-start"
                          >
                            <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
                            <template #content>
                              <UserPopoverContent :user="popovers.user8" />
                            </template>
                          </Tippy>
                        </div>

                        <div>
                          <Tippy
                            class="has-help-cursor"
                            interactive
                            placement="top-start"
                          >
                            <VAvatar
                              color="warning"
                              initials="BT"
                            />
                            <template #content>
                              <UserPopoverContent :user="popovers.user122" />
                            </template>
                          </Tippy>
                        </div>

                        <div>
                          <Tippy
                            class="has-help-cursor"
                            interactive
                            placement="top-start"
                          >
                            <VAvatar picture="/demo/avatars/18.jpg" />
                            <template #content>
                              <UserPopoverContent :user="popovers.user18" />
                            </template>
                          </Tippy>
                        </div>

                        <div>
                          <Tippy
                            class="has-help-cursor"
                            interactive
                            placement="top-start"
                          >
                            <VAvatar
                              color="info"
                              initials="JD"
                            />
                            <template #content>
                              <UserPopoverContent :user="popovers.user123" />
                            </template>
                          </Tippy>
                        </div>

                        <div>
                          <Tippy
                            class="has-help-cursor"
                            interactive
                            placement="top-start"
                          >
                            <VAvatar picture="/demo/avatars/7.jpg" />
                            <template #content>
                              <UserPopoverContent :user="popovers.user7" />
                            </template>
                          </Tippy>
                        </div>

                        <button
                          :id="id"
                          type="button"
                          class="add-participant"
                        >
                          <i
                            aria-hidden="true"
                            class="iconify"
                            data-icon="feather:plus"
                          />
                        </button>
                      </div>
                    </VControl>
                  </VField>

                  <VField
                    horizontal
                    label="Where"
                  >
                    <VControl
                      icon="feather:map-pin"
                      fullwidth
                    >
                      <VInput
                        type="text"
                        placeholder="e.g. Conference room"
                      />
                    </VControl>
                  </VField>
                  <VField
                    horizontal
                    label="Meeting URL"
                  >
                    <VControl
                      icon="feather:map-pin"
                      fullwidth
                    >
                      <VInput
                        type="url"
                        placeholder="https://zoom.com/m/156546"
                        inputmode="url"
                      />
                    </VControl>
                  </VField>
                  <VField
                    v-slot="{ id }"
                    horizontal
                    label="Clendar"
                  >
                    <VControl fullwidth>
                      <Multiselect
                        v-model="calendarTarget"
                        :attrs="{ id }"
                        placeholder="Pick a calendar"
                        :options="['My Calendar', 'Team Calendar', 'Company Calendar']"
                      />
                    </VControl>
                  </VField>

                  <VField
                    horizontal
                    label="Description"
                  >
                    <VControl fullwidth>
                      <VTextarea
                        class="textarea"
                        rows="4"
                        placeholder="Tell us about any details you'd like us to know..."
                        autocomplete="off"
                        autocapitalize="off"
                        spellcheck="true"
                      />
                      <a class="add-link">Add Attachments</a>
                    </VControl>
                  </VField>
                </div>
              </div>

              <div class="form-section is-grey">
                <div class="form-section-inner is-horizontal">
                  <VField
                    horizontal
                    label="Color Code"
                  >
                    <VControl fullwidth>
                      <div class="color-codes">
                        <div
                          :class="[selectedColor === 'primary' && 'is-active']"
                          tabindex="0"
                          role="button"
                          class="color-code is-primary"
                          @click="selectedColor = 'primary'"
                          @keydown.space.prevent="selectedColor = 'primary'"
                        />
                        <div
                          :class="[selectedColor === 'secondary' && 'is-active']"
                          tabindex="0"
                          role="button"
                          class="color-code is-secondary"
                          @click="selectedColor = 'secondary'"
                          @keydown.space.prevent="selectedColor = 'secondary'"
                        />
                        <div
                          :class="[selectedColor === 'info' && 'is-active']"
                          tabindex="0"
                          role="button"
                          class="color-code is-info"
                          @click="selectedColor = 'info'"
                          @keydown.space.prevent="selectedColor = 'info'"
                        />
                        <div
                          :class="[selectedColor === 'success' && 'is-active']"
                          tabindex="0"
                          role="button"
                          class="color-code is-success"
                          @click="selectedColor = 'success'"
                          @keydown.space.prevent="selectedColor = 'success'"
                        />
                        <div
                          :class="[selectedColor === 'purple' && 'is-active']"
                          tabindex="0"
                          role="button"
                          class="color-code is-purple"
                          @click="selectedColor = 'purple'"
                          @keydown.space.prevent="selectedColor = 'purple'"
                        />
                      </div>
                    </VControl>
                  </VField>

                  <VField
                    horizontal
                    label="Notifications"
                  >
                    <VField v-slot="{ id }">
                      <VControl>
                        <Multiselect
                          v-model="notificationMedium"
                          :attrs="{ id }"
                          placeholder="Select a channel"
                          :options="['Email', 'SMS', 'Slack', 'Project Board']"
                        />
                        <a class="add-link">Add Notification</a>
                      </VControl>
                    </VField>
                    <VField
                      v-slot="{ id }"
                      subcontrol
                    >
                      <VControl class="is-image-select">
                        <Multiselect
                          v-model="notificationTarget"
                          :attrs="{ id }"
                          placeholder="Select a target"
                          label="name"
                          value="name"
                          :options="[
                            {
                              name: 'All',
                              value: '',
                              icon: '/images/avatars/placeholder.jpg',
                            },
                            {
                              name: 'Erik K.',
                              value: 'eric',
                              icon: '/images/avatars/svg/vuero-1.svg',
                            },
                            {
                              name: 'Joshua S.',
                              value: 'joshua',
                              icon: '/demo/avatars/12.jpg',
                            },
                            {
                              name: 'Melany W.',
                              value: 'melany',
                              icon: '/demo/avatars/25.jpg',
                            },
                            {
                              name: 'Alice C.',
                              value: 'alice',
                              icon: '/demo/avatars/7.jpg',
                            },
                            {
                              name: 'Esteban C.',
                              value: 'esteban',
                              icon: '/demo/avatars/18.jpg',
                            },
                          ]"
                        >
                          <template #singlelabel="{ value }">
                            <div class="multiselect-single-label">
                              <img
                                class="select-label-icon"
                                :src="value.icon"
                                alt=""
                              >
                              <span class="select-label-text">
                                {{ value.name }}
                              </span>
                            </div>
                          </template>
                          <template #option="{ option }">
                            <img
                              class="select-option-icon"
                              :src="option.icon"
                              alt=""
                            >
                            <span class="select-label-text">
                              {{ option.name }}
                            </span>
                          </template>
                        </Multiselect>
                      </VControl>
                    </VField>
                  </VField>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@src/scss/abstracts/all';
@import '/@src/scss/components/forms-outer';

.form-layout {
  max-width: 740px;
  margin: 0 auto;
}
.auth-wrapper-inner {
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


.card-grid {
  .columns {
    margin-inline-start: -0.5rem !important;
    margin-inline-end: -0.5rem !important;
    margin-top: -0.5rem !important;

  }

  .column {
    padding: 0.5rem !important;

    &.app {
      cursor: pointer;
    }
  }
}

.card-grid-v3 {
  .card-grid-item {
    @include vuero-s-card;

    position: relative;
    text-align: center;
    padding: 30px;

    .h-toggle {
      position: absolute;
      top: 28px;
      inset-inline-end: 10px;
      transform: scale(0.85);
    }

    > .v-avatar {
      display: block;
      margin: 0 auto 10px;
      border-radius: 16px;

      .avatar {
        object-fit: cover;
        border: 1px solid var(--fade-grey-dark-4);
        box-shadow: var(--light-box-shadow);
      }

      .badge {
        bottom: 22px;
        inset-inline-end: -12px;
      }
    }

    > h3 {
      font-size: 1.1rem;
      font-weight: 600;
      font-family: var(--font-alt);
      color: var(--dark-text);
    }

    > p {
      font-size: 0.9rem;
    }

    .description {
      padding: 12px 0;
    }

    .people {
      display: flex;
      justify-content: center;
      padding: 8px 0 30px;

      .v-avatar {
        margin: 0 4px;
      }
    }

    .buttons {
      display: flex;
      justify-content: space-between;

      .button {
        width: calc(50% - 4px);
        color: var(--light-text);

        &:hover,
        &:focus {
          border-color: var(--fade-grey-dark-4);
          color: var(--primary);
          box-shadow: var(--light-box-shadow);
        }
      }
    }
  }
}

.is-dark {
  .card-grid-v3 {
    .card-grid-item {
      @include vuero-card--dark;
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
  .card-grid-v3 .card-grid-item > h3 {
    font-size: 1rem;
  }
}
.page-content-inner {
  margin: 6rem 4rem;
}

.is-navbar {
  .form-layout {
    margin-top: 30px;
  }
}

.form-layout {
  max-width: 740px;
  margin: 0 auto;

  &.is-stacked {
    .form-outer {
      .form-body {
        padding: 0;

        .form-section {
          padding: 40px;
          border-bottom: 1px solid var(--fade-grey-dark-4);

          &.is-grey {
            background: #fafafa;
          }

          .form-section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--fade-grey-dark-4);
            padding-bottom: 20px;
            margin-bottom: 30px;

            .left {
              h3 {
                font-family: var(--font-alt);
                font-weight: 600;
                color: var(--dark-text);
              }
            }
          }

          .form-section-inner {
            &.is-horizontal {
              max-width: 540px;
            }

            .field {
              &.is-horizontal {
                .field-label {
                  padding-top: 0.75em;
                }
              }
            }
          }

          .columns {
            .column {
              padding-top: 0.5rem;
              padding-bottom: 0.5rem;
            }
          }

          .field {
            .control {
              .checkbox {
                padding: 0;
                padding-inline-end: 10px;
                font-size: 0.9rem;
              }
            }
          }

          .participants {
            display: flex;
            padding-bottom: 10px;

            .v-avatar {
              margin-inline-end: 8px;
            }

            .add-participant {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 40px;
              width: 40px;
              min-width: 40px;
              border-radius: var(--radius-rounded);
              border: 1.6px dashed var(--light-text);
              color: var(--light-text);
              padding: 0;
              background: none;
              margin-inline-start: 4px;
              cursor: pointer;
              transition:
                color 0.3s,
                background-color 0.3s,
                border-color 0.3s,
                height 0.3s,
                width 0.3s;

              &:hover,
              &:focus {
                border: 1.6px solid var(--primary);
                color: var(--primary);
              }

              &:focus-visible {
                outline-offset: var(--accessibility-focus-outline-offset);
                outline-width: var(--accessibility-focus-outline-width);
                outline-style: var(--accessibility-focus-outline-style);
                outline-color: var(--accessibility-focus-outline-color);
              }

              svg {
                height: 16px;
                width: 16px;
              }
            }
          }

          .color-codes {
            display: flex;
            align-items: center;
            height: 38px;

            .color-code {
              height: 14px;
              width: 14px;
              border-radius: var(--radius-rounded);
              background: var(--white);
              margin-inline-end: 10px;
              border: 3px solid var(--light-text);
              cursor: pointer;
              opacity: 0.6;
              transition:
                color 0.3s,
                background-color 0.3s,
                border-color 0.3s,
                height 0.3s,
                width 0.3s;

              &:hover,
              &:focus {
                opacity: 1;
              }

              &:focus-visible {
                outline-offset: var(--accessibility-focus-outline-offset);
                outline-width: var(--accessibility-focus-outline-width);
                outline-style: var(--accessibility-focus-outline-style);
                outline-color: var(--accessibility-focus-outline-color);
              }

              &.is-primary {
                border-color: var(--primary);

                &.is-active {
                  background: var(--primary);
                }
              }

              &.is-secondary {
                border-color: var(--secondary);

                &.is-active {
                  background: var(--secondary);
                }
              }

              &.is-info {
                border-color: var(--info);

                &.is-active {
                  background: var(--info);
                }
              }

              &.is-success {
                border-color: var(--success);

                &.is-active {
                  background: var(--success);
                }
              }

              &.is-purple {
                border-color: var(--purple);

                &.is-active {
                  background: var(--purple);
                }
              }
            }
          }

          .add-link {
            display: inline-block;
            padding: 4px 0;
            font-family: var(--font);
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--primary);
          }
        }
      }
    }
  }
}

.is-dark {
  .form-layout {
    &.is-stacked {
      .form-outer {
        .form-body {
          .form-section {
            border-color: var(--dark-sidebar-light-12);

            &.is-grey {
              background: var(--dark-sidebar-light-4);
            }

            .form-section-header {
              border-color: var(--dark-sidebar-light-12);

              .left {
                h3 {
                  color: var(--dark-dark-text);
                }
              }
            }

            .form-section-inner {
              .add-link {
                color: var(--primary);
              }

              .color-codes {
                .color-code {
                  background: var(--dark-sidebar-light-6);

                  &.is-primary {
                    border-color: var(--primary);
                  }
                }
              }

              .participants {
                .add-participant {
                  &:hover {
                    border: 1.6px solid var(--primary);
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

@media only screen and (width <= 767px) {
  .form-layout {
    &.is-stacked {
      .form-outer {
        .form-body {
          .is-vhidden {
            display: none !important;
          }
        }
      }

      .v-calendar-combo {
        margin: 0 !important;

        .column {
          padding-top: 0 !important;
          padding-bottom: 0 !important;

          &:first-child {
            padding-inline-start: 0 !important;
          }

          &:last-child {
            padding-inline-end: 0 !important;
          }
        }
      }
    }
  }
}
</style>
