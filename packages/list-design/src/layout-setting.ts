import { h, ref } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n, getIcon } from '@vxe-ui/core'
import { DefaultFieldSettingFormComponent, DefaultParameterSettingFormComponent } from './default-setting-form'

export default defineVxeComponent({
  name: 'ListDesignLayoutSetting',
  props: {},
  emits: [],
  setup () {
    const VxeUITabsComponent = VxeUI.getComponent('vxe-tabs')
    const VxeUITabPaneComponent = VxeUI.getComponent('vxe-tab-pane')

    const activeTab = ref(1)

    return () => {
      return h('div', {
        class: 'vxe-list-design--setting'
      }, [
        h('div', {
          class: 'vxe-list-design--setting-form'
        }, [
          h(VxeUITabsComponent, {
            modelValue: activeTab.value,
            titleWidth: '50%',
            titleAlign: 'center',
            padding: true,
            class: 'vxe-list-design--setting-form-tabs',
            'onUpdate:modelValue' (val) {
              activeTab.value = val as number
            }
          }, {
            default () {
              return [
                h(VxeUITabPaneComponent, {
                  title: getI18n('vxe.listDesign.fieldSettingTab'),
                  icon: getIcon().LIST_DESIGN_FIELD_SETTING,
                  name: 1
                }, {
                  default () {
                    return h(DefaultFieldSettingFormComponent)
                  }
                }),
                h(VxeUITabPaneComponent, {
                  title: getI18n('vxe.listDesign.listSettingTab'),
                  icon: getIcon().LIST_DESIGN_LIST_SETTING,
                  name: 2
                }, {
                  default () {
                    return h(DefaultParameterSettingFormComponent)
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
