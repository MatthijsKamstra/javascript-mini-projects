// Generated by Haxe 4.0.5
(function ($global) { "use strict";
class HxOverrides {
	static cca(s,index) {
		var x = s.charCodeAt(index);
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
}
class Markdown {
	constructor() {
		this.url = "test.md";
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("Markdown - Dom ready");
			_gthis.loadData(_gthis.url,$bind(_gthis,_gthis.markdown2html));
		});
	}
	markdown2html(md) {
		var div = window.document.getElementById("input");
		div.innerText = md;
		var html = this.convert(md);
		var div1 = window.document.getElementById("output");
		div1.innerHTML = html;
	}
	convert(md) {
		var convertHTML = "";
		var lines = md.split("\n");
		var _g = 0;
		var _g1 = lines.length;
		while(_g < _g1) {
			var i = _g++;
			var line = lines[i];
			if(line.indexOf("---") != -1) {
				convertHTML += "<hr>\n";
				continue;
			}
			if(line.indexOf("**") != -1) {
				var arr = line.split("**");
				convertHTML += "" + arr[0] + "<b>" + arr[1] + "</b>" + arr[2] + "<br>";
				continue;
			}
			if(line.indexOf("_") != -1) {
				var arr1 = line.split("_");
				convertHTML += "" + arr1[0] + "<i>" + arr1[1] + "</i>" + arr1[2] + "<br>";
				continue;
			}
			if(line.lastIndexOf("#") != -1) {
				var l = StringTools.trim(StringTools.replace(line,"#",""));
				convertHTML += "<h" + (line.lastIndexOf("#") + 1) + ">" + l + "</h" + (line.lastIndexOf("#") + 1) + ">\n";
				continue;
			}
			convertHTML += line + "<br>";
		}
		return convertHTML;
	}
	loadData(url,callback) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			var tmp = this.readyState == 4 && this.status == 200;
		};
		req.onload = function() {
			var body = req.response;
			if(this.status == 200) {
				callback(body);
			}
		};
		req.onerror = function(error) {
			window.console.error("[JS] error: " + error);
		};
		req.open("GET",url);
		req.send();
	}
	static main() {
		var app = new Markdown();
	}
}
class StringTools {
	static isSpace(s,pos) {
		var c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		var l = s.length;
		var r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		var l = s.length;
		var r = 0;
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
Markdown.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
