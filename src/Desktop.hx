package;

import js.html.Window;

class Desktop {
	var containerDesktop:DivElement;
	var quoteWrapper:DivElement;
	var timeEl:SpanElement;

	var quote:SpanElement;
	var author:SpanElement;
	var btnList:DivElement;
	var btnSearch:HtmlElement;
	var btnWeather:HtmlElement;
	var btnTwitter:HtmlElement;
	var btnHeartToggle:DivElement;
	var btnMicrophoneToggle:DivElement;

	var bgArray = [
		'bg/faruk-kaymak-P_Ne56WEe5s-unsplash.jpg',
		'bg/simon-wilkes-py3Uw1QbK6A-unsplash.jpg',
		'bg/tim-swaan-eOpewngf68w-unsplash.jpg'
	];
	var quoteArray = [
		'The secret of getting ahead is getting started. – Mark Twain',
		'If you spend too much time thinking about a thing, you’ll never get it done. – Bruce Lee',
		'You miss 100 percent of the shots you never take. – Wayne Gretzky'
	];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Desktop - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		startTime();
		randomBg();
		randomQuote();
	}

	function setElements() {
		containerDesktop = cast document.getElementsByClassName("container-desktop")[0]; // get the first
		timeEl = cast document.getElementById("time");

		quoteWrapper = cast document.getElementsByClassName("quote-wrapper")[0];
		quote = cast document.getElementsByClassName("quote")[0];
		author = cast document.getElementsByClassName("author")[0];

		btnList = cast document.getElementsByClassName("fa-list-ul")[0];
		btnSearch = cast document.getElementsByClassName("fa-search")[0];
		btnWeather = cast document.getElementsByClassName("fa-sun-o")[0];
		btnTwitter = cast document.getElementsByClassName("fa-twitter")[0];
		btnHeartToggle = cast document.getElementsByClassName("toggle-heart")[0];
		btnMicrophoneToggle = cast document.getElementsByClassName("toggle-microphone")[0];
	}

	function startTime() {
		var today = Date.now();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var _h = checkTime(h);
		var _m = checkTime(m);
		var _s = checkTime(s);
		// timeEl.innerHTML = _h + "<span class='dotdot'>:</span>" + _m;
		timeEl.innerHTML = _h + "<span class='dotdot'>:</span>" + _m + "<span class='dotdot'>:</span>" + _s;

		var t = window.setTimeout(startTime, 500);
	}

	function randomBg() {
		var url = bgArray[Math.floor(Math.random() * bgArray.length)];
		containerDesktop.style.backgroundImage = 'url($url)';
	};

	function randomQuote() {
		var randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
		var rquote = randomQuote.split(" – ")[0];
		var rauthor = randomQuote.split(" – ")[1];
		quote.innerText = rquote;
		author.innerHTML = ' – <b>$rauthor</b>';
	};

	function checkTime(i:Int):String {
		var str:String = '$i';
		if (i < 10) {
			str = "0" + i;
			// add zero in front of numbers < 10
		}
		return str;
	}

	static public function main() {
		var app = new Desktop();
	}
}
