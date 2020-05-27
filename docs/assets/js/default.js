// Generated by Haxe 4.1.1
(function ($global) { "use strict";
class App {
}
class Main {
	constructor() {
		this.json = "data.json";
		this.infoUrl = "_post.html";
		this.homeUrl = "../_nav.html";
		this.INFO_ID = "mySidenav";
		this.HOME_ID = "myHomeSideNav";
		$global.console.log("" + App.NAME + " - Navigation - Dom ready :: build: " + "2020-05-27 20:13:00");
		if(window.document.getElementById("homepage") != null) {
			$global.console.log("homepage");
			this.vm = new Vue({ el : "#app", data : { message : "Hello Vue.js!", count : 20, json : { }}});
			this.loadData(this.json,$bind(this,this.setupJsonData));
		} else {
			$global.console.log("other pages");
			this.loadData(this.homeUrl,$bind(this,this.setupHome));
			this.loadData(this.infoUrl,$bind(this,this.setupInfo));
		}
	}
	loadData(url,callback) {
		let req = new XMLHttpRequest();
		let _gthis = this;
		req.onreadystatechange = function() {
			let tmp = this.readyState == 4 && this.status == 200;
		};
		req.onload = function() {
			let body = _gthis.getBody(req.response);
			if(body == "") {
				body = req.response;
			}
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
	setupInfo(body) {
		let _gthis = this;
		let span = window.document.createElement("span");
		span.className = "btn-open";
		span.innerHTML = "<i class=\"fa fa-navicon\"></i>";
		span.onclick = function() {
			_gthis.openPanel(_gthis.INFO_ID);
		};
		window.document.body.prepend(span);
		this.setupPanel(this.INFO_ID,body);
	}
	setupJsonData(data) {
		let _json = JSON.parse(data);
		let arr = _json.data;
		this.vm.$data.count = arr.length;
		this.vm.$data.json = _json;
	}
	setupHome(body) {
		let _gthis = this;
		let span = window.document.createElement("span");
		span.className = "btn-home-open";
		span.innerHTML = "<i class=\"fa fa-home\"></i>";
		span.onclick = function() {
			_gthis.openPanel(_gthis.HOME_ID);
		};
		window.document.body.prepend(span);
		this.setupPanel(this.HOME_ID,body);
	}
	setupPanel(id,body) {
		let _gthis = this;
		let nav = window.document.createElement("div");
		nav.id = id;
		nav.className = "sidenav";
		window.document.body.append(nav);
		let link = window.document.createElement("a");
		link.className = "btn-close";
		link.innerHTML = "<i class=\"fa fa-close\"></i>";
		link.onclick = function() {
			_gthis.closePanel(id);
		};
		nav.prepend(link);
		let container = window.document.createElement("div");
		container.className = "wrapper";
		nav.append(container);
		this.processHTML(body,container);
	}
	getBody(html) {
		let test = html.toLowerCase();
		let x = test.indexOf("<body");
		if(x == -1) {
			return "";
		}
		x = test.indexOf(">",x);
		if(x == -1) {
			return "";
		}
		let y = test.lastIndexOf("</body>");
		if(y == -1) {
			y = test.lastIndexOf("</html>");
		}
		if(y == -1) {
			y = html.length;
		}
		return html.slice(x + 1,y);
	}
	processHTML(content,target) {
		target.innerHTML = content;
	}
	openPanel(id) {
		window.document.getElementById(id).style.width = "50%";
		window.document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}
	closePanel(id) {
		window.document.getElementById(id).style.width = "0";
		window.document.body.style.backgroundColor = "initial";
	}
	static main() {
		let app = new Main();
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
App.NAME = "[js-mini-projects]";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
