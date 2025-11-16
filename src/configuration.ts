import { IConfiguration } from './interfaces'

/**
 * Configuration object.  
 * It is used to save global values that can be accessed anywhere in the app.
 * Values can be immutable or mutable. Use set() to save immutable values and
 * write() to save mutable values.
 * 
 * Note: write() can overwrite previously immutable properties set by set().
 * Attempting to set nested properties on non-object intermediates will throw an error.
 */
export class Configuration implements IConfiguration {
  [key: string]: unknown

  private _config: Record<string, unknown> 

  constructor(init: unknown) {
    this._config = this._is_record(init) ? init : {}
    
    // Create a proxy to make config properties accessible directly on the instance
    return new Proxy(this, {
      get(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop in target._config) {
          return target._config[prop]
        }
        return (target as any)[prop]
      },
      set(target, prop: string | symbol, value) {
        if (typeof prop === 'string' && !(prop.startsWith('_') || ['set', 'read', 'write', 'delete', 'clear'].includes(prop))) {
          target._config[prop] = value
          return true
        }
        (target as any)[prop] = value
        return true
      },
      has(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop in target._config) {
          return true
        }
        return prop in target
      },
      ownKeys(target) {
        return [...Object.getOwnPropertyNames(target), ...Object.keys(target._config)]
      },
      getOwnPropertyDescriptor(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop in target._config) {
          return {
            enumerable: true,
            configurable: true,
            value: target._config[prop]
          }
        }
        return Object.getOwnPropertyDescriptor(target, prop)
      }
    })
  }

  /** Checks if the argument is an `object` with `string` indexes. Returns `true` if it is. */
  private _is_record = <T>(obj: unknown): obj is Record<string, T> => {
    return obj !==null && typeof obj === 'object' && !Array.isArray(obj)
  }

  init(data?: unknown): void {
    if (this._is_record(data)) {
      // Clear existing config
      this._config = {}
      // Add new values
      for (const key in data) {
        this._config[key] = data[key]
      }
    }
  }

  /**
   * Resolves an object value from a period-separated list of object properties.
   *
   * @param path a string containing the dot-separated path of object properties,
   *             e.g., "pagination.users.limit". Must be a non-empty string without leading/trailing dots.
   * @param val value to set (optional)
   * @param isWritable whether properties should be writable (allows overwriting immutables)
   * @param shouldDelete whether to delete the property
   * @returns the value at the path, or undefined if not found or deleted
   * @throws Error if path is invalid or if attempting to set nested properties on a non-object
   */
  private _resolve<T=unknown>(path: string, val?: unknown, isWritable: boolean = false, shouldDelete: boolean = false): T | undefined {

    if (!path || typeof path !== 'string') {
      throw new Error('Invalid path: must be a non-empty string')
    }

    const propArray = path.split('.').filter(p => p.length > 0)
    if (propArray.length === 0) {
      throw new Error('Invalid path: cannot be empty or contain only dots')
    }

    let o = this._config // Use _config since Proxy handles access

    for (let i = 0; i < propArray.length; i++) {
      const prop = propArray[i]

      // If last property in path
      if (i === propArray.length - 1) {
        if (val !== undefined) {
          if (isWritable) {
            if (prop in o) delete o[prop]
            o[prop] = val
          } else {
            Object.defineProperty(o, prop, {
              value: val,
              writable: false,
              enumerable: true,
              configurable: true
            })
          }
          return val as T
        } else if (shouldDelete) {
          delete o[prop]
          return undefined
        }
        return o[prop] as T
      }

      // If property does not exist, create it if setting a value
      if (!(prop in o) || o[prop] === undefined) {
        if (val !== undefined) {
          o[prop] = {}
        } else {
          return undefined
        }
      } else if (!this._is_record(o[prop])) {
        if (val !== undefined) {
          throw new Error(`Cannot set nested property on non-object at path segment '${prop}' in '${path}'`)
        }
        return undefined
      }

      // Move deeper
      o = o[prop] as Record<string, unknown>
    }
    return undefined
  }

  set(path: string, val: unknown): void {
    this._resolve(path, val, false, false)
  }

  read<T=undefined>(path: string, $default?: T): T {
    const result = this._resolve(path)
    return (result ?? $default) as T
  }

  write<T=unknown>(path: string, val: T): void {
    this._resolve(path, val, true)
  }

  async delete(path: string): Promise<void> {
    this._resolve(path, undefined, false, true)
  }

  async clear(): Promise<void> {
    this._config = {}
  }

  /**
   * Asynchronously save a value (can be immutable or mutable, depending on implementation).
   *
   * @param path period-separated list of properties
   * @param val value to be saved.
   * @returns Promise<void>
   * @throws Error if path is invalid or if attempting to set on a non-object
   */
  async save<T = unknown>(path: string, val: T): Promise<void> {
    // For now, treat as mutable (write), but can be customized
    this.write(path, val)
  }

  /**
   * Asynchronously load a value.
   *
   * @param path period-separated list of properties
   * @returns Promise of the value at the specified path or undefined.
   */
  async load<T = unknown>(path: string, $default?: T): Promise<T> {
    return this.read(path, $default)
  }
}

// Singleton instance for backward compatibility
let configInstance: Configuration | null = null

/**
 * Get the configuration instance.
 * Creates a new instance if none exists.
 */
export default function get_config(): IConfiguration {
  if (!configInstance) {
    configInstance = new Configuration({})
  }
  return configInstance
}
