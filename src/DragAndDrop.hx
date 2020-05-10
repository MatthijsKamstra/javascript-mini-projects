/**
 * https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
 */
class DragAndDrop {
	// elements
	var dropzone:DivElement;
	var dropzoneOutput:DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('DragAndDrop - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		setDropZone();
	}

	function setElements() {
		dropzone = cast document.getElementById("dropzone");
		dropzoneOutput = cast document.getElementById("dropzone-output");
	}

	function setDropZone() {
		dropzone.ondragover = dropzone.ondragenter = function(e:DragEvent) {
			e.stopPropagation();
			e.preventDefault();
			dropzone.classList.add('active');
		}

		dropzone.ondrop = function(e:DragEvent) {
			e.stopPropagation();
			e.preventDefault();
			dropzone.classList.remove('active');

			console.log(e);

			dropzoneOutput.innerText = '';
			var list = document.createElement("ul");
			dropzoneOutput.appendChild(list);

			var filesArray:FileList = e.dataTransfer.files;
			for (i in 0...filesArray.length) {
				var file = filesArray[i];
				// sendFile(file);
				trace(file);

				var li = document.createElement("li");
				list.appendChild(li);

				// var img = document.createElement("img");
				// img.src = URL.createObjectURL(this.files[i]);
				// img.height = 60;
				// img.onload = function() {
				// 	URL.revokeObjectURL(this.src);
				// }
				// li.appendChild(img);

				var info = document.createElement("span");
				info.innerHTML = type2Icon(file.type) + " " + file.name + ": " + file.size + " bytes, type: " + file.type;
				li.appendChild(info);
			}
		}
	}

	function type2Icon(type:String):String {
		switch (type) {
			case 'text/markdown':
				return '<i class="fa fa-file-text-o"></i>';
			case 'application/json':
				return '<i class="fa fa-file-code-o"></i>';
			case 'image/png', 'image/jpg':
				return '<i class="fa fa-file-picture-o"></i>';
			default:
				trace("case '" + type + "': trace ('" + type + "');");
				return '<i class="fa fa-file"></i>';
		}
	}

	static public function main() {
		var app = new DragAndDrop();
	}
}
