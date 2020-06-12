class Hidenavbar {
	var nav:DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Hidenavbar - Dom ready');
			setElements();
		});
	}

	function setElements() {
		// get the navigation based upon the `smart-scroll` class
		nav = cast document.getElementsByClassName('smart-scroll')[0];

		// add padding top to show content behind navbar
		document.body.style.paddingTop = '${nav.offsetHeight}px';

		// scroll down and the class `scrolled-down` is added (hides the nav with animation), scroll up it's removed again
		var prevScrollpos = window.pageYOffset;
		window.onscroll = function() {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				nav.classList.remove('scrolled-down');
			} else {
				nav.classList.add('scrolled-down');
			}
			prevScrollpos = currentScrollPos;
		}
	}

	static public function main() {
		var app = new Hidenavbar();
	}
}
