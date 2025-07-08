import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFlowViewComponent from '../flow-design/src/flow-view'

export const VxeFlowView = Object.assign({}, VxeFlowViewComponent, {
  install (app: App) {
    app.component(VxeFlowViewComponent.name as string, VxeFlowViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFlowView)
}
VxeUI.component(VxeFlowViewComponent)

export const FlowView = VxeFlowView
export default VxeFlowView
