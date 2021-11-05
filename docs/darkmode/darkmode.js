(function ($global) { "use strict";
class Darkmode {
	constructor() {
		this.localStorage = false;
		this.isLightMode = false;
		this.isDarkMode = false;
		this.dbname = "isDarkmode";
		this.isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		this.isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;
		$global.console.group("possible value for darkmode");
		$global.console.debug("isDarkMode: " + Std.string(this.isDarkMode));
		$global.console.debug("isLightMode: " + Std.string(this.isLightMode));
		$global.console.debug("localStorage: " + Std.string(this.get_localStorage()));
		$global.console.groupEnd();
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Darkmode - Dom ready");
			_gthis.setColorScheme();
			_gthis.setElements();
		});
	}
	setColorScheme() {
		if(this.get_localStorage() != null) {
			if(this.get_localStorage()) {
				this.activateDarkMode();
			}
			return;
		}
		if(!this.isDarkMode && !this.isLightMode) {
			let hour = new Date().getHours();
			if(hour < 5 || hour >= 17) {
				this.activateDarkMode();
			}
		}
		if(this.isDarkMode) {
			this.activateDarkMode();
		}
	}
	setElements() {
		let btn = window.document.getElementById("btn-darkmode");
		let _gthis = this;
		btn.onclick = function() {
			_gthis.activateDarkMode();
		};
	}
	activateDarkMode() {
		window.document.body.classList.toggle("darkmode");
		if(window.document.body.classList.contains("darkmode")) {
			this.set_localStorage(true);
		} else {
			this.set_localStorage(false);
		}
	}
	get_localStorage() {
		let temp = window.localStorage.getItem(this.dbname);
		this.set_localStorage(temp == "true");
		return this.localStorage;
	}
	set_localStorage(value) {
		window.localStorage.setItem(this.dbname,value == null ? "null" : "" + value);
		return this.localStorage = value;
	}
	static main() {
		let app = new Darkmode();
	}
}
Darkmode.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
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
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
{
	String.__name__ = true;
	Array.__name__ = true;
	Date.__name__ = "Date";
}
js_Boot.__toStr = ({ }).toString;
Darkmode.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
