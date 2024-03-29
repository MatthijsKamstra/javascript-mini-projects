(function ($global) { "use strict";
class ConvertMarkdown {
	constructor() {
		this.url = "example.md";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("ConvertMarkdown - Dom ready");
			_gthis.loadData(_gthis.url,$bind(_gthis,_gthis.markdown2html));
		});
	}
	markdown2html(md) {
		let div = window.document.getElementById("input");
		div.innerText = md;
		let html = this.convert(md);
		let div1 = window.document.getElementById("output");
		div1.innerHTML = html;
	}
	convert(md) {
		let convertHTML = "";
		let lines = md.split("\n");
		let _g = 0;
		let _g1 = lines.length;
		while(_g < _g1) {
			let i = _g++;
			let line = lines[i];
			if(line.indexOf("---") != -1) {
				convertHTML += "<hr>\n";
				continue;
			}
			if(line.indexOf("**") != -1) {
				let arr = line.split("**");
				convertHTML += "" + arr[0] + "<b>" + arr[1] + "</b>" + arr[2] + "<br>";
				continue;
			}
			if(line.indexOf("_") != -1) {
				let arr = line.split("_");
				convertHTML += "" + arr[0] + "<i>" + arr[1] + "</i>" + arr[2] + "<br>";
				continue;
			}
			if(line.lastIndexOf("#") != -1) {
				let l = StringTools.trim(StringTools.replace(line,"#",""));
				convertHTML += "<h" + (line.lastIndexOf("#") + 1) + ">" + l + "</h" + (line.lastIndexOf("#") + 1) + ">\n";
				continue;
			}
			convertHTML += line + "<br>";
		}
		return convertHTML;
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
	static main() {
		let app = new ConvertMarkdown();
	}
}
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
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
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
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
}
ConvertMarkdown.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
