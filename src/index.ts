// Ensure global Window augmentation is included in emitted types for consumers
import { SxProps } from '@mui/material/styles';
import './types/window-webui';

export * from './interfaces';

export type TTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  sx?: SxProps;
};

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
  IStatePathnames as TStatePathnames,
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
  IStateTypography as TStateTypography
} from './interfaces';

export { default as get_config, type IConfiguration } from './configuration';
export * from './common.types';
// Constants - explicitly export to avoid naming conflicts
export {
  // State constants
  APP_IS_BOOTSTRAPPED,
  APP_IS_FETCHING,
  APP_IS_READY,
  APP_SWITCHED_PAGE,
  APP_BROWSER_SWITCHED_PAGE,
  APP_REQUEST_FAILED,
  APP_REQUEST_SUCCESS,
  NET_STATE_PATCH,
  NET_STATE_PATCH_DELETE,
  STATE_RESET,
  LAST_DRAWER_STATE,

  // Layout constants
  LAYOUT_CENTERED,
  LAYOUT_CENTERED_NO_SCROLL,
  LAYOUT_DEFAULT,
  LAYOUT_NONE,
  LAYOUT_NONE_NO_APPBAR,
  LAYOUT_MD,
  LAYOUT_SM,
  LAYOUT_XL,
  LAYOUT_XS,
  LAYOUT_TABLE_VIRTUALIZED,

  // Page constants
  DEFAULT_BLANK_PAGE,
  DEFAULT_LANDING_PAGE,

  // Content constants
  APP_CONTENT_VIEW,

  // View constants
  DEFAULT_LANDING_PAGE_VIEW,
  DEFAULT_BLANK_PAGE_VIEW,
  DEFAULT_ERRORS_PAGE_VIEW,
  DEFAULT_NOTFOUND_PAGE_VIEW,
  DEFAULT_SUCCESS_PAGE_VIEW,

  // Form item constants
  TEXT,
  TEXTFIELD,
  TEXTAREA,
  PASSWORD,
  NUMBER,
  STATE_INPUT,
  STATE_SELECT,
  STATE_BUTTON,
  RADIO_BUTTONS,
  SWITCH,
  CHECKBOXES,
  BOOL_YESNO,
  BOOL_TRUEFALSE,
  BOOL_ONOFF,
  HTML,
  SUBMIT,
  BREAK_LINE,
  FORM_LABEL,
  FORM_HELPER_TEXT,
  BOX,
  FORM_CONTROL,
  FORM_CONTROL_LABEL,
  FORM_GROUP,
  INDETERMINATE,
  LOCALIZED,
  STACK,
  DIV,
  PHONE_INPUT,
  TIME_PICKER,
  STATIC_DATE_PICKER,
  MOBILE_DATE_PICKER,
  DESKTOP_DATE_PICKER,
  DATE_TIME_PICKER,
  DESKTOP_DATE_TIME_PICKER,
  MOBILE_DATE_TIME_PICKER,
  NAME_NOT_SET,
  SINGLE_SWITCH,
  STATE_SELECT_NATIVE,

  // Component builder constants
  TEXT_NODE,
  LINK,
  INPUT_LABEL,
  FORM,

  // Theme constants
  THEME_MODE,
  THEME_DEFAULT_MODE,

  // Utility constants
  DRAWER_DEFAULT_WIDTH,
  ALLOWED_ATTEMPTS,
  BOOTSTRAP_ATTEMPTS,

  // Misc.
  NONE,

  // Types (with alias to avoid conflicts)
  type TStatePageLayout,
} from './constants.client';

// Server constants - explicitly export to avoid naming conflicts
export * from './constants.server';
export * from './utility';