import HashMap from "./src/HashMap.js";

const map = new HashMap();

const keyVals = [
	{ key: "apple", value: "red" },
	{ key: "banana", value: "yellow" },
	{ key: "carrot", value: "orange" },
	{ key: "dog", value: "brown" },
	{ key: "elephant", value: "gray" },
	{ key: "frog", value: "green" },
	{ key: "grape", value: "purple" },
	{ key: "hat", value: "black" },
	{ key: "ice cream", value: "white" },
	{ key: "jacket", value: "blue" },
	{ key: "kite", value: "pink" },
	{ key: "lion", value: "golden" },
];

const printSeparator = function () {
	const width = process.stdout.columns || 80;
	console.log("-".repeat(width));
};

const logResults = function ({ message = "Results", skipPrintData = false }) {
	const capacity = map._capacity;
	const loadFactor = map._loadFactor;
	const length = map.length;
	const loadLevel = length / capacity;
	const numCollisions = map._buckets.reduce(
		(cols, bucket) => cols + Math.max(bucket._length - 1, 0),
		0
	);
	const collisionRate = Math.floor((numCollisions / length) * 100) / 100;

	printSeparator();
	console.log(message);
	printSeparator();

	if (skipPrintData) {
		return;
	}

	console.log(
		`Capacity: ${capacity} | Length: ${length} | Load level: ${loadLevel} / ${loadFactor} | Collisions: ${numCollisions} | Collision rate: ${collisionRate}`
	);
	printSeparator();
	map._buckets.forEach((bucket, i) => console.log(`[${i}]:`, bucket.toString()));
	printSeparator();
};

keyVals.forEach((keyVal, i) => map.set(keyVal.key, keyVal.value));
logResults({ message: "Populating hash map..." });

map.set("apple", "green");
logResults({ message: "Updating value of 'apple'..." });

map.remove("lion");
logResults({ message: "Removing key 'lion'..." });

map.set("lion", "golden");
map.set("moon", "silver");
logResults({
	message:
		"Adding 'lion' back in...\nAdding 'moon'...\nLoad factor exceeded!\nGrowing new buckets...\nRedistributing entries...",
});
