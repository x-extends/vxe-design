import { VueConstructor } from 'vue'
import { VxeUIExport, VxeGlobalConfig } from 'vxe-pc-ui'

declare global {
  interface Window {
    VxeUIDesign: VxeUIExport
  }
}

export function install (app: VueConstructor, options?: VxeGlobalConfig): void

// Vxe core
export * from 'vxe-pc-ui/types/ui'

// Vxe Design
export * from 'vxe-pc-ui/types/components/flow-design'
export * from 'vxe-pc-ui/types/components/flow-view'
export * from 'vxe-pc-ui/types/components/form-design'
export * from 'vxe-pc-ui/types/components/form-view'
export * from 'vxe-pc-ui/types/components/list-design'
export * from 'vxe-pc-ui/types/components/list-view'
