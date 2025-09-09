import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFormDesignComponent from './src/form-design'

export const VxeFormDesign = Object.assign({}, VxeFormDesignComponent, {
  install (app: VueConstructor) {
    app.component(VxeFormDesignComponent.name as string, VxeFormDesignComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFormDesign)
}
VxeUI.component(VxeFormDesignComponent)

export const FormDesign = VxeFormDesign
export default VxeFormDesign
