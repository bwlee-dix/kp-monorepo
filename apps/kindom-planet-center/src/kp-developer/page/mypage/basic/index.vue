<script setup lang="ts">
const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
const onSubmit = () => {
  console.log('Form submitted!')
}

const userBasicInfo = ref<{
  name: string
  email: string
  phone: string
  sns: string
}>({
  name: 'KP KIM',
  email: 'kp.kim@kingdomplanet.io',
  phone: '+82 10-1234-5678',
  sns: 'kp_kim',
})

const userBasicInfoBackup = ref<{
  name: string
  email: string
  phone: string
  sns: string
}>({
  name: 'KP KIM',
  email: 'kp.kim@kingdomplanet.io',
  phone: '+82 10-1234-5678',
  sns: 'kp_kim',
})
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Basic Info</h3>
            </div>

            <div class="right">
              <div class="buttons">
                <VButton type="submit" icon="lucide:pen-line" raised> Edit </VButton>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-fieldset">
            <div class="app-title-container">
              <div class="fieldset-heading">
                <h4>Basic Info</h4>
                <p>This helps us to know you</p>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <VField>
                  <VLabel>Name</VLabel>
                  <VControl icon="lucide:user">
                    <VInput
                      type="text"
                      v-model="userBasicInfo.name"
                      :placeholder="userBasicInfoBackup.name"
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
                      v-model="userBasicInfo.email"
                      :placeholder="userBasicInfoBackup.email"
                    />
                  </VControl>
                </VField>
              </div>

              <div class="column is-6">
                <VField>
                  <VLabel>Phone</VLabel>
                  <VControl icon="lucide:phone">
                    <VInput
                      type="text"
                      v-model="userBasicInfo.phone"
                      :placeholder="userBasicInfoBackup.phone"
                    />
                  </VControl>
                </VField>
              </div>
              <div class="column is-6">
                <VField>
                  <VLabel>SNS</VLabel>
                  <VControl icon="lucide:instagram">
                    <VInput
                      type="text"
                      v-model="userBasicInfo.sns"
                      :placeholder="userBasicInfoBackup.sns"
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
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';
@import '/@dds/scss/components/forms-outer';

.form-layout {
  .form-body {
    min-height: 480px;
  }
}
</style>
