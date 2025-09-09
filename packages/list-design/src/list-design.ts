import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '@vxe-ui/core'

import type { ValueOf } from 'vxe-pc-ui'
import type { ListDesignReactData, VxeListDesignDefines, VxeListDesignEmits } from '../../../types'

const { createEvent } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeListDesign',
  props: {
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: ListDesignReactData = {
      formData: {} as VxeListDesignDefines.DefaultSettingFormDataObjVO,
      searchFormData: {},
      searchFormItems: [],
      listTableColumns: []
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
    dispatchEvent (type: ValueOf<VxeListDesignEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeListDesign = this
      $xeListDesign.$emit(type, createEvent(evnt, { $listDesign: $xeListDesign }, params))
    },
    emitModel  (value: any) {
      const $xeListDesign = this

      const { _events } = $xeListDesign as any
      if (_events && _events.modelValue) {
        $xeListDesign.$emit('modelValue', value)
      } else {
        $xeListDesign.$emit('model-value', value)
      }
    },

    //
    // Render
    //
    renderVN (h: CreateElement): VNode {
      const $xeListDesign = this
      const slots = $xeListDesign.$scopedSlots

      const defaultSlot = slots.default
      return h('div', {
        ref: 'refElem',
        class: 'vxe-list-design'
      }, defaultSlot ? defaultSlot({}) : [])
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
