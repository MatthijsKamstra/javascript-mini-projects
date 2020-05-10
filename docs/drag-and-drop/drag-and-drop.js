// Generated by Haxe 4.0.5
(function ($global) { "use strict";
class App {
}
class DragAndDrop {
	constructor() {
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("" + App.NAME + " - DragAndDrop - Dom ready :: build: " + "2020-05-09 21:29:59");
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
		var _gthis = this;
		this.dropzone.ondragover = this.dropzone.ondragenter = function(e) {
			e.stopPropagation();
			e.preventDefault();
			_gthis.dropzone.classList.add("active");
		};
		this.dropzone.ondrop = function(e1) {
			e1.stopPropagation();
			e1.preventDefault();
			_gthis.dropzone.classList.remove("active");
			window.console.log(e1);
			_gthis.dropzoneOutput.innerText = "";
			var list = window.document.createElement("ul");
			_gthis.dropzoneOutput.appendChild(list);
			var filesArray = e1.dataTransfer.files;
			var _g = 0;
			var _g1 = filesArray.length;
			while(_g < _g1) {
				var i = _g++;
				var file = filesArray[i];
				console.log("src/DragAndDrop.hx:48:",file);
				var li = window.document.createElement("li");
				list.appendChild(li);
				var info = window.document.createElement("span");
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
		var app = new DragAndDrop();
	}
}
App.NAME = "[js-mini-projects]";
DragAndDrop.main();
})({});
