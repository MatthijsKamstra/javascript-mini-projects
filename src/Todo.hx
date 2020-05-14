import haxe.Json;
import utils.LocalData;

class Todo {
	// store data under name
	var dbName = 'db-todo';
	var todoInput:InputElement;
	var list:DivElement;

	public function new() {
		LocalData.create(dbName);
		if (LocalData.read(dbName, 'itemArray') == null)
			LocalData.update(dbName, 'itemArray', []);

		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Todo - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		setupTodoList();
	}

	function setupTodoList() {
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		if (arr.length == 0) {
			randomizeTodo();
		} else {
			for (i in 0...arr.length) {
				var todoObj = arr[i];
				var name = todoObj.content;
				var link = createTodoElement(name);
				list.appendChild(link);
			}
		}
	}

	function setElements() {
		todoInput = cast document.getElementById('todo-input');
		list = cast document.getElementById('todo-list');
		list.innerHTML = '';
		var todoBtn:ButtonElement = cast document.getElementById('btn-todo-add');
		todoBtn.onclick = (e) -> addTodo();
		var btn:ButtonElement = cast document.getElementById('btn-random');
		btn.onclick = (e) -> onRandomHandler(e);
		var btn:ButtonElement = cast document.getElementById('btn-clear');
		btn.onclick = (e) -> onClearHandler(e);
		var btn:ButtonElement = cast document.getElementById('btn-save');
		btn.onclick = (e) -> onSaveHandler(e);
	}

	function randomizeTodo() {
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		for (i in 0...3) {
			var name = '<b>[Random Todo]</b> ' + utils.Randomize.superHeroName();
			var link = createTodoElement(name);
			list.appendChild(link);

			var todoObj:TodoObj = {
				_id: 'tododata-${Date.now().getTime()}',
				created: Date.now().toString(),
				updated: Date.now().toString(),
				content: name,
				state: '', // normal // closed // checked
			}

			arr.push(todoObj);
		}

		LocalData.update(dbName, 'itemArray', arr);
	}

	function createTodoElement(str:String) {
		// create elements

		// a href
		var link = document.createAnchorElement();
		link.setAttribute('class', 'list-group-item list-group-item-action');
		link.href = '#';
		link.innerHTML = str;
		link.onclick = (e) -> {
			onCheckedHandler(e);
		}

		// close button
		var span = document.createSpanElement();
		var txt = document.createTextNode("\u2573");
		span.className = "close";
		span.appendChild(txt);

		span.onclick = (e) -> {
			onCloseHandler(e);
		}

		link.appendChild(span);

		return link;
	}

	function addTodo() {
		if (todoInput.value == '') {
			window.alert("You must write something!");
		} else {
			var str = todoInput.value;

			// store in "database"
			var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
			var todoObj:TodoObj = {
				_id: 'tododata-${Date.now().getTime()}',
				created: Date.now().toString(),
				updated: Date.now().toString(),
				content: str,
				state: '', // normal // closed // checked
			}
			arr.push(todoObj);
			LocalData.update(dbName, 'itemArray', arr);

			// create and append link
			var link = createTodoElement(str);
			list.appendChild(link);
		}
	}

	function onSaveHandler(e:MouseEvent) {
		var json = LocalData.read(dbName);
		var dataStr = "data:text/json;charset=utf-8," + untyped encodeURIComponent(Json.stringify(json));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "todolist.json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function onClearHandler(e:MouseEvent) {
		LocalData.update(dbName, 'itemArray', []);
	}

	function onRandomHandler(e:MouseEvent) {
		todoInput.value = utils.Randomize.superHeroName();
	}

	function onCloseHandler(e:MouseEvent) {
		e.stopPropagation();
		console.log('onCloseHandler' + e);
		console.log(e);
		var el:Element = cast e.currentTarget;
		el.parentElement.style.display = 'none';
	}

	function onCheckedHandler(e) {
		e.preventDefault();
		e.target.classList.toggle('checked');
		console.log('onCheckedHandler' + e);
	}

	static public function main() {
		var app = new Todo();
	}
}

typedef TodoObj = {
	@:optional var _id:String;
	var created:String;
	var updated:String;
	var content:String;
	var state:String; // normal // closed // checked
}
