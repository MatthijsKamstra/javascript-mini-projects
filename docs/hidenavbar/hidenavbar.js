(function ($global) { "use strict";
class Hidenavbar {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Hidenavbar - Dom ready");
			_gthis.setElements();
		});
	}
	setElements() {
		this.nav = window.document.getElementsByClassName("smart-scroll")[0];
		let tmp = "" + this.nav.offsetHeight;
		window.document.body.style.paddingTop = tmp + "px";
		let prevScrollpos = window.pageYOffset;
		let _gthis = this;
		window.onscroll = function() {
			let currentScrollPos = window.pageYOffset;
			if(prevScrollpos > currentScrollPos) {
				_gthis.nav.classList.remove("scrolled-down");
			} else {
				_gthis.nav.classList.add("scrolled-down");
			}
			prevScrollpos = currentScrollPos;
		};
	}
	static main() {
		let app = new Hidenavbar();
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
Hidenavbar.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
