import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type ActivePanelId = 'none' | 'wallet'

export const useKpPanels = defineStore('kp-panels', () => {
  const active = useStorage<ActivePanelId>('wallet', 'none')

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
  import.meta.hot.accept(acceptHMRUpdate(useKpPanels, import.meta.hot))
}
