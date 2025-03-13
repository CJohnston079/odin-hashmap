import Node from "./Node.js";

class Bucket {
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

	append(keyVal) {
		if (
			typeof keyVal !== "object" ||
			keyVal === null ||
			!("key" in keyVal) ||
			!("value" in keyVal) ||
			typeof keyVal.key !== "string"
		) {
			throw new TypeError(
				"Expected a key-value pair with structure { key: <key>, value: <value> }"
			);
		}

		const node = new Node(keyVal);

		if (!this._head) {
			this._head = node;
		} else {
			let current = this._head;

			while (current) {
				if (current.entry.key === keyVal.key) {
					current.entry.value = keyVal.value;
					return;
				}

				if (!current.next) {
					break;
				}

				current = current.next;
			}

			current.setNext(node);
		}

		this._length += 1;
	}

	containsKey(key) {
		if (!this._head) {
			return false;
		}

		let current = this._head;

		while (current) {
			if (current.entry.key === key) {
				return true;
			}

			current = current.next;
		}

		return false;
	}

	findKey(key) {
		if (!this._head) {
			return null;
		}

		let current = this._head;

		for (let i = 0; i < this._length; i += 1) {
			if (current.entry.key === key) {
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
			str += `( ${current.entry.key}: ${current.entry.value} ) -> `;
			current = current.next;
		}

		return (str += "null");
	}
}

export default Bucket;
