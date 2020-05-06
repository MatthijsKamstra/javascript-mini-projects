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
	var waterMarkImg:Image;
	var selectedImg:Image;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} - PhotoWatermark - Dom ready :: build: ${App.getBuildDate()}');
			init();
		});
	}

	function init() {
		loadWaterMarkImage();

		var form:js.html.FormElement = cast document.getElementById('photo-watermark');

		// document.forms;

		// trace(form);
		// document.getElementById("btn01").disabled = true;
		// document.getElementById("frm1").submit();

		form.onsubmit = function(event) {
			console.log("Saving value");
			event.preventDefault();
		};

		var input:InputElement = cast document.getElementById("exampleFormControlFile1");

		input.onchange = function(e) {
			var fileList:FileList = e.files;
			if (input.files.length > 0) {
				var file:File = input.files[0];
				console.log("You chose: ", file.name);
				console.log("Weight: ", file.size);
				console.log("Type: ", file.type);

				var previewText:js.html.SpanElement = cast document.getElementById('filePreviewText');
				previewText.innerText = '${file.name}" is ' + utils.ConvertBytes.bytesToSize(file.size);
				//
				var previewImg:ImageElement = cast document.getElementById("filePreview");
				var fileReader = new FileReader();
				fileReader.onload = function() {
					// convert image file to base64 string
					previewImg.src = fileReader.result;
					createImage(fileReader.result);
				};
				fileReader.readAsDataURL(file);
			}
		};

		var fileSelect = document.getElementById("fileSelect");
		var fileElem = input;

		fileSelect.onclick = function(e) {
			if (fileElem != null) {
				fileElem.click();
			}
		};
	}

	function createImage(result) {
		selectedImg = new Image();
		selectedImg.onload = function() {
			imageLoaded();
		}
		selectedImg.src = result;
	}

	function imageLoaded() {
		var canvas:js.html.CanvasElement = cast document.getElementById("canvas");
		canvas.width = selectedImg.width;
		canvas.height = selectedImg.height;
		var ctx:CanvasRenderingContext2D = canvas.getContext2d();
		ctx.drawImage(selectedImg, 0, 0);
		// alert(canvas.toDataURL("image/png"));

		// position center

		ctx.drawImage(waterMarkImg, 100, 100, 70, 50);
	}

	function loadWaterMarkImage() {
		waterMarkImg = new Image();
		waterMarkImg.onload = function(e) {
			console.log(e);
		}
		waterMarkImg.src = 'watermark.png';
	}

	function validateForm() {
		// var submitbtn = document.get;

		// var x = document.forms["myForm"]["fname"].value;

		// if (x == "") {
		// 	alert("Name must be filled out");
		// 	return false;
		// }
	}

	static public function main() {
		var app = new PhotoWatermark();
	}
}
