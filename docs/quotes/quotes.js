(function ($hx_exports, $global) { "use strict";
class Quotes {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Quotes - Dom ready");
			_gthis.getQuote();
		});
	}
	getQuote() {
		let url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=Quotes.setQuote";
		this.loadData(url);
	}
	init() {
		this.setElements();
	}
	setElements() {
	}
	loadData(url) {
		let script = window.document.createElement("script");
		script.src = url;
		window.document.head.appendChild(script);
		script.onload = function(e) {
			this.remove();
		};
	}
	static setQuote(data) {
		console.log("src/Quotes.hx:29:","setQuote");
		let quoteText = window.document.getElementById("quote-text");
		quoteText.innerText = data.quoteText;
		if(data.quoteAuthor != "") {
			let quoteAuthor = window.document.getElementById("quote-author");
			quoteAuthor.innerHTML = "<a href=\"https://en.wikipedia.org/wiki/" + data.quoteAuthor + "\" target=\"_blank\">" + data.quoteAuthor + " <i class=\"fa fa-wikipedia-w\"></i></a>";
		}
		let a = window.document.getElementById("btn-twitter");
		a.onclick = function(e) {
			e.preventDefault();
			let tweetedLink = window.location.href;
			let getPostTitle = "\"" + data.quoteText + "\" ~ " + data.quoteAuthor + "   ";
			return window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=@matthijskamstra&","twitterwindow","height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
		};
		let a1 = window.document.getElementById("btn-like");
		a1.onclick = function(e) {
			console.log("src/Quotes.hx:51:","like!");
			window.alert("Like doesn't work yet!");
		};
	}
	static main() {
		let app = new Quotes();
	}
}
$hx_exports["Quotes"] = Quotes;
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
Quotes.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
