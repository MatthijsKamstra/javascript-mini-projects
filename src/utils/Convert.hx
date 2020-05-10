package utils;

class Convert {
	public function new() {
		// your code
	}

	/**
	 * @example
	 * 		Convert.htmlToElement('<b>test</b>');
	 *
	 * parse an string as a html element
	 * @param html
	 */
	public static function htmlToElement(html:String):Node {
		var template = document.createDivElement();
		template.innerHTML = untyped html.trim(); // Never return a text node of whitespace as the result
		return template.firstChild;
	}

	public static function svgToElement(html:String):Node {
		var template = document.createElement('svg');

		trace(template);

		template.innerHTML = untyped html.trim(); // Never return a text node of whitespace as the result

		trace(template);

		trace(template.firstChild);
		trace(template.firstElementChild);

		return template.firstChild;
	}
}
