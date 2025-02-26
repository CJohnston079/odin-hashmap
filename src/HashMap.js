class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this._capacity = capacity;
		this._loadFactor = loadFactor;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;

		for (let i = 0; i < key.length; i += 1) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
		}

		return hashCode;
	}
}

export default HashMap;
