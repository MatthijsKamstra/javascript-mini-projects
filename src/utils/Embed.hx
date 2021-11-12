package utils;

import haxe.Constraints.Function;

class Embed {
	public function new() {}

	/**
	 * // setup up highlight.js
	 *
	 * @example
	 * 		setLink('//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/default.min.css');
	 * 		setLink('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/monokai-sublime.min.css');
	 * 	setScript('//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/highlight.min.js');
	 *
	 * @param url 			load file from here
	 * @param callback		when files is loaded use this function as callback
	 */
	public static function setLink(href:String) {
		var one = document.querySelector('[href="${href}"]');
		// trace(one);
		if (one == null) {
			// trace('XXXXXXXX');
			var link = document.createLinkElement();
			link.rel = 'stylesheet';
			link.href = '${href}';
			document.body.appendChild(link);
		}
	}

	/**
	 *
	 * @example
	 * 		setScript('https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js');
	 *
	 * @param url 			load file from here
	 * @param callback		when files is loaded use this function as callback
	 */
	public static function setScript(src:String, ?callback:Function) {
		var one = document.querySelector('[src="${src}"]');
		// trace(one);
		if (one == null) {
			var script = document.createScriptElement();
			// After the script is loaded (and executed), remove it
			script.onload = function(e) {
				console.log(e);
				//	Lib.nativeThis.remove();
				Reflect.callMethod(callback, callback, []);
			};
			script.src = src;
			document.body.appendChild(script);
		} else {
			if (callback != null) {
				Reflect.callMethod(callback, callback, []);
			}
		}
	}
}
