import { PropType, createCommentVNode, h, ref } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n } from '@vxe-ui/core'
import { WidgetVxeUploadImageFormObjVO } from './vxe-upload-image-data'
import { getLimitSizeOptions } from '../widget-vxe-upload-file/vxe-upload-file-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles } from '../../../types'

export const WidgetVxeUploadImageFormComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetVxeUploadImageFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIInputComponent = VxeUI.getComponent('vxe-input')
    const VxeUISwitchComponent = VxeUI.getComponent('vxe-switch')

    const { computeKebabCaseName } = useWidgetName(props)

    const limitSizeOptions = ref(getLimitSizeOptions())

    return () => {
      const { renderParams } = props
      const { widget } = renderParams
      const { options } = widget
      const kebabCaseName = computeKebabCaseName.value

      return h(VxeUIFormComponent, {
        class: ['vxe-form-design--widget-render-form-wrapper', `widget-${kebabCaseName}`],
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
              title: getI18n('vxe.formDesign.widgetProp.uploadProp.multiImg'),
              field: 'multiple',
              itemRender: { name: 'VxeSwitch' }
            }),
            options.multiple
              ? h(VxeUIFormItemComponent, {
                title: getI18n('vxe.formDesign.widgetProp.uploadProp.limitImgCount'),
                field: 'limitCount',
                itemRender: { name: 'VxeNumberInput', props: { type: 'integer', min: 1, clearable: true } }
              })
              : createCommentVNode(),
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.uploadProp.limitImgSize'),
              field: 'limitSize',
              itemRender: { name: 'VxeSelect', options: limitSizeOptions.value }
            }),
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.required')
            }, {
              default () {
                return h(VxeUISwitchComponent, {
                  modelValue: widget.required,
                  'onUpdate:modelValue' (val) {
                    widget.required = val as boolean
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
