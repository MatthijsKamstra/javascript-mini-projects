import haxe.Json;
import js.Lib;
import haxe.Constraints.Function;

using StringTools;

class EmojiFavicon {
	// elements
	var container:DivElement;
	var emojiPreview:DivElement;
	var textarea:TextAreaElement;
	// url
	var url = 'emoji.json';
	var url2 = 'emoji2.json';
	//
	var template = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>😍</text></svg>">';
	//
	var catArr = [];
	var charArr = [];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('EmojiFavicon - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		// loadData(url, buildList); // less succesfull
		loadData(url2, buildList2);
	}

	function setElements() {
		// container = cast document.getElementsByClassName("container")[0]; // get the first
		container = cast document.getElementById("emoji-list");
		textarea = cast document.getElementById("emoji-favicon-code");
		emojiPreview = cast document.getElementById("emoji-preview");

		// var test = document.createElemnt();

		var btn:LinkElement = cast document.getElementById('btn-refresh');
		btn.onclick = () -> {
			randomizeEmojiFavicon();
		}
		var btn:LinkElement = cast document.getElementById('btn-copy-code');
		btn.onclick = () -> {
			copyCode();
		}

		setEmojiFavicon('😍');
	}

	function buildList(str:String) {
		var json:Array<EmojiObj> = Json.parse(str);
		// trace(json);
		var html = '';
		html += '<div class="row">';
		for (i in 0...json.length) {
			var emojiObj = json[i];
			// trace(emojiObj);
			html += '<div class="col-1"><span class="emoji-size">${emojiObj.emoji}</span></div>';
		}
		html += '</div>';
		container.innerHTML = html;
	}

	function buildList2(str:String) {
		var json:Array<Emoji2Obj> = Json.parse(str);

		var html = '';
		html += '<div class="row">';
		for (i in 0...json.length) {
			var emojiObj = json[i];
			html += '<div class="col-1"><a href="#" data-emojichar="${emojiObj.char}" data-toggle="tooltip" data-placement="top" data-original-title="${emojiObj.name}" title="${emojiObj.name}" class="emoji-size emoji-link">${emojiObj.char}</a></div>';

			charArr.push(emojiObj.char);
			if (catArr.indexOf(emojiObj.category) == -1) {
				catArr.push(emojiObj.category);
			}
		}
		html += '</div>';

		container.innerHTML = html;

		var arr = document.getElementsByClassName('emoji-link');
		for (i in 0...arr.length) {
			var link:LinkElement = cast arr[i];
			link.onclick = (e) -> {
				var emoji:String = (untyped link.dataset.emojichar);
				setEmojiFavicon(emoji);
			}
		}

		console.log(catArr);

		randomizeEmojiFavicon();
	}

	function randomizeEmojiFavicon() {
		setEmojiFavicon(charArr[Math.floor(Math.random() * charArr.length)]);
	}

	function setEmojiFavicon(emoji) {
		textarea.value = template.replace('😍', emoji);
		emojiPreview.innerHTML = emoji;
	}

	function copyCode() {
		textarea.select();
		document.execCommand('copy');

		// var el:TextAreaElement = document.createTextAreaElement();
		// el.value = textarea.value;
		// document.body.appendChild(el);
		// el.select();
		// document.execCommand('copy');
		// document.body.removeChild(el);
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
		var app = new EmojiFavicon();
	}
}

typedef EmojiObj = {
	var emoji:String;
	var description:String;
	var category:String;
	var unicode_version:String;
	var ios_version:String;
	var aliases:Array<String>;
	var tags:Array<String>;
}

typedef Emoji2Obj = {
	var codes:String;
	var char:String;
	var name:String;
	var category:String;
	var subgroup:String;
}
