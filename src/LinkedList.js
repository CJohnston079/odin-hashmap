import Node from "./Node.js";

class LinkedList {
	constructor(head = null) {
		this._head = head;
		this._length = 0;
	}

	get head() {
		return this._head ? this._head.value : null;
	}

	get size() {
		return this._length;
	}

	append(value) {
		const node = new Node(value);

		if (!this._head) {
			this._head = node;
		} else {
			let current = this._head;

			while (current.next) {
				current = current.next;
			}

			current.setNext(node);
		}

		this._length += 1;
	}

	prepend(value) {
		const node = new Node(value);

		if (this._head) {
			node.next = this._head;
		}

		this._head = node;
		this._length += 1;
	}

	tail() {
		if (!this._head) {
			return null;
		}

		let current = this._head;

		while (current.next) {
			current = current.next;
		}

		return current.value;
	}

	at(index) {
		if (!this._head) {
			return null;
		}

		if (index >= this._length) {
			throw new Error(
				`Index is out of bounds. Index (${index}) should be less than or equal to length (${this._length}).`
			);
		}

		let current = this._head;

		for (let i = 0; i < this._length; i += 1) {
			if (i === index) {
				return current.value;
			}

			current = current.next;
		}
	}

	pop() {
		if (!this._head) {
			throw new Error(`Cannot pop from an empty list.`);
		}

		let current = this._head;

		while (current.next.next) {
			current = current.next;
		}

		current.next = null;
		this._length -= 1;

		return;
	}

	contains(value) {
		if (!this._head) {
			return false;
		}

		let current = this._head;

		while (current) {
			if (current.value === value) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	find(value) {
		if (!this._head) {
			return null;
		}

		let current = this._head;

		for (let i = 0; i < this._length; i += 1) {
			if (current.value === value) {
				return i;
			}

			current = current.next;
		}

		return null;
	}

	toString() {
		if (!this._head) {
			return "";
		}

		let str = "";
		let current = this._head;

		while (current) {
			str += `( ${current.value} ) -> `;
			current = current.next;
		}

		return (str += "null");
	}

	insertAt(value, index) {
		if (index > this._length) {
			throw new Error(
				`Index is out of bounds. Index (${index}) should be less than or equal to length (${this._length}).`
			);
		}

		const node = new Node(value);

		let current = this._head;

		for (let i = 0; i < this._length; i += 1) {
			if (i + 1 === index) {
				node.next = current.next;
				current.next = node;
				this._length += 1;

				return;
			}

			current = current.next;
		}

		return;
	}

	removeAt(index) {
		if (!this._head) {
			throw new Error(`Cannot remove a node from an empty list.`);
		}

		if (index >= this._length) {
			throw new Error(
				`Index is out of bounds. Index (${index}) should be less than or equal to length (${this._length}).`
			);
		}

		if (index === 0) {
			this._head = this._head.next;

			this._length -= 1;

			return;
		}

		let current = this._head;

		for (let i = 0; i < this._length; i += 1) {
			if (i + 1 === index) {
				current.next = current.next.next;

				this._length -= 1;

				return;
			}

			current = current.next;
		}

		return;
	}
}

export default LinkedList;
