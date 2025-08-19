<script setup lang="ts">
import { useKpPanels } from '../composable/panels'
import VWallet from './VWallet.vue'
import VAvatar from '/@dds/components/base/avatar/VAvatar.vue'

const panels = useKpPanels()
</script>

<template>
  <div
    id="wallet-panel"
    :class="[panels.active === 'wallet' && 'is-active']"
    class="right-panel-wrapper is-wallet"
  >
    <div
      class="panel-overlay"
      tabindex="0"
      role="button"
      @keydown.space.prevent="panels.close()"
      @click="panels.close()"
    />

    <div class="right-panel">
      <div class="right-panel-head">
        <div class="wallet-header">
          <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
          <span>f8ed9e6b...</span>
        </div>
        <a
          class="close-panel"
          tabindex="0"
          role="button"
          @keydown.space.prevent="panels.close()"
          @click="panels.close()"
        >
          <i
            aria-hidden="true"
            class="iconify rtl-hidden"
            data-icon="feather:chevron-right"
          />
          <i
            aria-hidden="true"
            class="iconify ltr-hidden"
            data-icon="feather:chevron-left"
          />
        </a>
      </div>
      <div class="wallet-container">
        <VWallet
          :color="'cyan'"
          :name="'Test Wallet'"
          :number="'jbfcf7711520abc6ea1f '"
          :cvc="'bfcf7711520abc6ea1f...'"
        />
        <div class="wallet-info-container">
          <div class="wallet-balance-container">
            <div class="wallet-balance">52.0 KCP</div>
            <div class="wallet-cash">$48.00</div>
          </div>
          <div class="wallet-button-container">
            <VButton color="light" fullwidth raised>Send</VButton>
            <VButton color="primary" fullwidth raised>To Cash</VButton>
          </div>

          <div class="transaction-container">
            <div class="transaction-header">Transactions</div>
            <div class="transaction-list">
              <VBlock
                title="Food Delivery"
                subtitle="Oct 23, 2020 - 8:46pm"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="green" rounded>
                    <i aria-hidden="true" class="lnil lnil-service" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">- $41.49</span>
                </template>
              </VBlock>

              <VBlock
                title="Market Earnings"
                subtitle="Oct 18, 2020 - 9:11am"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="orange" rounded>
                    <i aria-hidden="true" class="lnil lnil-analytics-alt-1" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">+ $263.39</span>
                </template>
              </VBlock>

              <VBlock
                title="Online Order"
                subtitle="Oct 16, 2020 - 2:13pm"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="purple" rounded>
                    <i aria-hidden="true" class="lnil lnil-cart-alt" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">- $92.00</span>
                </template>
              </VBlock>
              <VBlock
                title="Food Delivery"
                subtitle="Oct 23, 2020 - 8:46pm"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="green" rounded>
                    <i aria-hidden="true" class="lnil lnil-service" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">- $41.49</span>
                </template>
              </VBlock>

              <VBlock
                title="Market Earnings"
                subtitle="Oct 18, 2020 - 9:11am"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="orange" rounded>
                    <i aria-hidden="true" class="lnil lnil-analytics-alt-1" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">+ $263.39</span>
                </template>
              </VBlock>

              <VBlock
                title="Online Order"
                subtitle="Oct 16, 2020 - 2:13pm"
                center
                lighter
              >
                <template #icon>
                  <VIconBox color="purple" rounded>
                    <i aria-hidden="true" class="lnil lnil-cart-alt" />
                  </VIconBox>
                </template>
                <template #action>
                  <span class="dark-inverted">- $92.00</span>
                </template>
              </VBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@dds/scss/abstracts/all';

.right-panel-wrapper {
  .right-panel {
    .right-panel-head {
      padding: 0 30px;
      border-bottom: 1px solid var(--fade-grey);
    }
  }
  .wallet-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  .wallet-container {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    gap: 48px;

    .wallet-info-container {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .wallet-balance-container {
        display: flex;
        flex-direction: column;

        .wallet-balance {
          font-size: 28px;
          font-weight: 700;
          color: var(--dark-text);
        }

        .wallet-cash {
          font-size: 16px;
          font-weight: 500;
          color: var(--light-text);
        }
      }

      .wallet-button-container {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }

      .transaction-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .transaction-header {
          font-size: 16px;
          font-weight: 500;
          color: var(--dark-text);
        }

        .transaction-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    }
  }
  &.is-activity {
    .right-panel {
      .right-panel-head {
        padding: 0 30px;
      }

      .right-panel-body {
        padding: 0 30px;
        height: calc(100% - 55px);

        .team-card {
          @include vuero-s-card;

          display: flex !important;
          align-items: center;
          padding: 16px !important;
          margin-bottom: 16px;

          .meta {
            margin-inline-start: 12px;

            span {
              display: block;

              &:first-child {
                color: var(--dark-text);
                font-weight: 500;
              }

              &:nth-child(2) {
                color: var(--light-text);
                font-size: 0.9rem;

                svg {
                  height: 12px;
                  width: 12px;
                  stroke-width: 1.4px;
                }
              }
            }
          }

          .link {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-inline-start: auto;
            height: 34px;
            width: 34px;
            background: var(--white);
            border: 1px solid var(--fade-grey-dark-3);
            border-radius: var(--radius-rounded);
            transition: all 0.3s; // transition-all test

            &:hover {
              border-color: var(--primary);
              box-shadow: var(--light-box-shadow);

              svg {
                color: var(--primary);
              }
            }

            svg {
              height: 16px;
              width: 16px;
              color: var(--light-text);
            }
          }
        }

        .project-card {
          @include vuero-s-card;

          padding: 16px !important;
          margin-bottom: 16px;

          .project-inner {
            display: flex;
            align-items: center;

            .project-avatar {
              display: block;
              height: 38px;
              width: 38px;
              border-radius: 12px;
            }

            .meta {
              margin-inline-start: 12px;

              span {
                display: block;

                &:first-child {
                  color: var(--dark-text);
                  font-family: var(--font-alt);
                  font-size: 0.9rem;
                  font-weight: 600;
                }

                &:nth-child(2) {
                  font-family: var(--font);
                  color: var(--light-text);
                  font-size: 0.9rem;
                }
              }
            }

            .link {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-inline-start: auto;
              height: 34px;
              width: 34px;
              background: var(--white);
              border: 1px solid var(--fade-grey-dark-3);
              border-radius: var(--radius-rounded);
              transition:
                color 0.3s,
                background-color 0.3s,
                border-color 0.3s,
                height 0.3s,
                width 0.3s;

              &:hover,
              &:focus {
                border-color: var(--primary);
                box-shadow: var(--light-box-shadow);

                svg {
                  color: var(--primary);
                }
              }

              svg {
                height: 16px;
                width: 16px;
                color: var(--light-text);
              }
            }
          }

          .project-foot {
            margin-top: 12px;

            .progress {
              margin-bottom: 10px;
              margin-top: 18px;
            }

            .foot-stats {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;

              span {
                font-family: var(--font);
                color: var(--light-text);
              }
            }
          }
        }

        .icon-timeline {
          margin-top: 30px;

          .timeline-item {
            position: relative;
            display: flex;
            padding-bottom: 30px;

            &::after {
              content: '';
              position: absolute;
              top: 36px;
              inset-inline-start: 18px;
              width: 1px;
              height: calc(100% - 36px);
              border-inline-start: 1px solid var(--fade-grey-dark-3);
            }

            .timeline-icon {
              position: relative;
              height: 36px;
              width: 36px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: var(--white);
              border: 1px solid var(--fade-grey-dark-3);
              border-radius: var(--radius-rounded);
              color: var(--light-text);
              box-shadow: var(--light-box-shadow);

              &::after {
                content: '';
                position: absolute;
                top: 17px;
                inset-inline-start: 40px;
                width: 20px;
                height: 1px;
                border-top: 1px solid var(--fade-grey-dark-3);
              }

              img {
                display: block;
                height: 28px;
                width: 28px;
                border-radius: var(--radius-rounded);
              }

              svg {
                height: 16px;
                width: 16px;
                stroke-width: 1.6px;
              }
            }

            .timeline-content {
              margin-inline-start: 34px;
              line-height: 1.2;

              p {
                font-size: 0.95rem;
                font-family: var(--font-alt);
              }

              span {
                font-size: 0.85rem;
                color: var(--light-text);
              }
            }
          }
        }
      }

      .tabs-wrapper {
        height: calc(100% - 60px);

        .tabs-inner {
          .tabs {
            margin-inline-start: auto;
            margin-inline-end: auto;
          }
        }
      }
    }
  }
}

.is-dark {
  .right-panel-wrapper {
    &.is-activity {
      .right-panel-body {
        .team-card,
        .project-card {
          @include vuero-card--dark;

          background: var(--dark-sidebar-light-2) !important;
          border-color: var(--dark-sidebar-light-8) !important;
        }

        .team-card,
        .project-card .project-inner {
          .meta {
            span {
              &:first-child {
                color: var(--dark-dark-text);
              }
            }
          }

          .link {
            background: var(--dark-sidebar-light-6) !important;
            border-color: var(--dark-sidebar-light-12) !important;

            &:hover,
            &:focus {
              border-color: var(--primary) !important;

              svg {
                color: var(--primary) !important;
              }
            }
          }
        }

        .icon-timeline {
          .timeline-item {
            &::after {
              border-color: var(--dark-sidebar-light-12) !important;
            }

            .timeline-icon {
              background: var(--dark-sidebar-light-6) !important;
              border-color: var(--dark-sidebar-light-12) !important;

              &::after {
                border-color: var(--dark-sidebar-light-12) !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
