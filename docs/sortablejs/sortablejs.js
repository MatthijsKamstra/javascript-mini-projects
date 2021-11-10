(function ($global) { "use strict";
class SortableJs {
	constructor() {
		console.log("src/SortableJs.hx:3:","SortableJs");
	}
	static main() {
		let app = new SortableJs();
	}
}
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
{
}
SortableJs.main();
})({});
