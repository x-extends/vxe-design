import { VxeUI } from '@vxe-ui/core'

const { getI18n } = VxeUI

export const getFormDesignWidgetName = (name: string) => {
  return getI18n(`vxe.formDesign.widget.component.${name}`)
}

export const handleGetFormDesignWidgetName = (params: { name: string }) => {
  return getFormDesignWidgetName(params.name)
}
