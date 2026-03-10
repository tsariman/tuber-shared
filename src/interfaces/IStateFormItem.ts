
import { CSSProperties } from 'react'
import IAbstractState from './IAbstractState'
import IStateFormItemCustom from './IStateFormItemCustom'
import IStateLink from './IStateLink'
import { InputProps } from '@mui/material/Input'
import { SxProps } from '@mui/material'

/**
 * When adding input adornment to a text field, It's the type for `start` and
 * `end` on a text field adornment.
 * ```ts
 * const textfieldState = {
 *   // ...
 *   'inputProps': {
 *     'start': {}, // <-- type for this.
 *     'end': {}    // <-- and this.
 *   }
 *   // ...
 * }
 * ```
 * @see https://mui.com/material-ui/react-text-field/#input-adornments
 */
export interface IStateFormItemAdornment {
  type?: 'text' | 'button'
  icon?: IStateLink
  /** Fontawesone icon @deprecated */
  faIcon?: string
  text?: string
  textProps?: React.HTMLAttributes<HTMLSpanElement> & { sx?: SxProps }
  [x: string]: unknown
}

/**
 * Used with textfield state to include input adornments.
 * ```ts
 * const textfieldState = {
 *   // ...
 *   'inputProps': { } // <-- type for this.
 *   // ...
 * }
 * ```
 * @see https://mui.com/material-ui/react-text-field/#input-adornments
 */
export interface IStateFormItemInputProps extends InputProps {
  start?: IStateFormItemAdornment
  end?: IStateFormItemAdornment
}

/** List of all possible type a form item can be. */
export type TStateFormItemType = 'br'
| 'bool_onoff'
| 'bool_truefalse'
| 'bool_yesno'
| 'box'
| 'state_button'
| 'checkboxes'
| 'date_time_picker'
| 'desktop_date_picker'
| 'desktop_date_time_picker'
| 'div'
| 'a'
| 'form'
| 'form_control'
| 'form_control_label'
| 'form_group'
| 'form_helper_text'
| 'form_label'
| 'highlight'
| 'hr'
| 'html'
| 'html_tag'
| 'indeterminate'
| 'state_input'
| 'input_label'
| 'icon'
| 'link'
| 'localized'
| 'mobile_date_picker'
| 'mobile_date_time_picker'
| 'none'
| 'number'
| 'paragraph'
| 'password'
| 'phone_input'
| 'radio_buttons'
| 'state_select'
| 'state_select_native'
| 'stack'
| 'static_date_picker'
| 'submit'
| 'switch_single'
| 'switch'
| 'switch_dummy'
| 'text'
| 'textarea'
| 'textfield'
| 'text_node'
| 'time_picker'
| 'default'
| 'bad_form_item'

export default interface IStateFormItem<T=unknown> extends IAbstractState {
  /** Form field type e.g. textfield, select, radio... etc. */
  type?: TStateFormItemType
  /** Form field `id` */
  id?: string
  /** Form field `name` */
  name?: string
  /** Form field `value` */
  value?: string
  href?: string
  style?: CSSProperties
  onClick?: unknown
  onFocus?: unknown
  onKeyDown?: unknown
  onChange?: unknown
  onBlur?: unknown
  label?: string
  highlight?: string
  disabled?: boolean
  /** Contains members that are generally not `JSX.Element` props. */
  has?: IStateFormItemCustom<T>
  inputProps?: IStateFormItemInputProps
  items?: Array<IStateFormItem>
  /** Disable form item */
  disableOn?: ('click' | 'change' | 'blur' | 'error')[]
  /** When `true`, events can be handled in the form item group */
  eventPropagationEnabled?: boolean
}
