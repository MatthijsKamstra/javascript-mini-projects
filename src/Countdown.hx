import utils.Name;

class Countdown {
	// elements
	var containerDesktop:DivElement;
	var timeDescriptionEl:SpanElement;
	var timeEl:SpanElement;

	// countdown
	var timerID = null;
	var counter:Int;
	var defaultTimeString:String;
	var durationInSeconds:Int = 10; // seconds

	// audio
	var sfxDone:Audio;
	var sfxTick:Audio;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Countdown - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		initTimer();
	}

	function setElements() {
		containerDesktop = cast document.getElementsByClassName("container-countdown")[0]; // get the first
		timeDescriptionEl = cast document.getElementById("time-description");
		timeEl = cast document.getElementById("time");

		var btn:ButtonElement = cast document.getElementById('btn-start');
		btn.onclick = onTimerStartHandler;
		var btn:ButtonElement = cast document.getElementById('btn-stop');
		btn.onclick = onTimerStopHandler;
		var btn:ButtonElement = cast document.getElementById('btn-10');
		btn.onclick = () -> onSetTimeHandler(10);
		var btn:ButtonElement = cast document.getElementById('btn-30');
		btn.onclick = () -> onSetTimeHandler(30);
		var btn:ButtonElement = cast document.getElementById('btn-60');
		btn.onclick = () -> onSetTimeHandler(60);
		var btn:ButtonElement = cast document.getElementById('btn-80');
		btn.onclick = () -> onSetTimeHandler(80);

		//  audio
		sfxDone = new Audio('sfx/dun_dun_dun-Delsym-719755295.mp3');
		sfxTick = new Audio('sfx/Tick-DeepFrozenApps-397275646.mp3');
	}

	// ____________________________________ handlers ____________________________________

	function onTimerStartHandler() {
		startTimer();
	};

	function onTimerStopHandler() {
		stopTimer();
	};

	function onSetTimeHandler(sec:Int) {
		// trace(sec);
		durationInSeconds = sec;
		onTimerStopHandler();
		initTimer();
	};

	// ____________________________________ timer functions ____________________________________

	function initTimer() {
		var _minutes = Std.int(durationInSeconds / 60);
		var _seconds = Std.int(durationInSeconds % 60);
		var minutes:String = checkTime(_minutes);
		var seconds:String = checkTime(_seconds);
		defaultTimeString = minutes + "<span class='dotdot'>:</span>" + seconds;
		timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;

		timeDescriptionEl.innerHTML = 'countdown is set to ${durationInSeconds} seconds';
	}

	function startTimer() {
		// console.debug(durationInSeconds);
		_startTimer(durationInSeconds - 1);
	}

	function stopTimer() {
		console.debug("stopTimer()");
		if (timerID != null) {
			window.clearInterval(timerID);
			timeEl.innerHTML = defaultTimeString;
		}
	}

	function _startTimer(duration:Int) {
		// console.debug("_startTimer");
		if (timerID != null) {
			window.clearInterval(timerID);
		}
		counter = duration;
		timerID = window.setInterval(function() {
			sfxTick.play();
			var _minutes = Std.int(counter / 60);
			var _seconds = Std.int(counter % 60);
			var minutes:String = checkTime(_minutes);
			var seconds:String = checkTime(_seconds);
			timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;

			// console.debug(counter);
			if (--counter < 0) {
				counter = duration;
				sfxDone.play();
				window.clearInterval(timerID);
				initTimer();
			}
		}, 1000);
	}

	// ____________________________________ utils ____________________________________

	function convertTime2Seconds(min:Int, sec:Int) {
		var totalSec = (min * 60) + sec;
	}

	function checkTime(i:Int):String {
		var str:String = '$i';
		if (i < 10) {
			str = "0" + i;
			// add zero in front of numbers < 10
		}
		return str;
	}

	static public function main() {
		var app = new Countdown();
	}
}
