import { VxeUI } from '@vxe-ui/core'

import type { VxeListDesignDefines } from '../../../types'

const { getI18n } = VxeUI

export const getListDesignActionButtonName = (name: string) => {
  return getI18n(`vxe.listDesign.activeBtn.${name}`)
}

export const handleGetListDesignActionButtonName = (params: { name: string }) => {
  return getListDesignActionButtonName(params.name)
}

export const createListDesignActionButton = (btnObj?: Partial<VxeListDesignDefines.DefaultSettingFormActionButton>) => {
  return Object.assign(
    {
      name: '',
      icon: '',
      type: '',
      classify: '',
      code: '',
      status: '',
      permissionCode: ''
    },
    btnObj
  )
}
