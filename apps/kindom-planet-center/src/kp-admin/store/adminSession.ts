import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export type AdminData = Record<string, any> | null

export const useAdminSession = defineStore('adminSession', () => {
  const token = useStorage('token', '')

  const admin = ref<Partial<AdminData>>()
  const loading = ref(true)

  const isLoggedIn = computed(() => token.value !== undefined && token.value !== '')

  function setAdmin(newAdmin: Partial<AdminData>) {
    admin.value = newAdmin
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  function setLoading(newLoading: boolean) {
    loading.value = newLoading
  }

  async function logoutAdmin() {
    token.value = undefined
    admin.value = undefined
  }

  return {
    admin,
    token,
    isLoggedIn,
    loading,
    logoutAdmin,
    setAdmin,
    setToken,
    setLoading,
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminSession, import.meta.hot))
}
