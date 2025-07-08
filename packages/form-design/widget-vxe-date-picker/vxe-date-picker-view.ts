import { PropType, h, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import { WidgetVxeDatePickerFormObjVO } from './vxe-date-picker-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles, VxeFormViewConstructor, VxeFormViewPrivateMethods } from '../../../types'

export const WidgetVxeDatePickerViewComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetVxeDatePickerFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIDatePickerComponent = VxeUI.getComponent('vxe-date-picker')

    const $xeFormView = inject<(VxeFormViewConstructor & VxeFormViewPrivateMethods) | null>('$xeFormView', null)

    const { computeKebabCaseName } = useWidgetName(props)

    const changeEvent = () => {
      const { renderParams } = props
      const { widget } = renderParams
      if ($xeFormView) {
        const itemValue = $xeFormView ? $xeFormView.getItemValue(widget) : null
        $xeFormView.updateWidgetStatus(widget, itemValue)
      }
    }

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const { options } = widget
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormItemComponent, {
        class: ['vxe-form-design--widget-render-form-item', `widget-${kebabCaseName}`],
        title: widget.title,
        field: widget.field,
        itemRender: {}
      }, {
        default () {
          return h(VxeUIDatePickerComponent, {
            modelValue: $xeFormView ? $xeFormView.getItemValue(widget) : null,
            placeholder: options.placeholder,
            onChange: changeEvent,
            'onUpdate:modelValue' (val) {
              if ($xeFormView) {
                $xeFormView.setItemValue(widget, val)
              }
            }
          })
        }
      })
    }
  }
})
