import { VueConstructor } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import VxeListViewComponent from '../list-design/src/list-view'

export const VxeListView = Object.assign(VxeListViewComponent, {
  install: function (app: VueConstructor) {
    app.component(VxeListViewComponent.name as string, VxeListViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeListView)
}
VxeUI.component(VxeListViewComponent)

export const ListView = VxeListView
export default VxeListView
