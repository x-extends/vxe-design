import { h, inject, ref, watch, onMounted, createCommentVNode, nextTick, computed } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import { VxeUI, getI18n } from '@vxe-ui/core'
import { errLog } from '../../ui/src/log'
import XEUtils from 'xe-utils'

import type { VxeGridInstance, VxeGridPropTypes, VxeTableEvents, VxeTablePropTypes } from 'vxe-table'
import { VxeListDesignConstructor, VxeListDesignPrivateMethods } from '../../../types'

export default defineVxeComponent({
  name: 'ListDesignLayoutView',
  props: {},
  emits: [],
  setup () {
    const VxeUIGridComponent = VxeUI.getComponent('vxe-grid')
    const VxeUIFormComponent = VxeUI.getComponent('vxe-form')

    const $xeListDesign = inject<(VxeListDesignConstructor & VxeListDesignPrivateMethods) | null>('$xeListDesign', null)

    if (!$xeListDesign) {
      return () => []
    }

    const { reactData: listDesignReactData } = $xeListDesign

    const refGrid = ref<VxeGridInstance>()

    const tableData = ref<VxeTablePropTypes.Data>([])

    const computeFormItems = computed(() => {
      const { searchFormItems } = listDesignReactData
      if (searchFormItems.length) {
        return searchFormItems.concat([
          {
            field: 'active',
            title: '',
            folding: false,
            collapseNode: searchFormItems.some(item => item.folding),
            itemRender: {
              name: 'VxeButtonGroup',
              options: [
                { content: '查询', icon: 'vxe-icon-search', status: 'primary', type: 'submit' },
                { content: '重置', icon: 'vxe-icon-repeat', type: 'reset' }
              ]
            }
          }
        ])
      }
      return searchFormItems
    })

    const computeTableColumn = computed(() => {
      const { formData, listTableColumns } = listDesignReactData
      const { showSeq, actionButtonList } = formData
      const columns: VxeGridPropTypes.Columns = []
      if (showSeq) {
        columns.push({
          type: 'seq',
          field: '_seq',
          width: 70
        })
      }
      listTableColumns.forEach(item => {
        columns.push({
          field: item.field,
          title: item.title,
          visible: item.visible,
          width: item.width
        })
      })
      if (actionButtonList && actionButtonList.length) {
        columns.push({
          field: '_active',
          title: getI18n('vxe.table.actionTitle'),
          fixed: 'right',
          width: 'auto',
          cellRender: {
            name: 'VxeButtonGroup',
            options: []
          }
        })
      }
      return columns
    })

    const updateColumnWidthEvent: VxeTableEvents.ResizableChange = ({ column, resizeWidth }) => {
      const { listTableColumns } = listDesignReactData
      const rest = XEUtils.findTree(listTableColumns, item => item.field === column.field, { children: 'children' })
      if (rest) {
        const { item } = rest
        item.width = resizeWidth
      }
    }

    const updateTableData = () => {
      const { listTableColumns } = listDesignReactData
      const data: Record<string, any>[] = [{}, {}]
      data.forEach(row => {
        listTableColumns.forEach(column => {
          row[column.field] = '-'
        })
      })
      tableData.value = data
    }

    const dataFlag = ref(0)
    watch(() => listDesignReactData.listTableColumns ? listDesignReactData.listTableColumns.length : -1, () => {
      dataFlag.value++
    })
    watch(() => listDesignReactData.listTableColumns, () => {
      dataFlag.value++
    })
    watch(dataFlag, () => {
      updateTableData()
    })

    onMounted(() => {
      updateTableData()
    })

    nextTick(() => {
      if (!VxeUIGridComponent) {
        errLog('vxe.error.reqComp', ['vxe-grid'])
      }
    })

    return () => {
      const { searchFormData, searchFormItems } = listDesignReactData
      const formItems = computeFormItems.value
      const tableColumn = computeTableColumn.value

      return h('div', {
        class: 'vxe-list-design--preview'
      }, [
        h('div', {
          class: 'vxe-list-design--preview-wrapper'
        }, [
          h('div', {
            class: 'vxe-list-design--preview-search'
          }, [
            h('div', {
              class: 'vxe-list-design--preview-title'
            }, getI18n('vxe.listDesign.searchTitle')),
            searchFormItems.length
              ? h(VxeUIFormComponent, {
                data: searchFormData,
                items: formItems
              })
              : h('div', {
                class: 'vxe-list-design--field-configs-empty-data'
              }, [
                h('span', {}, getI18n('vxe.listDesign.search.emptyText'))
              ])
          ]),
          h('div', {
            class: 'vxe-list-design--preview-table'
          }, [
            h('div', {
              class: 'vxe-list-design--preview-title'
            }, getI18n('vxe.listDesign.listTitle')),
            VxeUIGridComponent
              ? h(VxeUIGridComponent, {
                ref: refGrid,
                columns: tableColumn,
                data: tableData.value,
                showOverflow: true,
                border: true,
                columnConfig: {
                  minWidth: 'auto',
                  resizable: true
                },
                rowConfig: {
                  isHover: true
                },
                scrollX: {
                  enabled: false
                },
                scrollY: {
                  enabled: false
                },
                onResizableChange: updateColumnWidthEvent
              })
              : createCommentVNode()
          ])
        ])
      ])
    }
  }
})
