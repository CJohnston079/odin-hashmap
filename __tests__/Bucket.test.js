import Bucket from "../src/Bucket";

describe("Bucket", () => {
	let emptyBucket;
	let testBucket;
	let tailNode = { value: { key: "apple", value: "red" }, next: null };
	let midNode = { value: { key: "banana", value: "yellow" }, next: tailNode };
	let headNode = { value: { key: "carrot", value: "orange" }, next: midNode };

	beforeEach(() => {
		tailNode = { value: { key: "apple", value: "red" }, next: null };
		midNode = { value: { key: "banana", value: "yellow" }, next: tailNode };
		headNode = { value: { key: "carrot", value: "orange" }, next: midNode };

		emptyBucket = new Bucket();
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
			expect(emptyBucket._head.value).toEqual({ key: "carrot", value: "orange" });
		});
		it("should append a node to a non-empty list", () => {
			emptyBucket.append({ key: "carrot", value: "orange" });
			emptyBucket.append({ key: "banana", value: "yellow" });

			expect(emptyBucket._head.next).not.toBeNull();
			expect(emptyBucket._head.next.value).toEqual({ key: "banana", value: "yellow" });
			expect(emptyBucket._head.next.next).toBeNull();
		});
		it("should overwrite the value of a node if the key is already in the bucket", () => {
			testBucket.append({ key: "carrot", value: "brown" });
			testBucket.append({ key: "banana", value: "lime" });
			testBucket.append({ key: "apple", value: "green" });
			expect(testBucket._head.value).toEqual({ key: "carrot", value: "brown" });
			expect(testBucket._head.next.value).toEqual({ key: "banana", value: "lime" });
			expect(testBucket._head.next.next.value).toEqual({ key: "apple", value: "green" });
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
	describe("findKey()", () => {
		it("defines findKey()", () => {
			expect(typeof emptyBucket.findKey).toBe("function");
		});
		it("returns null for empty lists", () => {
			expect(emptyBucket.findKey({ key: "carrot", value: "orange" })).toBe(null);
		});
		it("returns null if value is not found", () => {
			expect(testBucket.findKey("hamster")).toBe(null);
		});
		it("returns the index of found values", () => {
			expect(testBucket.findKey("carrot")).toBe(0);
			expect(testBucket.findKey("banana")).toBe(1);
			expect(testBucket.findKey("apple")).toBe(2);
		});
	});
	describe("toString()", () => {
		it("defines toString()", () => {
			expect(Bucket.prototype.hasOwnProperty("toString")).toBe(true);
		});
		it("returns an empty string for empty lists", () => {
			expect(emptyBucket.toString()).toBe("");
		});
		it("returns nodes in the format '( value ) -> ( value ) -> null' for non-empty lists", () => {
			const expected = "( carrot: orange ) -> ( banana: yellow ) -> ( apple: red ) -> null";
			expect(testBucket.toString()).toBe(expected);
		});
	});
});
