import { CreateElement, VNode, PropType } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import XEUtils from 'xe-utils'

import type { ValueOf } from 'vxe-pc-ui'
import type { FormDesignReactData, VxeFormDesignDefines, VxeFormDesignEmits, VxeFormDesignPropTypes } from '../../../types'

const { getConfig, createEvent } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
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
    showStyleSetting: {
      type: Boolean as PropType<VxeFormDesignPropTypes.ShowStyleSetting>,
      default: () => getConfig().formDesign.showStyleSetting
    },
    formRender: Object as PropType<VxeFormDesignPropTypes.FormRender>,
    menuConfig: Object as PropType<VxeFormDesignPropTypes.MenuConfig>
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: FormDesignReactData = {
      formData: {} as VxeFormDesignDefines.DefaultSettingFormDataObjVO,
      widgetConfigs: [],
      widgetObjList: [],
      dragWidget: null,
      sortWidget: null,
      activeWidget: null
    }
    return {
      xID,
      reactData
    }
  },
  computed: {
    computeMenuOpts () {
      const $xeFormDesign = this
      const props = $xeFormDesign

      return Object.assign({}, getConfig().calendar.menuConfig, props.menuConfig)
    }
  },
  methods: {
    //
    // Method
    //
    dispatchEvent (type: ValueOf<VxeFormDesignEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeFormDesign = this
      $xeFormDesign.$emit(type, createEvent(evnt, { $formDesign: $xeFormDesign }, params))
    },
    emitModel  (value: any) {
      const $xeFormDesign = this

      const { _events } = $xeFormDesign as any
      if (_events && _events.modelValue) {
        $xeFormDesign.$emit('modelValue', value)
      } else {
        $xeFormDesign.$emit('model-value', value)
      }
    },

    //
    // Render
    //
    renderVN (h: CreateElement): VNode {
      const $xeFormDesign = this
      const slots = $xeFormDesign.$scopedSlots

      const defaultSlot = slots.default
      return h('div', {
        ref: 'refElem',
        class: 'vxe-form-design'
      }, defaultSlot ? defaultSlot({}) : [])
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
