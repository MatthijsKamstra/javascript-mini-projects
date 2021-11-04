package;

import AST.ProjectObj;
import vue.Vue;
import haxe.Json;
import haxe.Constraints.Function;
import js.Lib;
import js.Browser.*;
import js.html.XMLHttpRequest;

class Main {
	// id
	var HOME_ID = 'myHomeSideNav';
	var INFO_ID = 'mySidenav';
	// load
	var homeUrl = "../_nav.html";

	var infoUrl = "_post.html";
	// should replace `.html` files
	var json = "data.json";
	var vm:Vue;

	// @:build(macro.Macro.buildTemplate(true))
	public function new() {
		console.log('${App.NAME} - Navigation - Dom ready :: build: ${App.getBuildDate()}');

		// only on homepage
		if (document.getElementById('homepage') != null) {
			console.log('homepage');
			// set vm dom
			vm = new Vue({
				el: '#app',
				data: {
					message: 'Hello Vue.js!',
					count: 20,
					json: {}
				}
			});
			loadData(json, setupJsonData);
		} else {
			console.log('other pages');
			loadData('../${json}', setupNav);
			loadData(infoUrl, setupInfo);
		}
	}

	/**
	 * loading data, check if file exists before generating navigation
	 * @param url 		load file from here
	 * @param callback 	if file exists and is loaded, use this callbakc
	 */
	function loadData(url:String, callback:Function) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (Lib.nativeThis.readyState == 4 && Lib.nativeThis.status == 200) {
				// console.log(Lib.nativeThis.responseText);
				// finishSetup();
			}
		};
		req.onload = function() {
			var body = getBody(req.response);
			if (body == "")
				body = req.response;

			if (Lib.nativeThis.status == 200)
				callback(body);
		};
		req.onerror = function(error) {
			console.error('[JS] error: $error');
		};
		req.open('GET', url);
		req.send();
	}

	// ____________________________________ setup ____________________________________

	/**
	 * info depends if there is a file `_post.html`
	 */
	function setupInfo(body:String) {
		// open menu at the top of body
		var span = document.createSpanElement();
		span.className = "btn-open";
		span.innerHTML = '<i class="fa fa-navicon"></i>'; // "☰";
		span.onclick = () -> openPanel(INFO_ID);
		document.body.prepend(span);

		setupPanel(INFO_ID, body);
	}

	function setupJsonData(data:String) {
		var _json = Json.parse(data);
		var arr:Array<ProjectObj> = _json.data;
		vm.data.count = arr.length;
		vm.data.json = _json;
	}

	/**
	 * is always present, nav?
	 */
	function setupNav(data:String) {
		var app = document.createDivElement();
		app.id = 'app-nav';
		document.body.prepend(app);

		var _json = Json.parse(data);
		var arr:Array<ProjectObj> = _json.data;

		// set vm dom
		var vm = new Vue({
			el: '#app-nav',
			template: utils.Template.nav(),
			data: {
				json: _json
			},
			methods: {
				folderUp: function(url) {
					return '../' + url;
				}
			}
		});

		// get the navigation based upon the `smart-scroll` class
		var nav = cast document.getElementsByClassName('smart-scroll-nav')[0];

		// add padding top to show content behind navbar
		document.body.style.paddingTop = '${nav.offsetHeight}px';

		// scroll down and the class `scrolled-down` is added (hides the nav with animation), scroll up it's removed again
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				nav.classList.remove('scrolled-down-nav');
			} else {
				nav.classList.add('scrolled-down-nav');
			}
			prevScrollpos = currentScrollPos;
		}
	}

	// ____________________________________ set panel ____________________________________

	function setupPanel(id:String, body:String) {
		// nav container
		var nav = document.createDivElement();
		nav.id = id;
		nav.className = "sidenav";
		document.body.append(nav);

		// add structure to nav container
		var link = document.createAnchorElement();
		link.className = 'btn-close';
		link.innerHTML = '<i class="fa fa-close"></i>'; // '×';
		link.onclick = () -> closePanel(id);
		nav.prepend(link);

		// wrapper to parse data in
		var container = document.createDivElement();
		container.className = 'wrapper';
		nav.append(container);

		processHTML(body, container);
	}

	// ____________________________________ utils ____________________________________

	/**
	 * parse an string as a html element
	 * @param html
	 */
	function htmlToElement(html:String) {
		var template = document.createDivElement();
		html = untyped html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;
		return template.firstChild;
	}

	/**
	 * get the body of the document...
	 * @param html
	 */
	function getBody(html) {
		var test:String = html.toLowerCase(); // to eliminate case sensitivity
		var x:Int = test.indexOf("<body");
		if (x == -1)
			return "";

		x = test.indexOf(">", x);
		if (x == -1)
			return "";
		var y = test.lastIndexOf("</body>");
		if (y == -1)
			y = test.lastIndexOf("</html>");
		if (y == -1)
			y = html.length; // If no HTML then just grab everything till end
		return html.slice(x + 1, y);
	}

	function processHTML(content:String, target:js.html.Element) {
		target.innerHTML = content;
	}

	// ____________________________________ open/close panel ____________________________________

	function openPanel(id:String) {
		document.getElementById(id).style.width = "50%";
		// document.getElementById("main").style.marginLeft = "50%";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}

	function closePanel(id:String) {
		document.getElementById(id).style.width = "0";
		// document.getElementById("main").style.marginLeft = "0";
		document.body.style.backgroundColor = "initial";
	}

	// ____________________________________ main ____________________________________

	static public function main() {
		var app = new Main();
	}
}
