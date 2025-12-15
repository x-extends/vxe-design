import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import { checkDependVersion } from '../ui/src/depend'
import VxeFormViewComponent from '../form-design/src/form-view'

export const VxeFormView = Object.assign(VxeFormViewComponent, {
  install (app: VueConstructor) {
    checkDependVersion()
    app.component(VxeFormViewComponent.name as string, VxeFormViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFormView)
}
VxeUI.component(VxeFormViewComponent)

export const FormView = VxeFormView
export default VxeFormView
