import haxe.Constraints.Function;
import js.Lib;

using StringTools;

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

		if (json.meta.Link[0][1].rel == 'next') {
			loadDataJsonP(json.meta.Link[0][0]);
		}

		var div:DivElement = cast document.getElementById('container-jsonp-data');
		var html = div.innerHTML;
		html += '<ul>';
		for (i in 0...json.data.length) {
			var obj:GithubRepoObj = json.data[i];
			var createdDate = Date.fromString(obj.created_at.replace('T', ' ').replace('Z', '')); // "2015-03-24T14:18:50Z",
			trace(createdDate);
			if (obj.created_at == obj.updated_at)
				continue;
			if (obj.fork != true) {
				html += '<li><a href="${obj.html_url}">${obj.name}</a>';
				if (obj.homepage != null) {
					html += ' - <a href="${obj.homepage}">homepage</a>';
				}
				html += '</li>';
			}
		}
		html += '</ul>';
		div.innerHTML = html;
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

typedef GithubRepoObj = {
	var created_at:String; // 2015-03-24T14:18:08Z
	var updated_at:String; // 2015-03-24T14:18:50Z
	var pushed_at:String; // 2015-03-24T14:20:44Z
	@:optional var homepage:String; // null or
	var html_url:String; // "https://github.com/MatthijsKamstra/abc-mvc",
	var name:String;
	var description:String; // "Automatically exported from code.google.com/p/abc-mvc",
	var fork:Bool;
	var language:String; // ActionScript",
}
