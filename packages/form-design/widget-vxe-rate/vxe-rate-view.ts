import { PropType, h, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import { WidgetVxeRateFormObjVO } from './vxe-rate-data'
import { useWidgetName } from '../src/use'

import type { VxeGlobalRendererHandles, VxeFormViewConstructor, VxeFormViewPrivateMethods } from '../../../types'

export const WidgetVxeRateViewComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetVxeRateFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIRateComponent = VxeUI.getComponent('vxe-rate')

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
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormItemComponent, {
        class: ['vxe-form-design--widget-render-form-item', `widget-${kebabCaseName}`],
        field: widget.field,
        title: widget.title,
        itemRender: {}
      }, {
        default () {
          return h(VxeUIRateComponent, {
            modelValue: $xeFormView ? $xeFormView.getItemValue(widget) : null,
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
