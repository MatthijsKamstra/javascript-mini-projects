// Generated by Haxe 4.0.5
(function ($global) { "use strict";
class App {
}
class Main {
	constructor() {
		this.infoUrl = "_post.html";
		this.homeUrl = "../_nav.html";
		this.INFO_ID = "mySidenav";
		this.HOME_ID = "myHomeSideNav";
		window.console.log("" + App.NAME + " - Navigation - Dom ready :: build: " + "2020-05-09 21:29:59");
		this.loadData(this.homeUrl,$bind(this,this.setupHome));
		this.loadData(this.infoUrl,$bind(this,this.setupInfo));
	}
	loadData(url,callback) {
		var req = new XMLHttpRequest();
		var _gthis = this;
		req.onreadystatechange = function() {
			var tmp = this.readyState == 4 && this.status == 200;
		};
		req.onload = function() {
			var body = _gthis.getBody(req.response);
			if(body == "") {
				body = req.response;
			}
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
	setupInfo(body) {
		var _gthis = this;
		var span = window.document.createElement("span");
		span.className = "btn-open";
		span.innerHTML = "<i class=\"fa fa-navicon\"></i>";
		span.onclick = function() {
			_gthis.openPanel(_gthis.INFO_ID);
			return;
		};
		window.document.body.prepend(span);
		this.setupPanel(this.INFO_ID,body);
	}
	setupHome(body) {
		var _gthis = this;
		var span = window.document.createElement("span");
		span.className = "btn-home-open";
		span.innerHTML = "<i class=\"fa fa-home\"></i>";
		span.onclick = function() {
			_gthis.openPanel(_gthis.HOME_ID);
			return;
		};
		window.document.body.prepend(span);
		this.setupPanel(this.HOME_ID,body);
	}
	setupPanel(id,body) {
		var _gthis = this;
		var nav = window.document.createElement("div");
		nav.id = id;
		nav.className = "sidenav";
		window.document.body.append(nav);
		var link = window.document.createElement("a");
		link.className = "btn-close";
		link.innerHTML = "<i class=\"fa fa-close\"></i>";
		link.onclick = function() {
			_gthis.closePanel(id);
			return;
		};
		nav.prepend(link);
		var container = window.document.createElement("div");
		container.className = "wrapper";
		nav.append(container);
		this.processHTML(body,container);
	}
	getBody(html) {
		var test = html.toLowerCase();
		var x = test.indexOf("<body");
		if(x == -1) {
			return "";
		}
		x = test.indexOf(">",x);
		if(x == -1) {
			return "";
		}
		var y = test.lastIndexOf("</body>");
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
		var app = new Main();
	}
}
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
App.NAME = "[js-mini-projects]";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
