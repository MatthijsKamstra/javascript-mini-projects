(function ($global) { "use strict";
Math.__name__ = true;
class PhotoWatermark {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("PhotoWatermark - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.loadWaterMarkImage();
		this.form.onsubmit = function(event) {
			$global.console.log("Saving value");
			event.preventDefault();
		};
		let _gthis = this;
		this.fileInput.onchange = function(e) {
			let fileList = e.files;
			if(_gthis.fileInput.files.length > 0) {
				let file = _gthis.fileInput.files[0];
				let bytes = file.size;
				let sizes = ["Bytes","KB","MB","GB","TB"];
				let tmp;
				if(bytes == 0) {
					tmp = "0 Byte";
				} else {
					let i = Math.floor(Math.log(bytes) / Math.log(1024)) | 0;
					tmp = Math.round(bytes / Math.pow(1024,i)) + " " + sizes[i];
				}
				_gthis.previewText.innerText = "\"" + file.name + "\" is " + tmp;
				let fileReader = new FileReader();
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
		let fileSelectCollection = window.document.getElementsByClassName("fileSelect");
		let _gthis = this;
		let _g = 0;
		let _g1 = fileSelectCollection.length;
		while(_g < _g1) {
			let i = _g++;
			let fileSelect = fileSelectCollection[i];
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
			$global.console.log(e);
		};
		this.waterMarkImg.src = "watermark.png";
	}
	createSelectedImage(result) {
		this.selectedImg = new Image();
		let _gthis = this;
		this.selectedImg.onload = function() {
			_gthis.addWatermark2Image();
		};
		this.selectedImg.src = result;
	}
	addWatermark2Image() {
		this.canvas.width = this.selectedImg.width;
		this.canvas.height = this.selectedImg.height;
		let ctx = this.canvas.getContext("2d",null);
		ctx.drawImage(this.selectedImg,0,0);
		let scale = this.canvas.height * 0.5 / this.waterMarkImg.height;
		let left = (this.canvas.width - this.waterMarkImg.width * scale) / 2;
		let top = (this.canvas.height - this.waterMarkImg.height * scale) / 2;
		ctx.globalAlpha = 0.5;
		ctx.drawImage(this.waterMarkImg,left,top,this.waterMarkImg.width * scale,this.waterMarkImg.height * scale);
		this.containerCanvas.classList.remove("d-none");
	}
	exportPNG() {
		let link = window.document.createElement("a");
		link.style.cssText = "display:none";
		link.download = "watermark.png";
		link.href = this.canvas.toDataURL("",1);
		link.click();
		link.remove();
	}
	exportBase64() {
		let v = this.canvas.toDataURL("image/png");
		window.alert(Std.string(v));
	}
	exportBase642() {
		let dataUrl = this.canvas.toDataURL("png");
		$global.console.log(dataUrl);
		let win = window.open(dataUrl,"_blank");
	}
	static main() {
		let app = new PhotoWatermark();
	}
}
PhotoWatermark.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
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
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
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
{
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
PhotoWatermark.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
