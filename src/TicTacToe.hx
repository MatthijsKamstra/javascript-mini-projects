class TicTacToe {
	var board = []; // array to hold the current game

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('TickTacToe - Dom ready');
			init();
		});
	}

	function init() {
		reset();
	}

	function reset() {
		// this.reset() : reset the game
		// Reset board array & get HTML container
		this.board = [];
		var container = document.getElementById("tictactoe-wrapper");
		container.innerHTML = "";
		// Redraw squares

		for (i in 0...9) {
			this.board.push(null);
			var square:DivElement = cast document.createDivElement();
			square.innerHTML = "&nbsp;";
			square.dataset.idx = '$i';
			square.id = "ttt-" + i;
			square.onclick = (e) -> {
				// console.log(e);
				play(e);
			}
			container.appendChild(square);
		}
	}

	function play(e:MouseEvent) {
		trace('paly');

		// this.play() : when the player selects a square
		// (A) Player's move - Mark with "O"

		var el:DivElement = cast e.currentTarget;

		trace(el);

		var move:Int = Std.parseInt(el.dataset.idx);
		this.board[move] = 0;
		el.innerHTML = "O";
		el.classList.add("player");
		el.removeEventListener("click", this.play);
		// (B) No more moves available - no winner
		if (this.board.indexOf(null) == -1) {
			alert("No winner");
			this.reset();
		}
			// (C) Computer's move - Mark with "X"
		// @TODO - Change to use not bad AI if you want
		else {
			move = this.dumbAI();
			// move = this.notBadAI();
			this.board[move] = 1;
			var square = document.getElementById("ttt-" + move);
			square.innerHTML = "X";
			square.classList.add("computer");
			square.removeEventListener("click", this.play);
		}
		// (D) Who won?
		var win = null;
		// Horizontal row checks
		for (j in 0...3) {
			var i = j * 3;
			if (this.board[i] != null && this.board[i + 1] != null && this.board[i + 2] != null) {
				if ((this.board[i] == this.board[i + 1]) && (this.board[i + 1] == this.board[i + 2])) {
					win = this.board[i];
				}
			}
			if (win != null) {
				break;
			}
		}
		// Vertical row checks
		if (win == null) {
			for (i in 0...3) {
				if (this.board[i] != null && this.board[i + 3] != null && this.board[i + 6] != null) {
					if ((this.board[i] == this.board[i + 3]) && (this.board[i + 3] == this.board[i + 6])) {
						win = this.board[i];
					}
					if (win != null) {
						break;
					}
				}
			}
		}
		// Diagonal row checks
		if (win == null) {
			if (this.board[0] != null && this.board[4] != null && this.board[8] != null) {
				if ((this.board[0] == this.board[4]) && (this.board[4] == this.board[8])) {
					win = this.board[4];
				}
			}
		}
		if (win == null) {
			if (this.board[2] != null && this.board[4] != null && this.board[6] != null) {
				if ((this.board[2] == this.board[4]) && (this.board[4] == this.board[6])) {
					win = this.board[4];
				}
			}
		}
		// We have a winner
		if (win != null) {
			alert("WINNER - " + (win == 0 ? "Player" : "Computer"));
			this.reset();
		}
	}

	function dumbAI() {
		// this.dumbAI() : dumb computer AI, randomly chooses an empty slot
		// Extract out all open slots
		var open = [];
		for (i in 0...9) {
			if (this.board[i] == null) {
				open.push(i);
			}
		}
		// Randomly choose open slot
		var random = Math.floor(Math.random() * (open.length - 1));
		return open[random];
	}

	// function notBadAI() {
	// 	// this.notBadAI() : AI with a little more intelligence
	// 	// (A) Init
	// 	var move = null;
	// 	var check = function(first, direction, pc) {
	// 		// checkH() : helper function, check possible winning row
	// 		// PARAM square : first square number
	// 		//       direction : "R"ow, "C"ol, "D"iagonal
	// 		//       pc : 0 for player, 1 for computer
	// 		var second = 0, third = 0;
	// 		if (direction == "R") {
	// 			second = first + 1;
	// 			third = first + 2;
	// 		} else if (direction == "C") {
	// 			second = first + 3;
	// 			third = first + 6;
	// 		} else {
	// 			second = 4;
	// 			third = first == 0 ? 8 : 6;
	// 		}
	// 		if (this.board[first] == null && this.board[second] == pc && this.board[third] == pc) {
	// 			return first;
	// 		} else if (this.board[first] == pc && this.board[second] == null && this.board[third] == pc) {
	// 			return second;
	// 		} else if (this.board[first] == pc && this.board[second] == pc && this.board[third] == null) {
	// 			return third;
	// 		}
	// 		return null;
	// 	};
	// 	// (B) Priority #1 - Go for the win
	// 	// (B1) Check horizontal rows
	// 	for (let i = 0;
	// 	i < 9;
	// 	i += 3) {
	// 		move = check(i, "R", 1);
	// 		if (move != = null) {
	// 			break;
	// 		}
	// 	}
	// 	// (B2) Check vertical columns
	// 	if (move == = null) {
	// 		for (let i = 0;
	// 		i < 3;
	// 		i++) {
	// 			move = check(i, "C", 1);
	// 			if (move != = null) {
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	// (B3) Check diagonal
	// 	if (move == = null) {
	// 		move = check(0, "D", 1);
	// 	}
	// 	if (move == = null) {
	// 		move = check(2, "D", 1);
	// 	}
	// 	// (C) Priority #2 - Block player from winning
	// 	// (C1) Check horizontal rows
	// 	for (let i = 0;
	// 	i < 9;
	// 	i += 3) {
	// 		move = check(i, "R", 0);
	// 		if (move != = null) {
	// 			break;
	// 		}
	// 	}
	// 	// (C2) Check vertical columns
	// 	if (move == = null) {
	// 		for (let i = 0;
	// 		i < 3;
	// 		i++) {
	// 			move = check(i, "C", 0);
	// 			if (move != = null) {
	// 				break;
	// 			}
	// 		}
	// 	}
	// 	// (C3) Check diagonal
	// 	if (move == = null) {
	// 		move = check(0, "D", 0);
	// 	}
	// 	if (move == = null) {
	// 		move = check(2, "D", 0);
	// 	}
	// 	// (D) Random move if nothing
	// 	if (move == = null) {
	// 		move = this.dumbAI();
	// 	}
	// 	return move;
	// }

	static public function main() {
		var app = new TicTacToe();
	}
}
