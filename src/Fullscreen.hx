class Fullscreen {
	var isFullscreen = false;
	var btn:AnchorElement;
	var bg:DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Fullscreen -Dom ready');
			setElements();
		});
	}

	function setElements() {
		bg = cast document.getElementsByClassName('bg-image')[0]; // I only have one, so just
		btn = cast document.getElementById('fullscreen-btn');
		btn.onclick = (e:MouseEvent) -> {
			e.preventDefault();
			toggleButton();
		}
	}

	function toggleButton() {
		if (isFullscreen) {
			closeFullscreen();
		} else {
			openFullscreen();
		}
		if (!isFullscreen) {
			btn.innerHTML = '<i class="fa fa-toggle-on"></i> Fullscreen';
			bg.classList.add("bg-image-fullscreen");
		} else {
			btn.innerHTML = '<i class="fa fa-toggle-off"></i> Fullscreen';
			bg.classList.remove("bg-image-fullscreen");
		}
		isFullscreen = !isFullscreen; // toggle value
	}

	// ____________________________________ handlers ____________________________________

	/* View in fullscreen */
	function openFullscreen() {
		var elem = document.documentElement;
		if (elem.requestFullscreen != null) {
			elem.requestFullscreen();
		} else if (untyped elem.mozRequestFullScreen) {/* Firefox */
			untyped elem.mozRequestFullScreen();
		} else if (untyped elem.webkitRequestFullscreen) {/* Chrome, Safari and Opera */
			untyped elem.webkitRequestFullscreen();
		} else if (untyped elem.msRequestFullscreen) {/* IE/Edge */
			untyped elem.msRequestFullscreen();
		}
	}

	/* Close fullscreen */
	function closeFullscreen() {
		if (document.exitFullscreen != null) {
			document.exitFullscreen();
		} else if (untyped document.mozCancelFullScreen) {/* Firefox */
			untyped document.mozCancelFullScreen();
		} else if (untyped document.webkitExitFullscreen) {/* Chrome, Safari and Opera */
			untyped document.webkitExitFullscreen();
		} else if (untyped document.msExitFullscreen) {/* IE/Edge */
			untyped document.msExitFullscreen();
		}
	}

	static public function main() {
		var app = new Fullscreen();
	}
}
