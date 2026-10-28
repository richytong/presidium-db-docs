/**
 * @name DiskSortedHashTable
 *
 * @docs
 * ```coffeescript [specscript]
 * new DiskSortedHashTable(options {
 *   storagePath: string,
 *   headerPath: string,
 *   initialLength: number,
 *   itemSize: number,
 *   sortValueType: "string"|"number"|Array<"string"|"number">,
 *   resizeRatio: number,
 *   resizeFactor: number,
 *   degree: number,
 * }) -> sortedHt DiskSortedHashTable
 * ```
 *
 * Presidium DiskSortedHashTable class. Creates a sorted hash table that stores all data on disk.
 *
 * Arguments:
 *   * `options`
 *     * `storagePath` - `string` - the path to the file that stores the disk sorted hash table data.
 *     * `headerPath` - `string` - the path to the file that stores header information about the disk sorted hash table.
 *     * `initialLength` - `number` - the initial length of the disk sorted hash table. Minimum value 1, maximum value `Math.floor(9007199254740991 / itemSize)`. Defaults to 1024.
 *     * `itemSize` - `number` - the size in bytes of each item (including internal item info, key, value, and sortValue) stored on disk. Minimum value 54. Defaults to 524288.
 *     * `sortValueType` - `"string"|"number"|Array<"string"|"number">` - the type of the disk sorted hash table sort values. If this value is an array, the sort value will be treated as a composite sort value. A composite sort value has each element of the array compared in order.
 *     * `resizeRatio` - `number` - the ratio of number of items to table length at which to resize the disk sorted hash table. Minimum value 0 (no resize), maximum value 1. Defaults to 0.
 *     * `resizeFactor` - `number` - the factor that is multiplied with the disk sorted hash table's current length to determine the new table length on a resize.
 *     * `degree` - `number` - minimum value 2, defaults to 2 - defines the following parameters for the internal b-tree that organizes all of the items in the disk sorted hash table:
 *       * Minimum number of items per b-tree node: `degree - 1`
 *       * Maximum number of items per b-tree node: `(2 * degree) - 1`
 *       * Minimum number of children per b-tree node: `degree`
 *       * Maximum number of children per b-tree node: `2 * degree`
 *
 * Return:
 *   * `sortedHt` - [`DiskSortedHashTable`](/docs/DiskSortedHashTable) - a `DiskSortedHashTable` instance.
 *
 * ```javascript
 * const sortedHt = new DiskSortedHashTable({
 *   storagePath: "/path/to/storage-file",
 *   headerPath: "/path/to/header-file",
 *   initialLength: 1024,
 *   itemSize: 512 * 1024,
 *   sortValueType: "number",
 *   resizeRatio: 0.5,
 *   resizeFactor: 1000,
 *   degree: 2,
 * })
 *
 * const compositeSortValueHt = new DiskSortedHashTable({
 *   storagePath: "/path/to/storage-file",
 *   headerPath: "/path/to/header-file",
 *   initialLength: 1024,
 *   itemSize: 512 * 1024,
 *   sortValueType: ["string", "number"],
 *   resizeRatio: 0.5,
 *   resizeFactor: 1000,
 *   degree: 2,
 * })
 * ```
 *
 * Supported platforms:
 *   * macOS (64-bit)
 *   * Linux (64-bit)
 *
 * ## Maximum length of the disk sorted hash table
 * The maximum length of the disk sorted hash table is represented by the following equation:
 * ```
 * Math.floor(9_007_199_254_740_991 / itemSize)
 * ```
 *
 * ## Allocation of disk space
 * The disk sorted hash table initially preallocates a block of memory on disk of `(itemSize * initialLength)` bytes as the storage file and a 48-byte block of memory as the header file for database operations. When the disk sorted hash table is resized, the block of memory on disk is reallocated to a new size of `(itemSize * initialLength * numberOfResizes * resizeFactor)` bytes.
 *
 * ## Byte allocations for an item
 * Each item stored on disk is allocated `itemSize` bytes of disk space. The first 53 bytes are reserved for table operations. The remainder is reserved for the key, sort value, and value of the item.
 *
 * ## Resizing the disk sorted hash table
 * When an item is inserted into the disk sorted hash table via [set](/docs/DiskSortedHashTable#set), the current capacity ratio of the table is calculated as the sum of the table"s count and deleted count divided by the table"s length. If the current capacity ratio exceeds the `resizeRatio` (and the `resizeRatio` is not 0), a resize of the table occurs.
 *
 * During a table resize, each item of the table is added into a temporary storage file using the new table length calculated from the equation below:
 *
 * ```
 * newTableLength = oldTableLength * resizeFactor
 * ```
 *
 * Once all of the items have been added into the temporary storage file, the temporary storage file is moved to the location of the old storage file.
 *
 * ## Optimizing the disk sorted hash table b-tree
 * The value of `degree` determines the structure of the internal b-tree of the disk sorted hash table. A higher value for `degree` results in a shorter b-tree and more items per b-tree node, while a lower value results in a taller b-tree and fewer items per b-tree node. The default value of 2 is good for any number of items.
 *
 * ## Number of Running Instances
 * There should only be one instance of a DiskSortedHashTable running per storage and header file per machine at a time.
 */
class DiskSortedHashTable {
  constructor(options) {
  }

  // _initializeHeader() -> headerReadBuffer Promise<Buffer>
  async _initializeHeader() {}

  /**
   * @name init
   *
   * @docs
   * ```coffeescript [specscript]
   * sortedHt.init() -> Promise<>
   * ```
   *
   * Initializes the disk sorted hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await sortedHt.init()
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
   * Clears all data from the disk sorted hash table. Reallocates the header and storage files.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await sortedHt.clear()
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
   * Removes all system resources taken up by the disk sorted hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await sortedHt.destroy()
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
   * Closes the underlying file handles of the disk sorted hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * `undefined`
   *
   * ```javascript
   * sortedHt.close()
   * ```
   */
  close() {}

  // _hash1(key string) -> number
  _hash1(key) {}

  // _hash2(key string) -> number
  _hash2(key) {}

  // header file
  // 8 bytes for table length
  // 8 bytes for item count
  // 8 bytes for deleted item count
  // 8 bytes for first item index
  // 8 bytes for last item index
  // 8 bytes for btree root rightmost item index

  // _readHeader() -> headerReadBuffer Promise<Buffer>
  async _readHeader() {}

  // _readKey(index number, keyByteLength number) -> key string
  async _readKey(index, keyByteLength) {}

  // _readSortValue(index number, keyByteLength number, sortValueByteLength number) -> sortValue number|string
  async _readSortValue(index, keyByteLength, sortValueByteLength) {}

  // _readBinaryValue(index number, keyByteLength number, sortValueByteLength number, valueByteLength number) -> key string
  async _readBinaryValue(index, keyByteLength, sortValueByteLength, valueByteLength) {}

  // _readHead(index number) -> readBuffer Promise<Buffer>
  async _readHead(index) {}

  // _read(index number) -> readBuffer Promise<Buffer>
  async _read(index) {}

  // _writeFirstIndex(index number) -> Promise<>
  async _writeFirstIndex(index) {}

  // _writeLastIndex(index number) -> Promise<>
  async _writeLastIndex(index) {}

  // _writeBTreeRootRightmostItemIndex(index number) -> Promise<>
  async _writeBTreeRootRightmostItemIndex(index) {}

  // _writeBTreeLeftChildNodeRightmostItemIndex(
  //   btreeNodeItemIndex number,
  //   btreeLeftChildNodeRightmostItemIndex number
  // ) -> Promise<>
  async _writeBTreeLeftChildNodeRightmostItemIndex(
    btreeNodeItemIndex, btreeLeftChildNodeRightmostItemIndex
  ) {}

  // _writeBTreeRightChildNodeRightmostItemIndex(
  //   btreeNodeItemIndex number,
  //   btreeRightChildNodeRightmostItemIndex number
  // ) -> Promise<>
  async _writeBTreeRightChildNodeRightmostItemIndex(
    btreeNodeItemIndex, btreeRightChildNodeRightmostItemIndex
  ) {}

  // _writeBTreeLeftItemIndex(
  //   btreeNodeItemIndex number,
  //   btreeLeftItemIndex number
  // ) -> Promise<>
  async _writeBTreeLeftItemIndex(
    btreeNodeItemIndex, btreeLeftItemIndex
  ) {}

  // _getBTreeRootNodeRightmostItem() -> btreeRootNodeRightmostItem Promise<{
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }>
  async _getBTreeRootNodeRightmostItem() {}

  // _getHeadItem(index number) -> headItem Promise<{ index: number, forwardIndex: number, reverseIndex: number }>
  async _getHeadItem(index) {}

  // _getKeyItem(index number) -> keyItem Promise<{ index: number, key: string }>
  async _getKeyItem(index) {}

  // _getBTreeItem(index number) -> btreeItem Promise<{
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }>
  async _getBTreeItem(index) {}

  // _getBTreeNodeItems(btreeRightmostItem { index: number, btreeLeftItemIndex: number }) -> Promise<number>
  async _getBTreeNodeItems(btreeRightmostItem) {}

  // _splitBTreeChildNodeRight(
  //   btreeChildNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   btreeLeftParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeRightParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeRootNodeRightmostItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }
  // ) -> Promise<>
  async _splitBTreeChildNodeRight(
    btreeChildNodeItems,
    btreeLeftParentNodeItem,
    btreeRightParentNodeItem,
    btreeRootNodeRightmostItem
  ) {}

  // _splitBTreeChildNodeLeft(btreeChildNodeItems Array<{
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }>, btreeRightParentNodeItem {
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }) -> Promise<>
  async _splitBTreeChildNodeLeft(
    btreeChildNodeItems, btreeRightParentNodeItem
  ) {}

  // _splitBTreeRootNode(btreeRootNodeItems Array<{
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }>) -> Promise<>
  async _splitBTreeRootNode(btreeRootNodeItems) {}

  // _insertBTreeNodeItem(
  //   index number,
  //   sortValue string|number,
  //   btreeNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   btreeRootNodeRightmostItem: {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  // )
  async _insertBTreeNodeItem(
    index,
    sortValue,
    btreeNodeItems,
    btreeRootNodeRightmostItem,
    btreeParentNodeItem,
  ) {}

  // _balanceBTreeGrandparentNodes(
  //   grandparentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   grandparentNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   rotatedChildNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   grandparentNodeItemIsChildRightmostItem boolean,
  //   rotatedParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   parentNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>
  // ) -> Promise<>
  async _balanceBTreeGrandparentNodes(
    grandparentNodeItem,
    grandparentNodeItems,
    rotatedChildNodeItem,
    grandparentNodeItemIsChildRightmostItem,
    rotatedParentNodeItem,
    parentNodeItems
  ) {}

  // _balanceBTreeAfterDelete(
  //   btreeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeRootNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   i number,
  //   btreeParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeParentNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  // ) -> Promise<>
  async _balanceBTreeAfterDelete(
    btreeItem,
    btreeNodeItems,
    btreeRootNodeItems,
    i,
    btreeParentNodeItem,
    btreeParentNodeItems,
  ) {}

  // _deleteBTreeSameSortValueNodeItem(
  //   btreeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeRootNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   sameSortValueParentItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>
  // )
  async _deleteBTreeSameSortValueNodeItem(
    btreeItem,
    btreeRootNodeItems,
    sameSortValueParentItems
  ) {}

  // _deleteBTreeNodeItem(
  //   btreeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeRootNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   btreeParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeParentNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   sameSortValueParentItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>
  // ) -> Promise<>
  async _deleteBTreeNodeItem(
    btreeItem,
    btreeNodeItems,
    btreeRootNodeItems,
    btreeParentNodeItem,
    btreeParentNodeItems,
    sameSortValueParentItems = []
  ) {}

  // _setStatusMarker(index number, marker number) -> Promise<>
  async _setStatusMarker(index, marker) {}

  // _parseItemHead(headReadBuffer Buffer, index number) -> {
  //   statusMarker: 0|1|2,
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }
  _parseItemHead(headReadBuffer, index) {}

  // _parseItem(readBuffer Buffer, index number, valueType "string"|"binary") -> {
  //   index: number,
  //   readBuffer: Buffer,
  //   sortValue: string|number,
  //   key: string,
  //   value: string,
  // }
  _parseItem(readBuffer, index, valueType = "binary") {}

  // _getForwardStartItem(valueType "string"|"binary") -> item { index: number, readBuffer: Buffer, sortValue: string|number, value: string }
  async _getForwardStartItem(valueType = "binary") {}

  // _getReverseStartItem(valueType "string"|"number") -> item { index: number, readBuffer: Buffer, sortValue: string|number, value: string }
  async _getReverseStartItem(valueType = "binary") {}

  // _getItem(index number, valueType "string"|"binary") -> item { index: number, readBuffer: Buffer, sortValue: string|number, value: string }
  async _getItem(index, valueType = "binary") {}

  // _updateForwardIndex(index number, forwardIndex number) -> Promise<>
  async _updateForwardIndex(index, forwardIndex) {}

  // _updateReverseIndex(index number, reverseIndex number) -> Promise<>
  async _updateReverseIndex(index, reverseIndex) {}

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

  // _insert(key string, value string|Buffer|Uint8Array, sortValue number|string, index number) -> Promise<>
  async _insert(key, value, sortValue, index) {}

  // _update(key string, value string|Buffer|Uint8Array, sortValue number|string, index number, item {
  //   index: number,
  //   sortValue: string|number,
  //   btreeLeftChildNodeRightmostItemIndex: number,
  //   btreeRightChildNodeRightmostItemIndex: number,
  //   btreeLeftItemIndex: number,
  // }) -> Promise<>
  async _update(key, value, sortValue, index, item) {}

  // _resize() -> Promise<>
  async _resize() {}

  // _set(key string, value string, sortValue number|string) -> Promise<>
  async _set(key, value, sortValue) {}

  /**
   * @name set
   *
   * @docs
   * ```coffeescript [specscript]
   * set(key string, value string|Buffer|Uint8Array, sortValue string|number) -> Promise<>
   *
   * set(key string, value string|Buffer|Uint8Array, ...sortValue Array<string|number>) -> Promise<>
   * ```
   *
   * Sets and stores a value by key and sort value in the disk sorted hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key to set.
   *   * `value` - `string|Buffer|Uint8Array` - the value to set corresponding to the key.
   *   * `sortValues` - `Arguments<string|number>` - values by which the item is indexed and sorted in the disk sorted hash table. If multiple sort values are provided, the sort values are treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *
   * Return:
   *   * Empty promise.
   *
   * ```javascript
   * await sortedHt.set("key1", "value1", 1)
   * await sortedHt.set("key2", "value2", 2)
   * await sortedHt.set("key3", "value3", 3)
   *
   * await sortedHt.set("my-buffer", Buffer.from("binary"), 4)
   *
   * await compositeSortValueHt.set("key1", "value1", "index-key1", 1)
   * await compositeSortValueHt.set("key2", "value2", "index-key1", 2)
   * await compositeSortValueHt.set("key3", "value3", "index-key1", 3)
   * ```
   */
  async set(key, value, ...sortValues) {}

  // _get(key string, valueType "string"|"binary")
  async _get(key, valueType) {}

  /**
   * @name get
   *
   * @docs
   * ```coffeescript [specscript]
   * get(key string) -> value Promise<string|undefined>
   * ```
   *
   * Gets a value by key from the disk sorted hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key corresponding to the value.
   *
   * Return:
   *   * `value` - `Promise<string|undefined>` - a promise of the string value corresponding to the key. If the key is not found, the promise resolves with `undefined`.
   *
   * ```javascript
   * const value = await sortedHt.get("my-key")
   * ```
   */
  async get(key) {}

  /**
   * @name getBinary
   *
   * @docs
   * ```coffeescript [specscript]
   * getBinary(key string) -> binaryValue Promise<Buffer|undefined>
   * ```
   *
   * Gets a binary value by key from the disk sorted hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key corresponding to the binary value.
   *
   * Return:
   *   * `binaryValue` - `Promise<Buffer|undefined>` - a promise of the binary value corresponding to the key. If the key is not found, the promise resolves with `undefined`.
   *
   * ```javascript
   * const buffer = await ht.getBinary("my-buffer")
   * ```
   */
  async getBinary(key) {}

  // _findBTreeNodeItemGTE(
  //   sortValue string|number,
  //   btreeNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   btreeRootNodeRightmostItem: {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   foundItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }
  // )
  async _findBTreeNodeItemGTE(
    sortValue,
    btreeNodeItems,
    btreeRootNodeRightmostItem,
    btreeParentNodeItem,
    foundItem
  ) {}

  // _findBTreeNodeItemLTE(
  //   sortValue string|number,
  //   btreeNodeItems Array<{
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }>,
  //   btreeRootNodeRightmostItem: {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   btreeParentNodeItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   },
  //   foundItem {
  //     index: number,
  //     sortValue: string|number,
  //     btreeLeftChildNodeRightmostItemIndex: number,
  //     btreeRightChildNodeRightmostItemIndex: number,
  //     btreeLeftItemIndex: number,
  //   }
  // )
  async _findBTreeNodeItemLTE(
    sortValue,
    btreeNodeItems,
    btreeRootNodeRightmostItem,
    btreeParentNodeItem,
    foundItem
  ) {}

  // _forwardItemsIterator() -> values AsyncGenerator<string>
  async * _forwardItemsIterator() {}

  /**
   * @name forwardIterator
   *
   * @docs
   * ```coffeescript [specscript]
   * forwardIterator() -> values AsyncGenerator<string>
   *
   * forwardIterator(options {
   *   exclusiveStartKey: string,
   *   startingSortValue: string|number|Array<string|number>,
   *   endingSortValue: string|number|Array<string|number>,
   *   valueType: "string"|"binary",
   *   limit: number,
   * }) -> values AsyncGenerator<string|Buffer>
   * ```
   *
   * Returns an iterator of the values of all items in the disk sorted hash table sorted by sort value. Item values are yielded in ascending order.
   *
   * If a starting sort value and ending sort value are provided, the iterator returns only values of items with sort values between the starting and ending sort values, including values of items with sort values equal to the starting and ending sort values. If only a starting sort value is provided, the iterator returns values of items with sort values greater than or equal to the starting sort value. If only an ending sort value is provided, the iterator returns values of items with sort values less than or equal to the ending sort value.
   *
   * If an exclusive start key is provided, the iterator returns values of items with sort values greater than or equal to the sort value of the item at the exclusive start key, not including the value of the item at the exclusive start key. The exclusive start key takes precedence over the starting sort value.
   *
   * Arguments:
   *   * (none) - retrieves the values of all items in the disk sorted hash table.
   *   * `options`
   *     * `exclusiveStartKey` - `string` - the key after which to start iterating.
   *     * `startingSortValue` - `string|number|Array<string|number>` - the sort value from which to start iterating. If this value is an array, the starting sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `endingSortValue` - `string|number|Array<string|number>` - the sort value at which to stop iterating. If this value is an array, the ending sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `valueType` - `"string"|"binary"` - the type of value that the iterator yields. Defaults to `"string"`.
   *       * `"string"` - iterator yields `string` values.
   *       * `"binary"` - iterator yields `Buffer` values.
   *     * `limit` - `number` - the maximum number of values to yield from the iterator.
   *
   * Return:
   *   * `values` - `AsyncGenerator<string|Buffer>` - an async generator of the values of all items in the disk sorted hash table sorted by sort value in ascending order.
   *
   * ```javascript
   * await sortedHt.set("key1", "value1", 1)
   * await sortedHt.set("key2", "value2", 2)
   * await sortedHt.set("key3", "value3", 3)
   *
   * for await (const value of sortedHt.forwardIterator()) {
   *   console.log(value) // value1
   *                      // value2
   *                      // value3
   * }
   *
   * for await (const value of sortedHt.forwardIterator({ limit: 1 })) {
   *   console.log(value) // value1
   * }
   *
   * for await (const value of sortedHt.forwardIterator({ startingSortValue: 2, endingSortValue: 3 })) {
   *   console.log(value) // value2
   *                      // value3
   * }
   *
   * for await (const value of sortedHt.forwardIterator({ exclusiveStartKey: "key1" })) {
   *   console.log(value) // value2
   *                      // value3
   * }
   *
   * for await (const value of sortedHt.forwardIterator({ exclusiveStartKey: "key1", endingSortValue: 2 })) {
   *   console.log(value) // value2
   * }
   *
   * await compositeSortValueHt.set("key1", "value1", "index-key1", 1)
   * await compositeSortValueHt.set("key2", "value2", "index-key1", 2)
   * await compositeSortValueHt.set("key3", "value3", "index-key1", 3)
   *
   * for await (const value of compositeSortValueHt.forwardIterator({
   *   startingSortValue: ["index-key1", 2],
   *   endingSortValue: ["index-key1", 3],
   * })) {
   *   console.log(value) // value2
   *                      // value3
   * }
   * ```
   */
  async * forwardIterator(options = {}) {}

  /**
   * @name reverseIterator
   *
   * @docs
   * ```coffeescript [specscript]
   * reverseIterator() -> values AsyncGenerator<string>
   *
   * reverseIterator(options {
   *   exclusiveStartKey: string,
   *   startingSortValue: string|number|Array<string|number>,
   *   endingSortValue: string|number|Array<string|number>,
   *   valueType: "string"|"binary",
   *   limit: number,
   * }) -> values AsyncGenerator<string|Buffer>
   * ```
   *
   * Returns an iterator of the values of all items in the disk sorted hash table sorted by sort value. Item values are yielded in descending order.
   *
   * If a starting sort value and ending sort value are provided, the iterator returns only values of items with sort values between the starting and ending sort values, including values of items with sort values equal to the starting and ending sort values. If only a starting sort value is provided, the iterator returns values of items with sort values less than or equal to the starting sort value.
   *
   * If an exclusive start key is provided, the iterator returns values of items with sort values less than or equal to the sort value of the item at the exclusive start key, not including the value of the item at the exclusive start key. The exclusive start key takes precedence over the starting sort value.
   *
   * Arguments:
   *   * (none) - retrieves the values of all items in the disk sorted hash table.
   *   * `options`
   *     * `exclusiveStartKey` - `string` - the key after which to start iterating.
   *     * `startingSortValue` - `string|number|Array<string|number>` - the sort value from which to start iterating. If this value is an array, the starting sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `endingSortValue` - `string|number|Array<string|number>` - the sort value at which to stop iterating. If this value is an array, the ending sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `valueType` - `"string"|"binary"` - the type of value that the iterator yields. Defaults to `"string"`.
   *       * `string` - iterator yields `string` values.
   *       * `binary` - iterator yields `Buffer` values.
   *     * `limit` - `number` - the maximum number of values to yield from the iterator.
   *
   * Return:
   *   * `values` - `AsyncGenerator<string|Buffer>` - an async generator of the values of all items in the disk sorted hash table sorted by sort value in descending order.
   *
   * ```javascript
   * await ht.set("key1", "value1", 1)
   * await ht.set("key2", "value2", 2)
   * await ht.set("key3", "value3", 3)
   *
   * for await (const value of ht.reverseIterator()) {
   *   console.log(value) // value3
   *                      // value2
   *                      // value1
   * }
   *
   * for await (const value of sortedHt.reverseIterator({ limit: 1 })) {
   *   console.log(value) // value3
   * }
   *
   * for await (const value of ht.reverseIterator({ startingSortValue: 2, endingSortValue: 1 })) {
   *   console.log(value) // value2
   *                      // value1
   * }
   *
   * for await (const value of ht.reverseIterator({ exclusiveStartKey: "key3" })) {
   *   console.log(value) // value2
   *                      // value1
   * }
   *
   * for await (const value of ht.reverseIterator({ exclusiveStartKey: "key3", endingSortValue: 2 })) {
   *   console.log(value) // value2
   * }
   *
   * await compositeSortValueHt.set("key1", "value1", "index-key1", 1)
   * await compositeSortValueHt.set("key2", "value2", "index-key1", 2)
   * await compositeSortValueHt.set("key3", "value3", "index-key1", 3)
   *
   * for await (const value of compositeSortValueHt.reverseIterator({
   *   startingSortValue: ["index-key1", 3],
   *   endingSortValue: ["index-key1", 2],
   * })) {
   *   console.log(value) // value3
   *                      // value2
   * }
   * ```
   */
  async * reverseIterator(options = {}) {}

  /**
   * @name forwardEntriesIterator
   *
   * @docs
   * ```coffeescript [specscript]
   * options {
   *   exclusiveStartKey: string,
   *   startingSortValue: string|number|Array<string|number>,
   *   endingSortValue: string|number|Array<string|number>,
   *   valueType: "string"|"binary",
   *   limit: number,
   * }
   *
   * forwardEntriesIterator() -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   sortValue string|number,
   * ]>
   *
   * forwardEntriesIterator() -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   ...sortValue Array<string|number>,
   * ]>
   *
   * forwardEntriesIterator(options) -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   sortValue string|number,
   * ]>
   *
   * forwardEntriesIterator(options) -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   ...sortValue Array<string|number>,
   * ]>
   * ```
   *
   * Returns an iterator of the entries (key, value, and sort value) of all items in the disk sorted hash table sorted by sort value. Item entries are yielded in ascending order.
   *
   * If a starting sort value and ending sort value are provided, the iterator returns only entries of items with sort values between the starting and ending sort values, including entries of items with sort values equal to the starting and ending sort values. If only a starting sort value is provided, the iterator returns entries of items with sort values greater than or equal to the starting sort value. If only an ending sort value is provided, the iterator returns entries of items with sort values less than or equal to the ending sort value.
   *
   * If an exclusive start key is provided, the iterator returns entries of items with sort values greater than or equal to the sort value of the item at the exclusive start key, not including the entry of the item at the exclusive start key. The exclusive start key takes precedence over the starting sort value.
   *
   * Arguments:
   *   * (none) - retrieves the entries of all items in the disk sorted hash table.
   *   * `options`
   *     * `exclusiveStartKey` - `string` - the key after which to start iterating.
   *     * `startingSortValue` - `string|number|Array<string|number>` - the sort value from which to start iterating. If this value is an array, the starting sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `endingSortValue` - `string|number|Array<string|number>` - the sort value at which to stop iterating. If this value is an array, the ending sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `valueType` - `"string"|"binary"` - the type of value that the iterator yields. Defaults to `"string"`.
   *       * `"string"` - iterator yields entries with `string` values.
   *       * `"binary"` - iterator yields entries with `Buffer` values.
   *     * `limit` - `number` - the maximum number of entries to yield from the iterator.
   *
   * Return:
   *   * `entries` - `AsyncGenerator<[key string, value string|Buffer, sortValue string|number]>` - an async generator of the entries of all items in the disk sorted hash table sorted by sort value in ascending order.
   *
   * ```javascript
   * await ht.set("key1", "value1", 1)
   * await ht.set("key2", "value2", 2)
   * await ht.set("key3", "value3", 3)
   *
   * for await (const [key, value, sortValue] of ht.forwardEntriesIterator()) {
   *   console.log(key, value, sortValue) // key1 value1 1
   *                                      // key2 value2 2
   *                                      // key3 value3 3
   * }
   *
   * for await (const [key, value, sortValue] of ht.forwardEntriesIterator({ limit: 1 })) {
   *   console.log(key, value, sortValue) // key1 value1 1
   * }
   *
   * for await (const [key, value, sortValue] of ht.forwardEntriesIterator({ startingSortValue: 2, endingSortValue: 3 })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   *                                      // key3 value3 3
   * }
   *
   * for await (const [key, value, sortValue] of ht.forwardEntriesIterator({ exclusiveStartKey: "key1" })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   *                                      // key3 value3 3
   * }
   *
   * for await (const [key, value, sortValue] of ht.forwardEntriesIterator({ exclusiveStartKey: "key1", endingSortValue: 2 })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   * }
   *
   * await compositeSortValueHt.set("key1", "value1", "index-key1", 1)
   * await compositeSortValueHt.set("key2", "value2", "index-key1", 2)
   * await compositeSortValueHt.set("key3", "value3", "index-key1", 3)
   *
   * for await (const [key, value, ...sortValue] of compositeSortValueHt.forwardEntriesIterator({
   *   startingSortValue: ["index-key1", 2],
   *   endingSortValue: ["index-key1", 3],
   * })) {
   *   console.log(key, value, sortValue) // key2 value2 ["index-key1", 2]
   *                                      // key3 value3 ["index-key1", 3]
   * }
   * ```
   */
  async * forwardEntriesIterator(options = {}) {}

  /**
   * @name reverseEntriesIterator
   *
   * @docs
   * ```coffeescript [specscript]
   * options {
   *   exclusiveStartKey: string,
   *   startingSortValue: string|number|Array<string|number>,
   *   endingSortValue: string|number|Array<string|number>,
   *   valueType: "string"|"binary",
   *   limit: number,
   * }
   *
   * reverseEntriesIterator() -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   sortValue string|number,
   * ]>
   *
   * reverseEntriesIterator() -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   ...sortValue Array<string|number>,
   * ]>
   *
   * reverseEntriesIterator(options) -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   sortValue string|number,
   * ]>
   *
   * reverseEntriesIterator(options) -> entries AsyncGenerator<[
   *   key string,
   *   value string|Buffer,
   *   ...sortValue Array<string|number>,
   * ]>
   * ```
   *
   * Returns an iterator of the entries (key, value, and sort value) of all items in the disk sorted hash table sorted by sort value. Item entries are yielded in descending order.
   *
   * If a starting sort value and ending sort value are provided, the iterator returns only entries of items with sort values between the starting and ending sort values, including entries of items with sort values equal to the starting and ending sort values. If only a starting sort value is provided, the iterator returns entries of items with sort values less than or equal to the starting sort value.
   *
   * If an exclusive start key is provided, the iterator returns entries of items with sort values less than or equal to the sort value of the item at the exclusive start key, not including the entry of the item at the exclusive start key. The exclusive start key takes precedence over the starting sort value.
   *
   * Arguments:
   *   * (none) - retrieves the entries of all items in the disk sorted hash table.
   *   * `options`
   *     * `exclusiveStartKey` - `string` - the key after which to start iterating.
   *     * `startingSortValue` - `string|number|Array<string|number>` - the sort value from which to start iterating. If this value is an array, the starting sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `endingSortValue` - `string|number|Array<string|number>` - the sort value at which to stop iterating. If this value is an array, the ending sort value is treated as a composite sort value. Composite sort values have each element of their arrays compared in order.
   *     * `valueType` - `"string"|"binary"` - the type of value that the iterator yields. Defaults to `"string"`.
   *       * `string` - iterator yields entries with `string` values.
   *       * `binary` - iterator yields entries with `Buffer` values.
   *     * `limit` - `number` - the maximum number of entries to yield from the iterator.
   *
   * Return:
   *   * `entries` - `AsyncGenerator<[key string, value string|Buffer, sortValue string|number]>` - an async generator of the entries of all items in the disk sorted hash table sorted by sort value in descending order.
   *
   * ```javascript
   * await ht.set("key1", "value1", 1)
   * await ht.set("key2", "value2", 2)
   * await ht.set("key3", "value3", 3)
   *
   * for await (const [key, value, sortValue] of ht.reverseEntriesIterator()) {
   *   console.log(key, value, sortValue) // key3 value3 3
   *                                      // key2 value2 2
   *                                      // key1 value1 1
   * }
   *
   * for await (const [key, value, sortValue] of ht.reverseEntriesIterator({ limit: 1 })) {
   *   console.log(key, value, sortValue) // key3 value3 3
   * }
   *
   * for await (const [key, value, sortValue] of ht.reverseEntriesIterator({ startingSortValue: 2, endingSortValue: 1 })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   *                                      // key1 value1 1
   * }
   *
   * for await (const [key, value, sortValue] of ht.reverseEntriesIterator({ exclusiveStartKey: "key3" })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   *                                      // key1 value1 1
   * }
   *
   * for await (const [key, value, sortValue] of ht.reverseEntriesIterator({ exclusiveStartKey: "key3", endingSortValue: 2 })) {
   *   console.log(key, value, sortValue) // key2 value2 2
   * }
   *
   * await compositeSortValueHt.set("key1", "value1", "index-key1", 1)
   * await compositeSortValueHt.set("key2", "value2", "index-key1", 2)
   * await compositeSortValueHt.set("key3", "value3", "index-key1", 3)
   *
   * for await (const [key, value, ...sortValue] of compositeSortValueHt.reverseEntriesIterator({
   *   startingSortValue: ["index-key1", 3],
   *   endingSortValue: ["index-key1", 2],
   * })) {
   *   console.log(key, value, sortValue) // key2 value2 ["index-key1", 3]
   *                                      // key3 value3 ["index-key1", 2]
   * }
   * ```
   */
  async * reverseEntriesIterator(options = {}) {}

  /**
   * @name delete
   *
   * @docs
   * ```coffeescript [specscript]
   * delete(key string) -> didDelete Promise<boolean>
   * ```
   *
   * Deletes an item by key from the disk sorted hash table.
   *
   * Arguments:
   *   * `key` - `string` - the key to delete.
   *
   * Return:
   *   * `didDelete` - `boolean` - a promise of whether the key and corresponding value were deleted.
   *
   * ```javascript
   * const didDelete = await sortedHt.delete("my-key")
   * ```
   */
  async delete(key) {}

  /**
   * @name count
   *
   * @docs
   * ```coffeescript [specscript]
   * count() -> number
   * ```
   *
   * Returns the number of items in the disk sorted hash table.
   *
   * Arguments:
   *   * (none)
   *
   * Return:
   *   * `number` - the number of items in the disk sorted hash table.
   *
   * ```javascript
   * const count = sortedHt.count()
   * ```
   */
  count() {}

}

module.exports = DiskSortedHashTable
