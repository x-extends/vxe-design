
import type { VxeGlobalRendererHandles, VxeFormDesignDefines } from '../../../../types'

export function useFormView <F = VxeFormDesignDefines.DefaultSettingFormDataObjVO> (props: {
  readonly renderOpts: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams
  readonly renderParams: VxeGlobalRendererHandles.RenderFormDesignSettingFormViewParams<F>
}) {
  return props.renderParams
}
