(function ($global) { "use strict";
class RandomUser {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("RandomUser - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.getData();
	}
	setElements() {
		this.wrapper = window.document.getElementById("user-wrapper");
		this.wrapper.innerHTML = "";
	}
	getData() {
		window.fetch("https://randomuser.me/api/?results=10").then($bind(this,this.handleErrors)).then($bind(this,this.parseJSON)).then($bind(this,this.updateProfile)).catch($bind(this,this.printError));
	}
	handleErrors(res) {
		if(!res.ok) {
			$global.console.log(res.status);
		}
		$global.console.log(res);
		return res;
	}
	parseJSON(res) {
		return res.json();
	}
	updateProfile(json) {
		let html = "<div class=\"row\">";
		let profileArray = json.results;
		let _g = 0;
		let _g1 = profileArray.length;
		while(_g < _g1) {
			let i = _g++;
			let result = profileArray[i];
			console.log("src/RandomUser.hx:117:",result);
			html += "\n<div class=\"col-12 col-md-4\">\n<div class=\"card profile-card\">\n<div class=\"profile-content\">\n<img src=\"" + result.picture.medium + "\" alt=\"profile-image\" class=\"profile\" />\n<div class=\"card-content\">\n<h2>" + result.name.first + " " + result.name.last + "<small>" + result.location.city + "</small></h2>\n<p class=\"card-text text-center\">\nStreet: " + result.location.street.name + " " + result.location.street.number + " <br>\nCity:  " + result.location.city + "<br>\nState:  " + result.location.state + "<br>\nCountry:  " + result.location.country + "<br>\n</p>\n<div class=\"icon-block\">\n<a href=\"mailto:" + result.email + "\"><i class=\"fa fa-envelope-o\"></i></a>\n<a href=\"https://twitter/" + result.name.first + result.name.last + "\"><i class=\"fa fa-twitter\"></i></a>\n<a href=\"tel:" + result.phone + "\"><i class=\"fa fa-phone\"></i> " + result.cell + "</a>\n</div>\n</div>\n</div>\n</div>\n</div>\n";
		}
		html += "</div>";
		this.wrapper.innerHTML = html;
		return 1;
	}
	printError(error) {
		$global.console.log(error);
	}
	static main() {
		let app = new RandomUser();
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
RandomUser.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
