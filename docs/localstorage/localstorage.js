(function ($global) { "use strict";
class DateTools {
	static __format_get(d,e) {
		switch(e) {
		case "%":
			return "%";
		case "A":
			return DateTools.DAY_NAMES[d.getDay()];
		case "B":
			return DateTools.MONTH_NAMES[d.getMonth()];
		case "C":
			return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
		case "D":
			return DateTools.__format(d,"%m/%d/%y");
		case "F":
			return DateTools.__format(d,"%Y-%m-%d");
		case "I":case "l":
			let hour = d.getHours() % 12;
			return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
		case "M":
			return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
		case "R":
			return DateTools.__format(d,"%H:%M");
		case "S":
			return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
		case "T":
			return DateTools.__format(d,"%H:%M:%S");
		case "Y":
			return Std.string(d.getFullYear());
		case "a":
			return DateTools.DAY_SHORT_NAMES[d.getDay()];
		case "b":case "h":
			return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
		case "d":
			return StringTools.lpad(Std.string(d.getDate()),"0",2);
		case "e":
			return Std.string(d.getDate());
		case "H":case "k":
			return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
		case "m":
			return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
		case "n":
			return "\n";
		case "p":
			if(d.getHours() > 11) {
				return "PM";
			} else {
				return "AM";
			}
			break;
		case "r":
			return DateTools.__format(d,"%I:%M:%S %p");
		case "s":
			return Std.string(d.getTime() / 1000 | 0);
		case "t":
			return "\t";
		case "u":
			let t = d.getDay();
			if(t == 0) {
				return "7";
			} else if(t == null) {
				return "null";
			} else {
				return "" + t;
			}
			break;
		case "w":
			return Std.string(d.getDay());
		case "y":
			return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
		default:
			throw new haxe_exceptions_NotImplementedException("Date.format %" + e + "- not implemented yet.",null,{ fileName : "DateTools.hx", lineNumber : 101, className : "DateTools", methodName : "__format_get"});
		}
	}
	static __format(d,f) {
		let r_b = "";
		let p = 0;
		while(true) {
			let np = f.indexOf("%",p);
			if(np < 0) {
				break;
			}
			let len = np - p;
			r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
			r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
			p = np + 2;
		}
		let len = f.length - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		return r_b;
	}
	static format(d,f) {
		return DateTools.__format(d,f);
	}
}
DateTools.__name__ = true;
class HxOverrides {
	static dateStr(date) {
		let m = date.getMonth() + 1;
		let d = date.getDate();
		let h = date.getHours();
		let mi = date.getMinutes();
		let s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
	}
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
class LocalStorage {
	constructor() {
		this.superHeroLast = ["x","shield","machine","justice","beast","wing","arrow","skull","blade","bolt","cobra","blaze","soldier","strike","falcon","fang","king","surfer","bot","guard","thing","claw","brain","master","power","storm"];
		this.superHeroFirst = ["captain","turbo","galactic","the","aqua","fire","iron","super","green","phantom","dark","ghost","professor","atomic","rock","omega","rocket","shadow","agent","silver","wild","wolf","ultra","wonder","doctor","star"];
		this.dbName = "test-localstorage";
		utils_LocalData.create(this.dbName);
		if(utils_LocalData.read(this.dbName,"itemArray") == null) {
			utils_LocalData.update(this.dbName,"itemArray",[]);
		}
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("LocalStorage -Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.updateOutput();
	}
	setElements() {
		this.output = window.document.getElementById("output");
		this.btnDownload = window.document.getElementById("btn-add-item");
		this.btnDownload.onclick = $bind(this,this.onAddHandler);
		this.btnBase64 = window.document.getElementById("btn-clear");
		this.btnBase64.onclick = $bind(this,this.onClearHandler);
		this.btnRead = window.document.getElementById("btn-read");
		this.btnRead.onclick = $bind(this,this.onReadHandler);
	}
	updateOutput() {
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		let out = "<ul>";
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let obj = arr[i];
			let date = HxOverrides.strDate(obj.created);
			let t = DateTools.format(date,"%T");
			out += "<li>time: " + t + " - <b>" + obj.name + "</b></li>";
		}
		out += "</ul>";
		this.output.innerHTML = out;
	}
	onAddHandler(e) {
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		console.log("src/LocalStorage.hx:86:",arr);
		let superHeroName = this.superHeroFirst[Math.floor(Math.random() * this.superHeroFirst.length)] + " " + this.superHeroLast[Math.floor(Math.random() * this.superHeroLast.length)];
		let obj = { name : superHeroName, created : HxOverrides.dateStr(new Date())};
		arr.push(obj);
		console.log("src/LocalStorage.hx:97:",arr);
		utils_LocalData.update(this.dbName,"itemArray",arr);
		this.updateOutput();
	}
	onClearHandler(e) {
		utils_LocalData.clear(this.dbName);
	}
	onReadHandler(e) {
		let json = utils_LocalData.load(this.dbName);
		console.log("src/LocalStorage.hx:108:",json);
	}
	static main() {
		let app = new LocalStorage();
	}
}
LocalStorage.__name__ = true;
Math.__name__ = true;
class Reflect {
	static getProperty(o,field) {
		let tmp;
		if(o == null) {
			return null;
		} else {
			let tmp1;
			if(o.__properties__) {
				tmp = o.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return o[tmp]();
			} else {
				return o[field];
			}
		}
	}
	static setProperty(o,field,value) {
		let tmp;
		let tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["set_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			o[tmp](value);
		} else {
			o[field] = value;
		}
	}
}
Reflect.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class StringTools {
	static lpad(s,c,l) {
		if(c.length <= 0) {
			return s;
		}
		let buf_b = "";
		l -= s.length;
		while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
		buf_b += s == null ? "null" : "" + s;
		return buf_b;
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
	toString() {
		return this.get_message();
	}
	get_message() {
		return this.message;
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
Object.assign(haxe_Exception.prototype, {
	__properties__: {get_native: "get_native",get_message: "get_message"}
});
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
}
haxe_ValueException.__name__ = true;
class haxe_exceptions_PosException extends haxe_Exception {
	constructor(message,previous,pos) {
		super(message,previous);
		if(pos == null) {
			this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
		} else {
			this.posInfos = pos;
		}
	}
	toString() {
		return "" + super.toString() + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
}
haxe_exceptions_PosException.__name__ = true;
class haxe_exceptions_NotImplementedException extends haxe_exceptions_PosException {
	constructor(message,previous,pos) {
		if(message == null) {
			message = "Not implemented";
		}
		super(message,previous,pos);
	}
}
haxe_exceptions_NotImplementedException.__name__ = true;
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
class utils_LocalData {
	static create(name,isOverwrite) {
		if(isOverwrite == null) {
			isOverwrite = false;
		}
		if(utils_LocalData.isDebug) {
			$global.console.info("get local storage");
		}
		utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		if(utils_LocalData.json == null || isOverwrite) {
			utils_LocalData.json = { _id : "localdata-" + new Date().getTime(), version : "0.0.1", created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date())};
			if(utils_LocalData.isDebug) {
				$global.console.log("initialize database:" + JSON.stringify(utils_LocalData.json));
			}
		}
		utils_LocalData.saveData(name);
	}
	static read(name,key) {
		if(utils_LocalData.json == null) {
			utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		}
		if(key == null) {
			return utils_LocalData.json;
		}
		if(Object.prototype.hasOwnProperty.call(utils_LocalData.json,key)) {
			return Reflect.getProperty(utils_LocalData.json,key);
		} else {
			return null;
		}
	}
	static load(name) {
		if(utils_LocalData.json == null) {
			utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		}
		if(utils_LocalData.json == null) {
			return null;
		} else {
			return utils_LocalData.json;
		}
	}
	static update(name,key,value) {
		if(utils_LocalData.json == null) {
			utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		}
		Reflect.setProperty(utils_LocalData.json,key,value);
		Reflect.setProperty(utils_LocalData.json,"updated",HxOverrides.dateStr(new Date()));
		utils_LocalData.saveData(name);
	}
	static clear(name) {
		utils_LocalData.json = null;
		window.localStorage.removeItem(name);
		if(utils_LocalData.isDebug) {
			$global.console.log("cleared data \"" + name + "\"");
		}
	}
	static saveData(name) {
		window.localStorage.setItem(name,JSON.stringify(utils_LocalData.json));
		if(utils_LocalData.isDebug) {
			$global.console.log(utils_LocalData.json);
		}
	}
}
utils_LocalData.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
	String.__name__ = true;
	Array.__name__ = true;
	Date.__name__ = "Date";
}
js_Boot.__toStr = ({ }).toString;
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
utils_LocalData.isDebug = true;
LocalStorage.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
