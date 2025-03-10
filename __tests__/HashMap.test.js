import HashMap from "../src/HashMap";
import Bucket from "../src/Bucket.js";

describe("HashMap", () => {
	describe("constructor", () => {
		it("initialises with '_capacity' and '_loadFactor', defaulting to 16 and 0.75", () => {
			const map = new HashMap();
			expect(map._capacity).toBe(16);
			expect(map._loadFactor).toBe(0.75);
		});
		it("initializes '_buckets' as an array of Buckets", () => {
			const map = new HashMap();
			expect(Array.isArray(map._buckets)).toBe(true);
			expect(map._buckets.length).toBe(16);
			map._buckets.forEach(bucket => {
				expect(bucket).toBeInstanceOf(Bucket);
			});
		});
		it("defines _length with getter", () => {
			const map = new HashMap();
			expect(map._length).toBe(0);
			expect(HashMap.prototype.hasOwnProperty("length")).toBe(true);
		});
	});
	describe("hash", () => {
		it("returns 0 for empty strings", () => {
			const map = new HashMap();
			expect(map.hash("")).toBe(0);
		});
		it("produces different hashes for different keys", () => {
			const map = new HashMap();
			const hash1 = map.hash("apple");
			const hash2 = map.hash("banana");
			const hash3 = map.hash("carrot");

			expect(hash1).not.toBe(hash2);
			expect(hash2).not.toBe(hash3);
			expect(hash3).not.toBe(hash1);
		});
		it("stays within bounds for long string", () => {
			const capacity = 16;
			const map = new HashMap(capacity);
			const longKey = Array.from({ length: Math.floor(Math.random() * 10000) }, () =>
				String.fromCharCode(97 + Math.floor(Math.random() * 26))
			).join("");
			const hash = map.hash(longKey);

			expect(hash).toBeGreaterThanOrEqual(0);
			expect(hash).toBeLessThan(capacity);
		});
	});
	describe("set", () => {
		let map, mockBucket;

		beforeEach(() => {
			map = new HashMap(16);

			mockBucket = {
				append: jest.fn(),
			};

			hashSpy = jest.spyOn(map, "hash").mockReturnValue(3);
			map._buckets[3] = mockBucket;
		});
		it("defines set()", () => {
			expect(typeof map.set).toBe("function");
		});
		it("assigns a value to a key with null value", () => {
			const keyVal = { key: "Rama", value: "red" };
			map.set(keyVal.key, keyVal.value);
			expect(mockBucket.append).toHaveBeenCalledWith(keyVal);
		});
		it("handles collisions by storing multiple key-value pairs in the same bucket", () => {
			const keyVal1 = { key: "Rama", value: "red" };
			const keyVal2 = { key: "Sita", value: "green" };

			map.set(keyVal1.key, keyVal1.value);
			map.set(keyVal2.key, keyVal2.value);

			expect(mockBucket.append).toHaveBeenCalledTimes(2);
			expect(mockBucket.append).toHaveBeenCalledWith(keyVal1);
			expect(mockBucket.append).toHaveBeenCalledWith(keyVal2);
		});
		it("increments '_length' on successfully appending", () => {
			const newMap = new HashMap();
			const startLength = newMap._length;
			const keyVals = [
				{ key: "Rama", value: "red" },
				{ key: "Sita", value: "green" },
				{ key: "apple", value: "red" },
				{ key: "banana", value: "yellow" },
				{ key: "carrot", value: "orange" },
			];

			keyVals.forEach(keyVal => newMap.set(keyVal.key, keyVal.value));

			expect(newMap._length).toBe(startLength + keyVals.length);
		});
		it("does not increment '_length' when writing to an existing key", () => {
			const newMap = new HashMap();
			const startLength = newMap._length;
			const keyVals = [
				{ key: "Rama", value: "red" },
				{ key: "Sita", value: "green" },
				{ key: "apple", value: "red" },
			];

			keyVals.forEach(keyVal => newMap.set(keyVal.key, keyVal.value));
			newMap.set("apple", "green");

			expect(newMap._length).toBe(startLength + keyVals.length);
		});
	});
	describe("get", () => {
		it("defines get()", () => {
			const map = new HashMap();
			expect(typeof map.get).toBe("function");
		});
		it("returns null if key not found", () => {
			const map = new HashMap();
			map.set("Rama", "red");
			expect(map.get("Sita")).toBe(null);
		});
		it("returns the value for a key where the key has no collisions", () => {
			const keyVal = { key: "Rama", value: "red" };
			const map = new HashMap();
			map.set(keyVal.key, keyVal.value);
			expect(map.get(keyVal.key)).toBe(keyVal.value);
		});
		it("returns the value for a key where the key has collisions", () => {
			const map = new HashMap();
			const keyVal1 = { key: "Rama", value: "red" };
			const keyVal2 = { key: "Sita", value: "green" };

			map.set(keyVal1.key, keyVal1.value);
			map.set(keyVal2.key, keyVal2.value);

			expect(map.get(keyVal1.key)).toBe(keyVal1.value);
			expect(map.get(keyVal2.key)).toBe(keyVal2.value);
		});
	});
	describe("has", () => {
		it("defines has()", () => {
			const map = new HashMap();
			expect(typeof map.has).toBe("function");
		});
		it("returns a false if a given key is not in the hash map", () => {
			const map = new HashMap();
			expect(map.has("apple")).toBe(false);
		});
		it("returns a true if a given key is in the hash map", () => {
			const map = new HashMap();
			map.set("apple", "red");
			expect(map.has("apple")).toBe(true);
		});
	});
	describe("remove", () => {
		it("defines remove()", () => {
			const map = new HashMap();
			expect(typeof map.remove).toBe("function");
		});
		it("returns false if key not found", () => {
			const map = new HashMap();
			map.set("Rama", "red");
			expect(map.remove("Sita")).toBe(false);
		});
		it("returns true if key is in the hash map", () => {
			const map = new HashMap();
			map.set("Rama", "red");
			expect(map.remove("Rama")).toBe(true);
		});
		it("removes the value for a key where the key has no collisions", () => {
			const keyVal = { key: "Rama", value: "red" };
			const map = new HashMap();

			map.set(keyVal.key, keyVal.value);
			map.remove(keyVal.key);

			expect(map.has(keyVal.key)).toBe(false);
		});
		it("removes the value for a key where the key has collisions", () => {
			const map = new HashMap(1);
			const keyVal1 = { key: "Rama", value: "red" };
			const keyVal2 = { key: "Sita", value: "green" };

			map.set(keyVal1.key, keyVal1.value);
			map.set(keyVal2.key, keyVal2.value);
			map.remove(keyVal1.key);

			expect(map.has(keyVal1.key)).toBe(false);
			expect(map._buckets[0].head).not.toBeNull();
		});
		it("decrements '_length' when removing a value", () => {
			const map = new HashMap();
			const keyVal1 = { key: "Rama", value: "red" };
			const keyVal2 = { key: "Sita", value: "green" };

			map.set(keyVal1.key, keyVal1.value);
			map.set(keyVal2.key, keyVal2.value);

			const length = map._length;

			map.remove(keyVal2.key);

			expect(map._length).toBe(length - 1);
		});
		it("decrements '_length' when removing a the last value in the hash mpa", () => {
			const map = new HashMap();
			const keyVal = { key: "Rama", value: "red" };

			map.set(keyVal.key, keyVal.value);

			const length = map._length;

			map.remove(keyVal.key);

			expect(map._length).toBe(length - 1);
		});
	});
	describe("clear", () => {
		it("defines clear()", () => {
			const map = new HashMap();
			expect(typeof map.clear).toBe("function");
		});
		it("removes all entries in the hash map", () => {
			const map = new HashMap();

			map.set("apple", "red");
			map.set("banana", "yellow");
			map.clear();

			expect(map._buckets.every(bucket => bucket._head === null)).toBe(true);
		});
	});
	describe("keys", () => {
		it("defines keys()", () => {
			const map = new HashMap();
			expect(typeof map.keys).toBe("function");
		});
		it("returns an array containing all keys, not necessarily in order", () => {
			const keyVals = [
				{ key: "Rama", value: "red" },
				{ key: "Sita", value: "green" },
				{ key: "apple", value: "red" },
				{ key: "banana", value: "yellow" },
				{ key: "carrot", value: "orange" },
			];
			const keys = keyVals.map(keyVal => keyVal.key);
			const map = new HashMap();

			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));

			expect(map.keys().sort()).toEqual(keys.sort());
		});
	});
	describe("keys", () => {
		it("defines values()", () => {
			const map = new HashMap();
			expect(typeof map.values).toBe("function");
		});
		it("returns an array containing all values, not necessarily in order", () => {
			const keyVals = [
				{ key: "Rama", value: "red" },
				{ key: "Sita", value: "green" },
				{ key: "apple", value: "red" },
				{ key: "banana", value: "yellow" },
				{ key: "carrot", value: "orange" },
			];
			const values = keyVals.map(keyVal => keyVal.value);
			const map = new HashMap();

			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));

			expect(map.values().sort()).toEqual(values.sort());
		});
	});
	describe("entries", () => {
		it("defines entries()", () => {
			const map = new HashMap();
			expect(typeof map.entries).toBe("function");
		});
		it("returns an array that contains each key-value pair", () => {
			const keyVals = [
				{ key: "Rama", value: "red" },
				{ key: "Sita", value: "green" },
				{ key: "apple", value: "red" },
				{ key: "banana", value: "yellow" },
				{ key: "carrot", value: "orange" },
			];
			const entries = keyVals.map(keyVal => [keyVal.key, keyVal.value]);
			const map = new HashMap();

			keyVals.forEach(keyVal => map.set(keyVal.key, keyVal.value));

			expect(map.entries().sort()).toEqual(entries.sort());
		});
	});
});
