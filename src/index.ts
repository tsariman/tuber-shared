// Ensure global Window augmentation is included in emitted types for consumers
import './global'

import { SxProps } from '@mui/material/styles'

export type * from './interfaces'

export type TTextProps = preact.HTMLAttributes<HTMLSpanElement> & {
  sx?: SxProps
}

export type {
  IJsonapiDataAttributes as TJsonapiDataAttributes,
  IJsonapiError as TIJsonapiError,
  IJsonapiErrorLinks as TJsonapiErrorLinks,
  IJsonapiErrorResponse as TJsonapiErrorResponse,
  IJsonapiErrorSource as TJsonapiErrorSource,
  IJsonapiRequest as TJsonapiRequest,
  IJsonapiLinkObject as TJsonapiLink,
  IJsonapiPaginationLinks as TJsonapiPaginationLinks,
  IJsonapiResource as TJsonapiResource,
  IJsonapiResponseResource as TJsonapiResponseResource,
  IJsonapiAbstractResponse as TJsonapiAbstractResponse,
  IJsonapiBaseResponse as TJsonapiBaseResponse,
  IJsonapiResourceLinkage as TJsonapiResourceLinkage,
  IJsonapiResponse as TJsonapiResponse,
  IJsonapiStateResponse as TJsonapiStateResponse,
  IJsonapiPageLinks as TJsonapiPageLinks,
  IJsonapiDataRelationships as TJsonapiDataRelationships,
  IJsonapiRelationship as TJsonapiRelationship,
  TJsonapiDataLinkage as TTJsonapiDataLinkage,
  IJsonapiQueryParams as TJsonapiQueryParams,
  IJsonapiPageParams as TJsonapiPageParams,
  IJsonapiFilterParams as TJsonapiFilterParams,
  IAbstractState as TAbstractState,
  IFormChoices as TFormChoices,
  IStateFormItemRadioButton as TStateFormItemRadioButton,
  ISelectProps as TSelectProps,
  ILoadedPagesRange as TLoadedPagesRange,
  IStateData as TStateData,
  IStateFormItemError as TStateFormItemError,
  IStateFormsDataErrors as TStateFormsDataErrors,
  TStatePathnames,
  IStateChip as TStateChip,
  IState as TState,
  TNetState,
  IStateFormItemCustomIcon as TStateFormItemCustomIcon,
  IStateAllDialogs as TStateAllDialogs,
  IStateAllForms as TStateAllForms,
  IStateAllIcons as TStateAllIcons,
  IStateAllPages as TStateAllPages,
  IStateAnchorOrigin as TStateAnchorOrigin,
  IStateApp as TStateApp,
  IStateAppbar as TStateAppbar,
  IStateAppbarQuery as TStateAppbarQuery,
  TStateAppbarQueries,
  IStateAvatar as TStateAvatar,
  IStateBackground as TStateBackground,
  IStateCard as TStateCard,
  IStateComponent as TStateComponent,
  IStateDialog as TStateDialog,
  IStateDrawer as TStateDrawer,
  IStateForm as TStateForm,
  IStatePageDrawer as TStatePageDrawer,
  IStateFormItem as TStateFormItem,
  IStateFormItemAdornment as TStateFormItemAdornment,
  IStateFormItemInputProps as TStateFormItemInputProps,
  TStateFormItemType,
  IStateFormItemCustom as TStateFormItemCustom,
  IStateFormItemGroup as TStateFormItemGroup,
  TItemGroup,
  IStateFormItemSelect as TStateFormItemSelect,
  IStateFormItemSelectOption as TStateFormItemSelectOption,
  IStateFormItemSwitchToggle as TStateFormItemSwitchToggle,
  IStateFormSelect as TStateFormSelect,
  IStateFormSelectOption as TStateFormSelectOption,
  IStateFormItemCheckboxBox as TStateFormItemCheckboxBox,
  IStateIcon as TStateIcon,
  IStateLink as TStateLink,
  IStateNet as TStateNet,
  IStatePage as TStatePage,
  IStateSession as TStateSession,
  IStateSnackbar as TStateSnackbar,
  IStateTopLevelLinks as TStateTopLevelLinks,
  IStateTypography as TStateTypography,
} from './interfaces'

export {
  default as get_config,
  type Configuration
} from './configuration'
export * from './common.types'
export { default as AbstractConfiguration } from './AbstractConfiguration'
export * from './constants.client'
export * from './constants.server'
