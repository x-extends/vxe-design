import { h, inject, createCommentVNode, watch, ref } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n, renderer } from '@vxe-ui/core'
import { getSlotVNs } from '../../ui/src/vn'
import { DefaultSettingFormComponent } from './default-setting-form'

import type { VxeFormDesignConstructor, VxeFormDesignPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'FormDesignLayoutSetting',
  props: {},
  emits: [],
  setup () {
    const VxeUITabsComponent = VxeUI.getComponent('vxe-tabs')
    const VxeUITabPaneComponent = VxeUI.getComponent('vxe-tab-pane')

    const $xeFormDesign = inject<(VxeFormDesignConstructor & VxeFormDesignPrivateMethods) | null>('$xeFormDesign', null)

    if (!$xeFormDesign) {
      return () => []
    }

    const { props: formDesignProps, reactData: formDesignReactData } = $xeFormDesign

    const activeTab = ref(1)

    const renderSettingWidgetForm = () => {
      const { activeWidget } = formDesignReactData
      if (activeWidget) {
        const compConf = renderer.get(activeWidget.name)
        const renderWidgetFormView = compConf ? compConf.renderFormDesignWidgetFormView : null
        if (renderWidgetFormView) {
          const isEditMode = true
          return h('div', {
            class: 'vxe-form-design--custom-widget-form-view'
          }, getSlotVNs(renderWidgetFormView(activeWidget, { isEditMode, isViewMode: !isEditMode, widget: activeWidget, $formDesign: $xeFormDesign, $formView: null })))
        }
      }
      return createCommentVNode()
    }

    const renderSettingConfigForm = () => {
      const { formRender } = formDesignProps
      const { formData } = formDesignReactData
      if (formRender) {
        const compConf = renderer.get(formRender.name)
        const renderSettingView = compConf ? compConf.renderFormDesignSettingFormView : null
        if (renderSettingView) {
          return h('div', {
            class: 'vxe-form-design--custom-setting-form-view'
          }, getSlotVNs(renderSettingView({}, { $formDesign: $xeFormDesign })))
        }
      }
      return h(DefaultSettingFormComponent, {
        formData
      })
    }

    watch(() => formDesignReactData.activeWidget, () => {
      activeTab.value = 1
    })

    return () => {
      return h('div', {
        class: 'vxe-form-design--setting'
      }, [
        h('div', {
          class: 'vxe-form-design--setting-form'
        }, [
          h(VxeUITabsComponent, {
            modelValue: activeTab.value,
            titleWidth: '50%',
            titleAlign: 'center',
            padding: true,
            class: 'vxe-form-design--setting-form-tabs',
            'onUpdate:modelValue' (val) {
              activeTab.value = val as number
            }
          }, {
            default () {
              return [
                h(VxeUITabPaneComponent, {
                  title: getI18n('vxe.formDesign.widgetPropTab'),
                  name: 1
                }, {
                  default () {
                    return renderSettingWidgetForm()
                  }
                }),
                h(VxeUITabPaneComponent, {
                  title: getI18n('vxe.formDesign.widgetFormTab'),
                  name: 2
                }, {
                  default () {
                    return renderSettingConfigForm()
                  }
                })
              ]
            }
          })
        ])
      ])
    }
  }
})
