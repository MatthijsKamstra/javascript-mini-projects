// Generated by Haxe 4.0.5
(function ($global) { "use strict";
Math.__name__ = true;
class PhotoWatermark {
	constructor() {
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("PhotoWatermark - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.loadWaterMarkImage();
		var _gthis = this;
		this.form.onsubmit = function(event) {
			window.console.log("Saving value");
			event.preventDefault();
		};
		this.fileInput.onchange = function(e) {
			var fileList = e.files;
			if(_gthis.fileInput.files.length > 0) {
				var file = _gthis.fileInput.files[0];
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
					_gthis.createSelectedImage(fileReader.result);
				};
				fileReader.readAsDataURL(file);
			}
		};
	}
	setElements() {
		this.form = window.document.getElementById("photo-watermark");
		this.fileInput = window.document.getElementById("exampleFormControlFile1");
		this.previewText = window.document.getElementById("filePreviewText");
		this.previewImg = window.document.getElementById("filePreview");
		this.containerCanvas = window.document.getElementById("container-canvas");
		this.containerCanvas.classList.add("d-none");
		this.canvas = window.document.getElementById("canvas-watermark");
		this.btnDownload = window.document.getElementById("btn-download");
		this.btnDownload.onclick = $bind(this,this.exportPNG);
		this.btnBase64 = window.document.getElementById("btn-base64");
		this.btnBase64.onclick = $bind(this,this.exportBase64);
		this.btnBase642 = window.document.getElementById("btn-base64-2");
		this.btnBase642.onclick = $bind(this,this.exportBase642);
		var fileSelectCollection = window.document.getElementsByClassName("fileSelect");
		var _gthis = this;
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
	loadWaterMarkImage() {
		this.waterMarkImg = new Image();
		this.waterMarkImg.onload = function(e) {
			window.console.log(e);
		};
		this.waterMarkImg.src = "watermark.png";
	}
	createSelectedImage(result) {
		this.selectedImg = new Image();
		var _gthis = this;
		this.selectedImg.onload = function() {
			_gthis.addWatermark2Image();
		};
		this.selectedImg.src = result;
	}
	addWatermark2Image() {
		this.canvas.width = this.selectedImg.width;
		this.canvas.height = this.selectedImg.height;
		var ctx = this.canvas.getContext("2d",null);
		ctx.drawImage(this.selectedImg,0,0);
		var scale = this.canvas.height * 0.5 / this.waterMarkImg.height;
		var left = (this.canvas.width - this.waterMarkImg.width * scale) / 2;
		var top = (this.canvas.height - this.waterMarkImg.height * scale) / 2;
		ctx.globalAlpha = 0.5;
		ctx.drawImage(this.waterMarkImg,left,top,this.waterMarkImg.width * scale,this.waterMarkImg.height * scale);
		this.containerCanvas.classList.remove("d-none");
	}
	exportPNG() {
		var link = window.document.createElement("a");
		link.style.cssText = "display:none";
		link.download = "watermark.png";
		link.href = this.canvas.toDataURL("",1);
		link.click();
		link.remove();
	}
	exportBase64() {
		window.alert(Std.string(this.canvas.toDataURL("image/png")));
	}
	exportBase642() {
		var dataUrl = this.canvas.toDataURL("png");
		window.console.log(dataUrl);
		var win = window.open(dataUrl,"_blank");
	}
	static main() {
		var app = new PhotoWatermark();
	}
}
PhotoWatermark.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class js__$Boot_HaxeError extends Error {
	constructor(val) {
		super();
		this.val = val;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,js__$Boot_HaxeError);
		}
	}
}
js__$Boot_HaxeError.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		var t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				var str = "[";
				s += "\t";
				var _g3 = 0;
				var _g11 = o.length;
				while(_g3 < _g11) {
					var i = _g3++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			var tostr;
			try {
				tostr = o.toString;
			} catch( e1 ) {
				var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				var s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			var str1 = "{\n";
			s += "\t";
			var hasp = o.hasOwnProperty != null;
			var k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str1.length != 2) {
				str1 += ", \n";
			}
			str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str1 += "\n" + s + "}";
			return str1;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
PhotoWatermark.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
