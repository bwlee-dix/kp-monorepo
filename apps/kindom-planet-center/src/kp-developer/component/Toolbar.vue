<script setup lang="ts">
import { useDarkmode } from '/@dds/stores/darkmode'
import { usePanels } from '/@dds/stores/panels'

const darkmode = useDarkmode()
const panels = usePanels()
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-link">
      <label
        tabindex="0"
        class="dark-mode"
        role="button"
        @keydown.space.prevent="(e) => (e.target as HTMLLabelElement).click()"
      >
        <input
          data-cy="dark-mode-toggle"
          type="checkbox"
          :checked="!darkmode.isDark"
          @change="darkmode.onChange"
        />
      </label>
    </div>

    <slot />
  </div>
</template>
