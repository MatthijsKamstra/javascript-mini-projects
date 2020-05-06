// Generated by Haxe 4.0.5
(function ($global) { "use strict";
var App = function() { };
var PhotoWatermark = function() {
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		window.console.log("" + App.NAME + " - PhotoWatermark - Dom ready :: build: " + "2020-05-06 16:51:27");
		_gthis.init();
	});
};
PhotoWatermark.main = function() {
	var app = new PhotoWatermark();
};
PhotoWatermark.prototype = {
	setElements: function() {
		var _gthis = this;
		this.form = window.document.getElementById("photo-watermark");
		this.fileInput = window.document.getElementById("exampleFormControlFile1");
		this.previewText = window.document.getElementById("filePreviewText");
		this.previewImg = window.document.getElementById("filePreview");
		var fileSelectCollection = window.document.getElementsByClassName("fileSelect");
		var _g = 0;
		var _g1 = fileSelectCollection.length;
		while(_g < _g1) {
			var i = _g++;
			var fileSelect = fileSelectCollection[i];
			fileSelect.onclick = function(e) {
				if(_gthis.fileInput != null) {
					_gthis.fileInput.click();
				}
			};
		}
	}
	,init: function() {
		var _gthis = this;
		this.setElements();
		this.loadWaterMarkImage();
		this.form.onsubmit = function(event) {
			window.console.log("Saving value");
			event.preventDefault();
		};
		this.fileInput.onchange = function(e) {
			var fileList = e.files;
			if(_gthis.fileInput.files.length > 0) {
				var file = _gthis.fileInput.files[0];
				window.console.log("You chose: ",file.name);
				window.console.log("Weight: ",file.size);
				window.console.log("Type: ",file.type);
				var bytes = file.size;
				var sizes = ["Bytes","KB","MB","GB","TB"];
				var tmp;
				if(bytes == 0) {
					tmp = "0 Byte";
				} else {
					var i = Math.floor(Math.log(bytes) / Math.log(1024)) | 0;
					tmp = Math.round(bytes / Math.pow(1024,i)) + " " + sizes[i];
				}
				_gthis.previewText.innerText = "\"" + file.name + "\" is " + tmp;
				var fileReader = new FileReader();
				fileReader.onload = function() {
					_gthis.previewImg.src = fileReader.result;
					_gthis.createImage(fileReader.result);
				};
				fileReader.readAsDataURL(file);
			}
		};
	}
	,createImage: function(result) {
		var _gthis = this;
		this.selectedImg = new Image();
		this.selectedImg.onload = function() {
			_gthis.imageLoaded();
		};
		this.selectedImg.src = result;
	}
	,imageLoaded: function() {
		var canvas = window.document.getElementById("canvas");
		canvas.width = this.selectedImg.width;
		canvas.height = this.selectedImg.height;
		var ctx = canvas.getContext("2d",null);
		ctx.drawImage(this.selectedImg,0,0);
		window.console.log("water.w: " + this.waterMarkImg.width + ", water.h: " + this.waterMarkImg.height);
		window.console.log("canvas.w: " + canvas.width + ", canvas.h: " + canvas.height);
		var scale = canvas.height * 0.5 / this.waterMarkImg.height;
		var left = (canvas.width - this.waterMarkImg.width * scale) / 2;
		var top = (canvas.height - this.waterMarkImg.height * scale) / 2;
		window.console.log(scale);
		ctx.globalAlpha = 0.5;
		ctx.drawImage(this.waterMarkImg,left,top,this.waterMarkImg.width * scale,this.waterMarkImg.height * scale);
	}
	,loadWaterMarkImage: function() {
		this.waterMarkImg = new Image();
		this.waterMarkImg.onload = function(e) {
			window.console.log(e);
		};
		this.waterMarkImg.src = "watermark.png";
	}
};
App.NAME = "[js-mini-projects]";
PhotoWatermark.main();
})({});
