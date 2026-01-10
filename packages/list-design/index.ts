import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import { checkDependVersion } from '../ui/src/depend'
import VxeListDesignComponent from './src/list-design'
import './render'

import type { ListDesignHandleExport } from '../../types'

export const VxeListDesign = Object.assign({}, VxeListDesignComponent, {
  install (app: App) {
    checkDependVersion()
    app.component(VxeListDesignComponent.name as string, VxeListDesignComponent)
  }
})

const listDesignHandle: ListDesignHandleExport = {
}

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeListDesign)
}
VxeUI.component(VxeListDesignComponent)
VxeUI.listDesignHandle = listDesignHandle

export const ListDesign = VxeListDesign
export default VxeListDesign
