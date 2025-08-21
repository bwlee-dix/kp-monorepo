import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type ActivePanelId = 'none' | 'search' | 'wallet'

export const usePanel = defineStore('panels', () => {
  const active = useStorage<ActivePanelId>('active-panel', 'none')

  function setActive(panelId: ActivePanelId) {
    active.value = panelId
  }

  function close() {
    active.value = 'none'
  }

  return {
    active,
    setActive,
    close,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePanel, import.meta.hot))
}
