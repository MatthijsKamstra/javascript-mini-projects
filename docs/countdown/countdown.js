(function ($global) { "use strict";
class Countdown {
	constructor() {
		this.durationInSeconds = 10;
		this.counter = 0;
		this.timerID = null;
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Countdown - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.initTimer();
	}
	setElements() {
		this.counter = this.durationInSeconds;
		this.containerDesktop = window.document.getElementsByClassName("container-countdown")[0];
		this.progressBar = window.document.getElementsByClassName("progress-bar")[0];
		this.timeDescriptionEl = window.document.getElementById("time-description");
		this.timeEl = window.document.getElementById("time");
		let btn = window.document.getElementById("btn-start");
		btn.onclick = $bind(this,this.onTimerStartHandler);
		let btn1 = window.document.getElementById("btn-stop");
		btn1.onclick = $bind(this,this.onTimerStopHandler);
		let btn2 = window.document.getElementById("btn-10");
		let _gthis = this;
		btn2.onclick = function() {
			_gthis.onSetTimeHandler(10);
		};
		let btn3 = window.document.getElementById("btn-30");
		btn3.onclick = function() {
			_gthis.onSetTimeHandler(30);
		};
		let btn4 = window.document.getElementById("btn-60");
		btn4.onclick = function() {
			_gthis.onSetTimeHandler(60);
		};
		let btn5 = window.document.getElementById("btn-80");
		btn5.onclick = function() {
			_gthis.onSetTimeHandler(80);
		};
		this.sfxDone = new Audio("sfx/dun_dun_dun-Delsym-719755295.mp3");
		this.sfxTick = new Audio("sfx/Tick-DeepFrozenApps-397275646.mp3");
	}
	onTimerStartHandler() {
		this.startTimer();
	}
	onTimerStopHandler() {
		this.stopTimer();
	}
	onSetTimeHandler(sec) {
		this.durationInSeconds = sec;
		this.counter = sec;
		this.onTimerStopHandler();
		this.initTimer();
	}
	initTimer() {
		let _minutes = this.durationInSeconds / 60 | 0;
		let _seconds = this.durationInSeconds % 60 | 0;
		let minutes = this.checkTime(_minutes);
		let seconds = this.checkTime(_seconds);
		this.defaultTimeString = minutes + "<span class='dotdot'>:</span>" + seconds;
		this.timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;
		this.timeDescriptionEl.innerHTML = "countdown is set to " + this.durationInSeconds + " seconds";
		this.updateProgress();
	}
	startTimer() {
		this._startTimer(this.durationInSeconds - 1);
	}
	stopTimer() {
		$global.console.debug("stopTimer()");
		if(this.timerID != null) {
			window.clearInterval(this.timerID);
			this.timeEl.innerHTML = this.defaultTimeString;
		}
	}
	_startTimer(duration) {
		if(this.timerID != null) {
			window.clearInterval(this.timerID);
		}
		this.counter = duration;
		let _gthis = this;
		this.timerID = window.setInterval(function() {
			_gthis.sfxTick.play();
			_gthis.updateProgress();
			let _minutes = _gthis.counter / 60 | 0;
			let _seconds = _gthis.counter % 60 | 0;
			let minutes = _gthis.checkTime(_minutes);
			let seconds = _gthis.checkTime(_seconds);
			_gthis.timeEl.innerHTML = minutes + "<span class='dotdot'>:</span>" + seconds;
			if(--_gthis.counter < 0) {
				_gthis.counter = _gthis.durationInSeconds;
				_gthis.sfxDone.play();
				window.clearInterval(_gthis.timerID);
				_gthis.initTimer();
			}
		},1000);
	}
	updateProgress() {
		let value = this.counter / this.durationInSeconds * 100;
		if(this.counter == 0) {
			value = 0;
		}
		this.progressBar.setAttribute("style","width: " + value + "%");
		this.progressBar.setAttribute("aria-valuenow","" + value);
		this.progressBar.innerText = "" + Math.round(value) + "%";
	}
	checkTime(i) {
		let str = "" + i;
		if(i < 10) {
			str = "0" + i;
		}
		return str;
	}
	static main() {
		let app = new Countdown();
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
Countdown.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
