import js.Lib;
import haxe.Constraints.Function;

using StringTools;

class ConvertMarkdown {
	var url = 'example.md';

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('ConvertMarkdown - Dom ready');
			loadData(url, markdown2html);
		});
	}

	function markdown2html(md:String) {
		// trace(md);
		var div:DivElement = cast document.getElementById('input');
		div.innerText = md;
		var html = convert(md);
		var div:DivElement = cast document.getElementById('output');
		div.innerHTML = html;
	}

	function convert(md:String) {
		var convertHTML = '';

		var lines = md.split('\n');
		for (i in 0...lines.length) {
			var line = lines[i];
			if (line.indexOf('---') != -1) {
				// hr
				convertHTML += '<hr>\n';
				continue;
			}
			if (line.indexOf('**') != -1) {
				// bold
				// [mck] only works with bold in line... not at the start of at the end, or multiple bolds in one line
				var arr = line.split('**');
				convertHTML += '${arr[0]}<b>${arr[1]}</b>${arr[2]}<br>';
				continue;
			}
			if (line.indexOf('_') != -1) {
				// [mck] only works with italic in line... not at the start of at the end, or multiple italic in one line
				var arr = line.split('_');
				convertHTML += '${arr[0]}<i>${arr[1]}</i>${arr[2]}<br>';
				continue;
			}
			if (line.lastIndexOf('#') != -1) {
				// heading
				// trace('heading');
				var l = line.replace('#', '').trim();
				convertHTML += '<h${line.lastIndexOf('#') + 1}>${l}</h${line.lastIndexOf('#') + 1}>\n';
				continue;
			}
			// [mck] todo: paragraph vs break
			// [mck] todo: 'edge' case bold and italic
			// [mck] todo: other elements

			convertHTML += line + '<br>';
		}

		return convertHTML;
	}

	/**
	 * loading data, check if file exists before generating navigation
	 * @param url 		load file from here
	 * @param callback 	if file exists and is loaded, use this callbakc
	 */
	function loadData(url:String, callback:Function) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (Lib.nativeThis.readyState == 4 && Lib.nativeThis.status == 200) {
				// console.log(Lib.nativeThis.responseText);
				// finishSetup();
			}
		};
		req.onload = function() {
			var body = req.response;

			if (Lib.nativeThis.status == 200)
				callback(body);
		};
		req.onerror = function(error) {
			console.error('[JS] error: $error');
		};
		req.open('GET', url);
		req.send();
	}

	static public function main() {
		var app = new ConvertMarkdown();
	}
}
