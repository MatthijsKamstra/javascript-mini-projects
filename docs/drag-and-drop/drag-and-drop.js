(function ($global) { "use strict";
class DragAndDrop {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("DragAndDrop - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.setDropZone();
	}
	setElements() {
		this.dropzone = window.document.getElementById("dropzone");
		this.dropzoneOutput = window.document.getElementById("dropzone-output");
	}
	setDropZone() {
		let _gthis = this;
		this.dropzone.ondragover = this.dropzone.ondragenter = function(e) {
			e.stopPropagation();
			e.preventDefault();
			_gthis.dropzone.classList.add("active");
		};
		this.dropzone.ondrop = function(e) {
			e.stopPropagation();
			e.preventDefault();
			_gthis.dropzone.classList.remove("active");
			$global.console.log(e);
			_gthis.dropzoneOutput.innerText = "";
			let list = window.document.createElement("ul");
			_gthis.dropzoneOutput.appendChild(list);
			let filesArray = e.dataTransfer.files;
			let _g = 0;
			let _g1 = filesArray.length;
			while(_g < _g1) {
				let i = _g++;
				let file = filesArray[i];
				console.log("src/DragAndDrop.hx:48:",file);
				let li = window.document.createElement("li");
				list.appendChild(li);
				let info = window.document.createElement("span");
				info.innerHTML = _gthis.type2Icon(file.type) + " " + file.name + ": " + file.size + " bytes, type: " + file.type;
				li.appendChild(info);
			}
		};
	}
	type2Icon(type) {
		switch(type) {
		case "application/json":
			return "<i class=\"fa fa-file-code-o\"></i>";
		case "image/jpg":case "image/png":
			return "<i class=\"fa fa-file-picture-o\"></i>";
		case "text/markdown":
			return "<i class=\"fa fa-file-text-o\"></i>";
		default:
			console.log("src/DragAndDrop.hx:77:","case '" + type + "': trace ('" + type + "');");
			return "<i class=\"fa fa-file\"></i>";
		}
	}
	static main() {
		let app = new DragAndDrop();
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
DragAndDrop.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
