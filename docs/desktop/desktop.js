(function ($global) { "use strict";
class Desktop {
	constructor() {
		this.quoteArray = ["The secret of getting ahead is getting started. – Mark Twain","If you spend too much time thinking about a thing, you’ll never get it done. – Bruce Lee","You miss 100 percent of the shots you never take. – Wayne Gretzky"];
		this.bgArray = ["bg/faruk-kaymak-P_Ne56WEe5s-unsplash.jpg","bg/simon-wilkes-py3Uw1QbK6A-unsplash.jpg","bg/tim-swaan-eOpewngf68w-unsplash.jpg"];
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Desktop - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.startTime();
		this.randomBg();
		this.randomQuote();
	}
	setElements() {
		this.containerDesktop = window.document.getElementsByClassName("container-desktop")[0];
		this.timeEl = window.document.getElementById("time");
		this.quoteWrapper = window.document.getElementsByClassName("quote-wrapper")[0];
		this.quote = window.document.getElementsByClassName("quote")[0];
		this.author = window.document.getElementsByClassName("author")[0];
		this.btnList = window.document.getElementsByClassName("fa-list-ul")[0];
		this.btnSearch = window.document.getElementsByClassName("fa-search")[0];
		this.btnWeather = window.document.getElementsByClassName("fa-sun-o")[0];
		this.btnTwitter = window.document.getElementsByClassName("fa-twitter")[0];
		this.btnHeartToggle = window.document.getElementsByClassName("toggle-heart")[0];
		this.btnMicrophoneToggle = window.document.getElementsByClassName("toggle-microphone")[0];
	}
	startTime() {
		let today = new Date();
		let h = today.getHours();
		let m = today.getMinutes();
		let s = today.getSeconds();
		let _h = this.checkTime(h);
		let _m = this.checkTime(m);
		let _s = this.checkTime(s);
		this.timeEl.innerHTML = _h + "<span class='dotdot'>:</span>" + _m + "<span class='dotdot'>:</span>" + _s;
		let t = window.setTimeout($bind(this,this.startTime),500);
	}
	randomBg() {
		let url = this.bgArray[Math.floor(Math.random() * this.bgArray.length)];
		this.containerDesktop.style.backgroundImage = "url(" + url + ")";
	}
	randomQuote() {
		let randomQuote = this.quoteArray[Math.floor(Math.random() * this.quoteArray.length)];
		let rquote = randomQuote.split(" – ")[0];
		let rauthor = randomQuote.split(" – ")[1];
		this.quote.innerText = rquote;
		this.author.innerHTML = " – <b>" + rauthor + "</b>";
	}
	checkTime(i) {
		let str = "" + i;
		if(i < 10) {
			str = "0" + i;
		}
		return str;
	}
	static main() {
		let app = new Desktop();
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
Desktop.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
