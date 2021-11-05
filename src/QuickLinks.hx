import js.Lib;
import haxe.Json;
import utils.Randomize;
import utils.LocalData;

using StringTools;

class QuickLinks {
	// store data under name
	var dbName = 'test-QuickLinks';
	var localItemArr:Array<QuickLinkObj> = [];

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
		'https://ficons.fiction.com/reference.html',
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

		localItemArr = LocalData.read(dbName, 'itemArray');

		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('LocalStorage -Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		updateOutput();

		getLinks();
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

	function getLinks() {
		var ahrefList = document.querySelectorAll('a.quicklink-btn');
		for (i in 0...ahrefList.length) {
			var ahref:LinkElement = cast ahrefList[i];
			// ahref.onmouseover = (e:Event) -> {
			// 	console.log(Lib.nativeThis);
			// 	// console.log(untyped e.currentTarget.dataset.uniq);
			// 	// console.log(untyped e.currentTarget.dataset.name);
			// 	// console.log(untyped e.currentTarget.dataset.counter);
			// }
			ahref.onclick = (e:Event) -> {
				// console.log(Lib.nativeThis);
				// console.log(untyped e.currentTarget.dataset.uniq);
				// console.log(untyped e.currentTarget.dataset.name);
				// console.log(untyped e.currentTarget.dataset.counter);
				for (i in 0...localItemArr.length) {
					var obj:QuickLinkObj = localItemArr[i];
					if (obj._id == untyped e.currentTarget.dataset.uniq) {
						obj.counter += 1;
					}
				}
				LocalData.update(dbName, 'itemArray', localItemArr);
				updateOutput();
			}
		}

		var ahrefList = document.querySelectorAll('a.quicklink-edit-btn');
		for (i in 0...ahrefList.length) {
			var ahref:LinkElement = cast ahrefList[i];
			ahref.onmouseover = (e:Event) -> {
				console.log(Lib.nativeThis);
				console.log('FIXME: edit');
				console.log(untyped e.currentTarget.dataset.uniq);
			}
			ahref.onclick = (e:Event) -> {
				e.preventDefault();
				console.log('FIXME: edit');
				console.log(untyped e.currentTarget.dataset.uniq);
			}
		}
	}

	function updateOutput() {
		localItemArr = LocalData.read(dbName, 'itemArray');

		// sort on counter
		localItemArr.sort(function(a, b) return if (a.counter < b.counter) 1 else -1);

		// for debug purpers
		textarea.value = Json.stringify(localItemArr);

		// var out = '<div class="list-group">';
		var out = '<ul class="list-group">';
		for (i in 0...localItemArr.length) {
			var obj:QuickLinkObj = localItemArr[i];
			// trace(obj.name);
			var date = Date.fromString(obj.created);
			var t = DateTools.format(date, "%T");
			// trace(obj.created);
			out += '<li class="list-group-item d-flex justify-content-between align-items-start">';
			out += '<a href="${obj.url}" class="quicklink-btn" title="${obj.name}" target="_blank" ';
			out += 'data-uniq="${obj._id}" data-name="${obj.name}" data-counter="${obj.counter}">';
			out += '${obj.url}';
			out += '</a>';
			out += '<a href="#" data-uniq="${obj._id}" class="quicklink-edit-btn btn btn-sm btn-outline-danger" ><i class="fa fa-edit"></i></a>';
			out += '<span class="badge bg-primary rounded-pill">${obj.counter}</span>';
			out += '</li>';
		}
		out += '</ul>';
		// out += '</div>';
		output.innerHTML = out;

		getLinks();
	}

	// ____________________________________ handlers ____________________________________

	function onAddHandler(e) {
		localItemArr = LocalData.read(dbName, 'itemArray');

		// add new counter at the top, by adding extra count
		var counter = 0;
		for (i in 0...localItemArr.length) {
			var ql:QuickLinkObj = localItemArr[i];
			if (ql.counter >= counter)
				counter = ql.counter + 1;
		}

		// create new object to add to list
		var superHeroName = Randomize.superHeroName();
		var obj = {
			_id: '${Date.now().getTime()}-${Std.random(1000)}-${Std.random(1000)}',
			url: input.value.trim(),
			name: superHeroName,
			created: Date.now().toString(),
			counter: counter,
		}
		localItemArr.push(obj);

		// sort on counter
		localItemArr.sort(function(a, b) return if (a.counter < b.counter) 1 else -1);

		//
		LocalData.update(dbName, 'itemArray', localItemArr);
		updateOutput();
	}

	function onRandomHandler(e) {
		input.value = basisArr[Std.random(basisArr.length)];
		onAddHandler(e);
	}

	function onClearHandler(e) {
		LocalData.clear(dbName);
		window.location.reload(true);
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
	var counter:Int;
}
