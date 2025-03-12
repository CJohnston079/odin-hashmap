# The Odin Project | HaspMap

This is a practice implementation of HashMap data structure in JavaScript.

## About

### Project aims

The project brief can be found here: [Project: Linked Lists | The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap). Below is a brief summary of the project aims:

1. Implement a `Node` class/factory to manage individual data points.
2. Implement a `Bucket` class/factory, a linked list style data structure to manage a sequence of nodes storing key-value pairs. `Bucket` should include utility methods that can be used to interact with the nodes in the bucket.
3. Implement a `HashMap` class/factory to store, manage and retrieve key-value pairs using a hashing function. The HashMap should handle collisions via separate chaining with linked lists, which are the individual buckets. `HashMAp` should also dynamically resize above a certain threshold of entries to maintain a manageable collision rate.

## Setup

After cloning the repository, install the project dependencies by running:

```Bash
npm install
```

### Testing

Tests are written in Jest, with Babel configured to allow the use of ES6 modules. To run the testing suite, use:

```Bash
npm test
```

Alternatively, you can watch for changes to the tests or modules using:

```Bash
npm run watch
```
