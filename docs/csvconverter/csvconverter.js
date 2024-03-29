(function ($global) { "use strict";
class CsvConverter {
	constructor() {
		this.csv2 = "FistName,LastName,Age\nHenk,\"de Boer\", 3\nJan,Rood , 20\nMien ,\" Fiets \", 45";
		console.log("src/CsvConverter.hx:21:","CsvConverter");
		let csvArr = this.convert(this.csv2);
		console.log("src/CsvConverter.hx:23:","column names: " + Std.string(csvArr[0]));
		console.log("src/CsvConverter.hx:24:","nr colums: " + csvArr[0].length);
		console.log("src/CsvConverter.hx:25:","nr rows: " + (csvArr.length - 1));
		let md = this.generateMarkdownTable(csvArr);
		this.inArea = window.document.getElementById("js-input-textarea");
		this.inArea.value = this.csv2;
		this.outArea = window.document.getElementById("js-output-textarea");
		this.outArea.value = md;
		let copyBtn = window.document.getElementById("js-copy-btn");
		copyBtn.onclick = $bind(this,this.onClickHandler);
		let convertBtn = window.document.getElementById("js-convert-btn");
		convertBtn.onclick = $bind(this,this.onConvertClickHandler);
	}
	onClickHandler(e) {
		e.preventDefault();
		this.outArea.select();
		window.document.execCommand("copy");
	}
	onConvertClickHandler(e) {
		let str = this.inArea.value;
		let csvArr = this.convert(str);
		let md = this.generateMarkdownTable(csvArr);
		this.outArea.value = md;
	}
	generateMarkdownTable(arr) {
		let md = "";
		let line = "";
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let row = arr[i];
			let _g1 = 0;
			let _g2 = row.length;
			while(_g1 < _g2) {
				let j = _g1++;
				let col = row[j];
				md += "| " + col + " ";
				if(i == 0) {
					line += "| ---- ";
				}
			}
			md += "|\n";
			if(i == 0) {
				md += "" + line + "|\n";
			}
		}
		$global.console.info(md);
		return md;
	}
	convert(csv) {
		let arr = [];
		let rowArr = csv.split("\n");
		let _g = 0;
		let _g1 = rowArr.length;
		while(_g < _g1) {
			let i = _g++;
			let row = rowArr[i];
			let colArr = row.split(",");
			let cleanColArr = [];
			let _g1 = 0;
			let _g2 = colArr.length;
			while(_g1 < _g2) {
				let j = _g1++;
				let col = StringTools.trim(StringTools.replace(StringTools.replace(colArr[j],"\"",""),"'",""));
				cleanColArr.push(col);
			}
			arr.push(cleanColArr);
		}
		return arr;
	}
	static main() {
		let app = new CsvConverter();
	}
}
CsvConverter.__name__ = true;
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
StringTools.__name__ = true;
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
CsvConverter.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
