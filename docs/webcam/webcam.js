(function ($global) { "use strict";
class Webcam {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Webcam - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.getWebcam();
	}
	setElements() {
		this.videoEl = window.document.getElementById("webcamElement");
		this.videoEl.style.transform = "scale(-1, 1)";
		let _gthis = this;
		this.videoEl.onclick = function() {
			_gthis.snapshot();
		};
		this.canvasEl = window.document.getElementById("canvasElement");
		this.ctx = this.canvasEl.getContext("2d",null);
		let btn = window.document.getElementById("btn-snapshot");
		btn.onclick = function() {
			_gthis.snapshot();
		};
	}
	getWebcam() {
		console.log("src/Webcam.hx:50:",($_=$global.navigator.mediaDevices,$bind($_,$_.getUserMedia)));
		let _gthis = this;
		if($global.navigator.mediaDevices.getUserMedia != null) {
			$global.navigator.mediaDevices.getUserMedia({ video : true}).then(function(stream) {
				_gthis.videoEl.srcObject = stream;
				_gthis.webcamStream = stream;
			}).catch(function(err0r) {
				$global.console.log("Something went wrong!");
			});
		}
	}
	snapshot() {
		this.canvasEl.width = this.videoEl.clientWidth;
		this.canvasEl.height = this.videoEl.clientHeight;
		this.drawImage(this.videoEl,0,0,this.canvasEl.width,this.canvasEl.height);
	}
	drawImage(img,x,y,width,height) {
		this.ctx.save();
		this.ctx.translate(x + width / 2,y + height / 2);
		this.ctx.scale(-1,1);
		this.ctx.drawImage(img,-width / 2,-height / 2,width,height);
		this.ctx.restore();
	}
	static main() {
		let app = new Webcam();
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
}
Webcam.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
