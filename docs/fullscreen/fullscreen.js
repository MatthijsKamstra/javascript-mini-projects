(function ($global) { "use strict";
class Fullscreen {
	constructor() {
		this.isFullscreen = false;
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Fullscreen -Dom ready");
			_gthis.setElements();
		});
	}
	setElements() {
		this.bg = window.document.getElementsByClassName("bg-image")[0];
		this.btn = window.document.getElementById("fullscreen-btn");
		let _gthis = this;
		this.btn.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleButton();
		};
	}
	toggleButton() {
		if(this.isFullscreen) {
			this.closeFullscreen();
		} else {
			this.openFullscreen();
		}
		if(!this.isFullscreen) {
			this.btn.innerHTML = "<i class=\"fa fa-toggle-on\"></i> Fullscreen";
			this.bg.classList.add("bg-image-fullscreen");
		} else {
			this.btn.innerHTML = "<i class=\"fa fa-toggle-off\"></i> Fullscreen";
			this.bg.classList.remove("bg-image-fullscreen");
		}
		this.isFullscreen = !this.isFullscreen;
	}
	openFullscreen() {
		let elem = window.document.documentElement;
		if(elem.requestFullscreen != null) {
			elem.requestFullscreen();
		} else if(elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if(elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		} else if(elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
	}
	closeFullscreen() {
		if(window.document.exitFullscreen != null) {
			window.document.exitFullscreen();
		} else if(window.document.mozCancelFullScreen) {
			window.document.mozCancelFullScreen();
		} else if(window.document.webkitExitFullscreen) {
			window.document.webkitExitFullscreen();
		} else if(window.document.msExitFullscreen) {
			window.document.msExitFullscreen();
		}
	}
	static main() {
		let app = new Fullscreen();
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
{
}
Fullscreen.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
