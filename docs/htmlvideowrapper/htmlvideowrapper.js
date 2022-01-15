(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class HtmlVideoWrapper {
	constructor() {
		this.markup = "<div class=\"play-pause\"></div>\n\t\t<div class=\"scrubber\">\n\t\t\t<div class=\"playhead\"></div>\n\t\t\t<div class=\"progress\"></div>\n\t\t\t<div class=\"loaded\"></div>\n\t\t</div>\n\t\t<div class=\"time\">\n\t\t\t<em class=\"played\">00:00</em>/<strong class=\"duration\">00:00</strong>\n\t\t</div>";
		this.css = "";
		this.instanceCount = 0;
		this.doc = window.document;
		this.css = haxe_Resource.getString("style");
		let _gthis = this;
		this.doc.addEventListener("DOMContentLoaded",function(event) {
			_gthis.injectCSS();
			_gthis.wrapAudioTag();
		});
	}
	injectCSS() {
		let head = this.doc.getElementsByTagName("head")[0];
		let firstchild = head.firstChild;
		let style = this.doc.createElement("style");
		if(head == null) {
			return;
		}
		style.setAttribute("type","text/css");
		style.setAttribute("title","audiojs");
		style.appendChild(this.doc.createTextNode(this.css));
		head.insertBefore(style,firstchild);
	}
	wrapAudioTag() {
		let audioElements = this.doc.getElementsByTagName("audio");
		let _g = 0;
		let _g1 = audioElements.length;
		while(_g < _g1) {
			let i = _g++;
			this.createPlayer(js_Boot.__cast(audioElements[i] , HTMLAudioElement));
		}
	}
	createPlayer(audioElement) {
		let id = "hxaudiojs" + this.instanceCount;
		if(audioElement.hasAttribute("controls") != null) {
			audioElement.removeAttribute("controls");
		}
		let iswrapper = false;
		if(audioElement.parentElement.className == "hxaudiojs") {
			id = audioElement.parentElement.id;
			iswrapper = true;
		}
		if(!iswrapper) {
			let wrapper = this.doc.createElement("div");
			wrapper.setAttribute("class","hxaudiojs");
			wrapper.setAttribute("className","hxaudiojs");
			wrapper.setAttribute("id",id);
			wrapper.innerHTML = audioElement.outerHTML + this.markup;
			audioElement.outerHTML = wrapper.outerHTML;
			this.instanceCount++;
		}
		this.init(id);
	}
	init(id) {
		let wrapper = this.doc.getElementById(id);
		if(wrapper.getElementsByTagName("video")[0] == null) {
			console.log("src/HtmlVideoWrapper.hx:107:","no <video> tag in element $id");
			return;
		}
		let audio = js_Boot.__cast(wrapper.getElementsByTagName("video")[0] , HTMLVideoElement);
		let btn = wrapper.getElementsByClassName("play-pause")[0];
		let playhead = wrapper.getElementsByClassName("playhead")[0];
		let progress = wrapper.getElementsByClassName("progress")[0];
		let loaded = wrapper.getElementsByClassName("loaded")[0];
		let duration = wrapper.getElementsByClassName("duration")[0];
		let played = wrapper.getElementsByClassName("played")[0];
		let scrubber = wrapper.getElementsByClassName("scrubber")[0];
		btn.onclick = function(e) {
			if(audio.paused) {
				audio.play();
			} else {
				audio.pause();
			}
		};
		let _gthis = this;
		scrubber.onclick = function(e) {
			let f = audio.duration;
			if(isNaN(f)) {
				console.log("src/HtmlVideoWrapper.hx:131:","start loading data?");
				return;
			}
			let relativeLeft = e.clientX - _gthis.getLeftOffset(scrubber);
			let percent = relativeLeft / scrubber.offsetWidth;
			audio.currentTime = audio.duration * percent;
		};
		audio.ontimeupdate = function(e) {
			let percent = audio.currentTime / audio.duration;
			let p = audio.duration * percent;
			let m = Math.floor(p / 60);
			let s = Math.floor(p % 60);
			played.innerHTML = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
			progress.style.width = 100 * percent + "%";
			playhead.style.marginLeft = 100 * percent + "%";
			if(audio.paused) {
				btn.className = "play-pause play";
			} else {
				btn.className = "play-pause pause";
			}
			_gthis.onTimeUpdate(e);
		};
		audio.onended = function(e) {
			btn.className = "play-pause play";
			_gthis.onEnded(e);
		};
		audio.onloadstart = function(e) {
			_gthis.onLoadStart(e);
		};
		audio.onprogress = function(e) {
			if(audio.buffered.length == 0) {
				return;
			}
			let bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
			let duration = audio.duration;
			if(duration > 0) {
				loaded.style.width = bufferedEnd / duration * 100 + "%";
			}
			_gthis.onProgress(e);
		};
		audio.onerror = function(e) {
			console.log("src/HtmlVideoWrapper.hx:188:","## debug");
			btn.className = "play-pause error";
			_gthis.onError(e);
		};
		audio.onloadeddata = function(e) {
			let m = Math.floor(audio.duration / 60);
			let s = Math.floor(audio.duration % 60);
			duration.innerHTML = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
			_gthis.onLoadedData(e);
		};
	}
	getLeftOffset(el) {
		let _leftOffset = 0;
		while(true) {
			_leftOffset += el.offsetLeft;
			el = el.offsetParent;
			if(!(el.offsetParent != null)) {
				break;
			}
		}
		return _leftOffset;
	}
	onTimeUpdate(e) {
	}
	onEnded(e) {
	}
	onLoadStart(e) {
	}
	onProgress(e) {
	}
	onError(e) {
	}
	onLoadedData(e) {
	}
	static main() {
		let app = new HtmlVideoWrapper();
	}
}
HtmlVideoWrapper.__name__ = true;
Object.assign(HtmlVideoWrapper.prototype, {
	__class__: HtmlVideoWrapper
});
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
Math.__name__ = true;
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
class haxe_Resource {
	static getString(name) {
		let _g = 0;
		let _g1 = haxe_Resource.content;
		while(_g < _g1.length) {
			let x = _g1[_g];
			++_g;
			if(x.name == name) {
				if(x.str != null) {
					return x.str;
				}
				let b = haxe_crypto_Base64.decode(x.data);
				return b.toString();
			}
		}
		return null;
	}
}
haxe_Resource.__name__ = true;
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
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			let debug = pos > 0;
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let c2 = b[i++];
					let code = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let c2 = b[i++];
					let c3 = b[i++];
					let u = (c & 15) << 18 | (c2 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
}
haxe_io_Bytes.__name__ = true;
Object.assign(haxe_io_Bytes.prototype, {
	__class__: haxe_io_Bytes
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_crypto_Base64 {
	static decode(str,complement) {
		if(complement == null) {
			complement = true;
		}
		if(complement) {
			while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
		}
		return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
	}
}
haxe_crypto_Base64.__name__ = true;
class haxe_crypto_BaseCode {
	constructor(base) {
		let len = base.length;
		let nbits = 1;
		while(len > 1 << nbits) ++nbits;
		if(nbits > 8 || len != 1 << nbits) {
			throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
		}
		this.base = base;
		this.nbits = nbits;
	}
	initTable() {
		let tbl = [];
		let _g = 0;
		while(_g < 256) {
			let i = _g++;
			tbl[i] = -1;
		}
		let _g1 = 0;
		let _g2 = this.base.length;
		while(_g1 < _g2) {
			let i = _g1++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	decodeBytes(b) {
		let nbits = this.nbits;
		let base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		let tbl = this.tbl;
		let size = b.length * nbits >> 3;
		let out = new haxe_io_Bytes(new ArrayBuffer(size));
		let buf = 0;
		let curbits = 0;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				let i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
}
haxe_crypto_BaseCode.__name__ = true;
Object.assign(haxe_crypto_BaseCode.prototype, {
	__class__: haxe_crypto_BaseCode
});
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
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
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
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
			return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
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
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
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
haxe_Resource.content = [];
js_Boot.__toStr = ({ }).toString;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
HtmlVideoWrapper.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
