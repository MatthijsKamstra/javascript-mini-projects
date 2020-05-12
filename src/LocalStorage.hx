import utils.LocalData;

class LocalStorage {
	// store data under name
	var dbName = 'test-localstorage';

	// output data localstorage
	var output:DivElement;

	// buttons
	var btnDownload:ButtonElement;
	var btnBase64:ButtonElement;
	var btnBase642:ButtonElement;
	var btnRead:ButtonElement;

	var superHeroFirst:Array<String> = [
		'captain', 'turbo', 'galactic', 'the', 'aqua', 'fire', 'iron', 'super', 'green', 'phantom', 'dark', 'ghost', 'professor', 'atomic', 'rock', 'omega',
		'rocket', 'shadow', 'agent', 'silver', 'wild', 'wolf', 'ultra', 'wonder', 'doctor', 'star'
	];
	var superHeroLast:Array<String> = [
		'x', 'shield', 'machine', 'justice', 'beast', 'wing', 'arrow', 'skull', 'blade', 'bolt', 'cobra', 'blaze', 'soldier', 'strike', 'falcon', 'fang',
		'king', 'surfer', 'bot', 'guard', 'thing', 'claw', 'brain', 'master', 'power', 'storm'
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
		output = cast document.getElementById("output");

		btnDownload = cast document.getElementById('btn-add-item');
		btnDownload.onclick = onAddHandler;
		btnBase64 = cast document.getElementById('btn-clear');
		btnBase64.onclick = onClearHandler;
		btnRead = cast document.getElementById('btn-read');
		btnRead.onclick = onReadHandler;
		// btnBase642 = cast document.getElementById('btn-base64-2');
		// btnBase642.onclick = exportBase642;
	}

	function updateOutput() {
		var arr:Array<Dynamic> = LocalData.read(dbName, 'itemArray');

		var out = '<ul>';
		for (i in 0...arr.length) {
			var obj = arr[i];
			// trace(obj.name);
			var date = Date.fromString(obj.created);
			var t = DateTools.format(date, "%T");
			// trace(obj.created);
			out += '<li>time: ${t} - <b>${obj.name}</b></li>';
		}
		out += '</ul>';
		output.innerHTML = out;
	}

	// ____________________________________ handlers ____________________________________
	function onAddHandler(e) {
		var arr:Array<Dynamic> = LocalData.read(dbName, 'itemArray');

		trace(arr);

		var superHeroName = superHeroFirst[Math.floor(Math.random() * superHeroFirst.length)]
			+ ' '
			+ superHeroLast[Math.floor(Math.random() * superHeroLast.length)];

		var obj = {
			name: superHeroName,
			created: Date.now().toString(),
		}
		arr.push(obj);
		trace(arr);
		LocalData.update(dbName, 'itemArray', arr);
		updateOutput();
	}

	function onClearHandler(e) {
		LocalData.clear(dbName);
	}

	function onReadHandler(e) {
		var json = LocalData.load(dbName);
		trace(json);
	}

	static public function main() {
		var app = new LocalStorage();
	}
}
