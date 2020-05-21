class Webcam {
	// snapshot
	var canvasEl:CanvasElement;
	var ctx:CanvasRenderingContext2D;
	// video
	var videoEl:VideoElement;
	var webcamStream:MediaStream;

	// / ?https: // developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Webcam - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		getWebcam();
		// permission();
	}

	function setElements() {
		videoEl = cast document.getElementById("webcamElement");
		// flip element to sync movement
		videoEl.style.transform = 'scale(-1, 1)';
		videoEl.onclick = () -> snapshot();
		// setup snapshot elements
		canvasEl = cast document.getElementById("canvasElement");
		ctx = cast canvasEl.getContext2d();

		var btn = cast document.getElementById("btn-snapshot");
		btn.onclick = () -> snapshot();
	}

	function permission() {
		trace(navigator.permissions);
		trace(navigator.permissions.query);

		navigator.permissions.query({name: 'camera'})
			.then((permissionObj) -> {
				console.log(permissionObj.state);
			})
			.catchError((error) -> {
				console.log('Got error :', error);
			});
	}

	function getWebcam() {
		trace(navigator.mediaDevices.getUserMedia);

		if (navigator.mediaDevices.getUserMedia != null) {
			navigator.mediaDevices.getUserMedia({video: true})
				.then(function(stream) {
					videoEl.srcObject = stream;
					webcamStream = stream;
				})
				.catchError(function(err0r) {
					console.log("Something went wrong!");
				});
		}
	}

	function snapshot() {
		canvasEl.width = videoEl.clientWidth;
		canvasEl.height = videoEl.clientHeight;

		// ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
	}

	function drawImage(img:VideoElement, x, y, width, height) {
		// save current context before applying transformations
		ctx.save();
		// set the origin to the center of the image
		ctx.translate(x + width / 2, y + height / 2);
		// flip the canvas
		ctx.scale(-1, 1);
		// draw the image
		ctx.drawImage(img, -width / 2, -height / 2, width, height);
		// restore the canvas
		ctx.restore();
	}

	static public function main() {
		var app = new Webcam();
	}
}
