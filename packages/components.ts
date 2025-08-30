import { App } from 'vue'
import VxeUI from './ui'

import VxeFlowDesign from './flow-design'
import VxeFlowView from './flow-view'
import VxeFormDesign from './form-design'
import VxeFormView from './form-view'
import VxeListDesign from './list-design'
import VxeListView from './list-view'

import type { VxeGlobalConfig } from 'vxe-pc-ui'

const { setConfig } = VxeUI

const components = [
  VxeFlowDesign,
  VxeFlowView,
  VxeFormDesign,
  VxeFormView,
  VxeListDesign,
  VxeListView
]

export function install (app: App, options?: VxeGlobalConfig) {
  setConfig(options)

  components.forEach(component => app.use(component))
}

export { VxeUI }

// Components
export * from './flow-design'
export * from './flow-view'
export * from './form-design'
export * from './form-view'
export * from './list-design'
export * from './list-view'
