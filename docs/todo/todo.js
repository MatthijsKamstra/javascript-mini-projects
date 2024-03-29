(function ($global) { "use strict";
class HxOverrides {
	static dateStr(date) {
		let m = date.getMonth() + 1;
		let d = date.getDate();
		let h = date.getHours();
		let mi = date.getMinutes();
		let s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
Math.__name__ = true;
class Reflect {
	static getProperty(o,field) {
		let tmp;
		if(o == null) {
			return null;
		} else {
			let tmp1;
			if(o.__properties__) {
				tmp = o.__properties__["get_" + field];
				tmp1 = tmp;
			} else {
				tmp1 = false;
			}
			if(tmp1) {
				return o[tmp]();
			} else {
				return o[field];
			}
		}
	}
	static setProperty(o,field,value) {
		let tmp;
		let tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["set_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			o[tmp](value);
		} else {
			o[field] = value;
		}
	}
}
Reflect.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class Todo {
	constructor() {
		this.STATE_CLOSED = "closed";
		this.STATE_CHECKED = "checked";
		this.STATE_DEFAULT = "";
		this.dbName = "db-todo";
		utils_LocalData.create(this.dbName);
		if(utils_LocalData.read(this.dbName,"itemArray") == null) {
			utils_LocalData.update(this.dbName,"itemArray",[]);
		}
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Todo - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.setupTodoList();
	}
	setElements() {
		this.todoInput = window.document.getElementById("todo-input");
		this.list = window.document.getElementById("todo-list");
		this.list.innerHTML = "";
		let btn = window.document.getElementById("btn-todo-add");
		let _gthis = this;
		btn.onclick = function(e) {
			_gthis.createTodo();
		};
		let btn1 = window.document.getElementById("btn-random");
		btn1.onclick = function(e) {
			_gthis.onClickRandomHandler(e);
		};
		let btn2 = window.document.getElementById("btn-clear");
		btn2.onclick = function(e) {
			_gthis.onClickClearHandler(e);
		};
		let btn3 = window.document.getElementById("btn-save");
		btn3.onclick = function(e) {
			_gthis.onClickSaveHandler(e);
		};
	}
	setupTodoList() {
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		if(arr.length == 0) {
			this.randomizeTodo();
		} else {
			let _g = 0;
			let _g1 = arr.length;
			while(_g < _g1) {
				let i = _g++;
				let todoObj = arr[i];
				let link = this.createTodoElement(todoObj);
				if(link != null) {
					this.list.appendChild(link);
				}
			}
		}
	}
	randomizeTodo() {
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		let name = "<b>[Random Todo]</b> " + utils_Randomize.superHeroName();
		let todoObj = { _id : "tododata-" + new Date().getTime() + "-" + Todo.uniqCounter, created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date()), content : name, state : ""};
		let link = this.createTodoElement(todoObj);
		this.list.appendChild(link);
		arr.push(todoObj);
		Todo.uniqCounter++;
		let name1 = "<b>[Random Todo]</b> " + utils_Randomize.superHeroName();
		let todoObj1 = { _id : "tododata-" + new Date().getTime() + "-" + Todo.uniqCounter, created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date()), content : name1, state : ""};
		let link1 = this.createTodoElement(todoObj1);
		this.list.appendChild(link1);
		arr.push(todoObj1);
		Todo.uniqCounter++;
		let name2 = "<b>[Random Todo]</b> " + utils_Randomize.superHeroName();
		let todoObj2 = { _id : "tododata-" + new Date().getTime() + "-" + Todo.uniqCounter, created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date()), content : name2, state : ""};
		let link2 = this.createTodoElement(todoObj2);
		this.list.appendChild(link2);
		arr.push(todoObj2);
		Todo.uniqCounter++;
		utils_LocalData.update(this.dbName,"itemArray",arr);
	}
	createTodoElement(todoObj) {
		let link = window.document.createElement("a");
		link.setAttribute("class","list-group-item list-group-item-action");
		switch(todoObj.state) {
		case "checked":
			link.classList.add(this.STATE_CHECKED);
			break;
		case "closed":
			link.classList.add(this.STATE_CLOSED);
			break;
		default:
			console.log("src/Todo.hx:99:","case '" + todoObj.state + "': trace ('" + todoObj.state + "');");
		}
		if(todoObj.state == this.STATE_CLOSED) {
			link.classList.add("invisible");
			return null;
		}
		link.dataset.id = todoObj._id;
		link.href = "#";
		link.innerHTML = todoObj.content;
		let _gthis = this;
		link.onclick = function(e) {
			_gthis.onClickCheckedHandler(e);
		};
		let span = window.document.createElement("span");
		let txt = window.document.createTextNode("╳");
		span.className = "close";
		span.appendChild(txt);
		span.onclick = function(e) {
			_gthis.onClickCloseHandler(e);
		};
		link.appendChild(span);
		return link;
	}
	createTodo() {
		if(this.todoInput.value == "") {
			window.alert("You must write something!");
		} else {
			let str = this.todoInput.value;
			let arr = utils_LocalData.read(this.dbName,"itemArray");
			let todoObj = { _id : "tododata-" + new Date().getTime() + "-" + Todo.uniqCounter, created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date()), content : str, state : ""};
			Todo.uniqCounter++;
			arr.push(todoObj);
			utils_LocalData.update(this.dbName,"itemArray",arr);
			let link = this.createTodoElement(todoObj);
			if(link != null) {
				this.list.appendChild(link);
			}
		}
	}
	onClickSaveHandler(e) {
		let json = utils_LocalData.read(this.dbName);
		let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
		let downloadAnchorNode = window.document.createElement("a");
		downloadAnchorNode.setAttribute("href",dataStr);
		downloadAnchorNode.setAttribute("download","todolist.json");
		window.document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
	onClickClearHandler(e) {
		utils_LocalData.update(this.dbName,"itemArray",[]);
	}
	onClickRandomHandler(e) {
		this.todoInput.value = utils_Randomize.superHeroName();
	}
	onClickCloseHandler(e) {
		e.stopPropagation();
		$global.console.log("onClickCloseHandler" + Std.string(e));
		$global.console.log(e);
		let el = e.target;
		let parent = el.parentElement;
		let isChecked = parent.classList.contains(this.STATE_CLOSED);
		parent.classList.toggle(this.STATE_CLOSED);
		parent.parentElement.removeChild(parent);
		let _id = parent.dataset.id;
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let todoObj = arr[i];
			if(todoObj._id == _id) {
				if(isChecked) {
					todoObj.state = this.STATE_DEFAULT;
					todoObj.updated = HxOverrides.dateStr(new Date());
				} else {
					todoObj.state = this.STATE_CLOSED;
					todoObj.updated = HxOverrides.dateStr(new Date());
				}
			}
		}
		utils_LocalData.update(this.dbName,"itemArray",arr);
	}
	onClickCheckedHandler(e) {
		$global.console.log("onClickCheckedHandler" + Std.string(e));
		e.preventDefault();
		let el = e.target;
		let isChecked = el.classList.contains(this.STATE_CHECKED);
		el.classList.toggle(this.STATE_CHECKED);
		let _id = el.dataset.id;
		let arr = utils_LocalData.read(this.dbName,"itemArray");
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let todoObj = arr[i];
			if(todoObj._id == _id) {
				if(isChecked) {
					todoObj.state = this.STATE_DEFAULT;
					todoObj.updated = HxOverrides.dateStr(new Date());
				} else {
					todoObj.state = this.STATE_CHECKED;
					todoObj.updated = HxOverrides.dateStr(new Date());
				}
			}
		}
		utils_LocalData.update(this.dbName,"itemArray",arr);
	}
	static main() {
		let app = new Todo();
	}
}
Todo.__name__ = true;
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
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
class utils_LocalData {
	static create(name,isOverwrite) {
		if(isOverwrite == null) {
			isOverwrite = false;
		}
		if(utils_LocalData.isDebug) {
			$global.console.info("get local storage");
		}
		utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		if(utils_LocalData.json == null || isOverwrite) {
			utils_LocalData.json = { _id : "localdata-" + new Date().getTime(), version : "0.0.1", created : HxOverrides.dateStr(new Date()), updated : HxOverrides.dateStr(new Date())};
			if(utils_LocalData.isDebug) {
				$global.console.log("initialize database:" + JSON.stringify(utils_LocalData.json));
			}
		}
		utils_LocalData.saveData(name);
	}
	static read(name,key) {
		if(utils_LocalData.json == null) {
			utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		}
		if(key == null) {
			return utils_LocalData.json;
		}
		if(Object.prototype.hasOwnProperty.call(utils_LocalData.json,key)) {
			return Reflect.getProperty(utils_LocalData.json,key);
		} else {
			return null;
		}
	}
	static update(name,key,value) {
		if(utils_LocalData.json == null) {
			utils_LocalData.json = JSON.parse(window.localStorage.getItem(name));
		}
		Reflect.setProperty(utils_LocalData.json,key,value);
		Reflect.setProperty(utils_LocalData.json,"updated",HxOverrides.dateStr(new Date()));
		utils_LocalData.saveData(name);
	}
	static saveData(name) {
		window.localStorage.setItem(name,JSON.stringify(utils_LocalData.json));
		if(utils_LocalData.isDebug) {
			$global.console.log(utils_LocalData.json);
		}
	}
}
utils_LocalData.__name__ = true;
class utils_Randomize {
	static superHeroName() {
		let superHeroName = utils_Randomize.capFirstLetter(utils_Randomize.superHeroFirst[Math.floor(Math.random() * utils_Randomize.superHeroFirst.length)]) + " " + utils_Randomize.capFirstLetter(utils_Randomize.superHeroLast[Math.floor(Math.random() * utils_Randomize.superHeroLast.length)]);
		return superHeroName;
	}
	static capFirstLetter(str) {
		let tempstr = "";
		tempstr = str.substring(0,1).toUpperCase() + str.substring(1,str.length);
		return tempstr;
	}
}
utils_Randomize.__name__ = true;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
	String.__name__ = true;
	Array.__name__ = true;
	Date.__name__ = "Date";
}
js_Boot.__toStr = ({ }).toString;
Todo.uniqCounter = 0;
utils_LocalData.isDebug = true;
utils_Randomize.superHeroFirst = ["captain","turbo","galactic","the","aqua","fire","iron","super","green","phantom","dark","ghost","professor","atomic","rock","omega","rocket","shadow","agent","silver","wild","wolf","ultra","wonder","doctor","star"];
utils_Randomize.superHeroLast = ["x","shield","machine","justice","beast","wing","arrow","skull","blade","bolt","cobra","blaze","soldier","strike","falcon","fang","king","surfer","bot","guard","thing","claw","brain","master","power","storm"];
Todo.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
