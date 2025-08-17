<script setup lang="ts">
import type { VAvatarProps, VAvatarColor } from '/@dds/components/base/avatar/VAvatar.vue'
import { projects } from '/@dds/data/layouts/card-grid-v3'

import sleep from '/@dds/utils/sleep'

const isLoading = ref<boolean>(false)
const router = useRouter()

useHead({
  title: 'Register Developer - Kingdom Planet',
})

const isBigFormOpen = ref<boolean>(false)
const filters = ref<string>('')
const isB2C = ref<boolean>(true)
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
  router.push('/body/dashboard')
}
</script>

<template>
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

      <TransitionGroup
        name="list"
        tag="div"
        class="columns is-multiline is-flex-tablet-p is-half-tablet-p"
      >
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
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.page-content-inner {
  padding: 6rem 4rem;
}

.form-layout {
  max-width: 740px;
  margin: 0 auto;
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
</style>
