package utils;

import js.Lib;

class LoadJsonP {
	public function new() {}

	/**
	 * using jsonp to when we get a `cors` error when loading with `xml`
	 *
	 *  @example
	 *  	utils.LoadJsonP.load('${searchUrl}?lattlong=${latt},${long}', 'onTest2Handler');
	 *
	 * @param url 			load file from here
	 * @param callback		when files is loaded use this function as callback
	 */
	public static function load(url:String, ?callback:String) {
		// Create script with url and callback (if specified)
		var script = document.createScriptElement();
		if (callback != null) {
			var foo = (url.indexOf('?') != -1) ? '&' : '?';
			script.src = '${url}${foo}callback=$callback';
		} else {
			script.src = '${url}';
		}
		document.head.appendChild(script);

		// trace(script.src);

		// After the script is loaded (and executed), remove it
		script.onload = function(e) {
			// console.log(e);
			Lib.nativeThis.remove();
		};
	}
}
