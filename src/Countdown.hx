import utils.Name;

class Countdown {
	var containerDesktop:DivElement;
	var timeEl:SpanElement;

	// buttons
	var btnDownload:ButtonElement;
	var btnBase64:ButtonElement;
	var btnBase642:ButtonElement;
	var btnRead:ButtonElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Countdown - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
	}

	function setElements() {
		containerDesktop = cast document.getElementsByClassName("container-countdown")[0]; // get the first
		timeEl = cast document.getElementById("time");

		btnDownload = cast document.getElementById('btn-start');
		btnDownload.onclick = onTimerStartHandler;
		btnBase64 = cast document.getElementById('btn-stop');
		btnBase64.onclick = onTimerStopHandler;
		var btn:ButtonElement = cast document.getElementById('btn-10');
		btn.onclick = () -> onSetTimeHandler(10);
		var btn:ButtonElement = cast document.getElementById('btn-30');
		btn.onclick = () -> onSetTimeHandler(30);
		var btn:ButtonElement = cast document.getElementById('btn-60');
		btn.onclick = () -> onSetTimeHandler(60);
		var btn:ButtonElement = cast document.getElementById('btn-80');
		btn.onclick = () -> onSetTimeHandler(80);
	}

	function onTimerStartHandler() {};

	function onTimerStopHandler() {};

	function onSetTimeHandler(sec:Int) {
		trace(sec);
		onTimerStopHandler();
	};

	var defaultTimeString:String;

	function checkTime(i:Int):String {
		var str:String = '$i';
		if (i < 10) {
			str = "0" + i;
			// add zero in front of numbers < 10
		}
		return str;
	}

	function startTimer(min, sec) {
		console.debug(min);
		console.debug(sec);
		var totalSec = (min * 60) + sec;
		var _minutes = Std.int(totalSec / 60);
		var _seconds = Std.int(totalSec % 60);
		var minutes:String = checkTime(_minutes);
		var seconds:String = checkTime(_seconds);
		defaultTimeString = minutes + "<span class='dotdot'>:</span>" + seconds;
		timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;
		// console.debug(totalSec);
		// _startTimer(totalSec - 1);
	}

	var intervall = null;

	function stopTimer() {
		console.debug("stopTimer()");
		if (intervall != null) {
			window.clearInterval(intervall);
			timeEl.innerHTML = defaultTimeString;
		}
	}

	var timer:Int;

	function _startTimer(duration:Int) {
		// console.debug("_startTimer");
		if (intervall != null) {
			window.clearInterval(intervall);
		}
		timer = duration;
		var minutes;
		var seconds;
		intervall = window.setInterval(function() {
			var _minutes = Std.int(timer / 60);
			var _seconds = Std.int(timer % 60);
			var minutes:String = checkTime(_minutes);
			var seconds:String = checkTime(_seconds);
			timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;

			// console.debug(timer);
			if (--timer < 0) {
				timer = duration;
				window.clearInterval(intervall);
			}
		}, 1000);
	}

	static public function main() {
		var app = new Countdown();
	}
}
