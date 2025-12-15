import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import { checkDependVersion } from '../ui/src/depend'
import VxeFormDesignComponent from './src/form-design'

export const VxeFormDesign = Object.assign({}, VxeFormDesignComponent, {
  install (app: VueConstructor) {
    checkDependVersion()
    app.component(VxeFormDesignComponent.name as string, VxeFormDesignComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFormDesign)
}
VxeUI.component(VxeFormDesignComponent)

export const FormDesign = VxeFormDesign
export default VxeFormDesign
