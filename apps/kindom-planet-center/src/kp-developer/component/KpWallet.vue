<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { VCreditCardColor } from '/@dds/composable/useCreditcardMask'

export interface KpWalletEmits {
  (e: 'flip'): void
}
export interface KpWalletProps {
  address?: string
  name?: string
  privateKey?: string
  cvc?: string | number
  color?: VCreditCardColor
  flipped?: boolean
}

const formattedWalletAddress = computed(() => {
  if (!props.address) return ''
  const cleanAddress = props.address.replace(/\s/g, '')
  if (cleanAddress.length <= 16) return cleanAddress
  return cleanAddress.substring(0, 16) + '...'
})

const formattedWalletPrivateKey = computed(() => {
  if (!props.privateKey) return ''
  const cleanAddress = props.privateKey.replace(/\s/g, '')
  if (cleanAddress.length <= 8) return cleanAddress
  return cleanAddress.substring(0, 8) + '...'
})

const emit = defineEmits<KpWalletEmits>()
const props = withDefaults(defineProps<KpWalletProps>(), {
  color: 'grey',
  name: 'John Doe',
  address: '0x1234567890123456789012345678901234567890',
  cvc: '123',
  privateKey: '38658e3ed4faa90d8fb485cef5f57b5304fc93bb83332053f1a3152c964095a1',
})

const { t } = useI18n()
const nameUppercase = computed(() => props.name?.toUpperCase() ?? '')
</script>

<template>
  <div class="wallet-graphic-container">
    <div
      :class="[props.flipped && 'flipped']"
      class="creditcard"
      role="button"
      tabindex="0"
      @keydown.space.prevent="emit('flip')"
      @click="emit('flip')"
    >
      <div class="front">
        <slot />
        <img src="/images/kp_logo_single.png" alt="KP graphic" class="kp-logo" />
        <svg
          id="cardfront"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 750 471"
          style="enable-background: new 0 0 750 471"
          xml:space="preserve"
        >
          <g id="Front2">
            <g id="CardBackground">
              <g id="Page-1_1_">
                <g id="amex_1_">
                  <path
                    id="Rectangle-1_1_"
                    class="lightcolor"
                    :class="props.color"
                    d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                        C0,17.9,17.9,0,40,0z"
                  />
                </g>
              </g>
              <path
                class="darkcolor"
                :class="`${props.color}dark`"
                d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
              />
            </g>
            <text
              id="svgnumber"
              transform="matrix(1 0 0 1 60.106 295.0121)"
              class="st2 st3 st4"
            >
              {{ nameUppercase }}
            </text>
            <text
              id="svgname"
              transform="matrix(1 0 0 1 54.1064 428.1723)"
              class="st2 st5 st6"
            >
              {{ formattedWalletAddress }}
            </text>
            <text transform="matrix(1 0 0 1 54.1074 389.8793)" class="st7 st5 st8">
              Wallet address
            </text>
            <text transform="matrix(1 0 0 1 479.7754 388.8793)" class="st7 st5 st8">
              Private key
            </text>
            <text transform="matrix(1 0 0 1 65.1054 241.5)" class="st7 st5 st8">
              Wallet Name
            </text>
            <g>
              <text
                id="svgexpire"
                transform="matrix(1 0 0 1 480.4219 433.8095)"
                class="st2 st5 st9"
              >
                {{ formattedWalletPrivateKey }}
              </text>
            </g>
          </g>
          <g id="Back" />
        </svg>
      </div>
      <div class="back">
        <svg
          id="cardback"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 750 471"
          style="enable-background: new 0 0 750 471"
          xml:space="preserve"
        >
          <g id="Front">
            <line class="st0" x1="35.3" y1="10.4" x2="36.7" y2="11" />
          </g>
          <g id="Back2">
            <g id="Page-1_2_">
              <g id="amex_2_">
                <path
                  id="Rectangle-1_2_"
                  class="darkcolor"
                  :class="`${props.color}dark`"
                  d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                    C0,17.9,17.9,0,40,0z"
                />
              </g>
            </g>
            <rect y="61.6" class="st2" width="750" height="78" />
            <g>
              <path
                class="st3"
                d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
                C707.1,246.4,704.4,249.1,701.1,249.1z"
              />
              <rect x="42.9" y="198.6" class="st4" width="664.1" height="10.5" />
              <rect x="42.9" y="224.5" class="st4" width="664.1" height="10.5" />
              <path
                class="st5"
                d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
              />
            </g>
            <text
              id="svgsecurity"
              transform="matrix(1 0 0 1 621.999 227.2734)"
              class="st6 st7"
            >
              {{ props.cvc }}
            </text>
            <g class="st8">
              <text transform="matrix(1 0 0 1 518.083 280.0879)" class="st9 st6 st10">
                {{ t('components.v-credit-card.cvc-label') }}
              </text>
            </g>
            <rect x="58.1" y="378.6" class="st11" width="375.5" height="13.5" />
            <rect x="58.1" y="405.6" class="st11" width="421.7" height="13.5" />
            <text
              id="svgnameback"
              transform="matrix(1 0 0 1 59.5073 228.6099)"
              class="st12 st13"
            >
              {{ props.name }}
            </text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wallet-graphic-container {
  width: 100%;
  height: 170px;
  perspective: 1000px;

  &.preload * {
    transition: none !important;
  }

  .creditcard {
    width: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    margin: 0 auto;
    cursor: pointer;

    &.flipped {
      transform: rotateY(180deg);
    }

    .front,
    .back {
      position: absolute;
      width: 100%;
      max-width: 260px;
      backface-visibility: hidden;
      -webkit-font-smoothing: antialiased;
      color: #47525d;

      .kp-logo {
        position: absolute;
        inset-inline-start: 15px;
        top: 20px;
        width: 24px;
        height: 24px;
      }
    }

    .back {
      transform: rotateY(180deg);
    }

    svg#cardfront,
    svg#cardback {
      width: 100%;
      box-shadow: var(--light-box-shadow);
      border-radius: 18px;
    }

    #cardfront {
      .st2 {
        fill: var(--white);
      }

      .st3 {
        font-family: 'Source Code Pro', monospace;
        font-weight: 600;
      }

      .st4 {
        font-size: 54.7817px;
      }

      .st5 {
        font-family: 'Source Code Pro', monospace;
        font-weight: 400;
      }

      .st6 {
        font-size: 33.1112px;
      }

      .st7 {
        opacity: 0.6;
        fill: var(--white);
      }

      .st8 {
        font-size: 24px;
      }

      .st9 {
        font-size: 36.5498px;
      }

      .st10 {
        font-family: 'Source Code Pro', monospace;
        font-weight: 300;
      }

      .st11 {
        font-size: 16.1716px;
      }

      .st12 {
        fill: #4c4c4c;
      }
    }

    #cardback {
      .st0 {
        fill: none;
        color: #0f0f0f;
        stroke-miterlimit: 10;
      }

      .st2 {
        fill: #111;
      }

      .st3 {
        fill: #f2f2f2;
      }

      .st4 {
        fill: #d8d2db;
      }

      .st5 {
        fill: #c4c4c4;
      }

      .st6 {
        font-family: 'Source Code Pro', monospace;
        font-weight: 400;
      }

      .st7 {
        font-size: 27px;
      }

      .st8 {
        opacity: 0.6;
      }

      .st9 {
        fill: var(--white);
      }

      .st10 {
        font-size: 24px;
      }

      .st11 {
        fill: #eaeaea;
      }

      .st12 {
        font-family: 'Rock Salt', cursive;
      }

      .st13 {
        font-size: 37.769px;
      }
    }

    #svgname {
      text-transform: uppercase;
    }

    #ccsingle {
      position: absolute;
      inset-inline-end: 15px;
      top: 20px;

      svg {
        width: 100px;
        max-height: 60px;
      }
    }

    .lightcolor,
    .darkcolor {
      transition: fill 0.5s;
    }

    .lightblue {
      fill: #03a9f4;
    }

    .lightbluedark {
      fill: #0288d1;
    }

    .red {
      fill: #ef5350;
    }

    .reddark {
      fill: #d32f2f;
    }

    .purple {
      fill: #ab47bc;
    }

    .purpledark {
      fill: #7b1fa2;
    }

    .cyan {
      fill: #26c6da;
    }

    .cyandark {
      fill: #0097a7;
    }

    .green {
      fill: #66bb6a;
    }

    .greendark {
      fill: #388e3c;
    }

    .lime {
      fill: #d4e157;
    }

    .limedark {
      fill: #afb42b;
    }

    .yellow {
      fill: #ffeb3b;
    }

    .yellowdark {
      fill: #f9a825;
    }

    .orange {
      fill: #ff9800;
    }

    .orangedark {
      fill: #ef6c00;
    }

    .grey {
      fill: #bdbdbd;
    }

    .greydark {
      fill: #616161;
    }
  }
}

.wallet-container .creditcard #cardfront .st2 {
  fill: rgb(255, 255, 255);
}

.wallet-container .creditcard #cardfront .st7 {
  fill: rgb(255, 255, 255);
}

.wallet-container .creditcard #cardback .st9 {
  fill: rgb(255, 255, 255);
}
</style>
