(function ($global) { "use strict";
class FullpageJs {
	constructor() {
		console.log("src/FullpageJs.hx:3:","FullpageJs");
	}
	static main() {
		let app = new FullpageJs();
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
FullpageJs.main();
})({});
