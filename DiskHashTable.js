/**
 * @name DiskHashTable
 *
 * @docs
 * ```coffeescript [specscript]
 * new DiskHashTable(options {
 *   storagePath: string,
 *   headerPath: string,
 *   initialLength: number,
 *   itemSize: number,
 *   resizeRatio: number,
 *   resizeFactor: number,
 * }) -> ht DiskHashTable
 * ```
 *
 * Presidium DiskHashTable class. Creates a hash table that stores all data on disk.
 *
 * Arguments:
 *   * `options`
 *     * `storagePath` - `string` - the path to the file used to store the disk hash table data.
 *     * `headerPath` - `string` - the path to the file used to store header information about the disk hash table.
 *     * `initialLength` - `number` - the initial length of the disk hash table. Minimum value 1, maximum value `Math.floor(9007199254740991 / itemSize)`. Defaults to 1024.
 *     * `itemSize` - `number` - the size in bytes of each item (including internal item info, key, and value) stored on disk. Minimum value 17. Defaults to 524288.
 *     * `resizeRatio` - `number` - the ratio of number of items to table length at which to resize the disk hash table. Minimum value 0 (no resize), maximum value 1. Defaults to 0.
 *     * `resizeFactor` - `number` - the factor that is multiplied with the disk hash table's current length to determine the new table length on a resize.
 *
 * Return:
 *   * `ht` - [`DiskHashTable`](/docs/DiskHashTable) - a `DiskHashTable` instance.
 *
 * ```javascript
 * const ht = new DiskHashTable({
 *   storagePath: '/path/to/storage-file',
 *   headerPath: '/path/to/header-file',
 *   initialLength: 1024,
 *   itemSize: 512 * 1024,
 *   resizeRatio: 0.7,
 *   resizeFactor: 4,
 * })
 * ```
 *
 * Supported platforms:
 *   * macOS (64-bit)
 *   * Linux (64-bit)
 *
 * ## Maximum length of the disk hash table
 * The maximum length of the disk sorted hash table is represented by the following equation:
 * ```
 * Math.floor(9_007_199_254_740_991 / itemSize)
 * ```
 *
 * ## Allocation of disk space
 * The disk hash table initially preallocates a block of memory on disk of `(itemSize * initialLength)` bytes as the storage file and a 32-byte block of memory as the header file for database operations. When the disk hash table is resized, the block of memory on disk is reallocated to a new size of `(itemSize * initialLength * numberOfResizes * resizeFactor)` bytes.
 *
 * ## Byte allocations for an item
 * Each item stored on disk is allocated `itemSize` bytes of disk space. The first 17 bytes are reserved for table operations. The remainder is reserved for the key and value of the item.
 *
 * ## Resizing the disk hash table
 * When an item is inserted into the disk hash table via [set](/docs/DiskHashTable#set), the current capacity ratio of the table is calculated as the sum of the table's count and deleted count divided by the table's length. If the current capacity ratio exceeds the `resizeRatio` (and the `resizeRatio` is not 0), a resize of the table occurs.
 *
 * During a table resize, each item of the table is added into a temporary storage file using the new table length calculated from the equation below:
 *
 * ```
 * newTableLength = oldTableLength * resizeFactor
 * ```
 *
 * Once all of the items have been added into the temporary storage file, the temporary storage file is moved to the location of the old storage file to be used as the new storage file.
 *
 * ## Number of Running Instances
 * There should only be one instance of a DiskHashTable running at any time.
 */
class DiskHashTable {
  constructor(options) {}

  // _initializeHeader() -> headerReadBuffer Promise<Buffer>
  async _initializeHeader() {}

  /**
   * @name init
   *
   * @docs
   * ```coffeescript [specscript]
   * ht.init() -> Promise<>
   * ```
   *
   * Initializes the disk hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await ht.init()
   * ```
   */
  async init() {}

  /**
   * @name clear
   *
   * @docs
   * ```coffeescript [specscript]
   * clear() -> Promise<>
   * ```
   *
   * Clears all data from the disk hash table. Reallocates the header and storage files.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await ht.clear()
   * ```
   */
  async clear() {}

  /**
   * @name destroy
   *
   * @docs
   * ```coffeescript [specscript]
   * destroy() -> Promise<>
   * ```
   *
   * Removes all system resources used by the disk hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await ht.destroy()
   * ```
   */
  async destroy() {}

  /**
   * @name close
   *
   * @docs
   * ```coffeescript [specscript]
   * close() -> undefined
   * ```
   *
   * Closes the underlying file handles used by the disk hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * `undefined`
   *
   * ```javascript
   * ht.close()
   * ```
   */
  close() {}

  // _hash1(key string) -> number
  _hash1(key) {}

  // _hash2(key string) -> number
  _hash2(key) {}

  // header file
  // 8 bytes table length
  // 8 bytes item count
  // 8 bytes deleted item count
  // 8 bytes head index

  // _readHeader() -> headerReadBuffer Promise<Buffer>
  async _readHeader() {}

  // _readHead(index number) -> readBuffer Promise<Buffer>
  async _readHead(index) {}

  // _read(index number) -> readBuffer Promise<Buffer>
  async _read(index) {}

  // _readKey(index number, keyByteLength number) -> key string
  async _readKey(index, keyByteLength) {}

  // _readBinaryValue(index number, keyByteLength number, valueByteLength number) -> key string
  async _readBinaryValue(index, keyByteLength, valueByteLength) {}

  // _getKeyItem(index number) -> keyItem { index: number, nextIndex: number, keyByteLength: number, valueByteLength: number }
  async _getKeyItem(index) {}

  // _getItem(index number, valueType 'string'|'binary') -> item { index: number, nextIndex: number, value: string }
  async _getItem(index, valueType = 'binary') {}

  // _setStatusMarker(index number, marker number) -> Promise<>
  async _setStatusMarker(index, marker) {}

  // _getHeadIndex() -> headIndex Promise<number>
  async _getHeadIndex() {}

  // _setHeadIndex(index number) -> Promise<>
  async _setHeadIndex(index) {}

  // _getNextIndex(index number) -> nextIndex Promise<number>
  async _getNextIndex(index) {}

  // _set(key string, value string|Buffer|Uint8Array) -> Promise<>
  async _set(key, value) {}

  /**
   * @name set
   *
   * @docs
   * ```coffeescript [specscript]
   * set(key string, value string|Buffer|Uint8Array) -> Promise<>
   * ```
   *
   * Sets and stores a value by key in the disk hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key to set.
   *   * `value` - `string|Buffer|Uint8Array` - the value to set corresponding to the key.
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await ht.set('my-key', 'my-value')
   *
   * await ht.set('my-buffer', Buffer.from('binary'))
   * ```
   */
  async set(key, value) {}

  // _get(key string, valueType 'string'|'binary')
  async _get(key, valueType) {}

  /**
   * @name get
   *
   * @docs
   * ```coffeescript [specscript]
   * get(key string) -> value Promise<string|undefined>
   * ```
   *
   * Gets a value by key from the disk hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key corresponding to the value.
   *
   * Return:
   *   * `value` - `Promise<string|undefined>` - a promise of the value corresponding to the key. If the key is not found, the promise resolves with `undefined`.
   *
   * ```javascript
   * const value = await ht.get('my-key')
   * ```
   */
  async get(key) {}

  /**
   * @name getBinary
   *
   * @docs
   * ```coffeescript [specscript]
   * getBinary(key string) -> binaryValue Promise<Buffer>
   * ```
   *
   * Gets a binary value by key from the disk hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key corresponding to the binary value.
   *
   * Return:
   *   * `binaryValue` - `Promise<Buffer>` - a promise of the binary value corresponding to the key. If the key is not found, the promise resolves with `undefined`.
   *
   * ```javascript
   * const buffer = await ht.getBinary('my-buffer')
   * ```
   */
  async getBinary(key) {}

  /**
   * @name delete
   *
   * @docs
   * ```coffeescript [specscript]
   * delete(key string) -> didDelete Promise<boolean>
   * ```
   *
   * Deletes an item by key from the disk hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key to delete.
   *
   * Return:
   *   * `didDelete` - `Promise<boolean>` - a promise of whether the key and corresponding value was deleted.
   *
   * ```javascript
   * const didDelete = await ht.delete('my-key')
   * ```
   */
  async delete(key) {}

  // _updateCount() -> Promise<>
  async _updateCount() {}

  // _updateDeletedCount() -> Promise<>
  async _updateDeletedCount() {}

  // _incrementCount() -> Promise<>
  async _incrementCount() {}

  // _decrementCount() -> Promise<>
  async _decrementCount() {}

  // _incrementDeletedCount() -> Promise<>
  async _incrementDeletedCount() {}

  // _decrementDeletedCount() -> Promise<>
  async _decrementDeletedCount() {}

  // _resize() -> Promise<>
  async _resize() {}

  /**
   * @name count
   *
   * @docs
   * ```coffeescript [specscript]
   * count() -> number
   * ```
   *
   * Returns the number of items in the disk hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * `number` - the number of items in the disk hash table.
   *
   * ```javascript
   * const count = ht.count()
   * ```
   */
  count() {}

  // _itemsIterator() -> items AsyncGenerator<{ index: number, nextIndex: number, key: string, value: string }>
  async * _itemsIterator() {}

  /**
   * @name iterator
   *
   * @docs
   * ```coffeescript [specscript]
   * iterator() -> values AsyncGenerator<string>
   *
   * iterator(options {
   *   valueType: 'string'|'binary',
   * }) -> values AsyncGenerator<string|Buffer>
   * ```
   *
   * Returns an iterator of the values of all items in the disk hash table. Item values are yielded in reverse insertion order.
   *
   * Arguments:
   *   * (none) - retrieves the values of all items in the disk hash table.
   *   * `options`
   *     * `valueType` - `'string'|'binary'` - the type of value that the iterator yields. Defaults to `'string'`.
   *       * `'string'` - iterator yields `string` values.
   *       * `'binary'` - iterator yields `Buffer` values.
   *
   * Return:
   *   * `values` - `AsyncGenerator<string|Buffer>` - an async generator of the values of all items in the disk hash table sorted by reverse insertion order.
   *
   * ```javascript
   * await ht.set('key1', 'value1')
   * await ht.set('key2', 'value2')
   * await ht.set('key3', 'value3')
   *
   * for await (const value of ht.iterator()) {
   *   console.log(value) // value3
   *                      // value2
   *                      // value1
   * }
   * ```
   */
  async * iterator(options = {}) {}

  /**
   * @name entriesIterator
   *
   * @docs
   * ```coffeescript [specscript]
   * entriesIterator() -> entries AsyncGenerator<[key string, value string]>
   *
   * entriesIterator(options {
   *   valueType: 'string'|'binary',
   * }) -> entries AsyncGenerator<[key string, value string|Buffer]>
   * ```
   *
   * Returns an iterator of the entries (keys and values) of all items in the disk hash table. Item entries are yielded in reverse insertion order.
   *
   * Arguments:
   *   * (none) - retrieves the entries of all items in the disk hash table.
   *   * `options`
   *     * `valueType` - `'string'|'binary'` - the type of value that the iterator yields. Defaults to `'string'`.
   *       * `'string'` - iterator yields entries with `string` values.
   *       * `'binary'` - iterator yields entries with `Buffer` values.
   *
   * Return:
   *   * `entries` - `AsyncGenerator<[key string, value string|Buffer]>` - an async generator of the entries of all items in the disk hash table sorted by reverse insertion order.
   *
   * ```javascript
   * await ht.set('key1', 'value1')
   * await ht.set('key2', 'value2')
   * await ht.set('key3', 'value3')
   *
   * for await (const [key, value] of ht.entriesIterator()) {
   *   console.log(key, value) // key3 value3
   *                           // key2 value2
   *                           // key1 value1
   * }
   * ```
   */
  async * entriesIterator(options = {}) {}

}

module.exports = DiskHashTable
