import { CSSProperties } from 'react'
import { TReduxHandler } from '../state'
import { IStateFormItemInputProps } from './IStateFormItem'
import {
  BadgeProps,
  ChipProps,
  FormControlLabelProps,
  FormControlProps,
  FormGroupProps,
  FormHelperTextProps,
  FormLabelProps,
  IconProps,
  InputLabelProps,
  RadioGroupProps,
  SvgIconProps
} from '@mui/material'
import { TStateKeys } from './IState'

// Import IAdornment from the shared types file to avoid duplication
import { IAdornment } from '../common.types'

export type TStateFormITemCustomColor = 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'

export type TDirectiveLoad = {
  [K in TStateKeys]?: string[] | string // Identifier(s) for the state to be loaded
}

export type THandlerDirectiveType = '$form'
| '$form_dialog'
| '$form_none'
| '$filter'
| '$none'

export type THandlerDirectiveRule = 'close_dialog'
| 'disable_on_submit'
| 'redirect_on_success'
| 'redirect_on_failure'

export interface IHandlerDirective {
  type: THandlerDirectiveType // The directive type like '$form', '$view', etc.
  formName?: string          // Form name for form-related directives
  endpoint?: string          // API endpoint for data operations
  route?: string             // Route for navigation
  id?: string                // Optional ID for specific operations
  params?: Record<string, string> // Additional parameters
  load?: TDirectiveLoad
  rules?: THandlerDirectiveRule[]
}

export default interface IStateFormItemCustom<T = unknown> {
  callback?: TReduxHandler
  /** CSS classes (JSS), most likely inherited from parent element */
  classes?: unknown
  content?: string
  color?: TStateFormITemCustomColor
  /**
   * Currently the only way to set the default value for a
   * field. Don't use the `value` attribute, it will not
   * work with React/Redux.
   */
  defaultValue?: string
  /** Display a state icon */
  icon?: string
  /** Display a Material UI icon */
  muiIcon?: string
  /** Display a SVG icon */
  svgIcon?: string
  /** Display a Font-Awesome icon */
  faIcon?: string
  /**
   * #1 Whether the icon within the button should be located to the left or
   *    right of the label.
   */
  iconPosition?: 'left' | 'right'
  /** To be spread on `Icon` and `FontAwesomeIcon` component tags. */
  iconProps?: IconProps
  svgIconProps?: SvgIconProps
  /** Contains data for <select />,  */
  items?: T[]
  /** Component id */
  id?: string
  /**
   * Used in certain situations when the label attribute cannot be set on
   * HTMLElement directly.
   */
  label?: string
  predefinedRegex?: 'username' | 'email' | 'phone'
  route?: string
  text?: string
  /** Get human-readable helper text. */
  helperText?: string
  title?: string
  variant?: ChipProps['variant']
  /**
   * badge props. If defined, the badge will show  
   * Badge example:
   * ```ts
   * const badge = { badgeContent: 0, color: 'error' }
   * ```
   */
  badge?: BadgeProps
  /**
   * **Usage**:
   * to be used with `load` when loading `meta`. e.g.
   * ```ts
   * const meta = stateMeta['load']['key']
   * ```
   */
  key?: string
  /**
   * Name of a pre-defined callback to be executed
   * .e.g.
   * ```ts
   * const callbackGroup = {
   *    callback1: () => { ... },
   *    callback2: () => { ... }
   *    // ... more callbacks
   * }
   * window.callbackGroup = callbackGroup
   * ```
   * Then call with handler:
   * ```ts
   * const formItem = {
   *   'has': {
   *     'onclickHandler': 'callbackGroup.callback1'
   *   }
   * }
   * ```
   */
  onclickHandler?: string
  /** Check `onclickHandler` documentation for more information. */
  onfocusHandler?: string
  /** Check `onclickHandler` documentation for more information. */
  onchangeHandler?: string
  /** Check `onclickHandler` documentation for more information. */
  onkeydownHandler?: string
  /** Check `onclickHandler` documentation for more information. */
  onblurHandler?: string
  /** Check `onclickHandler` documentation for more information. */
  ondeleteHandler?: string
  /** `onclick` callback defined using directives */
  onclickHandlerDirective?: IHandlerDirective
  /** `onfocus` callback defined using directives */
  onfocusHandlerDirective?: IHandlerDirective
  /** `onchange` callback defined using directives */
  onchangeHandlerDirective?: IHandlerDirective
  /** `onkeydown` callback defined using directives */
  onkeydownHandlerDirective?: IHandlerDirective
  /** `onblur` callback defined using directives */
  onblurHandlerDirective?: IHandlerDirective
  /** `ondelete` callback defined using directives */
  ondeleteHandlerDirective?: IHandlerDirective
  /** `onclick` callback that can trigger state changes using Redux actions */
  clickReduxHandler?: TReduxHandler
  /** `onfocus` callback that can trigger state changes using Redux actions */
  focusReduxHandler?: TReduxHandler
  /** `onkeydown` callback that can trigger state changes using Redux actions */
  keydownReduxHandler?: TReduxHandler
  /** `onchange` callback that can trigger state changes using Redux actions */
  changeReduxHandler?: TReduxHandler
  /** `onblur` callback that can trigger state changes using Redux actions */
  blurReduxHandler?: TReduxHandler
  /** Used by the Chip component */
  onClick?: TReduxHandler
  /** Used by the Chip component */
  onDelete?: TReduxHandler
  /**
   * Load metadata into field from `state.meta`. The metadata will be
   * identified by the endpoint (this value). If the data is missing, the
   * normal data source will be used.
   */
  load?: string
  /** Material UI adornments. */
  startAdornment?: IAdornment
  endAdornment?: IAdornment
  props?: Record<string, unknown>
  inputProps?: IStateFormItemInputProps
  /** JSS style */
  theme?: CSSProperties
  /** Used for select components */
  formControlProps?: FormControlProps
  /** Used for select components */
  formControlLabelProps?: FormControlLabelProps
  /** Used for select components */
  inputLabelProps?: InputLabelProps
  /** Used for radio components */
  formLabelProps?: FormLabelProps
  /** Used for radio components */
  radioGroupProps?: RadioGroupProps
  /** Use for switch components */
  formGroupProps?: FormGroupProps
  /** Use for select and switch components */
  formHelperTextProps?: FormHelperTextProps
  highlight?: string
  /** Maximum length of the input field. */
  maxLength?: number
  /** Message to display if the value of the input field exceeds `maxLength` */
  maxLengthMessage?: string
  /** Set to `true` to disable some fields on error. @deprecated */
  disableOnError?: boolean
  /**
   * Regular expression to disallow certain words or characters in an input field.  
   * Every word or character should be separated by a vertical bar,
   * for example. the regex would be: `/password|credit/` or `@|'|"|%`  
   * In this case, the regex must not match for the input to be valid.
   */
  invalidationRegex?: string
  /**
   * Message to display if the value of the input field matches
   * `invalidationRegex`
   */
  invalidationMessage?: string
  /**
   * Regular expression to validate an input field.  
   * e.g. `/^\d{5}-\d{4}$/` to validate a zip code  
   * In this case, the regex must match for the input to be valid.
   */
  validationRegex?: string
  /**
   * Message to display when the input field did not match `validationRegex`.  
   * e.g. "Please enter a valid zip code."
   */
  validationMessage?: string
  /** Input is not allowed to be empty. */
  required?: boolean
  /** Message to display if the input is empty. */
  requiredMessage?: string
  /** Name of the field whose value this input must match. */
  mustMatch?: string
  /** Message to display if the field values do not match. */
  mustMatchMessage?: string
}

export type THandlerName = 'onclick'
  | 'onchange'
  | 'onkeydown'
  | 'onblur'
  | 'onfocus'
  | 'ondelete'

