import haxe.Json;
import utils.Randomize;
import utils.LocalData;

using StringTools;

class QuickLinks {
	// store data under name
	var dbName = 'test-QuickLinks';

	// output data localstorage
	var output:DivElement;
	var input:InputElement;
	var textarea:TextAreaElement;

	// buttons
	var btnAdd:ButtonElement;
	var btnClear:ButtonElement;
	var btnRead:ButtonElement;
	var btnRandom:ButtonElement;

	var basisArr = [
		//
		'https://haxe.org/',
		'https://getbootstrap.com/docs/5.1/getting-started/introduction/',
		'https://github.com/MatthijsKamstra?tab=repositories',
		'https://www.disneyplus.com/en-gb/',
		'https://www.netflix.com/',
		'https://tv.kpn.com/',
		'https://forecastapp.com/1389043/schedule/team',
		'https://fonkamsterdam1.harvestapp.com/time',
		'https://calendar.google.com/calendar/',
		'https://translate.google.com/'
	];

	public function new() {
		LocalData.create(dbName);
		// console.log(LocalData.read(dbName, '_id'));
		// console.log(LocalData.read(dbName, 'version'));
		// console.log(LocalData.read(dbName, 'creationDate'));
		// console.log(LocalData.read(dbName, 'updateDate'));
		// LocalData.update(dbName, 'foobar', 'test-${Date.now().getTime()}');
		// console.log(LocalData.read(dbName, 'foobar'));
		// console.log(LocalData.read(dbName, 'updateDate'));

		// var arr:Array<String> = ['aaaa', 'bbbb', 'cccc'];
		// LocalData.update(dbName, 'arr', arr);
		// console.log(LocalData.read(dbName, 'arr'));

		if (LocalData.read(dbName, 'itemArray') == null)
			LocalData.update(dbName, 'itemArray', []);

		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('LocalStorage -Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		updateOutput();
	}

	function setElements() {
		// output
		output = cast document.getElementById("js-output");
		input = cast document.getElementById('js-input');
		textarea = cast document.getElementById('exampleFormControlTextarea1');

		// buttons
		btnRandom = cast document.getElementById('js-btn-random');
		btnRandom.onclick = onRandomHandler;
		btnAdd = cast document.getElementById('js-btn-add');
		btnAdd.onclick = onAddHandler;
		btnClear = cast document.getElementById('js-btn-clear');
		btnClear.onclick = onClearHandler;
		btnRead = cast document.getElementById('js-btn-read');
		btnRead.onclick = onReadHandler;
	}

	function updateOutput() {
		var arr:Array<Dynamic> = LocalData.read(dbName, 'itemArray');
		textarea.value = Json.stringify(arr);

		var out = '<div class="list-group">';
		for (i in 0...arr.length) {
			var obj:QuickLinkObj = arr[i];
			// trace(obj.name);
			var date = Date.fromString(obj.created);
			var t = DateTools.format(date, "%T");
			// trace(obj.created);
			out += '<a href="${obj.url}" class="list-group-item list-group-item-action">${obj.url}</a>';
		}
		out += '</div>';
		output.innerHTML = out;
	}

	// ____________________________________ handlers ____________________________________

	function onAddHandler(e) {
		var arr:Array<Dynamic> = LocalData.read(dbName, 'itemArray');
		var superHeroName = Randomize.superHeroName();
		var obj = {
			url: input.value.trim(),
			name: superHeroName,
			created: Date.now().toString(),
		}
		arr.push(obj);
		LocalData.update(dbName, 'itemArray', arr);
		updateOutput();
	}

	function onRandomHandler(e) {
		input.value = basisArr[Std.random(basisArr.length)];
	}

	function onClearHandler(e) {
		LocalData.clear(dbName);
	}

	function onReadHandler(e) {
		var json = LocalData.load(dbName);
		trace(json);
	}

	static public function main() {
		var app = new QuickLinks();
	}
}

typedef QuickLinkObj = {
	@:optional var _id:String;
	var created:String; // :Date;
	var url:String;
	var name:String;
}
