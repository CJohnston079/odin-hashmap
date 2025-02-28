import Bucket from "./Bucket.js";

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this._capacity = capacity;
		this._loadFactor = loadFactor;
		this._buckets = new Array(16).fill(null).map(() => new Bucket());
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

		return;
	}
}

export default HashMap;
