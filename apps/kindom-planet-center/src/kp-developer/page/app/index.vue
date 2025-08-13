<script setup lang="ts">

import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('App')

useHead({
  title: 'App - App name - KingdomPlanet',
})

const companySize = ref('')
const businessType = ref('')
const productToDemo = ref('')
const date = ref(new Date())

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
const onSubmit = () => {
  console.log('Form submitted!')
}

const appName=ref("GMMA")
const appDescription=ref("Global Medical Missions Alliance")
const appId=ref("9hga90wfq0wf8wehfi0asf")
const appKey=ref("12j1riufhweuh9wqef0iewqv")
const webUrl=ref("https://gmma.kingdompla.net")
</script>

<template>
  <DeveloperSideblockLayout
    theme="curved"
    open-on-mounted
  >
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <form
        method="post"
        novalidate
        class="form-layout"
        @submit.prevent="onSubmit"
      >
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left">
                <h3>App Info</h3>
              </div>

              <div class="right">
                <div class="buttons">
                  <VTag
                    color="blue"
                    label="Reviewing"
                    curved
                  />
                  <VButton
                    type="submit"
                    color="primary"
                    raised
                  >
                    Review
                  </VButton>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <!--Fieldset-->
            <div class="form-fieldset">
              <div class="app-title-container">
                <div class="fieldset-heading">
                  <h4>App Info</h4>
                  <p>This helps us to know you</p>
                </div>
                <div>
                  <!-- <VTag
                    color="primary"
                    label="Reviewing"
                    curved
                  /> -->
                </div>
              </div>
              <div class="columns is-multiline">
                <div class="column is-12">
                  <VField>
                    <VLabel>App Name</VLabel>
                    <VControl icon="feather:box">
                      <VInput
                        v-model:model-value="appName"
                        type="text"
                        placeholder="app name"
                      />
                    </VControl>
                  </VField>
                </div>
                <div class="column is-12">
                  <VField>
                    <VLabel>App Description</VLabel>
                    <VControl>
                      <VTextarea
                        v-model:model-value="appDescription"
                        rows="4"
                        placeholder="A longer message..."
                      />
                    </VControl>
                  </VField>
                </div>

                <div class="column is-12">
                  <VField>
                    <VLabel>App ID</VLabel>
                    <VControl icon="feather:mail">
                      <VInput
                        v-model:model-value="appId"
                        type="text"
                        disabled
                      />
                    </VControl>
                  </VField>
                </div>
                <div class="column is-12">
                  <VField>
                    <VLabel>API Key</VLabel>
                    <VControl icon="feather:mail">
                      <VInput
                        v-model:model-value="appKey"
                        type="text"
                        disabled
                      />
                    </VControl>
                  </VField>
                </div>
              </div>
            </div>

            <div class="form-fieldset">
              <div class="fieldset-heading">
                <h4>Deploy Info</h4>
                <p>This helps us to know you</p>
              </div>

              <div class="columns is-multiline">
                <div class="column is-12">
                  <VField>
                    <VLabel>WEB URL</VLabel>
                    <VControl icon="feather:box">
                      <VInput
                        v-model:model-value="webUrl"
                        type="text"
                        placeholder="app name"
                      />
                    </VControl>
                  </VField>
                </div>
                <div class="column is-12">
                  <VField>
                    <VLabel>IOS URL</VLabel>
                    <VControl icon="feather:box">
                      <VInput
                        type="text"
                        placeholder="ios app url"
                      />
                    </VControl>
                  </VField>
                </div>

                <div class="column is-12">
                  <VField>
                    <VLabel>AOS URL</VLabel>
                    <VControl icon="feather:box">
                      <VInput
                        type="text"
                        placeholder="aos app url"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </DeveloperSideblockLayout>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
  max-width: 740px;
  margin: 0 auto;

  .app-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttons {
    gap: 1rem;
  }
}
</style>
