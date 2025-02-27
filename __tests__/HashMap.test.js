import HashMap from "../src/HashMap";
import LinkedList from "../src/LinkedList.js";

describe("HashMap", () => {
	describe("constructor", () => {
		it("initialises with '_capacity' and '_loadFactor', defaulting to 16 and 0.75", () => {
			const map = new HashMap();
			expect(map._capacity).toBe(16);
			expect(map._loadFactor).toBe(0.75);
		});
		it("initializes '_buckets' as an array of LinkedLists", () => {
			const map = new HashMap();
			expect(Array.isArray(map._buckets)).toBe(true);
			expect(map._buckets.length).toBe(16);
			map._buckets.forEach(bucket => {
				expect(bucket).toBeInstanceOf(LinkedList);
			});
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
});
