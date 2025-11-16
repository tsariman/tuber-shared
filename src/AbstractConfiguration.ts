
/** Base class for config object instantiation */
export default abstract class AbstractConfiguration {
  protected config: Record<string, unknown> 

  constructor(init?: Record<string, unknown>) {
    this.config = this.is_record(init) ? init : {}
    
    // Create a proxy to make config properties accessible directly on the instance
    return new Proxy(this, {
      get(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop.includes('.')) {
          return undefined // Dotted paths should be accessed via read method
        }
        if (typeof prop === 'string' && prop in target.config) {
          return target.config[prop]
        }
        return (target as any)[prop]
      },
      set(target, prop: string | symbol, value) {
        if (typeof prop === 'string' && !(prop.startsWith('_')
          || prop.includes('.')
          || ['set', 'read', 'write', 'delete', 'clear', 'load', 'save'].includes(prop))
        ) {
          target.config[prop] = value
          return true
        }
        (target as any)[prop] = value
        return true
      },
      has(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop.includes('.')) {
          return false
        }
        if (typeof prop === 'string' && prop in target.config) {
          return true
        }
        return prop in target
      },
      ownKeys(target) {
        return [...Object.getOwnPropertyNames(target), ...Object.keys(target.config)]
      },
      getOwnPropertyDescriptor(target, prop: string | symbol) {
        if (typeof prop === 'string' && prop.includes('.')) {
          return undefined
        }
        if (typeof prop === 'string' && prop in target.config) {
          return {
            enumerable: true,
            configurable: true,
            value: target.config[prop]
          }
        }
        return Object.getOwnPropertyDescriptor(target, prop)
      }
    })
  }

  /** Checks if the argument is an `object` with `string` indexes. Returns `true` if it is. */
  protected is_record = <T>(obj: unknown): obj is Record<string, T> => {
    return obj !==null && typeof obj === 'object' && !Array.isArray(obj)
  }

  /**
   * Initialize the configuration object with values.
   * @param data arbitrary object containing key-value pairs.
   * @returns void
   * @throws Error if data is not a record
   */
  init(data?: Record<string, unknown>): void {
    if (this.is_record(data)) {
      // Clear existing config
      this.config ??= {}
      // Add new values
      for (const key in data) {
        this.config[key] = data[key]
      }
      return
    }
    throw new Error('Configuration initialized with invalid value')
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
  protected resolve<T=unknown>(path: string, val?: unknown, isWritable: boolean = false, shouldDelete: boolean = false): T | undefined {

    if (!path || typeof path !== 'string') {
      throw new Error('Invalid path: must be a non-empty string')
    }

    const propArray = path.split('.').filter(p => p.length > 0)
    if (propArray.length === 0) {
      throw new Error('Invalid path: cannot be empty or contain only dots')
    }

    let o = this.config // Use config since Proxy handles access

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
      } else if (!this.is_record(o[prop])) {
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

}