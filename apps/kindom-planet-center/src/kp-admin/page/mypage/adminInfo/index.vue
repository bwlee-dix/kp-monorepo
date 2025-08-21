<script setup lang="ts">
const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
const onSubmit = () => {
  console.log('Form submitted!')
}

const adminInfo = ref<{
  name: string
  email: string
  phone: string
  sns: string
}>({
  name: 'ADMIN',
  email: 'admin@kingdompla.net',
  phone: '+82 10-1234-5678',
  sns: 'kp_admin',
})

const infoExample = ref<{
  name: string
  email: string
  phone: string
  sns: string
}>({
  name: 'ADMIN',
  email: 'admin@kingdompla.net',
  phone: '+82 10-1234-5678',
  sns: 'kp_admin',
})
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Administrator Infomation</h3>
              <p>This helps us to know you</p>
            </div>

            <div class="right">
              <VButton icon="lucide:arrow-left" color="light" to="/dashboard">
                Admin Center
              </VButton>
              <VButton type="submit" icon="lucide:pen-line" raised> Edit </VButton>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-fieldset">
            <div class="app-title-container">
              <div class="fieldset-heading">
                <h3>Administrator Infomation</h3>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <VField>
                  <VLabel>Name</VLabel>
                  <VControl icon="lucide:user">
                    <VInput
                      type="text"
                      v-model="adminInfo.name"
                      :placeholder="infoExample.name"
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
                      v-model="adminInfo.email"
                      :placeholder="infoExample.email"
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
                      v-model="adminInfo.phone"
                      :placeholder="infoExample.phone"
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
                      v-model="adminInfo.sns"
                      :placeholder="infoExample.sns"
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
  .form-outer {
    .form-header-inner {
      .right {
        display: flex;
        gap: 10px;
      }
    }
  }
  .form-body {
    min-height: 480px;
  }
}
</style>
