import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import XEUtils from 'xe-utils'

import type { ValueOf } from 'vxe-pc-ui'
import type { FormDesignReactData, VxeFormDesignDefines, VxeFormDesignEmits } from '../../../types'

const { createEvent } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeFormDesign',
  props: {
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
