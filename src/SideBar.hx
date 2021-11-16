import js.Lib;
import js.html.svg.Element;

using StringTools;

// https://ficons.fiction.com/reference.html
class SideBar {
	var colors = [
		'#001f3f', '#0074d9', '#7fdbff', '#39cccc', '#3d9970', '#2ecc40', '#01ff70', '#ffdc00', '#ff851b', '#ff4136', '#f012be', '#b10dc9', '#85144b',
		'#ffffff', '#dddddd', '#aaaaaa', '#111111',
	];

	var linkArray = [];
	var isVertical = true;

	public function new() {
		document.addEventListener('DOMContentLoaded', (event) -> {
			console.log('SideBar - Dom ready');
			init();
			initToggle();
		});
	}

	function init() {
		var ul:Element = cast document.querySelector('[monkee-fullpage]');
		ul.classList.add('monkee-fullpage-list');

		// var lis = ul.getElementsByTagName('li');
		// for (i in 0...lis.length) {
		// 	var li = lis[i];
		// 	var href = li.getElementsByTagName(a);
		// 	trace(li);
		// }
		// // trace(li);

		var links = document.getElementsByTagName('a');
		var first = false;
		for (i in 0...links.length) {
			var link:LinkElement = cast links[i];
			// trace(link.getAttribute('href').charAt(0));
			if (link.getAttribute('href').charAt(0) == '#' && link.getAttribute('href').length > 1) {
				if (first == false) {
					link.classList.add('active');
				}
				// trace("link: " + link.getAttribute('href'));
				console.log('<li id="${link.getAttribute('href').replace('#', '')}">${link.getAttribute('href')}</li>');

				var slide = document.querySelector(link.getAttribute('href'));
				slide.classList.add('monkee-fullpage-slide');
				slide.setAttribute('style', 'background-color: ${colors[i]}');

				linkArray.push(link);

				link.onclick = onclickHandler;
				first = true;
			}
		}
	}

	/**
		// horizontal
		.monkee-fullpage-list {
			display: block ruby;
		}
		// vertical
		.monkee-fullpage-list {
			display: block;
		}
		*
	 */
	function initToggle() {
		var btn = document.getElementById('btn-toggle-dir');
		btn.onclick = (e) -> {
			var ul:Element = cast document.querySelector('[monkee-fullpage]');
			// trace("e: " + e);
			if (isVertical) {
				isVertical = false;
				Lib.nativeThis.innerHTML = '<i class="fa fa-arrows-v" aria-hidden="true"></i>';
				ul.classList.add('monkee-fullpage-list-horizontal');
			} else {
				isVertical = true;
				Lib.nativeThis.innerHTML = '<i class="fa fa-arrows-h" aria-hidden="true"></i>';
				ul.classList.remove('monkee-fullpage-list-horizontal');
			}
		}
	}

	function onclickHandler(e:Event):Void {
		// e.preventDefault();
		for (i in 0...linkArray.length) {
			var link:LinkElement = cast linkArray[i];
			link.classList.remove('active');
		}
		untyped e.currentTarget.classList.add('active');
		// trace(e);
	}

	static public function main() {
		var app = new SideBar();
	}
}
