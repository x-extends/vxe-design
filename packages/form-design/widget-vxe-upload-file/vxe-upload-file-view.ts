import { PropType, h, inject } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import { WidgetVxeUploadFileFormObjVO } from './vxe-upload-file-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles, VxeFormViewConstructor, VxeFormViewPrivateMethods } from '../../../types'

export const WidgetVxeUploadFileViewComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetViewParams<WidgetVxeUploadFileFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIUploadComponent = VxeUI.getComponent('vxe-upload')

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
          return h(VxeUIUploadComponent, {
            modelValue: $xeFormView ? $xeFormView.getItemValue(widget) : null,
            mode: 'all',
            multiple: options.multiple,
            limitCount: options.limitCount,
            limitSize: options.limitSize,
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
