import { ref, h, PropType, reactive, provide, watch, nextTick, ComponentOptions, createCommentVNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getConfig, getIcon, getI18n, renderer, useSize, createEvent, renderEmptyElement } from '@vxe-ui/core'
import { toCssUnit } from '../../ui/src/dom'
import { FormDesignWidgetInfo, getWidgetConfig, getWidgetConfigCustomGroup, configToWidget } from './widget-info'
import XEUtils from 'xe-utils'
import LayoutWidgetComponent from './layout-widget'
import LayoutPreviewComponent from './layout-preview'
import LayoutSettingComponent from './layout-setting'
import LayoutStyleComponent from './layout-style'
import { getDefaultSettingFormData } from './default-setting-data'

import type { VxeFormDesignDefines, VxeFormDesignPropTypes, VxeFormDesignEmits, FormDesignInternalData, FormDesignReactData, FormDesignPrivateRef, VxeFormDesignPrivateComputed, VxeFormDesignConstructor, VxeFormDesignPrivateMethods, FormDesignMethods, FormDesignPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'VxeFormDesign',
  props: {
    size: {
      type: String as PropType<VxeFormDesignPropTypes.Size>,
      default: () => getConfig().formDesign.size || getConfig().size
    },
    config: Object as PropType<VxeFormDesignPropTypes.Config>,
    height: {
      type: [String, Number] as PropType<VxeFormDesignPropTypes.Height>,
      default: () => getConfig().formDesign.height
    },
    widgets: {
      type: Array as PropType<VxeFormDesignPropTypes.Widgets>,
      default: () => XEUtils.clone(getConfig().formDesign.widgets) || []
    },
    showHeader: {
      type: Boolean as PropType<VxeFormDesignPropTypes.ShowHeader>,
      default: () => getConfig().formDesign.showHeader
    },
    showPc: {
      type: Boolean as PropType<VxeFormDesignPropTypes.ShowPc>,
      default: () => getConfig().formDesign.showPc
    },
    showMobile: {
      type: Boolean as PropType<VxeFormDesignPropTypes.ShowMobile>,
      default: () => getConfig().formDesign.showMobile
    },
    formRender: Object as PropType<VxeFormDesignPropTypes.FormRender>
  },
  emits: [
    'click-widget',
    'add-widget',
    'copy-widget',
    'remove-widget',
    'drag-widget'
  ] as VxeFormDesignEmits,
  setup (props, context) {
    const VxeUIButtonComponent = VxeUI.getComponent('vxe-button')

    const { emit, slots } = context

    const xID = XEUtils.uniqueId()

    const refElem = ref<HTMLDivElement>()
    const refLayoutStyle = ref<any>()

    const { computeSize } = useSize(props)

    const reactData = reactive<FormDesignReactData>({
      formData: {} as VxeFormDesignDefines.DefaultSettingFormDataObjVO,
      widgetConfigs: [],
      widgetObjList: [],
      dragWidget: null,
      sortWidget: null,
      activeWidget: null
    })

    const internalData = reactive<FormDesignInternalData>({
    })

    const refMaps: FormDesignPrivateRef = {
      refElem
    }

    const computeMaps: VxeFormDesignPrivateComputed = {
      computeSize
    }

    const $xeFormDesign = {
      xID,
      props,
      context,
      reactData,
      internalData,

      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    } as unknown as VxeFormDesignConstructor & VxeFormDesignPrivateMethods

    const createWidget = (name: string) => {
      return new FormDesignWidgetInfo($xeFormDesign, name, reactData.widgetObjList) as VxeFormDesignDefines.WidgetObjItem
    }

    const createEmptyWidget = () => {
      return new FormDesignWidgetInfo($xeFormDesign, '', reactData.widgetObjList) as VxeFormDesignDefines.WidgetObjItem
    }

    const loadConfig = (config: Partial<VxeFormDesignDefines.FormDesignConfig>) => {
      if (config) {
        const { formConfig, widgetData } = config
        if (formConfig) {
          loadFormConfig(formConfig)
        }
        if (widgetData) {
          loadWidgetData(widgetData)
        }
      }
      const { activeWidget, widgetObjList } = reactData
      if (activeWidget) {
        const rest = XEUtils.findTree(widgetObjList, item => item.id === activeWidget.id, { children: 'children' })
        if (rest) {
          reactData.activeWidget = rest.item
        } else {
          reactData.activeWidget = widgetObjList[0] || null
        }
      } else {
        reactData.activeWidget = widgetObjList[0] || null
      }
      return nextTick()
    }

    const reloadConfig = (config: Partial<VxeFormDesignDefines.FormDesignConfig>) => {
      clearConfig()
      return loadConfig(config)
    }

    const getFormConfig = (): VxeFormDesignPropTypes.FormData => {
      return XEUtils.clone(reactData.formData, true)
    }

    const loadFormConfig = (data: VxeFormDesignPropTypes.FormData) => {
      reactData.formData = Object.assign({}, createSettingForm(), data) as VxeFormDesignDefines.DefaultSettingFormDataObjVO
      return nextTick()
    }

    const getWidgetById = (id: number | string | null | undefined) => {
      const { widgetObjList } = reactData
      if (id) {
        const widgetId = XEUtils.toNumber(id)
        const rest = XEUtils.findTree(widgetObjList, item => item && item.id === widgetId, { children: 'children' })
        if (rest) {
          return rest.item
        }
      }
      return null
    }

    const getWidgetData = (): VxeFormDesignDefines.WidgetObjItem[] => {
      const objList = XEUtils.clone(reactData.widgetObjList, true)
      XEUtils.eachTree(objList, item => {
        item.model.value = null
      }, { children: 'children' })
      return objList
    }

    const loadWidgetData = (widgetData: VxeFormDesignDefines.WidgetObjItem[]) => {
      reactData.widgetObjList = (widgetData || []).map(item => configToWidget(item))
      return nextTick()
    }

    const openStyleSetting = () => {
      const $layoutStyle = refLayoutStyle.value
      if ($layoutStyle) {
        $layoutStyle.openStylePreview()
      }
      return nextTick()
    }

    const clearConfig = () => {
      reactData.widgetObjList = []
      initSettingForm()
      return nextTick()
    }

    const formDesignMethods: FormDesignMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $xeFormDesign }, params))
      },
      createWidget,
      createEmptyWidget,
      getConfig () {
        return {
          formConfig: getFormConfig(),
          widgetData: getWidgetData()
        }
      },
      clearConfig,
      loadConfig,
      reloadConfig,
      getFormConfig,
      loadFormConfig,
      getWidgetById,
      getFormData () {
        const { widgetObjList } = reactData
        const formData: Record<string, any> = {}
        XEUtils.eachTree(widgetObjList, widget => {
          formData[widget.field] = null
        }, { children: 'children' })
        return formData
      },
      getWidgetData,
      loadWidgetData,
      refreshPreviewView () {
        const $layoutStyle = refLayoutStyle.value
        if ($layoutStyle) {
          $layoutStyle.updatePreviewView()
        }
        return nextTick()
      },
      openStyleSetting
    }

    const updateWidgetConfigs = () => {
      const { widgets } = props
      const widgetConfs: VxeFormDesignDefines.WidgetConfigGroup[] = []
      const baseWidgets: VxeFormDesignDefines.WidgetObjItem[] = []
      const layoutWidgets: VxeFormDesignDefines.WidgetObjItem[] = []
      const advancedWidgets: VxeFormDesignDefines.WidgetObjItem[] = []
      const customGroups: VxeFormDesignDefines.WidgetConfigGroup[] = []

      renderer.forEach((item, name) => {
        const { createFormDesignWidgetConfig } = item
        if (createFormDesignWidgetConfig) {
          const widthItem = createWidget(name)
          const widgetConf = getWidgetConfig(name)
          const widgetCustomGroup = getWidgetConfigCustomGroup(name, $xeFormDesign)
          // 如果自定义组
          if (widgetCustomGroup) {
            const cusGroup = customGroups.find(item => item.title === widgetCustomGroup)
            if (cusGroup) {
              cusGroup.children.push(widthItem)
            } else {
              customGroups.push({
                title: widgetCustomGroup,
                children: [widthItem]
              })
            }
          } else {
            switch (widgetConf.group) {
              case 'layout':
                layoutWidgets.push(widthItem)
                break
              case 'advanced':
                advancedWidgets.push(widthItem)
                break
              default:
                // 已废弃 title
                if (!['title'].includes(widthItem.name)) {
                  baseWidgets.push(widthItem)
                }
                break
            }
          }
        }
      })

      if (baseWidgets.length) {
        widgetConfs.push({
          group: 'base',
          children: baseWidgets
        })
      }
      if (layoutWidgets.length) {
        widgetConfs.push({
          group: 'layout',
          children: layoutWidgets
        })
      }
      if (advancedWidgets.length) {
        widgetConfs.push({
          group: 'advanced',
          children: advancedWidgets
        })
      }
      if (customGroups.length) {
        widgetConfs.push(...customGroups)
      }

      if (widgets && widgets.length) {
        reactData.widgetConfigs = props.widgets.map(config => {
          return {
            title: config.customGroup,
            group: config.group,
            children: config.children
              ? config.children.map(name => {
                const widthItem = createWidget(name)
                return widthItem
              })
              : []
          }
        })
      } else {
        reactData.widgetConfigs = widgetConfs
      }
    }

    const validWidgetUnique = (widgetName: string) => {
      const { widgetObjList } = reactData
      const widgetConf = getWidgetConfig(widgetName)
      if (widgetConf.unique) {
        const existWidgetList: VxeFormDesignDefines.WidgetObjItem[] = []
        XEUtils.eachTree(widgetObjList, obj => {
          if (obj.name === widgetName) {
            existWidgetList.push(obj)
          }
        }, { children: 'children' })
        const status = existWidgetList.length < 1
        if (!status) {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              content: getI18n('vxe.formDesign.error.wdFormUni'),
              status: 'error',
              id: 'wdFormUni'
            })
          }
        }
        return status
      }
      return true
    }

    const formDesignPrivateMethods: FormDesignPrivateMethods = {
      validWidgetUnique,
      handleClickWidget (evnt: KeyboardEvent, item: VxeFormDesignDefines.WidgetObjItem) {
        if (item && item.name) {
          evnt.stopPropagation()
          reactData.activeWidget = item
          formDesignMethods.dispatchEvent('click-widget', { widget: item }, evnt)
        }
      },
      handleCopyWidget (evnt: KeyboardEvent, widget: VxeFormDesignDefines.WidgetObjItem) {
        const { widgetObjList } = reactData
        const rest = XEUtils.findTree(widgetObjList, obj => obj.id === widget.id, { children: 'children' })
        if (rest) {
          evnt.stopPropagation()
          if (validWidgetUnique(widget.name)) {
            const { path } = rest
            const rootIndex = Number(path[0])
            const newWidget = createWidget(widget.name)
            // 标题副本
            if (newWidget.title) {
              newWidget.title = getI18n('vxe.formDesign.widget.copyTitle', [`${widget.title}`.replace(getI18n('vxe.formDesign.widget.copyTitle', ['']), '')])
            }
            if (rootIndex >= widgetObjList.length - 1) {
              widgetObjList.push(newWidget)
            } else {
              widgetObjList.splice(rootIndex + 1, 0, newWidget)
            }
            reactData.activeWidget = newWidget
            reactData.widgetObjList = [...widgetObjList]
            formDesignMethods.dispatchEvent('copy-widget', { widget, newWidget }, evnt)
          }
        }
      },
      handleRemoveWidget (evnt: KeyboardEvent, widget: VxeFormDesignDefines.WidgetObjItem) {
        const { widgetObjList } = reactData
        const rest = XEUtils.findTree(widgetObjList, obj => obj.id === widget.id, { children: 'children' })
        if (rest) {
          const { index, parent, items } = rest
          evnt.stopPropagation()
          if (index >= items.length - 1) {
            reactData.activeWidget = items[index - 1]
          } else {
            reactData.activeWidget = items[index + 1] || null
          }
          // 如果是行控件，使用空的控件占位
          if (parent && parent.name === 'row') {
            items[index] = createEmptyWidget()
          } else {
            items.splice(index, 1)
          }
          reactData.widgetObjList = [...widgetObjList]
          formDesignMethods.dispatchEvent('remove-widget', { widget }, evnt)
        }
      }
    }

    const createSettingForm = () => {
      const { formRender, showPc, showMobile } = props
      let conf: Record<string, any> = getDefaultSettingFormData({
        pcVisible: showPc,
        mobileVisible: showMobile
      })
      // 如果为自定义渲染
      if (formRender) {
        const compConf = renderer.get(formRender.name)
        const createFormConfig = compConf ? compConf.createFormDesignSettingFormConfig : null
        conf = (createFormConfig ? createFormConfig({}) : {}) || {}
      }
      return conf as VxeFormDesignDefines.DefaultSettingFormDataObjVO
    }

    const initSettingForm = () => {
      reactData.formData = createSettingForm()
    }

    const openStylePreviewEvent = () => {
      openStyleSetting()
    }

    Object.assign($xeFormDesign, formDesignMethods, formDesignPrivateMethods)

    const renderLayoutHeader = () => {
      const titleSlot = slots.title
      const titlePrefixSlot = slots.titlePrefix || slots['title-prefix']
      const titleSuffixSlot = slots.titleSuffix || slots['title-suffix'] || slots.extra
      return h('div', {
        class: 'vxe-form-design--header-wrapper'
      }, [
        h('div', {
          class: 'vxe-form-design--header-left'
        }, titlePrefixSlot ? titlePrefixSlot({}) : []),
        h('div', {
          class: 'vxe-form-design--header-middle'
        }, titleSlot ? titleSlot({}) : []),
        h('div', {
          class: 'vxe-form-design--header-right'
        }, [
          titleSuffixSlot
            ? h('div', {
              class: 'vxe-form-design--header-extra'
            }, titleSuffixSlot({}))
            : renderEmptyElement($xeFormDesign),
          h('div', {
            class: 'vxe-form-design--header-setting'
          }, [
            h(VxeUIButtonComponent, {
              mode: 'text',
              status: 'primary',
              icon: getIcon().FORM_DESIGN_STYLE_SETTING,
              content: getI18n('vxe.formDesign.styleSetting.btn'),
              onClick: openStylePreviewEvent
            })
          ])
        ])
      ])
    }

    const renderVN = () => {
      const { height, showHeader } = props
      const vSize = computeSize.value
      const headerSlot = slots.header
      const footerSlot = slots.footer
      return h('div', {
        ref: refElem,
        class: ['vxe-form-design', {
          [`size--${vSize}`]: vSize
        }],
        style: height
          ? {
              height: toCssUnit(height)
            }
          : null
      }, [
        showHeader || headerSlot
          ? h('div', {
            class: 'vxe-form-design--header'
          }, headerSlot ? headerSlot({}) : renderLayoutHeader())
          : createCommentVNode(),
        h('div', {
          class: 'vxe-form-design--body'
        }, [
          h(LayoutWidgetComponent),
          h(LayoutPreviewComponent),
          h(LayoutSettingComponent),
          h(LayoutStyleComponent as ComponentOptions, {
            ref: refLayoutStyle
          })
        ]),
        footerSlot
          ? h('div', {
            class: 'vxe-form-design--footer'
          }, footerSlot ? footerSlot({}) : [])
          : createCommentVNode()
      ])
    }

    $xeFormDesign.renderVN = renderVN

    watch(() => props.widgets, () => {
      updateWidgetConfigs()
    })

    watch(() => props.widgets, () => {
      updateWidgetConfigs()
    })

    watch(() => props.config, (value) => {
      loadConfig(value || {})
    })

    initSettingForm()
    updateWidgetConfigs()

    if (props.config) {
      loadConfig(props.config)
    }

    provide('$xeFormDesign', $xeFormDesign)

    return $xeFormDesign
  },
  render () {
    return this.renderVN()
  }
})
