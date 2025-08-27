<script setup lang="ts">
import { useViewWrapper } from '/@dds/stores/viewWrapper'

import ApexChart from 'vue3-apexcharts'

import { useApiChart } from '../../../data/apiChart'
import { useActiveUserChart } from '../../../data/activeUserChart'

const { apiOption } = useApiChart()
const { activeUserOption } = useActiveUserChart()

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Dashboard')

useHead({
  title: 'Dashboard - App name - KingdomPlanet',
})
</script>

<template>
  <div class="page-content-inner">
    <div class="finance-dashboard analytics-dashboard">
      <div class="columns">
        <div class="column is-12">
          <div class="gap-24 columns is-multiline flex-column">
            <div class="dashboard-card">
              <ApexChart
                id="api-chart"
                :height="apiOption.chart.height"
                :type="apiOption.chart.type"
                :series="apiOption.series"
                :options="apiOption"
              />
            </div>
            <div class="dashboard-card">
              <ApexChart
                id="active-user-chart"
                :height="activeUserOption.chart.height"
                :type="activeUserOption.chart.type"
                :series="activeUserOption.series"
                :options="activeUserOption"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';

.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  p {
    margin-top: 1rem;
    color: var(--light-text);
  }
}

.analytics-dashboard {
  width: 100%;
  .text-h-green {
    color: var(--green);
  }

  .text-h-red {
    color: var(--red);
  }

  .text-widget {
    color: var(--widget-grey);
  }

  .dashboard-tile {
    @include vuero-s-card;

    font-family: var(--font);

    .tile-head {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-family: var(--font-alt);
        color: var(--dark-text);
        font-weight: 600;
      }
    }

    .tile-body {
      font-size: 2rem;
      padding: 4px 0 8px;

      span {
        color: var(--dark-text);
        font-weight: 600;
      }
    }

    .tile-foot {
      span {
        &:first-child {
          font-weight: 500;

          svg {
            height: 16px;
            width: 16px;
            margin-inline-end: 6px;
            stroke-width: 3px;
          }
        }

        &:nth-child(2) {
          color: var(--light-text);
          font-size: 0.9rem;
        }
      }
    }
  }

  .dashboard-card {
    @include vuero-s-card;
    display: flex;
    flex-direction: column;
    font-family: var(--font);

    .card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      h3 {
        font-family: var(--font-alt);
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark-text);
      }
    }

    .revenue-stats {
      display: flex;

      .revenue-stat {
        margin-inline-end: 30px;
        font-family: var(--font);

        span {
          display: block;

          &:first-child {
            color: var(--light-text);
            font-size: 0.9rem;
          }

          &:nth-child(2) {
            color: var(--dark-text);
            font-size: 1.2rem;
            font-weight: 600;
          }

          &.current {
            color: var(--primary);
          }
        }
      }
    }

    .radial-wrap {
      display: flex;
      flex-direction: column;
      height: calc(100% - 44px);

      .radial-stats {
        margin-top: auto;
        display: flex;
        padding-top: 20px;
        border-top: 1px solid var(--fade-grey-dark-3);

        .radial-stat {
          width: 50%;
          text-align: center;

          &:first-child {
            border-inline-end: 1px solid var(--fade-grey-dark-3);
          }

          span {
            display: block;

            &:first-child {
              color: var(--light-text);
              font-size: 0.9rem;
            }

            &:nth-child(2) {
              color: var(--dark-text);
              font-size: 1.3rem;
              font-weight: 600;
            }
          }
        }
      }
    }

    .progress-block {
      display: flex;
      flex-direction: column;
      height: calc(100% - 44px);
      font-family: var(--font);

      .value {
        font-size: 1.4rem;
        font-weight: 600;

        span {
          color: var(--dark-text);
        }
      }

      .progress {
        margin-bottom: 8px;
      }

      .progress-foot {
        span {
          &:first-child {
            font-weight: 500;

            svg {
              height: 16px;
              width: 16px;
              margin-inline-end: 6px;
              stroke-width: 3px;
            }
          }

          &:nth-child(2) {
            color: var(--light-text);
            font-size: 0.9rem;
          }
        }
      }

      .circle-chart-wrapper {
        margin-top: auto;
      }
    }
  }
}

.is-dark {
  .analytics-dashboard {
    .dashboard-tile,
    .dashboard-card {
      @include vuero-card--dark;
    }
  }
}
</style>
