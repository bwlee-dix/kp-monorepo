import { createApp as createClientApp } from 'vue'

import { createHead } from '@unhead/vue'
import { InferSeoMetaPlugin } from '@unhead/addons'
import { createPinia } from 'pinia'
import { createRouter } from './router'
import App from './App.vue'
import './styles'

export type AppContext = Awaited<ReturnType<typeof createApp>>
export type KPPlugin = (kp: AppContext) => void | Promise<void>

const plugins = import.meta.glob<{ default: KPPlugin }>('/src/vuero/plugins/*.ts')

export function definePlugin(plugin: KPPlugin) {
  return plugin
}

export async function createApp() {
  const app = createClientApp(App)
  const router = createRouter()

  const head = createHead({
    plugins: [InferSeoMetaPlugin()],
  })
  app.use(head)

  const pinia = createPinia()
  app.use(pinia)

  const kp = {
    app,
    router,
    head,
    pinia,
  }

  app.provide('kp', kp)

  for (const path in plugins) {
    try {
      const { default: plugin } = await plugins[path]()
      await plugin(kp)
    } catch (error) {
      console.error(`Error while loading plugin "${path}".`)
      console.error(error)
    }
  }

  app.use(kp.router)

  return kp
}
