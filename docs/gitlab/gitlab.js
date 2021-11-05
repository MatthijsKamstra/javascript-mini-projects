(function ($hx_exports, $global) { "use strict";
class Gitlab {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Gitlab - Dom ready");
			_gthis.getData();
			_gthis.getRepos();
		});
	}
	getData() {
		let url = "https://api.github.com/users/MatthijsKamstra";
		utils_LoadJsonP.load(url,"Gitlab.onProfileCompleteHandler");
	}
	getRepos() {
		let url = "https://api.github.com/users/MatthijsKamstra/repos?page=1&per_page=1000";
		utils_LoadJsonP.load(url,"Gitlab.onRepoCompletHandler");
	}
	static onRepoCompletHandler(json) {
		$global.console.log("onRepoCompletHandler");
		$global.console.log(json);
		$global.console.log(json.meta.Link[0][0]);
		let json1 = json.meta.Link[0];
		$global.console.log(json1[1].rel);
		let _g = 0;
		let _g1 = json.data.length;
		while(_g < _g1) {
			let i = _g++;
			let obj = json.data[i];
			if(obj.pushed_at == null) {
				continue;
			}
			obj._created_at = Gitlab.dateConverter(obj.created_at);
			obj._updated_at = Gitlab.dateConverter(obj.updated_at);
			obj._pushed_at = Gitlab.dateConverter(obj.pushed_at);
			obj._created_at_time = Gitlab.dateConverter(obj.created_at).getTime();
			obj._updated_at_time = Gitlab.dateConverter(obj.updated_at).getTime();
			obj._pushed_at_time = Gitlab.dateConverter(obj.pushed_at).getTime();
			Gitlab.repoArr.push(obj);
		}
		if(json.meta.Link[0][1].rel == "next") {
			utils_LoadJsonP.load(json.meta.Link[0][0]);
		}
		Gitlab.generateCompleteRepoList();
	}
	static generateCompleteRepoList() {
		let div = window.document.getElementById("js-gitlab-projects");
		div.innerHTML = "";
		let html = div.innerHTML;
		html += "<div class=\"list-group\">";
		Gitlab.repoArr.sort(function(a,b) {
			if(a._pushed_at_time < b._pushed_at_time) {
				return 1;
			} else {
				return -1;
			}
		});
		let _g = 0;
		let _g1 = Gitlab.repoArr.length;
		while(_g < _g1) {
			let i = _g++;
			let obj = Gitlab.repoArr[i];
			if(obj.fork != true) {
				let home = "";
				if(obj.homepage != null) {
					home += "<i class=\"fa fa-home\"></i> ";
				}
				html += "<a href=\"" + obj.html_url + "\" target=\"_blank\" class=\"list-group-item list-group-item-action\">" + home + obj.name + "</a>";
			}
		}
		html += "</div>";
		div.innerHTML = html;
		$global.console.info(Gitlab.repoArr);
	}
	static onProfileCompleteHandler(json) {
		let div = window.document.getElementById("js-gitlab-profile");
		let data = json.data;
		let html = "\n<div class=\"col-auto\">\n<img src=\"" + data.avatar_url + "\" class=\"rounded\"><br>\n</div>\n<div class=\"col-6\">\nName: " + data.name + "<br>\nBio: " + data.bio + "<br>\nPublic repos: " + data.public_repos + "<br>\nBlog: <a href=\"" + data.blog + "\" target=\"_blank\">Check out blog</a><br>\nRepos: <a href=\"" + data.html_url + "?tab=repositories\" target=\"_blank\">Check out repos</a><br>\n</div>\n";
		div.innerHTML = html;
	}
	static dateConverter(str) {
		return HxOverrides.strDate(StringTools.replace(StringTools.replace(str,"T"," "),"Z",""));
	}
	static main() {
		let app = new Gitlab();
	}
}
$hx_exports["Gitlab"] = Gitlab;
class HxOverrides {
	static strDate(s) {
		switch(s.length) {
		case 8:
			let k = s.split(":");
			let d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		case 10:
			let k1 = s.split("-");
			return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
		case 19:
			let k2 = s.split(" ");
			let y = k2[0].split("-");
			let t = k2[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw haxe_Exception.thrown("Invalid date format : " + s);
		}
	}
	static now() {
		return Date.now();
	}
}
class StringTools {
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
}
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	get_native() {
		return this.__nativeException;
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
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
class utils_LoadJsonP {
	static load(url,callback) {
		let script = window.document.createElement("script");
		if(callback != null) {
			let foo = url.indexOf("?") != -1 ? "&" : "?";
			script.src = "" + url + foo + "callback=" + callback;
		} else {
			script.src = "" + url;
		}
		window.document.head.appendChild(script);
		script.onload = function(e) {
			this.remove();
		};
	}
}
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
}
Gitlab.repoArr = [];
Gitlab.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
