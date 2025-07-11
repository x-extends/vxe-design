import { VxeGlobalRendererHandles, VxeFormDesignDefines } from '../../../types'
import type { VxeFormProps } from 'vxe-pc-ui'

export const getDefaultSettingFormData = (defOpts?: Partial<VxeFormDesignDefines.DefaultSettingFormDataObjVO>): VxeFormDesignDefines.DefaultSettingFormDataObjVO => {
  return {
    title: '',
    pcVisible: defOpts ? !!defOpts.pcVisible : true,
    pcVertical: true,
    pcTitleBold: true,
    pcTitleColon: false,
    pcTitleAlign: '',
    pcTitleWidth: '',
    pcTitleWidthUnit: '',
    mobileVisible: defOpts ? !!defOpts.mobileVisible : true,
    mobileVertical: true,
    mobileTitleBold: true,
    mobileTitleColon: false,
    mobileTitleAlign: '',
    mobileTitleWidth: '',
    mobileTitleWidthUnit: ''
  }
}

export const createDefaultFormViewPCFormConfig = (params: VxeGlobalRendererHandles.CreateFormViewFormConfigParams<VxeFormDesignDefines.DefaultSettingFormDataObjVO>): VxeFormProps => {
  const { formConfig } = params
  return {
    vertical: formConfig.pcVertical,
    titleBold: formConfig.pcTitleBold,
    titleColon: formConfig.pcTitleColon,
    titleAlign: formConfig.pcTitleAlign,
    titleWidth: formConfig.pcTitleWidth
  }
}

export const createDefaultFormViewMobileFormConfig = (params: VxeGlobalRendererHandles.CreateFormViewFormConfigParams<VxeFormDesignDefines.DefaultSettingFormDataObjVO>): VxeFormProps => {
  const { formConfig } = params
  return {
    vertical: formConfig.mobileVertical,
    titleBold: formConfig.mobileTitleBold,
    titleColon: formConfig.mobileTitleColon,
    titleAlign: formConfig.mobileTitleAlign,
    titleWidth: formConfig.mobileTitleWidth
  }
}
