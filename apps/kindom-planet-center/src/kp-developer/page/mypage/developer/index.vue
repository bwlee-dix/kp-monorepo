<script setup lang="ts">
import KpCreditCard from '../../../component/KpCreditCard.vue'

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const onSubmit = () => {
  console.log('Form submitted!')
}

const userBasicInfo = ref<{
  firstName: string
  lastName: string
  email: string
}>({
  firstName: 'KP',
  lastName: 'KIM',
  email: 'kp.kim@kingdomplanet.io',
})

const companyInfo = ref<{
  companyName: string
  companyPhone: string
  companySize: string
  businessType: string
  companyEmail: string
}>({
  companyName: 'Kingdom Planet  ',
  companyPhone: '+82 10-1234-5678',
  companySize: '1-10 employees',
  businessType: 'Technology',
  companyEmail: 'kp.kim@kingdomplanet.io',
})

const paymentInfo = ref<{
  cardholderName: string
  cardNumber: string
  expiration: string
  cvc: string
}>({
  cardholderName: 'KP KIM',
  cardNumber: '1234 1234 1234 1234',
  expiration: '01/30',
  cvc: '123',
})

const paymentInfoBackup = ref<{
  cardholderName: string
  cardNumber: string
  expiration: string
  cvc: string
}>({
  cardholderName: 'KP KIM',
  cardNumber: '1234 1234 1234 1234',
  expiration: '01/30',
  cvc: '123',
})

const userBasicInfoBackup = ref<{
  firstName: string
  lastName: string
  email: string
}>({
  firstName: 'KP',
  lastName: 'KIM',
  email: 'kp.kim@kingdomplanet.io',
})

const companyInfoBackup = ref<{
  companyName: string
  companyPhone: string
  companySize: string
  businessType: string
  companyEmail: string
}>({
  companyName: 'Kingdom Planet  ',
  companyPhone: '+82 10-1234-5678',
  companySize: '1-10 employees',
  businessType: 'Technology',
  companyEmail: 'kp.kim@kingdomplanet.io',
})

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
]

const businessTypeOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Other',
]
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Register developer</h3>
            </div>

            <div class="right">
              <div class="right">
                <VButton type="submit" icon="lucide:pen-line" raised> Edit </VButton>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-fieldset">
            <div class="columns is-multiline">
              <div class="column is-6">
                <div class="info-section">
                  <h5>Personal Info</h5>
                  <VField>
                    <VLabel>First Name</VLabel>
                    <VControl icon="lucide:user">
                      <VInput
                        type="text"
                        v-model="userBasicInfo.firstName"
                        :placeholder="userBasicInfoBackup.firstName"
                      />
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Last Name</VLabel>
                    <VControl icon="lucide:user">
                      <VInput
                        type="text"
                        v-model="userBasicInfo.lastName"
                        :placeholder="userBasicInfoBackup.lastName"
                      />
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Email Address</VLabel>
                    <VControl icon="lucide:mail">
                      <VInput
                        type="email"
                        v-model="userBasicInfo.email"
                        :placeholder="userBasicInfoBackup.email"
                      />
                    </VControl>
                  </VField>
                </div>

                <div class="info-section">
                  <h5>Company Info</h5>

                  <VField>
                    <VLabel>Company Name</VLabel>
                    <VControl icon="lucide:briefcase">
                      <VInput
                        type="text"
                        v-model="companyInfo.companyName"
                        :placeholder="companyInfoBackup.companyName"
                      />
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Company Phone</VLabel>
                    <VControl icon="lucide:phone">
                      <VInput
                        type="tel"
                        v-model="companyInfo.companyPhone"
                        :placeholder="companyInfoBackup.companyPhone"
                      />
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Company Size</VLabel>
                    <VControl>
                      <VSelect
                        v-model="companyInfo.companySize"
                        :placeholder="companyInfoBackup.companySize"
                      >
                        <option
                          v-for="option in companySizeOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </VSelect>
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Business Type</VLabel>
                    <VControl>
                      <VSelect
                        v-model="companyInfo.businessType"
                        :placeholder="companyInfoBackup.businessType"
                      >
                        <option
                          v-for="option in businessTypeOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </VSelect>
                    </VControl>
                  </VField>

                  <VField>
                    <VLabel>Company Email</VLabel>
                    <VControl icon="lucide:mail">
                      <VInput
                        type="email"
                        v-model="companyInfo.companyEmail"
                        :placeholder="companyInfoBackup.companyEmail"
                      />
                    </VControl>
                  </VField>
                </div>
              </div>

              <div class="column is-6">
                <div class="info-section">
                  <div class="payment-header">
                    <h5>Payment information</h5>
                  </div>
                  <KpCreditCard
                    :color="'purple'"
                    :flipped="false"
                    :name="paymentInfo.cardholderName"
                    :number="paymentInfo.cardNumber"
                    :cvc="paymentInfo.cvc"
                  />

                  <div class="form-list">
                    <VField>
                      <VLabel>Name</VLabel>
                      <VControl>
                        <VInput
                          type="text"
                          v-model="paymentInfo.cardholderName"
                          :placeholder="paymentInfoBackup.cardholderName"
                        />
                      </VControl>
                    </VField>

                    <VField>
                      <VLabel>Card Number</VLabel>
                      <VControl>
                        <VInput
                          type="text"
                          v-model="paymentInfo.cardNumber"
                          :placeholder="paymentInfoBackup.cardNumber"
                        />
                      </VControl>
                    </VField>

                    <VField>
                      <VLabel>Expiration</VLabel>
                      <VControl>
                        <VInput
                          type="text"
                          v-model="paymentInfo.expiration"
                          :placeholder="paymentInfoBackup.expiration"
                        />
                      </VControl>
                    </VField>

                    <VField>
                      <VLabel>CVC</VLabel>
                      <VControl>
                        <VInput
                          type="text"
                          v-model="paymentInfo.cvc"
                          :placeholder="paymentInfoBackup.cvc"
                        />
                      </VControl>
                    </VField>
                  </div>
                </div>
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
    min-height: 600px;
  }
}

.info-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .section-description {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .form-list {
    margin-top: 66px;
    display: flex;
    flex-direction: column;
  }
}

.payment-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}
</style>
