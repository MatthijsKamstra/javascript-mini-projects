(function ($global) { "use strict";
class EmojiFavicon {
	constructor() {
		this.charArr = [];
		this.catArr = [];
		this.template = "<link rel=\"icon\" href=\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>😍</text></svg>\">";
		this.url2 = "emoji2.json";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("EmojiFavicon - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.loadData(this.url2,$bind(this,this.buildList2));
	}
	setElements() {
		this.container = window.document.getElementById("emoji-list");
		this.textarea = window.document.getElementById("emoji-favicon-code");
		this.emojiPreview = window.document.getElementById("emoji-preview");
		let btn = window.document.getElementById("btn-refresh");
		let _gthis = this;
		btn.onclick = function() {
			_gthis.randomizeEmojiFavicon();
		};
		let btn1 = window.document.getElementById("btn-copy-code");
		btn1.onclick = function() {
			_gthis.copyCode();
		};
		this.setEmojiFavicon("😍");
	}
	buildList2(str) {
		let json = JSON.parse(str);
		let html = "";
		html += "<div class=\"row\">";
		let _g = 0;
		let _g1 = json.length;
		while(_g < _g1) {
			let i = _g++;
			let emojiObj = json[i];
			html += "<div class=\"col-1\"><a href=\"#\" data-emojichar=\"" + emojiObj.char + "\" data-toggle=\"tooltip\" data-placement=\"top\" data-original-title=\"" + emojiObj.name + "\" title=\"" + emojiObj.name + "\" class=\"emoji-size emoji-link\">" + emojiObj.char + "</a></div>";
			this.charArr.push(emojiObj.char);
			if(this.catArr.indexOf(emojiObj.category) == -1) {
				this.catArr.push(emojiObj.category);
			}
		}
		html += "</div>";
		this.container.innerHTML = html;
		let arr = window.document.getElementsByClassName("emoji-link");
		let _gthis = this;
		let _g2 = 0;
		let _g3 = arr.length;
		while(_g2 < _g3) {
			let i = _g2++;
			let link = arr[i];
			link.onclick = function(e) {
				let emoji = link.dataset.emojichar;
				_gthis.setEmojiFavicon(emoji);
			};
		}
		$global.console.log(this.catArr);
		this.randomizeEmojiFavicon();
	}
	randomizeEmojiFavicon() {
		this.setEmojiFavicon(this.charArr[Math.floor(Math.random() * this.charArr.length)]);
	}
	setEmojiFavicon(emoji) {
		this.textarea.value = StringTools.replace(this.template,"😍",emoji);
		this.emojiPreview.innerHTML = emoji;
	}
	copyCode() {
		this.textarea.select();
		window.document.execCommand("copy");
	}
	loadData(url,callback) {
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			let tmp = this.readyState == 4 && this.status == 200;
		};
		req.onload = function() {
			let body = req.response;
			if(this.status == 200) {
				callback(body);
			}
		};
		req.onerror = function(error) {
			$global.console.error("[JS] error: " + error);
		};
		req.open("GET",url);
		req.send();
	}
	static main() {
		let app = new EmojiFavicon();
	}
}
class StringTools {
	static replace(s,sub,by) {
		return s.split(sub).join(by);
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
EmojiFavicon.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
