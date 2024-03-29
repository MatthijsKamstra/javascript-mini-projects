(function ($hx_exports, $global) { "use strict";
class HxOverrides {
	static strDate(s) {
		switch(s.length) {
		case 8:
			let k = s.split(":");
			let d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		case 10:
			let k1 = s.split("-");
			return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
		case 19:
			let k2 = s.split(" ");
			let y = k2[0].split("-");
			let t = k2[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw haxe_Exception.thrown("Invalid date format : " + s);
		}
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class JsonP {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("JsonP - Dom ready");
			_gthis.getData();
			_gthis.getRepos();
		});
	}
	getData() {
		let url = "https://api.github.com/users/MatthijsKamstra";
		JsonP.loadDataJsonP(url,"JsonP.onCompleteHandler");
	}
	getRepos() {
		let url = "https://api.github.com/users/MatthijsKamstra/repos?page=1&per_page=100";
		JsonP.loadDataJsonP(url,"JsonP.onTestCompleteHandler");
	}
	static onTestCompleteHandler(json) {
		$global.console.log("onTestCompleteHandler");
		$global.console.log(json);
		$global.console.log(json.meta.Link[0][0]);
		let json1 = json.meta.Link[0];
		$global.console.log(json1[1].rel);
		if(json.meta.Link[0][1].rel == "next") {
			JsonP.loadDataJsonP(json.meta.Link[0][0]);
		}
		let div = window.document.getElementById("container-jsonp-data");
		let html = div.innerHTML;
		html += "<ul>";
		let _g = 0;
		let _g1 = json.data.length;
		while(_g < _g1) {
			let i = _g++;
			let obj = json.data[i];
			let createdDate = HxOverrides.strDate(StringTools.replace(StringTools.replace(obj.created_at,"T"," "),"Z",""));
			console.log("src/JsonP.hx:44:",createdDate);
			if(obj.created_at == obj.updated_at) {
				continue;
			}
			if(obj.fork != true) {
				html += "<li><a href=\"" + obj.html_url + "\">" + obj.name + "</a>";
				if(obj.homepage != null) {
					html += " - <a href=\"" + obj.homepage + "\">homepage</a>";
				}
				html += "</li>";
			}
		}
		html += "</ul>";
		div.innerHTML = html;
	}
	static onCompleteHandler(json) {
		let div = window.document.getElementById("container-jsonp-data");
		$global.console.log("onCompleteHandler");
		$global.console.log(json);
		let html = "\n<div class=\"col-auto\">\n<img src=\"" + Std.string(json.data.avatar_url) + "\" class=\"rounded\"><br>\n</div>\n<div class=\"col-6\">\nName: " + Std.string(json.data.name) + "<br>\nBio: " + Std.string(json.data.bio) + "<br>\nPublic repos: " + Std.string(json.data.public_repos) + "<br>\nBlog: <a href=\"" + Std.string(json.data.blog) + "\" target=\"_blank\">Check out blog</a><br>\nRepos: <a href=\"" + Std.string(json.data.html_url) + "?tab=repositories\" target=\"_blank\">Check out repos</a><br>\n</div>\n";
		div.innerHTML = html;
	}
	static loadDataJsonP(url,callback) {
		let script = window.document.createElement("script");
		if(callback != null) {
			let foo = url.indexOf("?") != -1 ? "&" : "?";
			script.src = "" + url + foo + "callback=" + callback;
		} else {
			script.src = "" + url;
		}
		window.document.head.appendChild(script);
		script.onload = function(e) {
			this.remove();
		};
	}
	static main() {
		let app = new JsonP();
	}
}
$hx_exports["JsonP"] = JsonP;
JsonP.__name__ = true;
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class StringTools {
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
}
StringTools.__name__ = true;
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
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
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
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
	String.__name__ = true;
	Array.__name__ = true;
	Date.__name__ = "Date";
}
js_Boot.__toStr = ({ }).toString;
JsonP.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
