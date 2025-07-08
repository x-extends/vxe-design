import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from 'vxe-pc-ui'

import type { ValueOf } from 'vxe-pc-ui'
import type { FlowViewReactData, VxeFlowViewEmits } from '../../../types'

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeFlowView',
  props: {
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: FlowViewReactData = {
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
    dispatchEvent (type: ValueOf<VxeFlowViewEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeFlowView = this
      $xeFlowView.$emit(type, createEvent(evnt, { $flowView: $xeFlowView }, params))
    },
    emitModel  (value: any) {
      const $xeFlowView = this

      const { _events } = $xeFlowView as any
      if (_events && _events.modelValue) {
        $xeFlowView.$emit('modelValue', value)
      } else {
        $xeFlowView.$emit('model-value', value)
      }
    },

    //
    // Render
    //
    renderVN (h: CreateElement): VNode {
      const $xeFlowView = this
      const slots = $xeFlowView.$scopedSlots

      const defaultSlot = slots.default
      return h('div', {
        ref: 'refElem',
        class: 'vxe-flow-view'
      }, defaultSlot ? defaultSlot({}) : [])
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
