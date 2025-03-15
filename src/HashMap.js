import Bucket from "./Bucket.js";

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this._capacity = capacity;
		this._loadFactor = loadFactor;
		this._buckets = new Array(capacity).fill(null).map(() => new Bucket());
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

	grow() {
		const entries = this.entries();

		this._capacity *= 2;
		this._buckets = new Array(this._capacity).fill(null).map(() => new Bucket());

		for (const [key, value] of entries) {
			const hashCode = this.hash(key);
			const bucket = this._buckets[hashCode];

			bucket.append({ key, value });
		}
	}

	set(key, value) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const bucketSize = bucket.size;

		bucket.append({ key, value });

		if (bucket.size > bucketSize) {
			this._length += 1;
		}

		if (this._length > this._capacity * this._loadFactor) {
			this.grow();
		}

		return;
	}

	get(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const value = bucket.findValue(key);

		return value;
	}

	remove(key) {
		const hashCode = this.hash(key);
		const bucket = this._buckets[hashCode];
		const bucketSize = bucket.size;

		bucket.remove(key);

		if (bucket.size < bucketSize) {
			this._length -= 1;
			return true;
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
		this._buckets = new Array(this._capacity).fill(null).map(() => new Bucket());
	}

	keys = () => this._buckets.flatMap(bucket => bucket.getProperties("key"));

	values = () => this._buckets.flatMap(bucket => bucket.getProperties("value"));

	entries = () => this._buckets.flatMap(bucket => bucket.toArr());
}

export default HashMap;
