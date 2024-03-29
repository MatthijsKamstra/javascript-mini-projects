(function ($global) { "use strict";
class ToggleSound {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("ToggleSound - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.soundOn();
	}
	setElements() {
		this.audioElement = window.document.getElementById("audioElement");
		this.audioElement.style.display = "none";
		this.btnMicrophoneToggle = window.document.getElementsByClassName("toggle-microphone")[0];
		this.btnMicrophoneOn = window.document.getElementsByClassName("fa-microphone")[0];
		this.btnMicrophoneOff = window.document.getElementsByClassName("fa-microphone-slash")[0];
		let _gthis = this;
		this.btnMicrophoneOn.onclick = function() {
			_gthis.soundOn();
		};
		this.btnMicrophoneOff.onclick = function() {
			_gthis.soundOff();
		};
	}
	soundOn() {
		this.audioElement.play();
		this.btnMicrophoneOff.classList.remove("d-none");
		this.btnMicrophoneOn.classList.add("d-none");
	}
	soundOff() {
		this.audioElement.pause();
		this.btnMicrophoneOn.classList.remove("d-none");
		this.btnMicrophoneOff.classList.add("d-none");
	}
	static main() {
		let app = new ToggleSound();
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
ToggleSound.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
