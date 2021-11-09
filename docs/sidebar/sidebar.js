(function ($global) { "use strict";
class SideBar {
	constructor() {
		console.log("src/SideBar.hx:3:","SideBar");
	}
	static main() {
		let app = new SideBar();
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
SideBar.main();
})({});
