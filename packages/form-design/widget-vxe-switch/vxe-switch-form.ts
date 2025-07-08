import { PropType, h } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n } from '@vxe-ui/core'
import { WidgetVxeSwitchFormObjVO } from './vxe-switch-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles } from '../../../types'

export const WidgetVxeSwitchFormComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetVxeSwitchFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIInputComponent = VxeUI.getComponent('vxe-input')

    const { computeKebabCaseName } = useWidgetName(props)

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormComponent, {
        class: ['vxe-form-design--widget-render-form-wrapper', `widget-${kebabCaseName}`],
        vertical: true,
        span: 24,
        titleBold: true,
        titleOverflow: true,
        data: widget.options
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
            })
          ]
        }
      })
    }
  }
})
