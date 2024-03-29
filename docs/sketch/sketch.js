(function ($global) { "use strict";
Math.__name__ = true;
class Sketch {
	constructor() {
		this.scale = 1.0;
		this.isMouseDown = false;
		this.lineWidth = 2;
		this.color = "black";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Sketch - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElement();
	}
	setElement() {
		this.canvas = window.document.getElementById("canvasElement");
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;
		this.ctx = this.canvas.getContext("2d",null);
		this.scale = this.canvas.width / this.canvas.clientWidth;
		let _gthis = this;
		window.document.getElementById("green").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("blue").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("red").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("yellow").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("orange").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("black").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("btn-save").onclick = function(e) {
			_gthis.saveCanvas();
		};
		window.document.getElementById("btn-clear").onclick = function(e) {
			_gthis.clearCanvas();
		};
		this.canvas.onmousedown = $bind(this,this.onMouseDownHandler);
		this.canvas.onmousemove = $bind(this,this.onMouseMoveHandler);
		this.canvas.onmouseup = $bind(this,this.onMouseUpHandler);
	}
	onMouseDownHandler(e) {
		this.isMouseDown = true;
		this.setPosition(e);
	}
	onMouseMoveHandler(e) {
		if(this.isMouseDown) {
			this.setPosition(e);
		}
	}
	onMouseUpHandler(e) {
		this.previousP = null;
		this.currentP = null;
		this.isMouseDown = false;
	}
	setPosition(e) {
		this.previousP = this.currentP;
		let p = { x : e.offsetX * this.scale, y : e.offsetY * this.scale};
		this.currentP = p;
		if(this.previousP == null) {
			this.previousP = p;
		}
		this.draw();
	}
	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.previousP.x,this.previousP.y);
		this.ctx.lineTo(this.currentP.x,this.currentP.y);
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.stroke();
		this.ctx.closePath();
	}
	saveCanvas() {
		window.alert("WIP");
	}
	clearCanvas() {
		let m = window.confirm("Want to clear?");
		if(m) {
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	static main() {
		let app = new Sketch();
	}
}
Sketch.__name__ = true;
Object.assign(Sketch.prototype, {
	__class__: Sketch
});
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
haxe_Exception.__super__ = Error;
Object.assign(haxe_Exception.prototype, {
	__class__: haxe_Exception
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
Object.assign(haxe_ValueException.prototype, {
	__class__: haxe_ValueException
});
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
Object.assign(haxe_iterators_ArrayIterator.prototype, {
	__class__: haxe_iterators_ArrayIterator
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			let cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			let name = js_Boot.__nativeClassName(o);
			if(name != null) {
				return js_Boot.__resolveNativeClass(name);
			}
			return null;
		}
	}
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
	static __interfLoop(cc,cl) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		let intf = cc.__interfaces__;
		if(intf != null && (cc.__super__ == null || cc.__super__.__interfaces__ != intf)) {
			let _g = 0;
			let _g1 = intf.length;
			while(_g < _g1) {
				let i = _g++;
				let i1 = intf[i];
				if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
					return true;
				}
			}
		}
		return js_Boot.__interfLoop(cc.__super__,cl);
	}
	static __instanceof(o,cl) {
		if(cl == null) {
			return false;
		}
		switch(cl) {
		case Array:
			return ((o) instanceof Array);
		case Bool:
			return typeof(o) == "boolean";
		case Dynamic:
			return o != null;
		case Float:
			return typeof(o) == "number";
		case Int:
			if(typeof(o) == "number") {
				return ((o | 0) === o);
			} else {
				return false;
			}
			break;
		case String:
			return typeof(o) == "string";
		default:
			if(o != null) {
				if(typeof(cl) == "function") {
					if(js_Boot.__downcastCheck(o,cl)) {
						return true;
					}
				} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
					if(((o) instanceof cl)) {
						return true;
					}
				}
			} else {
				return false;
			}
			if(cl == Class ? o.__name__ != null : false) {
				return true;
			}
			if(cl == Enum ? o.__ename__ != null : false) {
				return true;
			}
			return false;
		}
	}
	static __downcastCheck(o,cl) {
		if(!((o) instanceof cl)) {
			if(cl.__isInterface__) {
				return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	static __cast(o,t) {
		if(o == null || js_Boot.__instanceof(o,t)) {
			return o;
		} else {
			throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		let name = js_Boot.__toStr.call(o).slice(8,-1);
		if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
			return null;
		}
		return name;
	}
	static __isNativeObj(o) {
		return js_Boot.__nativeClassName(o) != null;
	}
	static __resolveNativeClass(name) {
		return $global[name];
	}
}
js_Boot.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
	String.prototype.__class__ = String;
	String.__name__ = true;
	Array.__name__ = true;
	var Int = { };
	var Dynamic = { };
	var Float = Number;
	var Bool = Boolean;
	var Class = { };
	var Enum = { };
}
js_Boot.__toStr = ({ }).toString;
Sketch.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
