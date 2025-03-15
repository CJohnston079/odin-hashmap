# The Odin Project | HashMap

This is a practice implementation of HashMap data structure in JavaScript.

## About

### Project aims

The project brief can be found here: [Project: HashMap | The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap). Below is a brief summary of the project aims:

1. Implement a `Node` class/factory to manage individual data points.
2. Implement a `Bucket` class/factory, a linked list style data structure to manage a sequence of nodes storing key-value pairs. `Bucket` should include utility methods that can be used to interact with the nodes in the bucket.
3. Implement a `HashMap` class/factory to store, manage and retrieve key-value pairs using a hashing function. The HashMap should handle collisions via separate chaining with linked lists, which are the individual buckets. `HashMap` should also dynamically resize above a certain threshold of entries to maintain a manageable collision rate.

## Setup

### Installing dependencies

After cloning the repository, install the project dependencies by running:

```Bash
npm install
```

### Testing

Tests are written in Jest, with Babel configured to allow the use of ES6 modules. To run the testing suite, use:

```Bash
npm test
```

Alternatively, you can watch for changes to the tests or modules using:

```Bash
npm run watch
```

## `Node` class

Returns a new `Node`. `Node`s are used as the individual elements of a `Bucket`.

### `Node` properties

#### `Node.entry`

- `entry` is the data which is stored in `Node`.
- `entry` is initialised as `null` by default.

#### `Node.next`

- `next` is the pointer to the next `Node` in the `Bucket`.
- `next` is initialised as `null` by default.

### `Node` methods

#### `Node.setNext()`

- `setNext()` updates the value of `next` for a `Node`.
- It throws an error if it is given anything other than a `Node` instance.

## `Bucket` class

Returns a new `Bucket`, which is a chain of `Node`s.

### `Bucket` properties

#### `Bucket._head`

- The first `Node` of the `Bucket`.
- `_head` is instantiated as `null`.
- The `value` of `_head` can be read using the getter `head()`.

#### `Bucket._length`

- The number of `Nodes` in the `Bucket`.
- `_length` is instantiated as 0.
- It can be read using the getter `size()`.

### `Bucket` methods

#### `Bucket.append(keyVal)`

- Adds a new `Node` containing a key-value paid to the end (tail) of the bucket.
- Increments `Bucket._length` by one if appending a `key` that is not already in the bucket.
- If the `key` of `keyVal` is already in the bucket, then the `value` of the key-value pair in the bucket is replaced with the new `value`, and `Bucket.length` is not incremented.
- Throws a `TypeError` if `keyVal` is not in the format `{ key: <key>, value: <value> }`.

#### `Bucket.remove(key)`

- Removes the `Node` with the `key` matching the passed `key`.
- Decrements `Bucket._length` by 1 when a `Node` is successfully removed.

#### `Bucket.containsKey(key)`

- Returns a `true` if `key` is present in one of more of the `Node`s in the bucket.Returns `false` otherwise.

#### `Bucket.findValue(key)`

- Returns the `value` of a `key` in the bucket. Returns `null` if the `key` is not found.

#### `Bucket.toString()`

- Returns a string representation of key-value pairs in the bucket in the format:

```Bash
( apple: green ) -> ( banana: yellow ) -> ( carrot: orange ) -> null
```

#### `Bucket.toArr()`

- Returns an array of key-value pairs in the bucket in the format:

```Bash
[[apple, green], [banana, yellow], [carrot, orange]]
```

#### `Bucket.getProperties(property)`

- Returns an array of all the keys or values in the bucket.
- If passed `"key"`, returns all keys in the bucket.
- If passed `"value"`, returns all values in the bucket.
- Throws an error if property is not `"key"` or `"value"`.

## `HashMap` class

Returns a new `HashMap`, an array of buckets to store and manage key-value pairs.

### `HashMap` properties

#### `HashMap._capacity`

- The number of `Bucket` instances in the hash map. Defaults to 16.

#### `HashMap._loadFactor`

- The maximum number of `Nodes` in the hash map relative to `HashMap._capacity` before doubling the number of buckets.

#### `HashMap._buckets`

- An array containing instances of `Bucket` equal to `HashMap._capacity`.

#### `HashMap._length`

- The number of `Nodes` in the `HashMap` buckets.
- `_length` is instantiated as 0.
- It can be read using the getter `length()`.

### `HashMap` methods

#### `HashMap.hash(key)`

- Returns a numeric `hashCode` derived from the passed `key`. `hashCode` will be between 0 and `HashMap._capacity`.

#### `HashMap.grow()`

- Doubles the number of buckets in the hash map, updating `Bucket._capacity` and retaining the existing `HashMap._length`.
- `grow()` redistribues the entries from the old buckets across the new buckets.

#### `Hashmap.set(key, value)`

- Adds a new key-value pair to the hash map, or updates the `value` of `key` if `key` already exists in the hash map.
- Increments `HashMap._length` by 1 when adding a new `key`.
- Calls `HashMap.grow()` if `HashMap._loadFactor` is exceeded when adding a new `key`.

#### `HashMap.get(key)`

- Retrives the value of the given `key`.

#### `HashMap.remove(key)`

- Removes the entry for a given `key`.
- Returns `false` if `key` is not in the hash map.
- Decrements `HashMap._capacity` by 1 when a key is successfully removed.

#### `HashMap.has(key)`

- Returns `true` if the `key` is present in the hash map, otherwise returns `false`.

#### `HashMap.clear()`

- Empties the hash map of all entries, leaving a number of buckets equal to `HashMap._capacity`.

#### `HashMap.keys()`

- Returns an array of all keys in the hash map.

#### `HashMap.values()`

- Returns an array of all values in the hash map.

#### `HashMap.entries()`

- Returns an array of all key-value pairs in the hash map, in the format:

```bash
[
  ["apple", "green"],
  ["banana", "yellow"],
  ["carrot", "orange"]
]
```
