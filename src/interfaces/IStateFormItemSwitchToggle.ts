import { TFormControlLabelProps } from './IStateFormItemCustom';
import IAbstractState from './IAbstractState';

export default interface IStateFormItemSwitchToggle extends IAbstractState {
  /** Switch label */
  label?: string;
  /** Switch value */
  name?: string;
  /** Use with switch component group */
  formControlLabelProps?: TFormControlLabelProps;
}
