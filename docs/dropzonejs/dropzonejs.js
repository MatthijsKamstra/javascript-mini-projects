(function ($global) { "use strict";
class DropzoneJs {
	constructor() {
		console.log("src/DropzoneJs.hx:3:","DropzoneJs");
	}
	static main() {
		let app = new DropzoneJs();
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
DropzoneJs.main();
})({});
