import HashMap from "../src/HashMap";

describe("HashMap", () => {
	describe("constructor", () => {
		it("initialises with 'capacity' and 'loadFactor', defaulting to 16 and 0.75", () => {
			const map = new HashMap();
			expect(map._capacity).toBe(16);
			expect(map._loadFactor).toBe(0.75);
		});
	});
});
