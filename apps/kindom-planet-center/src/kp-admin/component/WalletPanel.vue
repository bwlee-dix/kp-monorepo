<script setup lang="ts">
import { usePanel } from '../store/panel'
import VWallet from '/@src/kp-developer/component/VWallet.vue'

const panels = usePanel()
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
        <h3>Wallet</h3>
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
      <div class="right-panel-body">
        <div class="wallet-container">
          <VWallet
            :color="'green'"
            :name="'Admin'"
            :number="'0753 0296 2406 5682'"
            :cvc="'844'"
          />
          <div class="wallet-info-container">
            <div class="tokens">2.5 KPC</div>
            <div class="dollar">$ 5.00</div>

            <div class="transaction-list">
              <div class="list-title">Transactions</div>
              <div class="list-content">
                <div class="item">
                  <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
                  <div>
                    <div class="item-title">Market</div>
                    <div class="item-cdt">Aug 21, 2025 • 15:20 PM</div>
                  </div>
                </div>
                <div class="remain">- 3.5 KPC</div>
              </div>
              <div class="list-content">
                <div class="item">
                  <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
                  <div>
                    <div class="item-title">Market</div>
                    <div class="item-cdt">Aug 21, 2025 • 15:20 PM</div>
                  </div>
                </div>
                <div class="remain">- 3.5 KPC</div>
              </div>
              <div class="list-content">
                <div class="item">
                  <VAvatar picture="/images/avatars/svg/vuero-1.svg" />
                  <div>
                    <div class="item-title">Market</div>
                    <div class="item-cdt">Aug 21, 2025 • 15:20 PM</div>
                  </div>
                </div>
                <div class="remain">- 3.5 KPC</div>
              </div>
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
  &.is-wallet {
    .right-panel {
      .right-panel-head {
        padding: 0 20px;
      }

      .right-panel-body {
        padding: 0 20px;
        height: calc(100% - 55px);

        .wallet-container {
          .wallet-info-container {
            padding: 20px 0 0 20px;

            .tokens {
              font-size: xx-large;
              font-weight: bold;
            }
            .dollar {
              font-size: x-large;
              font-weight: normal;
              color: gray;
            }
            .transaction-list {
              padding-top: 20px;

              .list-title {
                font-size: large;
                font-weight: 500;
              }
              .list-content {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 5px;
                gap: 5px;

                .item {
                  display: flex;
                  flex-direction: row;
                  gap: 5px;

                  .item-title {
                    font-size: small;
                    font-weight: bold;
                  }
                  .item-cdt {
                    font-size: x-small;
                    font-weight: lighter;
                  }
                }

                .remain {
                  padding-right: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.is-dark {
  .right-panel-wrapper {
    &.is-wallet {
      .right-panel-body {
      }
    }
  }
}
</style>
