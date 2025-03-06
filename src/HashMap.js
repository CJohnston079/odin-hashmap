import Bucket from "./Bucket.js";

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this._capacity = capacity;
		this._loadFactor = loadFactor;
		this._buckets = new Array(16).fill(null).map(() => new Bucket());
		this._length = 0;
	}

	get length() {
		return this._length;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;

		for (let i = 0; i < key.length; i += 1) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
		}

		return hashCode;
	}

	set(key, value) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];

		bucket.append({ key, value });

		this._length += 1;

		return;
	}

	get(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];

		let current = bucket._head;

		for (let i = 0; i < bucket._length; i += 1) {
			if (current.value.key === key) {
				return current.value.value;
			}

			current = current.next;
		}

		return null;
	}

	remove(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];

		if (bucket._head.value.key === key) {
			bucket._head = null;
			return true;
		}

		let current = bucket._head;

		for (let i = 0; i < bucket._length; i += 1) {
			if (current.next && current.next.value.key === key) {
				current.next = current.next.next;
				return true;
			}

			current = current.next;
		}

		return false;
	}

	has(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const isKeyInBucket = bucket.containsKey(key);

		return isKeyInBucket;
	}

	clear() {
		this._buckets = new Array(16).fill(null).map(() => new Bucket());
	}

	keys() {
		const keys = this._buckets.reduce((bucketKeys, bucket) => {
			let current = bucket._head;

			while (current) {
				bucketKeys.push(current.value.key);
				current = current.next;
			}

			return bucketKeys;
		}, []);

		return keys;
	}

	values() {
		const values = this._buckets.reduce((bucketVals, bucket) => {
			let current = bucket._head;

			while (current) {
				bucketVals.push(current.value.value);
				current = current.next;
			}

			return bucketVals;
		}, []);

		return values;
	}
}

export default HashMap;
