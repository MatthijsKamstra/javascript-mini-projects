// Generated by Haxe 4.0.5
(function ($global) { "use strict";
class App {
}
class ToggleSound {
	constructor() {
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("" + App.NAME + " - ToggleSound - Dom ready :: build: " + "2020-05-09 19:17:09");
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
		var _gthis = this;
		this.btnMicrophoneOn.onclick = function() {
			_gthis.soundOn();
			return;
		};
		this.btnMicrophoneOff.onclick = function() {
			_gthis.soundOff();
			return;
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
		var app = new ToggleSound();
	}
}
App.NAME = "[js-mini-projects]";
ToggleSound.main();
})({});
