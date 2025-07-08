import { App } from 'vue'
import { VxeUI } from '@vxe-ui/core'
import VxeFormDesignComponent from './src/form-design'
import { useWidgetView, useWidgetName, useSubtableView, useWidgetPropDataSource } from './src/use'
import './render'

import { FormDesignHandleExport } from '../../types'

export const VxeFormDesign = Object.assign({}, VxeFormDesignComponent, {
  install (app: App) {
    app.component(VxeFormDesignComponent.name as string, VxeFormDesignComponent)
  }
})

const formDesignHandle: FormDesignHandleExport = {
  useWidgetName,
  useWidgetView,
  useSubtableView,
  useWidgetPropDataSource
}

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.use(VxeFormDesign)
}
VxeUI.component(VxeFormDesignComponent)
VxeUI.formDesignHandle = formDesignHandle

/**
 * 已废弃，请使用 formDesignHandle
 * @deprecated
 */
VxeUI.formDesign = formDesignHandle

export const FormDesign = VxeFormDesign
export default VxeFormDesign
