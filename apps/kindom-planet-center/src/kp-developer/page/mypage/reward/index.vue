<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useExpensesAreaChart } from '/@src/dds/data/dashboards/banking-v2/expensesAreaChart'
import KpWallet from '/@src/kp-developer/component/KpWallet.vue'

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})
const onSubmit = () => {
  console.log('Form submitted!')
}

const selectedOption = ref<string>('Last 10 days')

const selectedAccess = ref<string>('Latest')
const selectedTimeRange = ref<string>('Lasted 10 days')

const { expensesOptions } = useExpensesAreaChart()
</script>

<template>
  <div class="page-content-inner">
    <form method="post" novalidate class="form-layout" @submit.prevent="onSubmit">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Reward</h3>
            </div>
          </div>
        </div>
        <div class="form-body">
          <div class="form-fieldset">
            <div class="columns">
              <div class="column is-6">
                <div class="balance-container">
                  <div class="balacne-header">
                    <div class="header-title">Balance</div>
                    <VField>
                      <VControl>
                        <VSelect v-model="selectedOption" class="is-minimal-select">
                          <option
                            v-for="option in [
                              'Last 10 days',
                              'Last 30 days',
                              'Last 90 days',
                              'Last 180 days',
                              'Last 365 days',
                            ]"
                            :key="option"
                            :value="option"
                          >
                            {{ option }}
                          </option>
                        </VSelect>
                      </VControl>
                    </VField>
                  </div>
                  <div class="balance-body">
                    <div class="kp-wallet-container">
                      <KpWallet
                        :color="'cyan'"
                        :flipped="false"
                        :name="'Test Wallet'"
                        :address="'0x1234567890123456789012345678901234567890'"
                        :privateKey="'38658e3ed4faa90d8fb485cef5f57b5304fc93bb83332053f1a3152c964095a1'"
                      />
                    </div>
                    <div class="card-balance-stats-container">
                      <div class="card-balance-stats">
                        <div class="card-balance-stat">
                          <div class="stat-title">
                            <span>Income</span>
                          </div>
                          <div class="stat-block">
                            <div class="stat-icon is-up">
                              <i
                                aria-hidden="true"
                                class="iconify rtl-reflect"
                                data-icon="feather:arrow-right"
                              />
                            </div>
                            <div class="stat-text">
                              <span>+ 2,324.12</span>
                            </div>
                          </div>
                        </div>
                        <div class="card-balance-stat">
                          <div class="stat-title">
                            <span>Expense</span>
                          </div>
                          <div class="stat-block">
                            <div class="stat-icon is-down">
                              <i
                                aria-hidden="true"
                                class="iconify rtl-reflect"
                                data-icon="feather:arrow-right"
                              />
                            </div>
                            <div class="stat-text">
                              <span>+ 518.41</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <div class="chart-wrapper">
                  <VueApexCharts
                    id="timeline-chart"
                    :height="expensesOptions.chart.height"
                    :type="expensesOptions.chart.type"
                    :series="expensesOptions.series"
                    :options="expensesOptions"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-12">
                <div class="transaction-container">
                  <div class="transaction-header">
                    <div class="transaction-title">Transactions</div>
                    <div class="filter-container">
                      <VField>
                        <VControl>
                          <VSelect v-model="selectedAccess" class="is-minimal-select">
                            <option
                              v-for="option in ['Latest', 'Oldest']"
                              :key="option"
                              :value="option"
                            >
                              {{ option }}
                            </option>
                          </VSelect>
                        </VControl>
                      </VField>
                      <VField>
                        <VControl>
                          <VSelect v-model="selectedTimeRange" class="is-minimal-select">
                            <option
                              v-for="option in [
                                'Lasted 10 days',
                                'Lasted 30 days',
                                'Lasted 60 days',
                                'Lasted 90 days',
                                'Lasted 180 days',
                              ]"
                              :key="option"
                              :value="option"
                            >
                              {{ option }}
                            </option>
                          </VSelect>
                        </VControl>
                      </VField>
                    </div>
                  </div>
                  <table class="table is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">tx Hash</th>
                        <th scope="col">Income</th>
                        <th scope="col">Expanse</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Last Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>9</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          Be0x5e0b6a7b92cfcd2d1a1b41a3df7308d2e7f45e1c9e1d1a43f6rgmann
                        </td>
                        <td>0.30</td>
                        <td>0</td>
                        <td>0.30</td>
                        <td>08/19/2025 10:34</td>
                      </tr>
                    </tbody>
                  </table>
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
    min-height: 480px;
  }

  .balance-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 12px;

    .balacne-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .header-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--dark-text);
      }
    }

    .balance-body {
      display: flex;
      flex-direction: row;
      align-items: center;

      .kp-wallet-container {
        width: 100%;
        max-width: 320px;
      }
      .balacnce {
        font-size: 56px;
        font-weight: 600;
        color: var(--dark-text);
      }
      .card-balance-stats {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .card-balance-stat {
          font-family: var(--font);

          .stat-title {
            color: var(--light-text);
            margin-bottom: 6px;
          }

          .stat-block {
            display: flex;
            align-items: center;

            .stat-icon {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 30px;
              width: 30px;
              border-radius: var(--radius-rounded);
              background: var(--fade-grey-light-2);

              &.is-up {
                transform: rotate(calc(var(--transform-direction) * -45deg));

                svg {
                  color: var(--green);
                }
              }

              &.is-down {
                transform: rotate(calc(var(--transform-direction) * 45deg));

                svg {
                  color: var(--red);
                }
              }

              svg {
                height: 16px;
                width: 16px;
                stroke-width: 3px;
              }
            }

            .stat-text {
              margin-inline-start: 12px;
              font-family: var(--font);
              font-weight: 600;
              font-size: 1.1rem;
              color: var(--dark-text);
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

.monthly-summary-wrap {
  .monthly-summary {
    padding: 0 20px;
    border: 1px solid var(--fade-grey-dark-5);
    border-radius: var(--radius-large);

    .monthly-summary-item {
      padding: 20px 0;
      font-family: var(--font);

      &:first-child {
        border-bottom: 1px solid var(--fade-grey-dark-5);
      }

      span {
        display: block;

        &:first-child {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--light-text);
        }

        &:nth-child(2) {
          font-weight: 500;

          &.is-income {
            color: var(--green);
          }

          &.is-expense {
            color: var(--red);
          }
        }
      }
    }
  }
}

.chart-wrapper {
  position: relative;
  padding-inline-end: 30px;

  .action-link {
    position: absolute;
    top: -42px;
    inset-inline-end: 45px;
  }
}

.transaction-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;

  .transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .transaction-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--dark-text);
    }

    .filter-container {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}

.is-dark {
  .form-layout {
    .form-body {
      .form-fieldset {
        .columns {
          .balance-container {
            .balacne-header {
              .header-title {
                color: var(--dark-dark-text);
              }
            }
            .balance-body {
              .balacnce {
                color: var(--dark-text);
              }
              .address {
                color: var(--dark-dark-text);
              }
              .card-balance-stats {
                .card-balance-stat {
                  .stat-title {
                    color: var(--dark-dark-text);
                  }
                }
                .stat-block {
                  .stat-icon {
                    background-color: var(--dark-sidebar);
                  }
                  .stat-text {
                    color: var(--dark-dark-text);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .transaction-container {
    .transaction-header {
      .transaction-title {
        color: var(--dark-dark-text);
      }

      .filter-container {
        .is-minimal-select {
          background-color: var(--dark-sidebar);
        }
      }
    }
  }
}
</style>
