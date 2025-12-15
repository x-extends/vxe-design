import { VueConstructor } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import { checkDependVersion } from '../ui/src/depend'
import VxeListViewComponent from '../list-design/src/list-view'

export const VxeListView = Object.assign(VxeListViewComponent, {
  install (app: VueConstructor) {
    checkDependVersion()
    app.component(VxeListViewComponent.name as string, VxeListViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeListView)
}
VxeUI.component(VxeListViewComponent)

export const ListView = VxeListView
export default VxeListView
