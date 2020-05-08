class ToggleSound {
	var btnMicrophoneToggle:DivElement;
	var btnMicrophoneOn:HtmlElement;
	var btnMicrophoneOff:HtmlElement;
	var audioElement:AudioElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} - ToggleSound - Dom ready :: build: ${App.getBuildDate()}');
			init();
		});
	}

	function init() {
		setElements();
		soundOn();
	}

	function setElements() {
		audioElement = cast document.getElementById("audioElement");
		audioElement.style.display = 'none'; // vanilla css hide stuff
		btnMicrophoneToggle = cast document.getElementsByClassName("toggle-microphone")[0];
		btnMicrophoneOn = cast document.getElementsByClassName("fa-microphone")[0];
		// btnMicrophoneOn.classList.add('d-none'); // bootstrap way of hiding stuff
		btnMicrophoneOff = cast document.getElementsByClassName("fa-microphone-slash")[0];
		// btnMicrophoneOff.classList.remove('d-none');

		btnMicrophoneOn.onclick = () -> {
			soundOn();
		}
		btnMicrophoneOff.onclick = () -> {
			soundOff();
		}
	}

	function soundOn() {
		// trace('soundOn');
		audioElement.play();
		btnMicrophoneOff.classList.remove('d-none');
		btnMicrophoneOn.classList.add('d-none');
	}

	function soundOff() {
		// trace('soundOff');
		audioElement.pause();
		btnMicrophoneOn.classList.remove('d-none');
		btnMicrophoneOff.classList.add('d-none');
	}

	static public function main() {
		var app = new ToggleSound();
	}
}
