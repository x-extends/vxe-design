import { VueConstructor } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import VxeFormViewComponent from '../form-design/src/form-view'

export const VxeFormView = Object.assign(VxeFormViewComponent, {
  install: function (app: VueConstructor) {
    app.component(VxeFormViewComponent.name as string, VxeFormViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFormView)
}
VxeUI.component(VxeFormViewComponent)

export const FormView = VxeFormView
export default VxeFormView
