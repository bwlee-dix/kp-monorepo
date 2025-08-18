<script setup lang="ts">
export interface VCollapseItem {
  title: string
  content?: string
  value?: any
  url?: string
  [key: string]: any
}
export interface VCollapseProps {
  items: VCollapseItem[]
  itemOpen?: number
  withChevron?: boolean
}

const props = withDefaults(defineProps<VCollapseProps>(), {
  items: () => [],
  itemOpen: undefined,
})

const internalItemOpen = ref<number | undefined>(props.itemOpen)

const toggle = (key: number) => {
  if (internalItemOpen.value === key) {
    internalItemOpen.value = undefined
    return
  }

  internalItemOpen.value = key
}
</script>

<template>
  <details
    v-for="(item, key) in items"
    :key="key"
    :class="[withChevron && 'has-chevron']"
    :open="internalItemOpen === key || undefined"
    class="collapse-sub"
  >
    <slot name="collapse-item" :item="item" :index="key" :toggle="toggle">
      <summary
        class="collapse-header"
        tabindex="0"
        role="button"
        @keydown.space.prevent="() => toggle(key)"
        @click.prevent="() => toggle(key)"
      >
        <div class="collapse-head-info">
          <div class="collapse-icon">
            <VIcon v-if="withChevron" icon="feather:chevron-down" />
          </div>
        </div>
        <h3>
          <slot name="collapse-item-summary" :item="item" :index="key" :toggle="toggle">
            {{ item.title }}
          </slot>
        </h3>
      </summary>
      <div class="collapse-content">
        <slot name="collapse-item-content" :item="item" :index="key" :toggle="toggle">
          <div class="collapse-content-custom">
            <slot :name="`item-${key}-content`" :item="item" :toggle="toggle" />
          </div>
        </slot>
      </div>
    </slot>
  </details>
</template>

<style lang="scss" scoped>
@import '/@dds/scss/abstracts/all';

.collapse-sub {
  &.has-chevron {
    .collapse-sub {
      padding: 0;
    }

    &[open] {
      .collapse-header {
        .collapse-icon {
          transform: rotate(calc(var(--transform-direction) * 180deg));
        }
      }

      .collapse-content {
        display: block;

        .collapse-content-custom {
          padding: 16px 24px;
        }
      }
    }
  }

  .collapse-header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    cursor: pointer;

    h3 {
      font-family: var(--font-alt);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--dark-text);
    }

    .collapse-head-info {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .collapse-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      width: 16px;
      background: var(--white);
      border-radius: var(--radius-rounded);
      border: 1px solid transparent;
      transition: all 0.3s;

      > span {
        display: block;
        height: 16px;
        width: 16px;
      }

      svg {
        height: 16px;
        width: 16px;
        color: var(--light-text);
      }
    }
  }

  .collapse-content {
    display: none;
    color: var(--light-text);
    font-family: var(--font);

    p:not(:last-child) {
      margin-bottom: 12px;
    }

    .collapse-content-custom {
      display: flex;
      flex-direction: column;
      gap: 8px;

      div {
        color: var(--light-text) !important;
      }
    }
  }
}

.is-dark {
  .collapse-sub {
    &[open] {
      .collapse-header {
        .collapse-icon {
          background: var(--dark-sidebar-light-2);
          border-color: var(--dark-sidebar-light-4) !important;
        }
      }
    }

    .collapse-header {
      h3 {
        color: var(--dark-dark-text);
      }

      .collapse-icon {
        background: var(--dark-sidebar-light-6);
        border-color: var(--dark-sidebar-light-6);
      }
    }
  }
}
</style>
