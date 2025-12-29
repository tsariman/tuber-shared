/*
  DO NOT ADD OR REMOVE ANYTHING FROM THIS FILE.
  Some of these types are marked as deprecated to prevent their use
*/

/**
 * Makes a single property optional
 *
 * @see https://stackoverflow.com/a/61108377/1875859
 */
export type TWithOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** @see https://stackoverflow.com/a/69328045/1875859 */
export type TWithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/** @deprecated */
export type TObj<T = unknown> = Record<string, T>

/** Type shortcut when creating objects with string keys */
export type O<T = unknown> = Record<string, T>

/** @deprecated */
export type TReadonly<K extends string | number | symbol, T> = {
  readonly [P in K]: T
}

/** @deprecated */
export type THandler = () => void
export type TEventHandler = (event: any) => void
/** @deprecated */
export type TEventHandlerFactory = (arg: any) => TEventHandler
export type TThemeMode = 'light' | 'dark'

/**
 * Type for textfield adornment, e.g.
 *
 * icons and text symbol located within the textfield that serve as a type of
 * label. e.g.  
 * ```json
 * {
 *   'type': 'textfield',
 *   'name': 'machine_name',
 *   'props': {}, // Maerial-ui props
 *   'inputProps': {
 *     'start': { // IAdornment start here
 *       'icon': {},
 *       'faIcon': (),
 *        
 *     }
 *   }
 * }
 * ```
 */
export interface IAdornment {
  position?: 'start' | 'end'
  type?: 'text' | 'button'
  /** Material-UI icon */
  icon?: string
  /** Fontawesone icon */
  faIcon?: string
  text?: string
  [x: string]: unknown
}

/** @deprecated */
export type TBoolVal = 'true'
  | 'false'
  | 'on'
  | 'off'
  | 'yes'
  | 'no'

/** @deprecated */
export interface IDummyEvent<T = unknown> {
  target: {
    value: T
  }
  preventDefault: () => void
  key: string
}

/** Form item state type map. @deprecated */
export const typeMap: { [constant: string]: string } = {
  text: 'text',
  textfield: 'text',
  textarea: 'text',
  password: 'password',
  number: 'number'
}
