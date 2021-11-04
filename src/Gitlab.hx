import haxe.Constraints.Function;
import js.Lib;

using StringTools;

// use expose so the callbacks can find these functions

@:expose
class Gitlab {
	public static var repoArr:Array<GithubRepoObj> = [];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Gitlab - Dom ready');
			getData();
			getRepos();
		});
	}

	function getData() {
		var url = 'https://api.github.com/users/MatthijsKamstra';
		utils.LoadJsonP.load(url, 'Gitlab.onProfileCompleteHandler');
	}

	function getRepos() {
		var url = 'https://api.github.com/users/MatthijsKamstra/repos?page=1&per_page=1000'; // max 100
		utils.LoadJsonP.load(url, 'Gitlab.onRepoCompletHandler');
	}

	static public function onRepoCompletHandler(json:Dynamic) {
		console.log('onRepoCompletHandler');
		console.log(json);
		console.log(json.meta.Link[0][0]);
		console.log(json.meta.Link[0][1].rel);

		for (i in 0...json.data.length) {
			var obj:GithubRepoObj = json.data[i];
			obj._created_at = dateConverter(obj.created_at);
			obj._updated_at = dateConverter(obj.updated_at);
			obj._created_at_time = dateConverter(obj.created_at).getTime();
			obj._updated_at_time = dateConverter(obj.created_at).getTime();
			// obj._pushed_at = dateConverter(obj.pushed_at);
			repoArr.push(obj);
		}

		if (json.meta.Link[0][1].rel == 'next') {
			utils.LoadJsonP.load(json.meta.Link[0][0]);
		}

		console.log(repoArr.length);
		generateCompleteRepoList();
	}

	public static function dateConverter(str:String) {
		return Date.fromString(str.replace('T', ' ').replace('Z', ''));
	}

	static public function generateCompleteRepoList() {
		var div:DivElement = cast document.getElementById('js-gitlab-projects');
		div.innerHTML = ''; // reset innner html
		var html = div.innerHTML;
		html += '<ul>';

		repoArr.sort(function(a, b) return if (a._updated_at_time < b._updated_at_time) 1 else -1);

		for (i in 0...repoArr.length) {
			var obj:GithubRepoObj = repoArr[i];
			console.log(obj._created_at);
			console.log(obj._updated_at);

			// vaag
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

	static public function onProfileCompleteHandler(json:Dynamic) {
		var div:DivElement = cast document.getElementById('js-gitlab-profile');
		// console.log('onProfileCompleteHandler');
		// console.log(json);

		var data:GithubProfileObj = json.data;

		var html = '
<div class="col-auto">
<img src="${data.avatar_url}" class="rounded"><br>
</div>
<div class="col-6">
Name: ${data.name}<br>
Bio: ${data.bio}<br>
Public repos: ${data.public_repos}<br>
Blog: <a href="${data.blog}" target="_blank">Check out blog</a><br>
Repos: <a href="${data.html_url}?tab=repositories" target="_blank">Check out repos</a><br>
</div>
';

		div.innerHTML = html;
	}

	static public function main() {
		var app = new Gitlab();
	}
}

typedef GithubRepoObj = {
	var created_at:String; // 2015-03-24T14:18:08Z
	var updated_at:String; // 2015-03-24T14:18:50Z
	var pushed_at:String; // 2015-03-24T14:20:44Z
	@:optional var _created_at:Date;
	@:optional var _updated_at:Date;
	@:optional var _created_at_time:Float;
	@:optional var _updated_at_time:Float;
	// @:optional var _pushed_at:Date;
	@:optional var homepage:String; // null or
	var html_url:String; // "https://github.com/MatthijsKamstra/abc-mvc",
	var name:String;
	var description:String; // "Automatically exported from code.google.com/p/abc-mvc",
	var fork:Bool;
	var language:String; // ActionScript",
}

typedef GithubProfileObj = {
	var login:String; // "MatthijsKamstra",
	var id:String; //
	var node_id:String; //
	var avatar_url:String; // "https://avatars.githubusercontent.com/u/907219?v=4",
	var gravatar_id:String; // "",
	var url:String; // "https://api.github.com/users/MatthijsKamstra",
	var html_url:String; // "https://github.com/MatthijsKamstra",
	var followers_url:String; // "https://api.github.com/users/MatthijsKamstra/followers",
	var following_url:String; // "https://api.github.com/users/MatthijsKamstra/following{/other_user}",
	var gists_url:String; // "https://api.github.com/users/MatthijsKamstra/gists{/gist_id}",
	var starred_url:String; // "https://api.github.com/users/MatthijsKamstra/starred{/owner}{/repo}",
	var subscriptions_url:String; // "https://api.github.com/users/MatthijsKamstra/subscriptions",
	var organizations_url:String; // "https://api.github.com/users/MatthijsKamstra/orgs",
	var repos_url:String; // "https://api.github.com/users/MatthijsKamstra/repos",
	var events_url:String; // "https://api.github.com/users/MatthijsKamstra/events{/privacy}",
	var received_events_url:String; // "https://api.github.com/users/MatthijsKamstra/received_events",
	var type:String; // "User",
	var site_admin:String; // false,
	var name:String; // "Matthijs Kamstra",
	var company:String; // null,
	var blog:String; // "https://matthijskamstra.github.io",
	var location:String; // "Amsterdam",
	var email:String; // null,
	var hireable:String; // true,
	var bio:String; // "I create stuff! matthijskamstra.nl",
	var twitter_username:String; // "matthijskamstra",
	var public_repos:String; // 169,
	var public_gists:String; // 5,
	var followers:String; // 42,
	var following:String; // 57,
	var created_at:String; // "2011-07-11T07:58:00Z",
	var updated_at:String; // "2021-06-23T14:20:22Z"
}
