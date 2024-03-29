(function ($global) { "use strict";
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
class Weather {
	constructor() {
		this.daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Desktop - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.getElement();
		this.getData();
	}
	getData() {
		let urlSearch = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=amsterdam";
		let amsterdamID = "727232";
		let debugUrl = "api.json";
		this.loadData(debugUrl,$bind(this,this.onLoadCompleteHandler));
	}
	getElement() {
		this.weatherDiv = window.document.getElementById("weather");
	}
	onLoadCompleteHandler(data) {
		let json = JSON.parse(data);
		let arr = json.consolidated_weather;
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let _WeatherObj = arr[i];
			console.log("src/Weather.hx:44:",_WeatherObj);
			let div = window.document.createElement("div");
			let date = HxOverrides.strDate(_WeatherObj.applicable_date);
			div.innerHTML = "<img src=\"https://www.metaweather.com/static/img/weather/" + _WeatherObj.weather_state_abbr + ".svg\" alt=\"" + _WeatherObj.weather_state_name + "\" width=\"30px\"> " + this.daysOfTheWeek[date.getDay()] + ",  min: " + Math.floor(_WeatherObj.min_temp) + "℃, max: " + Math.floor(_WeatherObj.max_temp) + "℃";
			this.weatherDiv.appendChild(div);
		}
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
		let app = new Weather();
	}
}
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
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
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
Weather.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
