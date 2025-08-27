<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

const viewWrapper = useViewWrapper()
const router = useRouter()

viewWrapper.setPageTitle('Notice detail')

useHead({
  title: 'Notice Detail - App name - KingdomPlanet',
})

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
const onSubmit = () => {
  console.log('Form submitted!')
}
</script>

<template>
  <AdminSideblockLayout>
    <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Notice Detail</h3>
            </div>
            <div class="right">
              <div class="buttons">
                <VButton
                  icon="fas fa-trash-alt"
                  to="/notice"
                  color="danger"
                  light
                  dark-outlined
                >
                  Delete
                </VButton>
                <VButton
                  icon="fas fa-check"
                  to="/notice"
                  type="submit"
                  color="primary"
                  raised
                >
                  Save
                </VButton>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <!--Fieldset-->
          <div class="form-fieldset">
            <div class="fieldset-heading">
              <h4>Title</h4>
            </div>
            <div class="columns">
              <div class="column is-12">
                <VField>
                  <VInput
                    type="text"
                    placeholder="Write the title"
                    autocomplete="organization"
                  />
                </VField>
              </div>
            </div>
          </div>
          <!--Fieldset-->
          <div class="form-fieldset">
            <div class="fieldset-heading">
              <h4>Content</h4>
              <p>Tell us about notice</p>
            </div>
            <div class="columns is-multiline">
              <div class="column is-12">
                <VField>
                  <VLabel>Preface</VLabel>
                  <VInput type="text" placeholder="Hello" autocomplete="organization" />
                </VField>
              </div>
              <div class="column is-12">
                <VField>
                  <VLabel>Intermediate content</VLabel>
                  <VTextarea
                    class="textarea"
                    rows="4"
                    placeholder="Tell us about any details you'd like us to know..."
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="true"
                  />
                </VField>
              </div>
              <div class="column is-12">
                <VField>
                  <VLabel>Conclusion</VLabel>
                  <VInput
                    type="text"
                    placeholder="Thank you"
                    autocomplete="organization"
                  />
                </VField>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </AdminSideblockLayout>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
  max-width: 740px;
  margin: 0 auto;
}
</style>
