import HashMap from "../src/HashMap";
import Bucket from "../src/Bucket.js";

describe("HashMap", () => {
	const keyVals = [
		{ key: "apple", value: "red" },
		{ key: "banana", value: "yellow" },
		{ key: "carrot", value: "orange" },
		{ key: "dog", value: "brown" },
		{ key: "elephant", value: "gray" },
		{ key: "frog", value: "green" },
		{ key: "grape", value: "purple" },
		{ key: "hat", value: "black" },
		{ key: "ice cream", value: "white" },
		{ key: "jacket", value: "blue" },
		{ key: "kite", value: "pink" },
		{ key: "lion", value: "golden" },
	];
	const keyVal = keyVals[Math.floor(Math.random() * keyVals.length)];
	let map, singleBucketMap;

	beforeEach(() => {
		map = new HashMap();
		singleBucketMap = new HashMap(1, Infinity);
	});

	describe("constructor", () => {
		const capacity = Math.max(2, Math.floor(Math.random() * 16));
		const loadFactor = Math.floor(Math.random() * 10) / 10;
		let defaultMap, customMap;

		beforeEach(() => {
			defaultMap = new HashMap();
			customMap = new HashMap(capacity, loadFactor);
		});

		it("initialises with '_capacity' and '_loadFactor', defaulting to 16 and 0.75", () => {
			expect(defaultMap._capacity).toBe(16);
			expect(defaultMap._loadFactor).toBe(0.75);
			expect(customMap._capacity).toBe(capacity);
			expect(customMap._loadFactor).toBe(loadFactor);
		});
		it("initializes '_buckets' as an array of Buckets with a length of `_capacity", () => {
			expect(Array.isArray(defaultMap._buckets)).toBe(true);
			expect(defaultMap._buckets.length).toBe(16);
			expect(customMap._buckets.length).toBe(capacity);
			customMap._buckets.forEach(bucket => {
				expect(bucket).toBeInstanceOf(Bucket);
			});
		});
		it("initiaslises '_length' at 0, with a getter method", () => {
			expect(defaultMap._length).toBe(0);
			expect(HashMap.prototype.hasOwnProperty("length")).toBe(true);
		});
	});
	describe("hash()", () => {
		const maxCollisionRate = 0.35;

		it("returns 0 for empty strings", () => {
			expect(map.hash("")).toBe(0);
		});
		it(`has a collision rate of less than ${maxCollisionRate} when at the max default load factor of 0.75`, () => {
			map._capacity = 1024;

			const generateRandomString = function (length = 8) {
				const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				const str = Array.from(
					{ length },
					() => chars[Math.floor(Math.random() * chars.length)]
				).join("");

				return str;
			};

			const numKeys = map._capacity * map._loadFactor;
			const keys = Array.from({ length: numKeys }, () => generateRandomString());
			const buckets = new Array(map._capacity).fill(null).map(() => []);

			keys.forEach(key => buckets[map.hash(key)].push(key));

			const numCollisions = buckets.reduce(
				(cols, bucket) => cols + Math.max(bucket.length - 1, 0),
				0
			);
			const collisionRate = numCollisions / numKeys;

			expect(collisionRate).toBeLessThanOrEqual(maxCollisionRate);
		});
		it("stays within bounds for long string", () => {
			const longKey = Array.from({ length: Math.floor(Math.random() * 10000) }, () =>
				String.fromCharCode(97 + Math.floor(Math.random() * 26))
			).join("");
			const hash = map.hash(longKey);

			expect(hash).toBeGreaterThanOrEqual(0);
			expect(hash).toBeLessThan(map._capacity);
		});
	});
	describe("keys()", () => {
		it("defines keys()", () => {
			expect(typeof map.keys).toBe("function");
		});
		it("returns an array containing all keys, not necessarily in order", () => {
			const keys = keyVals.map(keyVal => keyVal.key);
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			expect(map.keys().sort()).toEqual(keys.sort());
		});
	});
	describe("values()", () => {
		it("defines values()", () => {
			expect(typeof map.values).toBe("function");
		});
		it("returns an array containing all values, not necessarily in order", () => {
			const values = keyVals.map(keyVal => keyVal.value);
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			expect(map.values().sort()).toEqual(values.sort());
		});
	});
	describe("entries()", () => {
		it("defines entries()", () => {
			expect(typeof map.entries).toBe("function");
		});
		it("returns an array that contains each key-value pair", () => {
			const entries = keyVals.map(keyVal => [keyVal.key, keyVal.value]);
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			expect(map.entries().sort()).toEqual(entries.sort());
		});
	});
	describe("grow()", () => {
		it("defines grow()", () => {
			expect(typeof map.grow).toBe("function");
		});
		it("doubles the number of buckets and updates '_capacity'", () => {
			const numStartingBuckets = map._buckets.length;
			const startingCapacity = map._capacity;
			map.grow();
			expect(map._buckets.length).toBe(numStartingBuckets * 2);
			expect(map._capacity).toBe(startingCapacity * 2);
		});
		it("redistributes entries across new buckets", () => {
			keyVals.forEach(keyVal => singleBucketMap.set(keyVal.key, keyVal.value));
			singleBucketMap.grow();
			expect(singleBucketMap._buckets[1]._head).not.toBeNull();
		});
		it("does not alter the '_length' property when redistributing entries", () => {
			keyVals.forEach(keyVal => singleBucketMap.set(keyVal.key, keyVal.value));
			const length = singleBucketMap._length;
			map.grow();
			expect(singleBucketMap._length).toBe(length);
		});
	});
	describe("set()", () => {
		it("defines set()", () => {
			expect(typeof singleBucketMap.set).toBe("function");
		});
		it("assigns a value to a key not in the bucket", () => {
			singleBucketMap.set(keyVal.key, keyVal.value);
			expect(singleBucketMap._buckets[0]._head).not.toBeNull();
		});
		it("overwrites the value of a key already in the bucket", () => {
			const newValue = "green";
			singleBucketMap.set(keyVal.key, keyVal.value);
			singleBucketMap.set(keyVal.key, newValue);
			expect(singleBucketMap._buckets[0]._head.entry.value).toBe(newValue);
		});
		it("handles collisions by storing multiple key-value pairs in the same bucket", () => {
			keyVals.forEach(keyVal => singleBucketMap.set(keyVal.key, keyVal.value));
			expect(singleBucketMap._buckets[0]._length).toBe(keyVals.length);
		});
		it("increments '_length' on successfully appending", () => {
			const startLength = map._length;
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));

			expect(map._length).toBe(startLength + keyVals.length);
		});
		it("does not increment '_length' when writing to an existing key", () => {
			const startLength = map._length;
			const keys = keyVals
				.slice(0, Math.max(1, Math.floor(Math.random() * keyVals.length)))
				.map(keyVal => keyVal.key);

			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			keys.forEach(key => map.set(key, "new value"));

			expect(map._length).toBe(startLength + keyVals.length);
		});
		it("calls 'HashMap.grow() if loadFactor is reached", () => {
			const mockGrow = jest.fn();
			singleBucketMap._loadFactor = 1;
			singleBucketMap.grow = mockGrow;
			keyVals.forEach(keyVal => singleBucketMap.set(keyVal.key, keyVal.value));
			expect(mockGrow).toHaveBeenCalledTimes(keyVals.length - 1);
		});
	});
	describe("get()", () => {
		it("defines get()", () => {
			expect(typeof map.get).toBe("function");
		});
		it("calls Bucket.findValue() with the correct key", () => {
			const hash = map.hash(keyVal.key);
			const bucket = { findValue: jest.fn() };
			map._buckets[hash] = bucket;
			map.get(keyVal.key);
			expect(bucket.findValue).toHaveBeenCalledWith(keyVal.key);
		});
	});
	describe("has()", () => {
		it("defines has()", () => {
			expect(typeof map.has).toBe("function");
		});
		it("returns a false if a given key is not in the hash map", () => {
			expect(map.has("apple")).toBe(false);
		});
		it("returns a true if a given key is in the hash map", () => {
			map.set(keyVal.key, keyVal.value);
			expect(map.has(keyVal.key)).toBe(true);
		});
	});
	describe("remove()", () => {
		it("defines remove()", () => {
			expect(typeof map.remove).toBe("function");
		});
		it("returns false if key not found", () => {
			map.set("apple", "red");
			singleBucketMap.set("apple", "red");
			expect(map.remove("banana")).toBe(false);
			expect(singleBucketMap.remove("banana")).toBe(false);
		});
		it("returns true if key is in the hash map", () => {
			map.set(keyVal.key, keyVal.value);
			expect(map.remove(keyVal.key)).toBe(true);
		});
		it("calls Bucket.remove()", () => {
			const hash = map.hash(keyVal.key);
			const bucket = { remove: jest.fn() };
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			map._buckets[hash] = bucket;
			map.remove(keyVal.key);
			expect(bucket.remove).toHaveBeenCalledWith(keyVal.key);
		});
		it("decrements '_length' from map when removing a value", () => {
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			map.remove(keyVal.key);
			expect(map._length).toBe(keyVals.length - 1);
		});
		it("decrements '_length' from map when removing a the last value in the hash map", () => {
			map.set(keyVal.key, keyVal.value);
			map.remove(keyVal.key);
			expect(map._length).toBe(0);
		});
	});
	describe("clear()", () => {
		it("defines clear()", () => {
			expect(typeof map.clear).toBe("function");
		});
		it("removes all entries in the hash map", () => {
			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));
			map.clear();
			expect(map._buckets.every(bucket => bucket._head === null)).toBe(true);
		});
	});
});
