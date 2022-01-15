package;

import js.html.AudioElement;
import js.html.Element;
import js.html.MouseEvent;

/**
 * @author Matthijs Kamstra  aka [mck]
 * MIT
 * http://www.matthijskamstra.nl
 */
class HtmlAudioWrapper {
	private var doc = js.Browser.document;
	private var win = js.Browser.window;

	private var audio:AudioElement;

	private var instanceCount:Int = 0;

	private var css:String = '';

	private var markup:String = '<div class="play-pause"></div>
		<div class="scrubber">
			<div class="playhead"></div>
			<div class="progress"></div>
			<div class="loaded"></div>
		</div>
		<div class="time">
			<em class="played">00:00</em>/<strong class="duration">00:00</strong>
		</div>';

	public function new():Void {
		css = haxe.Resource.getString("style");

		doc.addEventListener("DOMContentLoaded", function(event) {
			injectCSS();
			wrapAudioTag();
			// init('hxaudiojs000');
		});
	}

	private function injectCSS():Void {
		var head = doc.getElementsByTagName('head')[0];
		var firstchild = head.firstChild;
		var style = doc.createElement('style');

		if (head == null)
			return;

		style.setAttribute('type', 'text/css');
		style.setAttribute('title', 'audiojs');
		style.appendChild(doc.createTextNode(css));

		head.insertBefore(style, firstchild);
	}

	private function wrapAudioTag():Void {
		var audioElements = doc.getElementsByTagName('audio');
		for (i in 0...audioElements.length) {
			createPlayer(cast(audioElements[i], AudioElement));
		}
	}

	// ____________________________________ create playrr html ____________________________________

	private function createPlayer(audioElement:AudioElement):Void {
		var id = 'hxaudiojs' + instanceCount;

		// remove audio attribute 'controls', so audio tag is hidden
		if (audioElement.hasAttribute('controls') != null)
			audioElement.removeAttribute('controls');

		/**
		 * check if there is a wrapper with classname hxaudiojs,
		 * but very handy for (me) styling
		 * it will only check if the wrapper is there, after that it will assume everything is there!!!
		 */
		var iswrapper = false;

		if (audioElement.parentElement.className == 'hxaudiojs') {
			id = audioElement.parentElement.id;
			iswrapper = true;
		}

		if (!iswrapper) {
			var wrapper = doc.createElement('div');
			wrapper.setAttribute('class', 'hxaudiojs');
			wrapper.setAttribute('className', 'hxaudiojs');
			wrapper.setAttribute('id', id);

			wrapper.innerHTML = audioElement.outerHTML + markup;

			audioElement.outerHTML = wrapper.outerHTML;

			instanceCount++;
		}

		init(id);
	}

	// ____________________________________ init (static) html  ____________________________________

	public function init(id:String):Void {
		var wrapper = doc.getElementById(id);

		if (wrapper.getElementsByTagName('audio')[0] == null) {
			trace("no <audio> tag in element $id");
			return;
		}

		var audio = cast(wrapper.getElementsByTagName('audio')[0], AudioElement);
		var btn = wrapper.getElementsByClassName('play-pause')[0];
		var playhead = wrapper.getElementsByClassName('playhead')[0];
		var progress = wrapper.getElementsByClassName('progress')[0];
		var loaded = wrapper.getElementsByClassName('loaded')[0];
		var duration = wrapper.getElementsByClassName('duration')[0];
		var played = wrapper.getElementsByClassName('played')[0];
		var scrubber = wrapper.getElementsByClassName('scrubber')[0];

		btn.onclick = function(e:MouseEvent) {
			if (audio.paused) {
				audio.play();
			} else {
				audio.pause();
			}
		}

		scrubber.onclick = function(e:MouseEvent) {
			// preloading of audio is false, should do something clever
			if (Math.isNaN(audio.duration)) {
				trace("start loading data?");
				return;
			}
			var relativeLeft = e.clientX - getLeftOffset(scrubber);
			var percent = relativeLeft / scrubber.offsetWidth;
			audio.currentTime = audio.duration * percent;
		}

		audio.ontimeupdate = function(e) {
			var percent = (audio.currentTime / audio.duration);

			var p = audio.duration * percent;
			var m = Math.floor(p / 60);
			var s = Math.floor(p % 60);
			played.innerHTML = ((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);

			progress.style.width = (100 * percent) + '%';
			playhead.style.marginLeft = (100 * percent) + "%";

			if (audio.paused) {
				btn.className = "play-pause play";
			} else {
				btn.className = "play-pause pause";
			}

			onTimeUpdate(e);
		}

		audio.onended = function(e) {
			btn.className = "play-pause play";

			onEnded(e);
		}

		audio.onloadstart = function(e) {
			onLoadStart(e);
		}

		/**
		 * doesn't work yet
		 */
		audio.onprogress = function(e) {
			if (audio.buffered.length == 0)
				return;
			var bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
			var duration = audio.duration;

			if (duration > 0)
				loaded.style.width = ((bufferedEnd / duration) * 100) + "%";

			onProgress(e);
		}

		/**
		 * this doesn't work for some reason
		 */
		audio.onerror = function(e) {
			trace("## debug");
			btn.className = "play-pause error";

			onError(e);
		}

		/**
		 * the duration is only available when audio is loaded
		 */
		audio.onloadeddata = function(e) {
			var m = Math.floor(audio.duration / 60);
			var s = Math.floor(audio.duration % 60);
			duration.innerHTML = ((m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s);

			onLoadedData(e);
		}
	}

	// ____________________________________ util ____________________________________

	private function getLeftOffset(el:Element):Int {
		var _leftOffset = 0;
		do {
			_leftOffset += el.offsetLeft;
			el = el.offsetParent;
		} while (el.offsetParent != null);
		return _leftOffset;
	}

	// ____________________________________ external audio function (override)  ____________________________________

	public function onTimeUpdate(e):Void {}

	public function onEnded(e):Void {}

	public function onLoadStart(e):Void {}

	public function onProgress(e):Void {}

	public function onError(e):Void {}

	public function onLoadedData(e):Void {}

	static public function main() {
		var app = new HtmlAudioWrapper();
	}
}
