class Node {
	constructor(value = null) {
		this.value = value;
		this.next = null;
	}

	setNext(node) {
		if (!(node instanceof Node || node === null)) {
			throw new Error("next must be a Node or null");
		}
		this.next = node;
	}
}

export default Node;
