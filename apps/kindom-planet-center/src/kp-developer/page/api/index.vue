<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('API')


const kpApiList = [
  {
    id: "post-admin/auth/verify-token",
    method: "post",
    url: "/admin/auth/verify-token",
    title: "Verify User Token",
  },
  {
    id: "post-admin/auth/members",
    method: "post",
    url: "/admin/auth/members",
    title: "Add User",
  },
  {
    id: "get-admin/auth/members/{uid}",
    method: "get",
    url: "/admin/auth/members/{uid}",
    title: "Get User Infomation",
  },
  {
    id: "get-admin/app-tokens",
    method: "get",
    url: "/admin/app-tokens",
    title: "Get App Token",
  },
  {
    id: "get-admin/event",
    method: "get",
    url: "/admin/event",
    title: "Get Event List",
  },
  {
    id: "get-admin/event/{eventId}",
    method: "get",
    url: "/admin/event/{eventId}",
    title: "Get Event Information",
  },
  {
    id: "get-admin/event/{eventId}/registration",
    method: "get",
    url: "/admin/event/{eventId}/registration",
    title: "Get Event Registration Information",
  },
  {
    id: "get-admin/event/registration",
    method: "get",
    url: "/admin/event/registration",
    title: "Get Registration List",
  },
  {
    id: "post-admin/event/{eventId}/registration",
    method: "post",
    url: "/admin/event/{eventId}/registration",
    title: "Add Registration",
  },
  {
    id: "post-admin/event/{eventId}/group-registration",
    method: "post",
    url: "/admin/event/{eventId}/group-registration",
    title: "Add Group Registration",
  },
  {
    id: "delete-admin/event/{eventId}/registration",
    method: "delete",
    url: "/admin/event/{eventId}/registration",
    title: "Delete Registration",
  },
  {
    id: "patch-admin/event/{eventId}/registration",
    method: "patch",
    url: "/admin/event/{eventId}/registration",
    title: "Update Registration",
  },
  {
    id: "delete-admin/event/registration/{registrationId}/for-admin",
    method: "delete",
    url: "/admin/event/registration/{registrationId}/for-admin",
    title: "Delete Registration for Admin",
  },
  {
    id: "get-admin/event/registration/{registrationId}/for-admin",
    method: "get",
    url: "/admin/event/registration/{registrationId}/for-admin",
    title: "Get Registration Information for Admin",
  },
  {
    id: "get-admin/event/{eventId}/for-admin",
    method: "get",
    url: "/admin/event/{eventId}/for-admin",
    title: "Get Event Information for Admin",
  },
]

const isShowAPIList = ref(false)
const apiList = ref<any[]>([])
const selectedApiItems = ref<any[]>([]) // Temporary selection state
const removedFromApiList = ref<any[]>([]) // Track items removed from apiList during modal session

// Get VTag color based on HTTP method
const getTagColor = (method: string) => {
  switch (method.toLowerCase()) {
    case 'get':
      return 'info' // Blue for GET
    case 'post':
      return 'success' // Green for POST
    case 'put':
    case 'patch':
      return 'warning' // Orange for PUT/PATCH
    case 'delete':
      return 'danger' // Red for DELETE
    default:
      return 'primary' // Default primary
  }
}

// Check if an API item is in the selectedApiItems or apiList (but not in removedFromApiList)
const isSelected = (itemId: string) => {
  const isInSelected = selectedApiItems.value.some(item => item.id === itemId)
  const isInApiList = apiList.value.some(item => item.id === itemId)
  const isInRemoved = removedFromApiList.value.some(item => item.id === itemId)

  return isInSelected || (isInApiList && !isInRemoved)
}

// Toggle API item in selectedApiItems (temporary selection)
const toggleApiItem = (item: any) => {
  console.log('toggleApiItem called with:', item)
  console.log('Current selectedApiItems:', selectedApiItems.value)
  console.log('Current apiList:', apiList.value)
  console.log('Current removedFromApiList:', removedFromApiList.value)

  // Check if item is already in apiList
  const apiListIndex = apiList.value.findIndex(apiItem => apiItem.id === item.id)

  if (apiListIndex !== -1) {
    // Item is in apiList, mark it for removal
    const removedIndex = removedFromApiList.value.findIndex(apiItem => apiItem.id === item.id)
    if (removedIndex === -1) {
      // Add to removedFromApiList
      removedFromApiList.value.push(item)
      console.log('Marked for removal, new removedFromApiList:', removedFromApiList.value)
    } else {
      // Remove from removedFromApiList (undo removal)
      removedFromApiList.value.splice(removedIndex, 1)
      console.log('Undid removal, new removedFromApiList:', removedFromApiList.value)
    }
  } else {
    // Item is not in apiList, check selectedApiItems
    const selectedIndex = selectedApiItems.value.findIndex(apiItem => apiItem.id === item.id)

    if (selectedIndex !== -1) {
      // Remove from selectedApiItems
      selectedApiItems.value.splice(selectedIndex, 1)
      console.log('Removed from selectedApiItems, new selectedApiItems:', selectedApiItems.value)
    } else {
      // Add to selectedApiItems
      selectedApiItems.value.push(item)
      console.log('Added to selectedApiItems, new selectedApiItems:', selectedApiItems.value)
    }
  }
}

// Confirm selection and add to apiList
const confirmSelection = () => {
  // Remove items marked for removal from apiList
  removedFromApiList.value.forEach(removedItem => {
    const index = apiList.value.findIndex(item => item.id === removedItem.id)
    if (index !== -1) {
      apiList.value.splice(index, 1)
    }
  })

  // Add all selected items to apiList
  apiList.value.push(...selectedApiItems.value)

  // Clear temporary states
  selectedApiItems.value = []
  removedFromApiList.value = []

  // Close modal
  isShowAPIList.value = false
}

// Cancel selection
const cancelSelection = () => {
  // Clear temporary states without applying changes
  selectedApiItems.value = []
  removedFromApiList.value = []

  // Close modal
  isShowAPIList.value = false
}

</script>

<template>
  <DeveloperSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="list-view-toolbar">
      <div class="buttons">
        <VButton
          color="primary"
          elevated
          @click="isShowAPIList = true"
        >
          KP API List
        </VButton>
      </div>
    </div>

    <div class="page-content-inner">
      <!--List-->
      <div class="list-view list-view-v1">
        <!--List Empty Search Placeholder -->
        <VPlaceholderPage
          :class="[apiList.length !== 0 && 'is-hidden']"
          title="선택된 API가 없습니다."
          subtitle="KP API List에서 사용할 API들을 선택해주세요.
          위의 'KP API List' 버튼을 클릭하여 원하는 API 엔드포인트들을 추가할 수 있습니다."
          larger
        >
          <template #image>
            <img
              class="light-image"
              src="/@dds/assets/illustrations/placeholders/search-1.svg"
              alt=""
            >
            <img
              class="dark-image"
              src="/@dds/assets/illustrations/placeholders/search-1-dark.svg"
              alt=""
            >
          </template>
        </VPlaceholderPage>

        <div class="list-view-inner">
          <!--Item-->
          <TransitionGroup
            name="list-complete"
            tag="div"
          >
            <div
              v-for="(item, key) in apiList"
              :key="key"
              class="list-view-item"
            >
              <RouterLink
                :to="`/api/${item.id}`"
              >
                <div class="list-view-item-inner">
                  <div class="tags">
                    <VTag
                      :label="item.method"
                      :color="getTagColor(item.method)"
                      rounded
                      elevated
                    />
                  </div>
                  <div class="meta-left">
                    <h3>{{ item.title }}</h3>
                    <span>
                      <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:map-pin"
                      />
                      <span>{{ item.url }}</span>
                    </span>
                  </div>
                  <div class="meta-right">
                    <div class="stats">
                      <div class="stat">
                        <span>123</span>
                        <span>Projects</span>
                      </div>
                      <div class="separator" />
                      <div class="stat">
                        <span>234</span>
                        <span>Replies</span>
                      </div>
                      <div class="separator" />
                      <div class="stat">
                        <span>345</span>
                        <span>Posts</span>
                      </div>
                    </div>


                    <!--Dropdown-->
                    <ListViewV1Dropdown />
                  </div>
                </div>
              </RouterLink>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <VModal
      :open="isShowAPIList"
      title="Kingdom Planet API List"
      size="big"
      actions="center"
      rounded
      noscroll
      class="api-list-modal"
      @close="cancelSelection()"
    >
      <template #content>
        <div class="list-view list-view-v1">
          <div
            v-for="(item) in kpApiList"
            :key="item.id"
            class="list-view-item"
          >
            <div class="list-view-item-inner">
              <div class="tags">
                <VTag
                  :label="item.method"
                  :color="getTagColor(item.method)"
                  rounded
                  elevated
                />
              </div>
              <div class="meta-left">
                <h3>{{ item.title }}</h3>
                <span>
                  <span>{{ item.url }}</span>
                </span>
              </div>
              <div class="meta-right">
                <button
                  :class="['button', 'is-rounded', isSelected(item.id) ? 'is-danger' : 'is-primary']"
                  @click="toggleApiItem(item)"
                >
                  {{ isSelected(item.id) ? 'Remove' : 'Add' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #action>
        <VButton
          color="primary"
          rounded
          raised
          @click="confirmSelection()"
        >
          Confirm
        </VButton>
      </template>
    </VModal>
  </DeveloperSideblockLayout>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';

.list-view-v1 {
  .list-view-item {
    cursor: pointer;
    @include vuero-r-card;

    margin-bottom: 16px;
    padding: 16px;

    .list-view-item-inner {
      display: flex;
      align-items: center;

      .meta-left {
        margin-inline-start: 16px;

        h3 {
          font-family: var(--font-alt);
          color: var(--dark-text);
          font-weight: 600;
          font-size: 1rem;
          line-height: 1;
        }

        > span:not(.tag) {
          font-size: 0.9rem;
          color: var(--light-text);

          svg {
            height: 12px;
            width: 12px;
          }
        }
      }

        .tags {
          margin-bottom: 0;

          .tag {
            margin-bottom: 0;
          }
        }
      .meta-right {
        margin-inline-start: auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;


        .stats {
          display: flex;
          align-items: center;
          margin-inline-end: 30px;

          .stat {
            display: flex;
            align-items: center;
            flex-direction: column;
            text-align: center;
            color: var(--light-text);

            > span {
              font-family: var(--font);

              &:first-child {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--dark-text);
                line-height: 1.4;
              }

              &:nth-child(2) {
                text-transform: uppercase;
                font-family: var(--font-alt);
                font-size: 0.75rem;
              }
            }

            svg {
              height: 16px;
              width: 16px;
            }

            i {
              font-size: 1.4rem;
            }
          }

          .separator {
            height: 25px;
            width: 2px;
            border-inline-end: 1px solid var(--fade-grey-dark-3);
            margin: 0 16px;
          }
        }

        .network {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: 145px;

          > span {
            font-family: var(--font);
            font-size: 0.9rem;
            color: var(--light-text);
            margin-inline-start: 6px;
          }
        }

        .dropdown {
          margin-inline-start: 30px;
        }
      }
    }
  }
}

.is-dark {
  .list-view-v1 {
    .list-view-item {
      @include vuero-card--dark;

      .list-view-item-inner {
        .meta-left {
          h3 {
            color: var(--dark-dark-text) !important;
          }
        }

        .meta-right {
          .stats {
            .stat {
              span {
                &:first-child {
                  color: var(--dark-dark-text);
                }
              }
            }

            .separator {
              border-color: var(--dark-sidebar-light-16) !important;
            }
          }
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .list-view-v1 {
    .list-view-item {
      .list-view-item-inner {
        position: relative;
        flex-direction: column;

        .v-avatar {
          margin-bottom: 10px;
        }

        .meta-left {
          margin-inline-start: 0;
        }

        .meta-right {
          flex-direction: column;
          margin-inline-start: 0;

          .tags {
            margin: 10px 0;
          }

          .stats {
            margin: 10px 0;
          }

          .network {
            margin: 10px 0 0;
            justify-content: center;

            > span {
              display: none;
            }
          }

          .dropdown {
            position: absolute;
            top: 0;
            inset-inline-end: 0;
            margin-inline-start: 0;
          }
        }
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .list-view-v1 {
    display: flex;
    flex-wrap: wrap;

    .list-view-item {
      margin: 10px;
      width: calc(50% - 20px);

      .list-view-item-inner {
        position: relative;
        flex-direction: column;

        .v-avatar {
          margin-bottom: 10px;
        }

        .meta-left {
          margin-inline-start: 0;
        }

        .meta-right {
          flex-direction: column;
          margin-inline-start: 0;

          .tags {
            margin: 10px 0;
          }

          .stats {
            margin: 10px 0;
          }

          .network {
            margin: 10px 0 0;
            justify-content: center;

            > span {
              display: none;
            }
          }

          .dropdown {
            position: absolute;
            top: 0;
            inset-inline-end: 0;
            margin-inline-start: 0;
          }
        }
      }
    }
  }
}

.modal-content {
  .list-view-item {
    .list-view-item-inner {
      .tags {
        margin: 0rem;
        .tag {
          margin: 1rem;
        }
      }
    }
  }
}
</style>
