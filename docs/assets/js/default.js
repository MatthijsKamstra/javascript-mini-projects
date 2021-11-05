(function ($global) { "use strict";
class App {
}
class Main {
	constructor() {
		this.json = "data.json";
		this.infoUrl = "_post.html";
		this.INFO_ID = "mySidenav";
		$global.console.log("" + App.NAME + " - Navigation - Dom ready :: build: " + "2021-11-05 10:07:18");
		if(window.document.getElementById("homepage") != null) {
			$global.console.log("homepage");
			this.vm = new Vue({ el : "#app", data : { message : "Hello Vue.js!", count : 20, json : { }}});
			this.loadData(this.json,$bind(this,this.setupJsonData));
		} else {
			$global.console.log("other pages");
			this.loadData("../" + this.json,$bind(this,this.setupNav));
			this.loadData(this.infoUrl,$bind(this,this.setupInfo));
		}
	}
	loadData(url,callback) {
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			let tmp = this.readyState == 4 && this.status == 200;
		};
		let _gthis = this;
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
		let span = window.document.createElement("span");
		span.className = "btn-open";
		span.innerHTML = "<i class=\"fa fa-navicon\"></i>";
		let _gthis = this;
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
	setupNav(data) {
		let app = window.document.createElement("div");
		app.id = "app-nav";
		window.document.body.prepend(app);
		let _json = JSON.parse(data);
		let arr = _json.data;
		let vm = new Vue({ el : "#app-nav", template : utils_Template.nav(), data : { json : _json}, methods : { folderUp : function(url) {
			return "../" + url;
		}}});
		let nav = window.document.getElementsByClassName("smart-scroll-nav")[0];
		let tmp = "" + nav.offsetHeight;
		window.document.body.style.paddingTop = tmp + "px";
		let prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			let currentScrollPos = window.pageYOffset;
			if(prevScrollpos > currentScrollPos) {
				nav.classList.remove("scrolled-down-nav");
			} else {
				nav.classList.add("scrolled-down-nav");
			}
			prevScrollpos = currentScrollPos;
		};
	}
	setupPanel(id,body) {
		let nav = window.document.createElement("div");
		nav.id = id;
		nav.className = "sidenav";
		window.document.body.append(nav);
		let link = window.document.createElement("a");
		link.className = "btn-close";
		link.innerHTML = "<i class=\"fa fa-close\"></i>";
		let _gthis = this;
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
class utils_Template {
	static nav() {
		return "<nav class=\"navbar sticky-top navbar-expand-md navbar-dark bg-dark smart-scroll-nav\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<a class=\"navbar-brand\" href=\"../\">🚀</a>\n\t\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\"\n\t\t\t\t\tdata-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\"\n\t\t\t\t\taria-label=\"Toggle navigation\">\n\t\t\t\t\t<span class=\"navbar-toggler-icon\"></span>\n\t\t\t\t</button>\n\n\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n\t\t\t\t\t<ul class=\"navbar-nav mr-auto\">\n\n\t\t\t\t\t\t<li class=\"nav-item\">\n\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"../\">Home</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"nav-item dropdown\">\n\t\t\t\t\t\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\"\n\t\t\t\t\t\t\t\tdata-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t\t\t\t\t\t\tMini Projects\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n\t\t\t\t\t\t\t\t<a v-for=\"(project, index) in json.data\" class=\"dropdown-item\"\n\t\t\t\t\t\t\t\t\tv-bind:href=\"folderUp(project.url)\">{{index+1}}. {{project.title}}</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>\n\n\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</nav>";
	}
}
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
}
App.NAME = "[js-mini-projects]";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
