(function ($global) { "use strict";
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
}
Std.__name__ = true;
class TicTacToe {
	constructor() {
		this.board = [];
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("TickTacToe - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.reset();
	}
	reset() {
		this.board = [];
		let container = window.document.getElementById("tictactoe-wrapper");
		container.innerHTML = "";
		let _gthis = this;
		let _g = 0;
		while(_g < 9) {
			let i = _g++;
			this.board.push(null);
			let square = window.document.createElement("div");
			square.innerHTML = "&nbsp;";
			square.dataset.idx = "" + i;
			square.id = "ttt-" + i;
			square.onclick = function(e) {
				_gthis.play(e);
			};
			container.appendChild(square);
		}
	}
	play(e) {
		console.log("src/TicTacToe.hx:38:","paly");
		let el = e.currentTarget;
		console.log("src/TicTacToe.hx:45:",el);
		let move = Std.parseInt(el.dataset.idx);
		this.board[move] = 0;
		el.innerHTML = "O";
		el.classList.add("player");
		el.removeEventListener("click",$bind(this,this.play));
		if(this.board.indexOf(null) == -1) {
			window.alert("No winner");
			this.reset();
		} else {
			move = this.dumbAI();
			this.board[move] = 1;
			let square = window.document.getElementById("ttt-" + move);
			square.innerHTML = "X";
			square.classList.add("computer");
			square.removeEventListener("click",$bind(this,this.play));
		}
		let win = null;
		let _g = 0;
		while(_g < 3) {
			let j = _g++;
			let i = j * 3;
			if(this.board[i] != null && this.board[i + 1] != null && this.board[i + 2] != null) {
				if(this.board[i] == this.board[i + 1] && this.board[i + 1] == this.board[i + 2]) {
					win = this.board[i];
				}
			}
			if(win != null) {
				break;
			}
		}
		if(win == null) {
			let _g = 0;
			while(_g < 3) {
				let i = _g++;
				if(this.board[i] != null && this.board[i + 3] != null && this.board[i + 6] != null) {
					if(this.board[i] == this.board[i + 3] && this.board[i + 3] == this.board[i + 6]) {
						win = this.board[i];
					}
					if(win != null) {
						break;
					}
				}
			}
		}
		if(win == null) {
			if(this.board[0] != null && this.board[4] != null && this.board[8] != null) {
				if(this.board[0] == this.board[4] && this.board[4] == this.board[8]) {
					win = this.board[4];
				}
			}
		}
		if(win == null) {
			if(this.board[2] != null && this.board[4] != null && this.board[6] != null) {
				if(this.board[2] == this.board[4] && this.board[4] == this.board[6]) {
					win = this.board[4];
				}
			}
		}
		if(win != null) {
			window.alert(Std.string("WINNER - " + (win == 0 ? "Player" : "Computer")));
			this.reset();
		}
	}
	dumbAI() {
		let open = [];
		if(this.board[0] == null) {
			open.push(0);
		}
		if(this.board[1] == null) {
			open.push(1);
		}
		if(this.board[2] == null) {
			open.push(2);
		}
		if(this.board[3] == null) {
			open.push(3);
		}
		if(this.board[4] == null) {
			open.push(4);
		}
		if(this.board[5] == null) {
			open.push(5);
		}
		if(this.board[6] == null) {
			open.push(6);
		}
		if(this.board[7] == null) {
			open.push(7);
		}
		if(this.board[8] == null) {
			open.push(8);
		}
		let random = Math.floor(Math.random() * (open.length - 1));
		return open[random];
	}
	static main() {
		let app = new TicTacToe();
	}
}
TicTacToe.__name__ = true;
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
TicTacToe.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
