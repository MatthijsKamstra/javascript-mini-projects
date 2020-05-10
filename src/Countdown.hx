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

	// function stopTimer() {
	// 	if (isDebug)
	// 		console.debug("stopTimer()");
	// 	if (intervall != null) {
	// 		clearInterval(intervall);
	// 		gif.src = "/assets/img/timer/haan_timer_static.gif";
	// 		timerText.textContent = defaultTimeString;
	// 	}
	// }
	// var intervall = null;
	// // var timer;
	// function _startTimer(duration) {
	// 	// console.debug("_startTimer");
	// 	if (intervall != null) {
	// 		clearInterval(intervall);
	// 	}
	// 	timer = duration;
	// 	var minutes;
	// 	var seconds;
	// 	intervall = setInterval(function() {
	// 		minutes = parseInt(timer / 60, 10);
	// 		seconds = parseInt(timer % 60, 10);
	// 		minutes = minutes < 10 ? "0" + minutes : minutes;
	// 		seconds = seconds < 10 ? "0" + seconds : seconds;
	// 		timerText.textContent = minutes + ":" + seconds;
	// 		// console.debug(timer);
	// 		if (--timer < 0) {
	// 			timer = duration;
	// 			clearInterval(intervall);
	// 		}
	// 	}, 1000);
	// }

	static public function main() {
		var app = new Countdown();
	}
}
