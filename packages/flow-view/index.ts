import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import { checkDependVersion } from '../ui/src/depend'
import VxeFlowViewComponent from '../flow-design/src/flow-view'

export const VxeFlowView = Object.assign({}, VxeFlowViewComponent, {
  install (app: VueConstructor) {
    checkDependVersion()
    app.component(VxeFlowViewComponent.name as string, VxeFlowViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFlowView)
}
VxeUI.component(VxeFlowViewComponent)

export const FlowView = VxeFlowView
export default VxeFlowView
