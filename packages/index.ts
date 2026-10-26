import * as VxeUIDesignExport from './components'

if (typeof window !== 'undefined') {
  if (window.Vue) {
    window.Vue.use(VxeUIDesignExport)
  }
}

export * from './components'

/**
 * A vue based PC component library
 */
export default VxeUIDesignExport
