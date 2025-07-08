import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeListViewComponent from '../list-design/src/list-view'

export const VxeListView = Object.assign(VxeListViewComponent, {
  install: function (app: App) {
    app.component(VxeListViewComponent.name as string, VxeListViewComponent)
  }
})

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeListView)
}
VxeUI.component(VxeListViewComponent)

export const ListView = VxeListView
export default VxeListView
