import { handleGetFormDesignWidgetName } from '../render/util'

import type { VxeFormItemPropTypes } from 'vxe-pc-ui'
import type { VxeGlobalRendererHandles } from '../../../types'

export interface WidgetTextFormObjVO {
  color: string
  align: VxeFormItemPropTypes.Align
  bold: boolean
  fontSize: string
}

export const getWidgetTextConfig = (): VxeGlobalRendererHandles.CreateFormDesignWidgetConfigObj<WidgetTextFormObjVO> => {
  return {
    title: handleGetFormDesignWidgetName,
    icon: 'vxe-icon-text',
    group: 'layout',
    options: {
      color: '',
      align: '',
      bold: false,
      fontSize: ''
    }
  }
}
