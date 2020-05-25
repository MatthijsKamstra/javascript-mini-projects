import haxe.Json;

class Darkmode {
	var dbname = 'isDarkmode';
	var isDarkMode:Bool = false;
	var isLightMode:Bool = false;

	@:isVar public var localStorage(get, set):Bool = false;

	public function new() {
		// check as fast as possible, don't wait for the DOM
		isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		isLightMode = window.matchMedia("(prefers-color-scheme: light)").matches;

		console.group('possible value for darkmode');
		console.debug('isDarkMode: ' + isDarkMode);
		console.debug('isLightMode: ' + isLightMode);
		console.debug('localStorage: ' + localStorage);
		console.groupEnd();

		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Darkmode - Dom ready');
			setColorScheme();
			setElements();
		});
	}

	function setColorScheme() {
		// if localstorage is set... ignore the rest:
		if (localStorage != null) {
			if (localStorage) {
				activateDarkMode();
			}
			return;
		}

		// if not set, use time to show darkmode
		if (!isDarkMode && !isLightMode) {
			var hour = Date.now().getHours();
			// 6 till 18
			if (hour < 5 || hour >= 17) {
				activateDarkMode();
			}
		}

		if (isDarkMode)
			activateDarkMode();
	}

	function setElements() {
		var btn:LinkElement = cast document.getElementById('btn-darkmode');
		btn.onclick = () -> {
			activateDarkMode();
		};
	}

	function activateDarkMode() {
		document.body.classList.toggle('darkmode');
		if (document.body.classList.contains('darkmode')) {
			localStorage = true;
		} else {
			localStorage = false;
		}
	}

	// ____________________________________ getter/setter ____________________________________

	function get_localStorage():Bool {
		var temp = window.localStorage.getItem(dbname);
		// localStorage = cast window.localStorage.getItem(dbname);
		localStorage = (temp == 'true') ? true : false;
		return localStorage;
	}

	function set_localStorage(value:Bool):Bool {
		window.localStorage.setItem(dbname, Std.string(value));
		return localStorage = value;
	}

	static public function main() {
		var app = new Darkmode();
	}
}
