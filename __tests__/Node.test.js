import Node from "../src/Node";

describe("Node", () => {
	let defaultNode;
	let headNode;

	beforeEach(() => {
		defaultNode = new Node();
		headNode = new Node("dog");
	});

	it("should initialise 'value' and 'next' as null by default", () => {
		expect(defaultNode.value).toBeNull();
		expect(defaultNode.next).toBeNull();
	});
	it("should correctly set a value when provided", () => {
		expect(headNode.value).toBe("dog");
		expect(headNode.next).toBeNull();
	});
	describe("setNode", () => {
		it("defines setNode()", () => {
			expect(typeof defaultNode.setNext).toBe("function");
		});
		it("returns undefined when called", () => {
			expect(defaultNode.setNext(headNode)).toBeUndefined();
		});
		it("should link to another node with the next property", () => {
			headNode.setNext(defaultNode);
			expect(headNode.next).toEqual(defaultNode);
		});
		it("should throw an error if 'next' is not a Node or null", () => {
			expect(() => headNode.setNext("string")).toThrow("next must be a Node or null");
			expect(() => headNode.setNext(42)).toThrow("next must be a Node or null");
			expect(() => headNode.setNext({})).toThrow("next must be a Node or null");
		});
	});
});
