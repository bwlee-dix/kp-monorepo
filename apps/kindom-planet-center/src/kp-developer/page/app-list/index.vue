<script setup lang="ts">
import type { VAvatarProps, VAvatarColor } from '/@dds/components/base/avatar/VAvatar.vue'
import { projects } from '/@dds/data/layouts/card-grid-v3'

import { useDarkmode } from '/@dds/stores/darkmode'
import sleep from '/@dds/utils/sleep'

const isLoading = ref(false)
const darkmode = useDarkmode()
const router = useRouter()

useHead({
  title: 'Register Developer - Kingdom Planet',
})

const isBigFormOpen = ref(false)
const filters = ref('')
const isB2C = ref(true)
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
  isLoading.value = true

  await sleep(1000)

  router.push('/app')
  isLoading.value = false
}
const clickApp = (id: string) => {
  router.push('/dashboard')
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

      <!--Single Centered Form-->
      <div class="page-content-inner">
        <div class="card-grid-toolbar">
          <VControl icon="feather:search">
            <input
              v-model="filters"
              class="input custom-text-filter"
              placeholder="Search..."
            />
          </VControl>

          <div class="buttons">
            <VButton color="primary" raised @click="isBigFormOpen = true">
              <span class="icon">
                <i aria-hidden="true" class="fas fa-plus" />
              </span>
              <span>New App</span>
            </VButton>
          </div>
        </div>

        <div class="card-grid card-grid-v3">
          <!--List Empty Search Placeholder -->
          <VPlaceholderPage
            :class="[filteredData.length !== 0 && 'is-hidden']"
            title="We couldn't find any matching results."
            subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
            larger
          >
            <template #image>
              <img
                class="light-image"
                src="/@dds/sets/illustrations/placeholders/search-3.svg"
                alt=""
              />
              <img
                class="dark-image"
                src="/@dds/sets/illustrations/placeholders/search-3-dark.svg"
                alt=""
              />
            </template>
          </VPlaceholderPage>

          <!--Card Grid v3-->
          <TransitionGroup
            name="list"
            tag="div"
            class="columns is-multiline is-flex-tablet-p is-half-tablet-p"
          >
            <!--Grid Item-->
            <div v-for="item in filteredData" :key="item.id" class="column is-4 app">
              <div
                class="card-grid-item"
                tabindex="0"
                role="button"
                @click="clickApp(item.id)"
                @keydown.enter="clickApp(item.id)"
              >
                <label v-if="item.lockable" class="h-toggle">
                  <input type="checkbox" :checked="item.locked" />
                  <span class="toggler">
                    <span class="active">
                      <i aria-hidden="true" class="iconify" data-icon="feather:lock" />
                    </span>
                    <span class="inactive">
                      <i aria-hidden="true" class="iconify" data-icon="feather:check" />
                    </span>
                  </span>
                </label>

                <img style="width: 140px" :src="item.image" alt="" />
                <h3 class="dark-inverted">
                  {{ item.name }}
                </h3>
                <div class="description">
                  <p>{{ item.description }}</p>
                </div>
                <div class="people">
                  <VAvatar
                    v-for="user in item.team"
                    :key="user.id"
                    size="small"
                    v-bind="getAvatarData(user)"
                  />
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <VModal
      is="form"
      :open="isBigFormOpen"
      size="large"
      title="Create App"
      actions="right"
      @submit.prevent="isBigFormOpen = false"
      @close="isBigFormOpen = false"
    >
      <template #content>
        <div class="modal-form">
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField label="App Name *">
                <VControl>
                  <VInput type="text" placeholder="Ex: A cool project" />
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
              <VField class="is-image-select" label="App Member">
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
                        <img class="select-label-icon" :src="value.image" alt="" />
                        {{ value.name }}
                      </div>
                    </template>
                    <template #option="{ option }">
                      <img class="select-option-icon" :src="option.image" alt="" />
                      {{ option.name }}
                    </template>
                  </Multiselect>
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField class="is-image-select" label="App Type *">
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
                        <img class="select-label-icon" :src="value.image" alt="" />
                        {{ value.name }}
                      </div>
                    </template>
                    <template #option="{ option }">
                      <img class="select-option-icon" :src="option.image" alt="" />
                      {{ option.name }}
                    </template>
                  </Multiselect>
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField label="Project Budget *">
                <VControl>
                  <VInput type="text" placeholder="Ex: $3,500" />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField label="Project URL *">
                <VControl>
                  <VInput
                    type="text"
                    class="VInput"
                    placeholder="Ex: https://project.com"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-12">
              <VField label="Description *">
                <VControl>
                  <VTextarea rows="3" placeholder="Details about the project..." />
                </VControl>
              </VField>
            </div>
          </div>
        </div>
      </template>
      <template #action>
        <VButton
          type="button"
          color="primary"
          raised
          :loading="isLoading"
          @click="clickNewAppSubmit"
        >
          Submit
        </VButton>
      </template>
    </VModal>
  </div>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

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
</style>
