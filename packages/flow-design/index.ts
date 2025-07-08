import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFlowDesignComponent from './src/flow-design'

export const VxeFlowDesign = Object.assign({}, VxeFlowDesignComponent, {
  install (app: App) {
    app.component(VxeFlowDesignComponent.name as string, VxeFlowDesignComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFlowDesign)
}
VxeUI.component(VxeFlowDesignComponent)

export const FlowDesign = VxeFlowDesign
export default VxeFlowDesign
