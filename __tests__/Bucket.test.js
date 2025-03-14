import Bucket from "../src/Bucket";

describe("Bucket", () => {
	let emptyBucket, singleEntryBucket, testBucket;
	let tailNode, midNode, headNode;

	beforeEach(() => {
		tailNode = { entry: { key: "apple", value: "red" }, next: null };
		midNode = { entry: { key: "banana", value: "yellow" }, next: tailNode };
		headNode = { entry: { key: "carrot", value: "orange" }, next: midNode };

		emptyBucket = new Bucket();
		singleEntryBucket = new Bucket(tailNode);
		singleEntryBucket._length = 1;
		testBucket = new Bucket(headNode);
		testBucket._length = 3;
	});

	describe("initialisation", () => {
		it("should initialise an empty list", () => {
			expect(emptyBucket._head).toBe(null);
			expect(emptyBucket._length).toBe(0);
		});
	});
	describe("append()", () => {
		it("defines append()", () => {
			expect(typeof emptyBucket.append).toBe("function");
		});
		it("should append a node to an empty list", () => {
			emptyBucket.append({ key: "carrot", value: "orange" });

			expect(emptyBucket._head).not.toBeNull();
			expect(emptyBucket._head.entry).toEqual({ key: "carrot", value: "orange" });
		});
		it("should append a node to a non-empty list", () => {
			emptyBucket.append({ key: "carrot", value: "orange" });
			emptyBucket.append({ key: "banana", value: "yellow" });

			expect(emptyBucket._head.next).not.toBeNull();
			expect(emptyBucket._head.next.entry).toEqual({ key: "banana", value: "yellow" });
			expect(emptyBucket._head.next.next).toBeNull();
		});
		it("should overwrite the value of a node if the key is already in the bucket", () => {
			testBucket.append({ key: "carrot", value: "brown" });
			testBucket.append({ key: "banana", value: "lime" });
			testBucket.append({ key: "apple", value: "green" });
			expect(testBucket._head.entry).toEqual({ key: "carrot", value: "brown" });
			expect(testBucket._head.next.entry).toEqual({ key: "banana", value: "lime" });
			expect(testBucket._head.next.next.entry).toEqual({ key: "apple", value: "green" });
		});
		it("increments _length when appending a node", () => {
			const startingLength = emptyBucket._length;
			emptyBucket.append({ key: "carrot", value: "orange" });
			expect(emptyBucket._length).toBe(startingLength + 1);
		});
		it("does not increment _length when overwriting value", () => {
			const startingLength = testBucket._length;
			testBucket.append({ key: "carrot", value: "brown" });
			expect(testBucket._length).toBe(startingLength);
		});
		it("throws a TypeError when passed a non key-value pair", () => {
			expect(() => {
				emptyBucket.append("apple");
			}).toThrow(TypeError);
		});
	});
	describe("remove()", () => {
		it("defines remove()", () => {
			expect(typeof emptyBucket.remove).toBe("function");
		});
		it("removes the value for a key for a single-entry bucket", () => {
			singleEntryBucket.remove(tailNode.entry.key);
			expect(singleEntryBucket.containsKey(tailNode.entry.key)).toBe(false);
		});
		it("removes the value for a key for a multi-entry bucket", () => {
			testBucket.remove(tailNode.entry.key);
			expect(testBucket.containsKey(tailNode.entry.key)).toBe(false);
		});
		it("decrements '_length' when removing a value from a single-entry bucket", () => {
			const startBucketLength = singleEntryBucket._length;
			singleEntryBucket.remove(tailNode.entry.key);
			expect(singleEntryBucket._length).toBe(startBucketLength - 1);
		});
		it("decrements '_length' when removing a value from a multi-entry bucket", () => {
			const startBucketLength = testBucket._length;
			testBucket.remove(tailNode.entry.key);
			expect(testBucket._length).toBe(startBucketLength - 1);
		});
	});
	describe("head", () => {
		it("defines head getter", () => {
			expect(Bucket.prototype.hasOwnProperty("head")).toBe(true);
		});
		it("returns null for empty lists", () => {
			expect(emptyBucket.head).toBeNull();
		});
		it("returns the first node for non-empty lists", () => {
			expect(testBucket.head).toBe(headNode.value);
		});
	});
	describe("size", () => {
		it("defines size getter", () => {
			expect(Bucket.prototype.hasOwnProperty("size")).toBe(true);
		});
		it("returns 0 for an empty list", () => {
			expect(emptyBucket.size).toBe(0);
		});
		it("returns the number of items in a non-empty-list", () => {
			expect(testBucket.size).toBe(3);
		});
	});
	describe("containsKey()", () => {
		it("defines containsKey()", () => {
			expect(typeof emptyBucket.containsKey).toBe("function");
		});
		it("returns false for empty lists", () => {
			expect(emptyBucket.containsKey({ key: "carrot", value: "orange" })).toBe(false);
		});
		it("returns false if value is not in the list", () => {
			expect(testBucket.containsKey("hamster")).toBe(false);
		});
		it("returns true if value is in the list", () => {
			expect(testBucket.containsKey("carrot")).toBe(true);
			expect(testBucket.containsKey("banana")).toBe(true);
			expect(testBucket.containsKey("apple")).toBe(true);
		});
	});
	describe("findValue()", () => {
		it("defines get()", () => {
			expect(typeof emptyBucket.findValue).toBe("function");
		});
		it("returns null if key not found", () => {
			expect(testBucket.findValue("hamster")).toBe(null);
		});
		it("returns the value for a key in a single-entry bucket", () => {
			expect(singleEntryBucket.findValue(tailNode.entry.key)).toBe(tailNode.entry.value);
		});
		it("returns the value for a key in a multi-entry bucket", () => {
			expect(testBucket.findValue(tailNode.entry.key)).toBe(tailNode.entry.value);
		});
	});
	describe("toString()", () => {
		it("defines toString()", () => {
			expect(typeof emptyBucket.toString).toBe("function");
		});
		it("returns an empty string if the bucket is empty", () => {
			expect(emptyBucket.toString()).toBe("");
		});
		it("returns nodes in the format '( value ) -> ( value ) -> null'", () => {
			const expected = "( carrot: orange ) -> ( banana: yellow ) -> ( apple: red ) -> null";
			expect(testBucket.toString()).toBe(expected);
		});
	});
	describe("toArr()", () => {
		it("defines toArr()", () => {
			expect(typeof emptyBucket.toArr).toBe("function");
		});
		it("returns an empty array if the bucket is empty", () => {
			expect(emptyBucket.toArr()).toEqual([]);
		});
		it("returns key-value pairs in the format '[[key, value], [key, value]]'", () => {
			const expected = [
				[headNode.entry.key, headNode.entry.value],
				[midNode.entry.key, midNode.entry.value],
				[tailNode.entry.key, tailNode.entry.value],
			];
			expect(testBucket.toArr()).toEqual(expected);
		});
	});
	describe("getProperties", () => {
		it("defines getProperties()", () => {
			expect(typeof emptyBucket.getProperties).toBe("function");
		});
		it("returns an empty array if the bucket is empty", () => {
			expect(emptyBucket.toArr()).toEqual([]);
		});
		it("returns an array of keys and values", () => {
			const keys = [headNode.entry.key, midNode.entry.key, tailNode.entry.key];
			const values = [headNode.entry.value, midNode.entry.value, tailNode.entry.value];
			expect(testBucket.getProperties("key")).toEqual(keys);
			expect(testBucket.getProperties("value")).toEqual(values);
		});
		it("throws an error if 'property' is not 'key' or 'value'", () => {
			expect(() => {
				testBucket.getProperties("entry");
			}).toThrow();
		});
	});
});
