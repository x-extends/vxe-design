import { h, ref } from 'vue'
import { VxeUI } from '@vxe-ui/core'

import type { VxeGlobalRendererHandles } from '../../../../types'

export interface WidgetDefaultValueObjVO<V = any> {
  type: string
  value: V
}

export function useWidgetPropDefaultValue (props: {
  readonly renderOpts: VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions
  readonly renderParams: VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<{
    defaultValue: WidgetDefaultValueObjVO
  }>
}) {
  const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
  const VxeUISelectComponent = VxeUI.getComponent('vxe-select')
  const VxeUIInputComponent = VxeUI.getComponent('vxe-input')

  const defValOptions = ref([
    { value: 'custom', label: '自定义' }
    // { value: 'linkage', label: '数据联动' }
  ])

  return {
    renderDefaultValueFormItem () {
      const { renderParams } = props
      const { widget } = renderParams
      const { defaultValue } = widget.options
      return h(VxeUIFormItemComponent, {
        title: '默认值'
      }, {
        default () {
          return [
            h(VxeUISelectComponent, {
              modelValue: defaultValue.type,
              options: defValOptions.value,
              'onUpdate:modelValue' (val) {
                defaultValue.type = val as string
              }
            }),
            h(VxeUIInputComponent, {
              modelValue: defaultValue.value,
              'onUpdate:modelValue' (val) {
                defaultValue.value = val
              }
            })
          ]
        }
      })
    }
  }
}
