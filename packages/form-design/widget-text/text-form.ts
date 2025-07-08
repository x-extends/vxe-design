import { PropType, h, ref } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI, getI18n } from '@vxe-ui/core'
import { WidgetTextFormObjVO } from './text-data'
import { useWidgetName } from '../../form-design/src/use'

import type { VxeGlobalRendererHandles } from '../../../types'

const getFontSizeOptions = () => {
  return XEUtils.range(12, 27).map((num) => {
    return { label: `${num}px`, value: `${num}px` }
  })
}

const getAlignOptions = () => {
  return [
    { label: getI18n('vxe.formDesign.widgetProp.textProp.alignLeft'), value: '' },
    { label: getI18n('vxe.formDesign.widgetProp.textProp.alignCenter'), value: 'center' },
    { label: getI18n('vxe.formDesign.widgetProp.textProp.alignRight'), value: 'right' }
  ]
}

const getBoldOptions = () => {
  return [
    { label: getI18n('vxe.formDesign.widgetProp.textProp.fontNormal'), value: false },
    { label: getI18n('vxe.formDesign.widgetProp.textProp.fontBold'), value: true }
  ]
}

export const WidgetTextFormComponent = defineVxeComponent({
  props: {
    renderOpts: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewOptions>,
      default: () => ({})
    },
    renderParams: {
      type: Object as PropType<VxeGlobalRendererHandles.RenderFormDesignWidgetFormViewParams<WidgetTextFormObjVO>>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUIInputComponent = VxeUI.getComponent('vxe-input')

    const { computeKebabCaseName } = useWidgetName(props)

    const alignOpts = ref(getAlignOptions())
    const boldOpts = ref(getBoldOptions())
    const fontSizeOpts = ref(getFontSizeOptions())

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
              title: getI18n('vxe.formDesign.widgetProp.textProp.name')
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
              title: getI18n('vxe.formDesign.widgetProp.textProp.boldTitle'),
              field: 'bold',
              itemRender: { name: 'VxeRadioGroup', options: boldOpts.value }
            }),
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.textProp.alignTitle'),
              field: 'align',
              itemRender: { name: 'VxeRadioGroup', options: alignOpts.value }
            }),
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.widgetProp.textProp.sizeTitle'),
              field: 'fontSize',
              itemRender: { name: 'VxeSelect', options: fontSizeOpts.value }
            })
          ]
        }
      })
    }
  }
})
