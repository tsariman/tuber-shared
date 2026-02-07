import { CSSProperties } from 'react'

/** Allow removal of state */
export interface IRemovableState {
  __delete?: boolean // Special flag to indicate deletion of state
}

export default interface IAbstractState extends IRemovableState {
  /** Abstract `id`. */
  _id?: string
  /** Abstract `name` */
  _key?: string
  /** Abstract `type`. */
  _type?: string
  /** Spread me on a react component. */
  props?: Record<string, unknown>
  /** Use to apply CSS styles. @deprecated */
  theme?: CSSProperties
}