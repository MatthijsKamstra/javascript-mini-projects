(function ($global) { "use strict";
class SortableJs {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("SortableJs - Dom ready");
			utils_Embed.setScript("https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js",$bind(_gthis,_gthis.setupSortableJs));
		});
	}
	setupSortableJs() {
		console.log("src/SortableJs.hx:14:","setupSortableJs");
		let el = window.document.getElementById("example1");
		let sortable = new Sortable(el, {
			animation: 150,
			ghostClass: 'bg-warning'
		});
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
class utils_Embed {
	static setScript(src,callback) {
		let one = window.document.querySelector("[src=\"" + src + "\"]");
		if(one == null) {
			let script = window.document.createElement("script");
			script.onload = function(e) {
				$global.console.log(e);
				callback.apply(callback,[]);
			};
			script.src = src;
			window.document.body.appendChild(script);
		} else if(callback != null) {
			callback.apply(callback,[]);
		}
	}
}
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
}
SortableJs.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
