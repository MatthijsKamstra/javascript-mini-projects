// Generated by Haxe 4.0.5
(function ($global) { "use strict";
Math.__name__ = true;
class Sketch {
	constructor() {
		this.scale = 1.0;
		this.isMouseDown = false;
		this.lineWidth = 2;
		this.color = "black";
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("Sketch - Dom ready");
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
		var _gthis = this;
		this.ctx = this.canvas.getContext("2d",null);
		this.scale = this.canvas.width / this.canvas.clientWidth;
		window.document.getElementById("green").onclick = function(e) {
			return _gthis.color = (js_Boot.__cast(e.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("blue").onclick = function(e1) {
			return _gthis.color = (js_Boot.__cast(e1.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("red").onclick = function(e2) {
			return _gthis.color = (js_Boot.__cast(e2.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("yellow").onclick = function(e3) {
			return _gthis.color = (js_Boot.__cast(e3.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("orange").onclick = function(e4) {
			return _gthis.color = (js_Boot.__cast(e4.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("black").onclick = function(e5) {
			return _gthis.color = (js_Boot.__cast(e5.currentTarget , HTMLDivElement)).id;
		};
		window.document.getElementById("btn-save").onclick = function(e6) {
			_gthis.saveCanvas();
			return;
		};
		window.document.getElementById("btn-clear").onclick = function(e7) {
			_gthis.clearCanvas();
			return;
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
		var p = { x : e.offsetX * this.scale, y : e.offsetY * this.scale};
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
		var m = window.confirm("Want to clear?");
		if(m) {
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	static main() {
		var app = new Sketch();
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
class js__$Boot_HaxeError extends Error {
	constructor(val) {
		super();
		this.val = val;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,js__$Boot_HaxeError);
		}
	}
}
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
Object.assign(js__$Boot_HaxeError.prototype, {
	__class__: js__$Boot_HaxeError
});
class js_Boot {
	static getClass(o) {
		if(o == null) {
			return null;
		} else if(((o) instanceof Array)) {
			return Array;
		} else {
			var cl = o.__class__;
			if(cl != null) {
				return cl;
			}
			var name = js_Boot.__nativeClassName(o);
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
		var t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				var str = "[";
				s += "\t";
				var _g3 = 0;
				var _g11 = o.length;
				while(_g3 < _g11) {
					var i = _g3++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			var tostr;
			try {
				tostr = o.toString;
			} catch( e1 ) {
				var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				var s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			var str1 = "{\n";
			s += "\t";
			var hasp = o.hasOwnProperty != null;
			var k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str1.length != 2) {
				str1 += ", \n";
			}
			str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str1 += "\n" + s + "}";
			return str1;
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
		if(Object.prototype.hasOwnProperty.call(cc,"__interfaces__")) {
			var intf = cc.__interfaces__;
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = _g++;
				var i1 = intf[i];
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
			throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
		}
	}
	static __nativeClassName(o) {
		var name = js_Boot.__toStr.call(o).slice(8,-1);
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
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
Sketch.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
