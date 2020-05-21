import haxe.Constraints.Function;
import js.Lib;

@:expose
// https://gomakethings.com/working-with-jsonp/

class JsonP {
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('JsonP - Dom ready');
			getData();
		});
	}

	function getData() {
		var url = 'https://api.github.com/users/MatthijsKamstra';
		loadDataJsonP(url, 'JsonP.onCompleteHandler');
	}

	static public function onCompleteHandler(json:Dynamic) {
		var div:DivElement = cast document.getElementById('container-jsonp-data');
		console.log(json.data);

		var html = '
<div class="col-auto">
<img src="${json.data.avatar_url}" class="rounded"><br>
</div>
<div class="col-6">
Name: ${json.data.name}<br>
Bio: ${json.data.bio}<br>
Public repos: ${json.data.public_repos}<br>
Blog: <a href="${json.data.blog}" target="_blank">Check out blog</a><br>
Repos: <a href="${json.data.html_url}?tab=repositories" target="_blank">Check out repos</a><br>
</div>
';

		div.innerHTML = html;
	}

	/**
	 * using jsonp to not use
	 * @param url 		load file from here
	 */
	function loadDataJsonP(url:String, callback:String) {
		// Create script with url and callback (if specified)
		var script = document.createScriptElement();
		script.src = '$url?callback=$callback';
		document.head.appendChild(script);

		// trace(script.src);

		// After the script is loaded (and executed), remove it
		script.onload = function(e) {
			// console.log(e);
			Lib.nativeThis.remove();
		};
	}

	static public function main() {
		var app = new JsonP();
	}
}

typedef QuoteObj = {
	var quoteAuthor:String;
	var quoteLink:String;
	var quoteText:String;
	var senderLink:String;
	var senderName:String;
}
