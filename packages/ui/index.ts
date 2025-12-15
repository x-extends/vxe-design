import { VxeUI } from '@vxe-ui/core'

const { setConfig, setIcon } = VxeUI

VxeUI.designVersion = process.env.VUE_APP_VXE_VERSION as string

setConfig({
  formDesign: {
    height: 400,
    showHeader: true,
    showPc: true
  },
  formView: {},
  listDesign: {
    height: 400,
    showPc: true
  },
  listView: {}
})

const iconPrefix = 'vxe-icon-'

setIcon({
  // form-design
  FORM_DESIGN_STYLE_SETTING: iconPrefix + 'layout',
  FORM_DESIGN_PROPS_PC: iconPrefix + 'pc',
  FORM_DESIGN_PROPS_MOBILE: iconPrefix + 'mobile',
  FORM_DESIGN_PROPS_ADD: iconPrefix + 'add',
  FORM_DESIGN_PROPS_EDIT: iconPrefix + 'edit',
  FORM_DESIGN_WIDGET_ADD: iconPrefix + 'square-plus-fill',
  FORM_DESIGN_WIDGET_COPY: iconPrefix + 'copy',
  FORM_DESIGN_WIDGET_DELETE: iconPrefix + 'delete',
  FORM_DESIGN_WIDGET_SWAP_LR: iconPrefix + 'swap',
  FORM_DESIGN_WIDGET_OPTION_DELETE: iconPrefix + 'delete',
  FORM_DESIGN_WIDGET_OPTION_EXPAND_OPEN: iconPrefix + 'square-plus',
  FORM_DESIGN_WIDGET_OPTION_EXPAND_CLOSE: iconPrefix + 'square-minus',

  // list-design
  LIST_DESIGN_FIELD_SETTING: iconPrefix + 'custom-column',
  LIST_DESIGN_LIST_SETTING: iconPrefix + 'menu',
  LIST_DESIGN_LIST_SETTING_SEARCH_DELETE: iconPrefix + 'delete',
  LIST_DESIGN_LIST_SETTING_ACTIVE_DELETE: iconPrefix + 'delete'
})

export {
  VxeUI
}
export default VxeUI
