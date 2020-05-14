import haxe.Json;
import utils.LocalData;

class Todo {
	// store data under name
	var dbName = 'db-todo';
	var todoInput:InputElement;
	var list:DivElement;

	// states
	var STATE_DEFAULT = '';
	var STATE_CHECKED = 'checked';
	var STATE_CLOSED = 'closed';

	public static var uniqCounter = 0;

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

	function setElements() {
		todoInput = cast document.getElementById('todo-input');
		list = cast document.getElementById('todo-list');
		list.innerHTML = '';
		var todoBtn:ButtonElement = cast document.getElementById('btn-todo-add');
		todoBtn.onclick = (e) -> createTodo();
		var btn:ButtonElement = cast document.getElementById('btn-random');
		btn.onclick = (e) -> onRandomHandler(e);
		var btn:ButtonElement = cast document.getElementById('btn-clear');
		btn.onclick = (e) -> onClearHandler(e);
		var btn:ButtonElement = cast document.getElementById('btn-save');
		btn.onclick = (e) -> onSaveHandler(e);
	}

	// ____________________________________ setup ____________________________________

	function setupTodoList() {
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		if (arr.length == 0) {
			randomizeTodo();
		} else {
			for (i in 0...arr.length) {
				var todoObj = arr[i];
				// var name = todoObj.content;
				var link = createTodoElement(todoObj);
				if (link != null)
					list.appendChild(link);
			}
		}
	}

	function randomizeTodo() {
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		for (i in 0...3) {
			var name = '<b>[Random Todo]</b> ' + utils.Randomize.superHeroName();
			var todoObj:TodoObj = {
				_id: 'tododata-${Date.now().getTime()}-${uniqCounter}',
				created: Date.now().toString(),
				updated: Date.now().toString(),
				content: name,
				state: '', // normal // closed // checked
			}
			var link = createTodoElement(todoObj);
			list.appendChild(link);

			arr.push(todoObj);

			uniqCounter++;
		}

		LocalData.update(dbName, 'itemArray', arr);
	}

	function createTodoElement(todoObj:TodoObj) {
		// create elements

		// a href
		var link = document.createAnchorElement();
		link.setAttribute('class', 'list-group-item list-group-item-action');

		switch (todoObj.state) {
			case 'checked':
				link.classList.add(STATE_CHECKED);
			case 'closed':
				link.classList.add(STATE_CLOSED);
			default:
				trace("case '" + todoObj.state + "': trace ('" + todoObj.state + "');");
		}

		if (todoObj.state == STATE_CLOSED) {
			link.classList.add('invisible');
			return null;
		}

		link.dataset.id = todoObj._id;
		link.href = '#';
		link.innerHTML = todoObj.content;
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

	function createTodo() {
		if (todoInput.value == '') {
			window.alert("You must write something!");
		} else {
			var str = todoInput.value;

			// store in "database"
			var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
			var todoObj:TodoObj = {
				_id: 'tododata-${Date.now().getTime()}-${uniqCounter}',
				created: Date.now().toString(),
				updated: Date.now().toString(),
				content: str,
				state: '', // normal // closed // checked
			}
			uniqCounter++;
			arr.push(todoObj);
			// save to "database"
			LocalData.update(dbName, 'itemArray', arr);

			// create and append link
			var link = createTodoElement(todoObj);
			if (link != null)
				list.appendChild(link);
		}
	}

	// ____________________________________ handler ____________________________________

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
		var el:Element = cast e.target;
		var parent:Element = el.parentElement;
		var isChecked = parent.classList.contains(STATE_CLOSED);
		parent.classList.toggle(STATE_CLOSED);
		parent.parentElement.removeChild(parent);
		// el.parentElement.style.display = 'none';

		// change the correct data in "database"
		var _id = parent.dataset.id;
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		for (i in 0...arr.length) {
			var todoObj:TodoObj = arr[i];
			if (todoObj._id == _id) {
				if (isChecked) {
					todoObj.state = STATE_DEFAULT;
				} else {
					todoObj.state = STATE_CLOSED;
				}
			}
		}
		LocalData.update(dbName, 'itemArray', arr);
	}

	function onCheckedHandler(e:MouseEvent) {
		console.log('onCheckedHandler' + e);
		e.preventDefault();
		var el:Element = cast e.target;
		var isChecked = el.classList.contains(STATE_CHECKED);
		el.classList.toggle(STATE_CHECKED);

		// change the correct data in "database"
		var _id = el.dataset.id;
		var arr:Array<TodoObj> = cast LocalData.read(dbName, 'itemArray');
		for (i in 0...arr.length) {
			var todoObj:TodoObj = arr[i];
			if (todoObj._id == _id) {
				if (isChecked) {
					todoObj.state = STATE_DEFAULT;
				} else {
					todoObj.state = STATE_CHECKED;
				}
			}
		}
		LocalData.update(dbName, 'itemArray', arr);
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
