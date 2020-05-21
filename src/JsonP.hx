import haxe.Constraints.Function;
import js.Lib;

// https://gomakethings.com/working-with-jsonp/

@:expose
class JsonP {
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('JsonP - Dom ready');
			getData();
			getRepos();
		});
	}

	function getData() {
		var url = 'https://api.github.com/users/MatthijsKamstra';
		loadDataJsonP(url, 'JsonP.onCompleteHandler');
	}

	function getRepos() {
		var url = 'https://api.github.com/users/MatthijsKamstra/repos?page=1&per_page=100'; // max 100
		loadDataJsonP(url, 'JsonP.onTestCompleteHandler');
	}

	static public function onTestCompleteHandler(json:Dynamic) {
		console.log('onTestCompleteHandler');
		console.log(json);
		console.log(json.meta.Link[0][0]);
		console.log(json.meta.Link[0][1].rel);

		// if (json.meta.Link[0][1].rel == 'next') {
		// 	loadDataJsonP(json.meta.Link[0][0]);
		// }
	}

	static public function onCompleteHandler(json:Dynamic) {
		var div:DivElement = cast document.getElementById('container-jsonp-data');
		console.log('onCompleteHandler');
		console.log(json);

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
	public static function loadDataJsonP(url:String, ?callback:String) {
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
