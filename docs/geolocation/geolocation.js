(function ($global) { "use strict";
class Geolocation {
	constructor() {
		this.corsUrl = "https://yacdn.org/proxy/";
		this.searchUrl = "https://www.metaweather.com/api/location/search/";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Geolocation - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.getElement();
		this.getPosition();
	}
	getElement() {
		this.div = window.document.getElementById("longlatt");
		this.divCities = window.document.getElementById("cities");
	}
	getData() {
		let url = "" + this.corsUrl + this.searchUrl + "?lattlong=" + this.latt + "," + this.long;
		console.log("src/Geolocation.hx:39:",url);
		this.loadData(url,$bind(this,this.onLoadCompleteHandler));
	}
	getPosition() {
		let options = { enableHighAccuracy : true, timeout : 5000, maximumAge : 0};
		$global.navigator.geolocation.getCurrentPosition($bind(this,this.success),$bind(this,this.error),options);
	}
	success(pos) {
		let crd = pos.coords;
		$global.console.log("Your current position is:");
		$global.console.log("Latitude : " + crd.latitude);
		$global.console.log("Longitude: " + crd.longitude);
		$global.console.log("More or less " + crd.accuracy + " meters.");
		this.long = crd.longitude;
		this.latt = crd.latitude;
		let html = "";
		html += "<pre>";
		html += "Your current position is:";
		html += "\n- Latitude : " + crd.latitude;
		html += "\n- Longitude: " + crd.longitude;
		html += "\n- More or less " + crd.accuracy + " meters.";
		html += "</pre>";
		this.div.innerHTML = html;
		this.getData();
	}
	error(err) {
		$global.console.warn("ERROR(" + err.code + "): " + err.message);
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
	onLoadCompleteHandler(data) {
		let json = JSON.parse(data);
		let arr = json;
		let html = "<ul>";
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let llObj = arr[i];
			html += "<li>";
			html += "" + llObj.title + " (" + llObj.location_type + ") - distance: " + llObj.distance + " - latt/long: " + llObj.latt_long;
			html += "</li>";
		}
		html += "</ul>";
		this.divCities.innerHTML = html;
	}
	static main() {
		let app = new Geolocation();
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
{
}
Geolocation.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
