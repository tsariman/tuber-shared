import type { TEventHandler } from '../common.types'

/**
 * Minimal shape of the Redux façade exposed to shared types.
 */
export interface IRedux {
  /** Redux store instance (opaque). */
  store: Record<string, unknown>
  /** Aggregated Redux actions (opaque). */
  actions: Record<string, unknown>
  /** Optional route context for callbacks. */
  route?: string
}

/** Callback signature that receives the Redux façade and returns an event handler. */
export type TReduxHandler = (redux: IRedux) => TEventHandler

/** Callback signature that receives the Redux façade. */
export type TReduxCallback = (redux: IRedux) => void

/** Async callback signature that also receives server response payloads. */
export type TReduxNetCallback<T = unknown> = (
  response: T,
  redux: IRedux
) => Promise<void>
