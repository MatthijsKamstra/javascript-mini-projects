(function ($global) { "use strict";
class Shoppingcard {
	constructor() {
		this.sideNavInnerWidth = 800;
		this.map = new haxe_ds_StringMap();
		this.json = "coffee.json";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Shoppingcard -Dom ready");
			_gthis.init();
			_gthis.setElements();
		});
	}
	setElements() {
		this.sideNav = window.document.getElementById("shoppingnav");
		let btn = window.document.getElementById("btn-sidenav-close");
		let _gthis = this;
		btn.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav();
		};
		let btn1 = window.document.getElementById("btn-sidenav-open");
		btn1.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav();
		};
	}
	init() {
		let _gthis = this;
		this.vm = new Vue({ el : "#app", data : { message : "Hello Vue.js!", name : "Vue.js", count : 20, json : { }}, methods : { greet : function(event) {
			event.preventDefault();
			_gthis.test(event);
		}}});
		this.loadData(this.json,$bind(this,this.setupJsonData));
	}
	test(e) {
		$global.console.log(e);
		let link = e.currentTarget;
		console.log("src/Shoppingcard.hx:67:",link.dataset.id);
		let coffeeObj = this.map.h[link.dataset.id];
		$global.console.log(coffeeObj.name);
	}
	setupJsonData(data) {
		let _json = JSON.parse(data);
		let arr = _json.items;
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let coffee = arr[i];
			this.map.h[coffee.guid] = coffee;
		}
		this.vm.$data.json = _json;
	}
	loadData(url,callback) {
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			let tmp = this.readyState == 4 && this.status == 200;
		};
		req.onload = function() {
			let body = req.response;
			if(this.status == 200) {
				callback(body);
			}
		};
		req.onerror = function(error) {
			$global.console.error("[JS] error: " + error);
		};
		req.open("GET",url);
		req.send();
	}
	toggleNav() {
		console.log("src/Shoppingcard.hx:125:","toggleNav " + this.sideNav.style.left);
		if(this.sideNav.style.left != "-" + this.sideNavInnerWidth + "px") {
			this.sideNav.style.left = "-" + this.sideNavInnerWidth + "px";
		} else {
			this.sideNav.style.left = "0";
		}
	}
	static main() {
		let app = new Shoppingcard();
	}
}
class haxe_ds_StringMap {
	constructor() {
		this.h = Object.create(null);
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
}
Shoppingcard.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
