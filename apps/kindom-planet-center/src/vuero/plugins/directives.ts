import { definePlugin } from '/@src/app'
import { vPreloadLink } from '/@vuero/directives/preload-link'
import { vTooltip } from '/@vuero/directives/tooltip'
import { vBackground } from '/@vuero/directives/background'

export default definePlugin(({ app }) => {
  // register global v-preload-link directive
  app.directive('preload-link', vPreloadLink)

  // register global v-tootltip directive
  app.directive('tooltip', vTooltip)

  // register global v-background directive
  app.directive('background', vBackground)
})
