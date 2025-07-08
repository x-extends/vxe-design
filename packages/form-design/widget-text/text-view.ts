import { PropType, h } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import { WidgetTextFormObjVO } from './text-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles } from '../../../types'

export const WidgetTextViewComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetTextFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')

    const { computeKebabCaseName } = useWidgetName(props)

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const { options } = widget
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormItemComponent, {
        class: ['vxe-form-design--widget-render-form-item', `widget-${kebabCaseName}`],
        align: options.align
      }, {
        default () {
          return h('div', {
            style: {
              fontSize: options.fontSize,
              fontWeight: options.bold ? 'bold' : ''
            }
          }, widget.title)
        }
      })
    }
  }
})
