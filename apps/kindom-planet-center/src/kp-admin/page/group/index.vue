<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'
import * as listData from '/@dds/data/layouts/flex-list-v2'
import { VAvatarProps } from '/@src/dds/components/base/avatar/VAvatar.vue'

const router = useRouter()
const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Group')

useHead({
  title: 'Group - App name - KingdomPlanet',
})

export interface ProjectData {
  id: number
  name: string
  customer: string
  duration: string
  picture: string
  industry: string
  status: string
  team: VAvatarProps[]
}

const page = ref(42)
const filters = ref('')

const projects = listData.projects as ProjectData[]
const filteredData = computed(() => {
  if (!filters.value) {
    return projects
  } else {
    const filterRe = new RegExp(filters.value, 'i')
    return projects.filter((item) => {
      return (
        item.name.match(filterRe) ||
        item.customer.match(filterRe) ||
        item.industry.match(filterRe) ||
        item.status.match(filterRe) ||
        item.duration.match(filterRe)
      )
    })
  }
})

const newGroupName = ref<string>('')
const isGroupModalOpen = ref<boolean>(false)

const clickAddGroup = () => {
  isGroupModalOpen.value = true
  console.log('click button')
}

const clickGroupDetail = (groupId: number) => {
  router.push(`/group/${groupId}`)
}

const clickSave = () => {
  isGroupModalOpen.value = false
  router.push('/group')
}
</script>

<template>
  <AdminSideblockLayout theme="curved" open-on-mounted>
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <!-- <TableListV2 /> -->
      <div>
        <div class="datatable-toolbar">
          <VField>
            <VControl icon="feather:search">
              <input
                v-model="filters"
                class="input custom-text-filter"
                placeholder="Search..."
              />
            </VControl>
          </VField>
          <VButtons>
            <VButton color="primary" icon="fas fa-plus" @click="clickAddGroup" elevated>
              New Group
            </VButton>
          </VButtons>
        </div>
        <div class="datatable-wrapper">
          <div class="table-container">
            <table class="table datatable-table is-fullwidth">
              <thead>
                <th>Index</th>
                <th>Group Name</th>
                <th>Group Master</th>
                <th>region</th>
                <th>Status</th>
                <th>Team</th>
              </thead>
              <tbody>
                <tr
                  v-for="project in filteredData"
                  :key="project.id"
                  @click="clickGroupDetail(project.id)"
                  @keydown.enter="clickGroupDetail(project.id)"
                >
                  <td>{{ project.id }}</td>
                  <td>
                    <div class="flex-media">
                      <!--<VAvatar :picture="project.picture" alt="Avatar" />-->
                      <div class="meta">
                        <h3>{{ project.name }}</h3>
                        <span>{{ project.duration }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ project.customer }}</td>
                  <td>{{ project.industry }}</td>
                  <td><VTag :label="project.status" /></td>
                  <td>
                    <div>
                      <VAvatarStack :avatars="project.team" size="small" :limit="3" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <VPlaceholderPage
            v-if="filteredData.length === 0"
            title="We couldn't find any matching results."
            subtitle="Too bad. Looks like we couldn't find any matching results for the search terms
            you've entered. Please try different search terms or criteria."
            larger
          >
            <template #image>
              <img
                class="light-image"
                src="/@dds/assets/illustrations/placeholders/search-7.svg"
                alt=""
              />
              <img
                class="dark-image"
                src="/@dds/assets/illustrations/placeholders/search-7-dark.svg"
                alt=""
              />
            </template>
          </VPlaceholderPage>
        </div>

        <!--Table Pagination-->
        <VFlexPagination
          v-if="filteredData.length > 5"
          v-model:current-page="page"
          :item-per-page="10"
          :total-items="873"
          :max-links-displayed="7"
          no-router
          class="mt-4"
        />
      </div>
    </div>
    <VModal
      title="Create New Group"
      size="large"
      :open="isGroupModalOpen"
      @submit.prevent="isGroupModalOpen = false"
      @close="isGroupModalOpen = false"
    >
      <template #content>
        <div class="modal-form">
          <div class="columns is-multiline">
            <div class="column is-12">
              <VField label="Title">
                <VControl>
                  <VInput
                    v-model="newGroupName"
                    type="text"
                    placeholder="Write Group Name"
                  />
                </VControl>
              </VField>
            </div>
            <div class="column is-6">
              <VField class="is-image-select" label="Country">
                <VControl>
                  <Multiselect
                    placeholder="Select Country"
                    track-by="name"
                    label="name"
                    :search="true"
                    :options="[
                      {
                        value: 'Canada',
                        name: 'Canada',
                        image: '/images/icons/flags/canada.svg',
                      },
                      {
                        value: 'USA',
                        name: 'USA',
                        image: '/images/icons/flags/united-states-of-america.svg',
                      },
                      {
                        value: 'Mexico',
                        name: 'Mexico',
                        image: '/images/icons/flags/mexico.svg',
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
              <VField class="is-image-select" label="City">
                <VControl>
                  <Multiselect
                    placeholder="Select City"
                    track-by="name"
                    label="name"
                    :search="true"
                    :options="[
                      {
                        value: 'San Francisco',
                        name: 'San Francisco',
                        image: '/images/icons/flags/united-states-of-america.svg',
                      },
                      {
                        value: 'New York',
                        name: 'New York',
                        image: '/images/icons/flags/united-states-of-america.svg',
                      },
                      {
                        value: 'California',
                        name: 'California',
                        image: '/images/icons/flags/united-states-of-america.svg',
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
              <VField class="is-image-select" label="Member">
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
              <VField class="is-image-select" label="Type">
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
          </div>
        </div>
      </template>
      <template #action>
        <VButton type="button" color="primary" raised @click="clickSave">
          Submit
        </VButton>
      </template>
    </VModal>
  </AdminSideblockLayout>
</template>

<style lang="scss" scoped>
.is-navbar {
  .datatable-toolbar {
    padding-top: 30px;
  }
}

.datatable-toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  &.is-reversed {
    flex-direction: row-reverse;
  }

  .field {
    margin-bottom: 0;

    .control {
      .button {
        color: var(--light-text);

        &:hover,
        &:focus {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--primary--color-invert);
        }
      }
    }
  }

  .buttons {
    margin-left: auto;
    margin-bottom: 0;

    .v-button {
      margin-bottom: 0;
    }
  }
}

.is-dark {
  .datatable-toolbar {
    .field {
      .control {
        .button {
          background: var(--dark-sidebar) !important;
          color: var(--light-text);

          &:hover,
          &:focus {
            background: var(--primary) !important;
            border-color: var(--primary) !important;
            color: var(--smoke-white) !important;
          }
        }
      }
    }
  }
}

.datatable-wrapper {
  width: 100%;

  .datatable-container {
    background: var(--white);
    border: none !important;
    overflow-x: auto;

    .table,
    table {
      width: 100%;
    }

    &::-webkit-scrollbar {
      height: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px !important;
      background: rgb(0 0 0 / 20%) !important;
    }
  }
}

.datatable-table {
  border: 1px solid var(--fade-grey);
  border-collapse: collapse;
  border-radius: 0.75rem;

  th {
    padding: 16px 20px;
    font-family: var(--font-alt);
    font-size: 0.8rem;
    color: var(--dark-text);
    text-transform: uppercase;
    border: 1px solid var(--fade-grey);
    font-weight: 600;

    // &:last-child {
    //   text-align: right;
    // }
  }

  td {
    font-family: var(--font);
    vertical-align: middle;
    padding: 12px 20px;
    border-bottom: 1px solid var(--fade-grey);

    &:last-child {
      text-align: right;
    }

    &.datatables-empty {
      opacity: 0;
    }
  }

  .light-text {
    color: var(--light-text);
  }

  .flex-media {
    display: flex;
    align-items: center;

    .meta {
      margin-left: 10px;
      line-height: 1.3;

      span {
        display: block;
        font-size: 0.8rem;
        color: var(--light-text);
        font-family: var(--font);

        &:first-child {
          font-family: var(--font-alt);
          color: var(--dark-text);
        }
      }
    }
  }

  .row-action {
    display: flex;
    justify-content: flex-end;
  }

  .checkbox {
    padding: 0;
  }

  .product-photo {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .file-icon {
    width: 46px;
    height: 46px;
    object-fit: contain;
  }

  .drinks-icon {
    display: block;
    max-width: 48px;
    border-radius: var(--radius-rounded);
    border: 1px solid var(--fade-grey);
  }

  .negative-icon,
  .positive-icon {
    svg {
      height: 16px;
      width: 16px;
    }
  }

  .positive-icon {
    .iconify {
      color: var(--success);

      * {
        stroke-width: 4px;
      }
    }
  }

  .negative-icon {
    &.is-danger {
      .iconify {
        color: var(--danger) !important;
      }
    }

    .iconify {
      color: var(--light-text);

      * {
        stroke-width: 4px;
      }
    }
  }

  .price {
    color: var(--dark-text);
    font-weight: 500;

    &::before {
      content: '$';
    }

    &.price-free {
      color: var(--light-text);
    }
  }

  .status {
    display: flex;
    align-items: center;

    &.is-available {
      i {
        color: var(--success);
      }
    }

    &.is-busy {
      i {
        color: var(--danger);
      }
    }

    &.is-offline {
      i {
        color: var(--light-text);
      }
    }

    i {
      margin-right: 8px;
      font-size: 8px;
    }

    span {
      font-family: var(--font);
      font-size: 0.9rem;
      color: var(--light-text);
    }
  }
}

.is-dark {
  .datatable-wrapper {
    .datatable-container {
      border-color: var(--dark-sidebar-light-12);
      background: var(--dark-sidebar-light-6);
    }
  }

  .datatable-table {
    border-color: var(--dark-sidebar-light-12);

    th,
    td {
      border-color: var(--dark-sidebar-light-12);
      color: var(--dark-dark-text);
    }

    .drinks-icon {
      border-color: var(--dark-sidebar-light-12);
    }
  }
}
</style>
