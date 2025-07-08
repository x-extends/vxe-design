import { PropType, h, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n } from '@vxe-ui/core'
import { useWidgetName } from '../../form-design/src/use'
import { WidgetSubtableFormObjVO } from './subtable-data'

import type { VxeGlobalRendererHandles, VxeFormDesignConstructor, VxeFormDesignPrivateMethods } from '../../../types'

export const WidgetSubtableFormComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetSubtableFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIInputComponent = VxeUI.getComponent('vxe-input')
    const VxeUISwitchComponent = VxeUI.getComponent('vxe-switch')

    const $xeFormDesign = inject<(VxeFormDesignConstructor & VxeFormDesignPrivateMethods) | null>('$xeFormDesign', null)

    if (!$xeFormDesign) {
      return () => []
    }

    const { computeKebabCaseName } = useWidgetName(props)

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const { options } = widget
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormComponent, {
        class: `vxe-form-design--widget-${kebabCaseName}-form`,
        vertical: true,
        span: 24,
        titleBold: true,
        titleOverflow: true,
        data: options
      }, {
        default () {
          return [
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.name')
            }, {
              default () {
                return h(VxeUIInputComponent, {
                  modelValue: widget.title,
                  'onUpdate:modelValue' (val) {
                    widget.title = val as string
                  }
                })
              }
            }),
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.subtableProp.showCheckbox'),
              field: 'showCheckbox'
            }, {
              default () {
                return h(VxeUISwitchComponent, {
                  modelValue: options.showCheckbox,
                  'onUpdate:modelValue' (val) {
                    options.showCheckbox = val as boolean
                  }
                })
              }
            })
          ]
        }
      })
    }
  }
})
