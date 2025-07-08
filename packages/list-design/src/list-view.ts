import { CreateElement, VNode } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { createEvent } from 'vxe-pc-ui'

import type { ValueOf } from 'vxe-pc-ui'
import type { ListViewReactData, VxeListDesignDefines, VxeListViewEmits } from '../../../types'

export default /* define-vxe-component start */ defineVxeComponent({
  name: 'VxeListView',
  props: {
  },
  data () {
    const xID = XEUtils.uniqueId()
    const reactData: ListViewReactData = {
      formConfig: {} as VxeListDesignDefines.DefaultSettingFormDataObjVO,
      searchFormData: {},
      searchFormItems: [],
      listTableColumns: [],
      tableColumns: [],
      footerData: [
        {} // 默认一行合计
      ]
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
    dispatchEvent (type: ValueOf<VxeListViewEmits>, params: Record<string, any>, evnt: Event | null) {
      const $xeListView = this
      $xeListView.$emit(type, createEvent(evnt, { $listView: $xeListView }, params))
    },
    emitModel  (value: any) {
      const $xeListView = this

      const { _events } = $xeListView as any
      if (_events && _events.modelValue) {
        $xeListView.$emit('modelValue', value)
      } else {
        $xeListView.$emit('model-value', value)
      }
    },

    //
    // Render
    //
    renderVN (h: CreateElement): VNode {
      const $xeListView = this
      const slots = $xeListView.$scopedSlots

      const defaultSlot = slots.default
      return h('div', {
        ref: 'refElem',
        class: 'vxe-list-view'
      }, defaultSlot ? defaultSlot({}) : [])
    }
  },
  render (this: any, h) {
    return this.renderVN(h)
  }
}) /* define-vxe-component end */
