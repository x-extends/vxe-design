import { VueConstructor } from 'vue'
import { VxeUIExport, VxeGlobalConfig, VxeComponentKebabCaseKeys } from 'vxe-pc-ui'

import VxeFlowDesign from 'vxe-pc-ui/types/components/flow-design'
import VxeFlowView from 'vxe-pc-ui/types/components/flow-view'
import VxeFormDesign from 'vxe-pc-ui/types/components/form-design'
import VxeFormView from 'vxe-pc-ui/types/components/form-view'
import VxeListDesign from 'vxe-pc-ui/types/components/list-design'
import VxeListView from 'vxe-pc-ui/types/components/list-view'

declare global {
  interface Window {
    VxeUIDesign: VxeUIExport
  }
}

export function install (app: VueConstructor, options?: VxeGlobalConfig): void

interface AllComponents {
  /**
   * FlowDesign 流程设计器
   */
  VxeFlowDesign: typeof VxeFlowDesign
  /**
   * FlowView 流程设计器 - 视图
   */
  VxeFlowView: typeof VxeFlowView
  /**
   * FormDesign 表单设计器
   */
  VxeFormDesign: typeof VxeFormDesign
  /**
   * FormView 表单设计器 - 视图
   */
  VxeFormView: typeof VxeFormView
  /**
   * ListDesign 列表设计器
   */
  VxeListDesign: typeof VxeListDesign
  /**
   * ListView 列表设计器 - 视图
   */
  VxeListView: typeof VxeListView
}

declare module '@vxe-ui/core' {
  export interface VxeGlobalComponents extends AllComponents, VxeComponentKebabCaseKeys<AllComponents> {}
}

// Vxe core
export * from 'vxe-pc-ui/types/ui'

// Vxe Design
export * from 'vxe-pc-ui/types/components/flow-design'
export * from 'vxe-pc-ui/types/components/flow-view'
export * from 'vxe-pc-ui/types/components/form-design'
export * from 'vxe-pc-ui/types/components/form-view'
export * from 'vxe-pc-ui/types/components/list-design'
export * from 'vxe-pc-ui/types/components/list-view'
