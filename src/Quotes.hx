import haxe.Constraints.Function;
import js.Lib;

@:expose
class Quotes {
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Quotes - Dom ready');
			getQuote();
		});
	}

	function getQuote() {
		var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=Quotes.setQuote';
		loadData(url);
	}

	function init() {
		setElements();
	}

	function setElements() {
		// var btn:ButtonElement = cast document.getElementById('btn-start');
		// btn.onclick = (e) -> onTimerStartHandle(e);
		// btn.onclick = (e) -> onTimerStartHandle(e);
	}

	public static function setQuote(data:QuoteObj) {
		trace('setQuote');
		// trace(data);
		var quoteText:SpanElement = cast document.getElementById('quote-text');
		quoteText.innerText = data.quoteText;
		var quoteAuthor:SpanElement = cast document.getElementById('quote-author');
		quoteAuthor.innerHTML = '<a href="https://en.wikipedia.org/wiki/${data.quoteAuthor}" target="_blank">${data.quoteAuthor} <i class="fa fa-wikipedia-w"></i></a>';

		var a:AnchorElement = cast document.getElementById('btn-twitter');
		a.onclick = (e) -> {
			e.preventDefault();

			var tweetedLink = window.location.href;
			var getPostTitle = '"${data.quoteText}" ~ ${data.quoteAuthor}   ';

			window.open("http://twitter.com/intent/tweet?url=" + tweetedLink + "&text=" + getPostTitle + "&via=@matthijskamstra&", "twitterwindow",
				"height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
		}

		var a:AnchorElement = cast document.getElementById('btn-like');
		a.onclick = (e) -> {
			trace('like!');
		}
	}

	/**
	 * using jsonp to not use
	 * @param url 		load file from here
	 */
	function loadData(url:String) {
		// Create script with url and callback (if specified)
		var script = document.createScriptElement();
		script.src = url;
		document.head.appendChild(script);

		// trace(script.src);

		// After the script is loaded (and executed), remove it
		script.onload = function(e) {
			// console.log(e);
			Lib.nativeThis.remove();
		};
	}

	static public function main() {
		var app = new Quotes();
	}
}

typedef QuoteObj = {
	var quoteAuthor:String;
	var quoteLink:String;
	var quoteText:String;
	var senderLink:String;
	var senderName:String;
}
