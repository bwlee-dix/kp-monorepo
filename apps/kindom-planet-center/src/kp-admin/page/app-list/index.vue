<script setup lang="ts">
import type { VAvatarProps, VAvatarColor } from '/@dds/components/base/avatar/VAvatar.vue'
import { projects } from '/@dds/data/layouts/card-grid-v3'

const router = useRouter()

useHead({
  title: 'App List - Admin - Kingdom Planet',
})

const filters = ref<string>('')

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

const clickApp = (id: string) => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="page-content-inner">
    <div class="card-grid-toolbar">Select your project</div>

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
            src="/@dds/assets/illustrations/placeholders/search-3.svg"
            alt=""
          />
          <img
            class="dark-image"
            src="/@dds/assets/illustrations/placeholders/search-3-dark.svg"
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

.card-grid-toolbar {
  padding-left: 10px;
  font-size: large;
  font-weight: 600;
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
