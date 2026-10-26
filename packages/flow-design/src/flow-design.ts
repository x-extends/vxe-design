import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI } from '@vxe-ui/core'
import { handleEmitModelVal } from '../../ui/src/vn'
import XEUtils from 'xe-utils'

import type { ValueOf } from 'vxe-pc-ui'
import type { FlowDesignReactData, VxeFlowDesignEmits } from '../../../types'

const { createEvent } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeFlowDesign',
  props: {},
  data() {
    const xID = XEUtils.uniqueId()
    const reactData: FlowDesignReactData = {}
    return {
      xID,
      reactData
    }
  },
  methods: {
    //
    // Method
    //
    dispatchEvent(type: ValueOf<VxeFlowDesignEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeFlowDesign = this
      $xeFlowDesign.$emit(type, createEvent(evnt, { $flowDesign: $xeFlowDesign }, params))
    },
    emitModel(value: any) {
      const $xeFlowDesign = this

      handleEmitModelVal($xeFlowDesign, value)
    },

    //
    // Render
    //
    renderVN(h: CreateElement): VNode {
      const $xeFlowDesign = this
      const slots = $xeFlowDesign.$scopedSlots

      const defaultSlot = slots.default
      return h(
        'div',
        {
          ref: 'refElem',
          class: 'vxe-flow-design'
        },
        defaultSlot ? defaultSlot({}) : []
      )
    }
  },
  render(this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
