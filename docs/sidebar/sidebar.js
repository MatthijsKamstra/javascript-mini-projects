(function ($global) { "use strict";
class SideBar {
	constructor() {
		this.isVertical = true;
		this.linkArray = [];
		this.colors = ["#001f3f","#0074d9","#7fdbff","#39cccc","#3d9970","#2ecc40","#01ff70","#ffdc00","#ff851b","#ff4136","#f012be","#b10dc9","#85144b","#ffffff","#dddddd","#aaaaaa","#111111"];
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("SideBar - Dom ready");
			_gthis.init();
			_gthis.initToggle();
		});
	}
	init() {
		let ul = window.document.querySelector("[monkee-fullpage]");
		ul.classList.add("monkee-fullpage-list");
		let links = window.document.getElementsByTagName("a");
		let first = false;
		let _g = 0;
		let _g1 = links.length;
		while(_g < _g1) {
			let i = _g++;
			let link = links[i];
			if(link.getAttribute("href").charAt(0) == "#" && link.getAttribute("href").length > 1) {
				if(first == false) {
					link.classList.add("active");
				}
				$global.console.log("<li id=\"" + StringTools.replace(link.getAttribute("href"),"#","") + "\">" + link.getAttribute("href") + "</li>");
				let slide = window.document.querySelector(link.getAttribute("href"));
				slide.classList.add("monkee-fullpage-slide");
				slide.setAttribute("style","background-color: " + this.colors[i]);
				this.linkArray.push(link);
				link.onclick = $bind(this,this.onclickHandler);
				first = true;
			}
		}
	}
	initToggle() {
		let btn = window.document.getElementById("btn-toggle-dir");
		let _gthis = this;
		btn.onclick = function(e) {
			let ul = window.document.querySelector("[monkee-fullpage]");
			if(_gthis.isVertical) {
				this.innerHTML = "<i class=\"fa fa-arrows-v\" aria-hidden=\"true\"></i>";
				_gthis.isVertical = false;
				ul.classList.add("monkee-fullpage-list-horizontal");
			} else {
				this.innerHTML = "<i class=\"fa fa-arrows-h\" aria-hidden=\"true\"></i>";
				_gthis.isVertical = true;
				ul.classList.remove("monkee-fullpage-list-horizontal");
			}
		};
	}
	onclickHandler(e) {
		let _g = 0;
		let _g1 = this.linkArray.length;
		while(_g < _g1) {
			let i = _g++;
			let link = this.linkArray[i];
			link.classList.remove("active");
		}
		e.currentTarget.classList.add("active");
	}
	static main() {
		let app = new SideBar();
	}
}
class StringTools {
	static replace(s,sub,by) {
		return s.split(sub).join(by);
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
SideBar.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
