package;

import js.Lib;
import js.Browser.*;
import js.html.XMLHttpRequest;

class Main {
	var url = "_post.html";
	// elements
	var span:SpanElement;
	var nav:DivElement;

	public function new() {
		console.log('${App.NAME} - Navigation - Dom ready :: build: ${App.getBuildDate()}');
		setupNav();
	}

	function setupNav() {
		// open menu at the top of body
		span = document.createSpanElement();
		span.className = "openbtn";
		span.innerText = "☰";
		span.onclick = openNav;
		// don't add it yet

		// nav container
		nav = document.createDivElement();
		nav.id = "mySidenav";
		nav.className = "sidenav";
		// don't add it yet

		// add structure to nav container
		var link = document.createAnchorElement();
		link.className = 'closebtn';
		link.innerText = '×';
		link.onclick = closeNav;
		nav.prepend(link);

		// wrapper to parse data in
		var container = document.createDivElement();
		container.className = 'wrapper';
		nav.append(container);

		// load the data into the container
		loadHTML(url, container);
	}

	function finishSetup() {
		document.body.prepend(span);
		document.body.append(nav);
	}

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
	 * load the html page and parse the body into the element
	 * @param url		file name
	 * @param el		element to parse the body into
	 */
	function loadHTML(?url:String, ?el:js.html.Element) {
		var req = new XMLHttpRequest();
		// your code
		req.onreadystatechange = function() {
			if (Lib.nativeThis.readyState == 4 && Lib.nativeThis.status == 200) {
				// console.log(Lib.nativeThis.responseText);
				finishSetup();
			}
		};
		req.onload = function() {
			var body = getBody(req.response);
			if (body == "")
				body = req.response;
			processHTML(body, el);
		};
		req.onerror = function(error) {
			console.error('[JS] error: $error');
		};
		req.open('GET', url);
		req.send();
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

	/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
	function openNav() {
		document.getElementById("mySidenav").style.width = "50%";
		// document.getElementById("main").style.marginLeft = "50%";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}

	/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
	function closeNav() {
		document.getElementById("mySidenav").style.width = "0";
		// document.getElementById("main").style.marginLeft = "0";
		document.body.style.backgroundColor = "white";
	}

	static public function main() {
		var app = new Main();
	}
}
