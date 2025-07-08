import * as VxeUIDesignExport from './packages/components'
import './styles/all.scss'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VxeUIDesignExport)
}

export * from './packages/components'
export default VxeUIDesignExport
