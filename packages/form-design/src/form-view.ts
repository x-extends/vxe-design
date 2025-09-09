import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { VxeUI } from '@vxe-ui/core'

import type { ValueOf } from 'vxe-pc-ui'
import type { FormViewReactData, VxeFormViewEmits } from '../../../types'

const { createEvent } = VxeUI

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeFormView',
  props: {
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: FormViewReactData = {
      formConfig: {},
      formRules: {},
      widgetObjList: []
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
    dispatchEvent (type: ValueOf<VxeFormViewEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeFormView = this
      $xeFormView.$emit(type, createEvent(evnt, { $formView: $xeFormView }, params))
    },
    emitModel  (value: any) {
      const $xeFormView = this

      const { _events } = $xeFormView as any
      if (_events && _events.modelValue) {
        $xeFormView.$emit('modelValue', value)
      } else {
        $xeFormView.$emit('model-value', value)
      }
    },

    //
    // Render
    //
    renderVN (h: CreateElement): VNode {
      const $xeFormView = this
      const slots = $xeFormView.$scopedSlots

      const defaultSlot = slots.default
      return h('div', {
        ref: 'refElem',
        class: 'vxe-form-view'
      }, defaultSlot ? defaultSlot({}) : [])
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
