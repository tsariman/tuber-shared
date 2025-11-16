
// Interface for the old IConfiguration usage
export default interface IConfiguration {
  /**
   * Initialize the configuration object with values.
   * @param data arbitrary object containing key-value pairs.
   * @returns void
   * @throws Error if data is not a record
   */
  init(data?: Record<string, unknown>): void
  /**
   * Save an immutable value.
   *
   * __WARNING__: This value is immutable. Attempting to set nested properties
   * on non-object intermediates will throw an error.
   * @param path period-separated list of properties
   * @param val value to be saved.
   * @returns void
   * @throws Error if path is invalid or if attempting to set on a non-object
   */
  set(path: string, val: unknown): void
  /**
   * Read a value.
   *
   * @param path period-separated list of properties
   * @param $default default value to return if the value at the specified path
   *                 is undefined.
   * @returns the value at the specified path or the default value.
   */
  read<T=unknown>(path: string, $default?: T): T
  /**
   * Save a mutable value.
   *
   * @param path period-separated list of properties
   * @param val value to be saved.
   * @returns void
   * @throws Error if path is invalid or if attempting to set on a non-object
   */
  write<T=unknown>(path: string, val: T): void
  /**
   * Delete a property.
   *
   * @param path period-separated list of nested properties
   * @returns void
   * @throws Error if path is invalid
   */
  delete(path: string): void
  /**
   * Use this method if you want to remove all values from the config object.
   */
  clear(): void
  /**
   * Asynchronously save a value (can be immutable or mutable, depending on implementation).
   *
   * @param path period-separated list of properties
   * @param val value to be saved.
   * @returns Promise<void>
   * @throws Error if path is invalid or if attempting to set on a non-object
   */
  save<T = unknown>(path: string, val: T): Promise<void>
  /**
   * Asynchronously load a value.
   *
   * @param path period-separated list of properties
   * @param $default default value to return if the value at the specified path
   *                 is undefined.
   * @returns Promise of the value at the specified path or undefined.
   */
  load<T = unknown>(path: string, $default?: T): Promise<T>
  [key: string]: unknown
}