package;

import js.Browser.*;

/**
 * @source
 * - https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
 * - https://stackoverflow.com/questions/13938686/can-i-load-a-local-file-into-an-html-canvas-element
 *
 *
 */
class PhotoWatermark {
	// images
	var waterMarkImg:Image;
	var selectedImg:Image;
	// elements
	var form:FormElement;
	var fileInput:InputElement;
	var previewText:SpanElement;
	var previewImg:ImageElement;
	// export elements, like download btn
	var canvas:CanvasElement;
	var containerCanvas:DivElement;
	var btnDownload:ButtonElement;
	var btnBase64:ButtonElement;
	var btnBase642:ButtonElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} - PhotoWatermark - Dom ready :: build: ${App.getBuildDate()}');
			init();
		});
	}

	function init() {
		setElements();
		loadWaterMarkImage();

		form.onsubmit = function(event) {
			console.log("Saving value");
			event.preventDefault();
		};

		fileInput.onchange = function(e) {
			var fileList:FileList = e.files;
			if (fileInput.files.length > 0) {
				var file:File = fileInput.files[0];
				// console.log("You chose: ", file.name);
				// console.log("Weight: ", file.size);
				// console.log("Type: ", file.type);

				previewText.innerText = '"${file.name}" is ' + utils.ConvertBytes.bytesToSize(file.size);

				var fileReader = new FileReader();
				fileReader.onload = function() {
					// convert image file to base64 string
					previewImg.src = fileReader.result;
					createSelectedImage(fileReader.result);
				};
				fileReader.readAsDataURL(file);
			}
		};
	}

	function setElements() {
		form = cast document.getElementById('photo-watermark');
		fileInput = cast document.getElementById("exampleFormControlFile1");
		previewText = cast document.getElementById('filePreviewText');
		previewImg = cast document.getElementById("filePreview");
		// trace(form);
		// document.forms;
		// document.getElementById("btn01").disabled = true;
		// document.getElementById("frm1").submit();

		containerCanvas = cast document.getElementById('container-canvas');
		containerCanvas.classList.add('d-none');

		canvas = cast document.getElementById("canvas-watermark");

		btnDownload = cast document.getElementById('btn-download');
		btnDownload.onclick = exportPNG;
		btnBase64 = cast document.getElementById('btn-base64');
		btnBase64.onclick = exportBase64;
		btnBase642 = cast document.getElementById('btn-base64-2');
		btnBase642.onclick = exportBase642;

		var fileSelectCollection = document.getElementsByClassName("fileSelect");
		for (i in 0...fileSelectCollection.length) {
			var fileSelect = fileSelectCollection[i];
			fileSelect.onclick = function(e) {
				if (fileInput != null) {
					fileInput.click();
				}
			};
		}
	}

	function loadWaterMarkImage() {
		waterMarkImg = new Image();
		waterMarkImg.onload = function(e) {
			// [mck] need to set a boolean?
			console.log(e);
		}
		waterMarkImg.src = 'watermark.png';
	}

	function createSelectedImage(result:String) {
		selectedImg = new Image();
		selectedImg.onload = function() {
			addWatermark2Image();
		}
		selectedImg.src = result;
	}

	function addWatermark2Image() {
		canvas.width = selectedImg.width;
		canvas.height = selectedImg.height;

		var ctx:CanvasRenderingContext2D = canvas.getContext2d();
		ctx.drawImage(selectedImg, 0, 0);

		var scale = (canvas.height * 0.5) / waterMarkImg.height;
		var left = (canvas.width - (waterMarkImg.width * scale)) / 2;
		var top = (canvas.height - (waterMarkImg.height * scale)) / 2;

		// position center
		// console.log('water.w: ' + waterMarkImg.width + ", water.h: " + waterMarkImg.height);
		// console.log('canvas.w: ' + canvas.width + ", canvas.h: " + canvas.height);
		// console.log(scale);

		ctx.globalAlpha = 0.5;
		ctx.drawImage(waterMarkImg, left, top, waterMarkImg.width * scale, waterMarkImg.height * scale);

		containerCanvas.classList.remove('d-none');
	}

	// ____________________________________ export ____________________________________

	function exportPNG() {
		var link = document.createAnchorElement();
		link.style.cssText = "display:none";
		link.download = 'watermark.png';
		link.href = canvas.toDataURL('', 1);
		link.click();
		link.remove();
	};

	function exportBase64() {
		alert(canvas.toDataURL("image/png"));
	};

	function exportBase642() {
		var dataUrl = canvas.toDataURL("png");
		console.log(dataUrl);
		var win = window.open(dataUrl, '_blank');
	};

	static public function main() {
		var app = new PhotoWatermark();
	}
}
