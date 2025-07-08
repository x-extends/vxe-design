import { h, PropType, inject, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getIcon, getI18n } from '@vxe-ui/core'

import type { VxeFormDesignDefines, VxeFormDesignConstructor, VxeFormDesignPrivateMethods } from '../../../types'

export const DefaultSettingFormComponent = defineVxeComponent({
  name: 'DefaultSettingForm',
  props: {
    formData: {
      type: Object as PropType<VxeFormDesignDefines.DefaultSettingFormDataObjVO>,
      default: () => ({})
    }
  },
  emits: [],
  setup (props) {
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')
    const VxeUIFormItemComponent = VxeUI.getComponent('vxe-form-item')
    const VxeUISwitchComponent = VxeUI.getComponent('vxe-switch')
    const VxeUITextComponent = VxeUI.getComponent('vxe-form')

    const $xeFormDesign = inject<(VxeFormDesignConstructor & VxeFormDesignPrivateMethods) | null>('$xeFormDesign', null)

    if (!$xeFormDesign) {
      return () => []
    }

    const { props: formDesignProps } = $xeFormDesign

    return () => {
      const { formData } = props

      return h(VxeUIFormComponent, {
        data: formData,
        span: 24,
        vertical: true,
        titleBold: true
      }, {
        default () {
          const { showPc, showMobile } = formDesignProps
          return [
            h(VxeUIFormItemComponent, {
              title: getI18n('vxe.formDesign.formName'),
              field: 'title',
              itemRender: { name: 'VxeInput', props: { placeholder: getI18n('vxe.formDesign.defFormTitle') } }
            }),
            showPc && showMobile
              ? h(VxeUIFormItemComponent, {
                title: getI18n('vxe.formDesign.widgetProp.displaySetting.name')
              }, {
                default () {
                  return [
                    h('div', {
                      class: 'vxe-form-design--widget-form-item-devices'
                    }, [
                      h('div', {
                        class: 'vxe-form-design--widget-form-item-pc'
                      }, [
                        h(VxeUITextComponent, {
                          icon: getIcon().FORM_DESIGN_PROPS_PC,
                          content: getI18n('vxe.formDesign.widgetProp.displaySetting.pc')
                        }),
                        h(VxeUISwitchComponent, {
                          modelValue: formData.pcVisible,
                          openLabel: getI18n('vxe.formDesign.widgetProp.displaySetting.visible'),
                          closeLabel: getI18n('vxe.formDesign.widgetProp.displaySetting.hidden'),
                          'onUpdate:modelValue' (val) {
                            formData.pcVisible = val as boolean
                          }
                        })
                      ]),
                      h('div', {
                        class: 'vxe-form-design--widget-form-item-mobile'
                      }, [
                        h(VxeUITextComponent, {
                          icon: getIcon().FORM_DESIGN_PROPS_MOBILE,
                          content: getI18n('vxe.formDesign.widgetProp.displaySetting.mobile')
                        }),
                        h(VxeUISwitchComponent, {
                          modelValue: formData.mobileVisible,
                          openLabel: getI18n('vxe.formDesign.widgetProp.displaySetting.visible'),
                          closeLabel: getI18n('vxe.formDesign.widgetProp.displaySetting.hidden'),
                          'onUpdate:modelValue' (val) {
                            formData.mobileVisible = val as boolean
                          }
                        })
                      ])
                    ])
                  ]
                }
              })
              : createCommentVNode()
          ]
        }
      })
    }
  }
})
