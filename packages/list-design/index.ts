import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeListDesignComponent from './src/list-design'

export const VxeListDesign = Object.assign({}, VxeListDesignComponent, {
  install (app: VueConstructor) {
    app.component(VxeListDesignComponent.name as string, VxeListDesignComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeListDesign)
}
VxeUI.component(VxeListDesignComponent)

export const ListDesign = VxeListDesign
export default VxeListDesign
