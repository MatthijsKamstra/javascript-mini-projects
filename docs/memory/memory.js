(function ($global) { "use strict";
class Memory {
	constructor() {
		this.isDebug = true;
		this.isCardLocked = false;
		this.flipCardArray = [];
		this.emojiArr = [];
		this.emojies = "abcdefgh";
		this.backCard = "";
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Memory - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.emojiArr = this.emojies.split("").concat(this.emojies.split(""));
		if(!this.isDebug) {
			console.log("src/Memory.hx:22:",this.emojiArr);
			this.shuffle(this.emojiArr);
			console.log("src/Memory.hx:24:",this.emojiArr);
		}
		this.setElements();
		this.setDeck();
	}
	setElements() {
		this.wrapper = window.document.getElementById("memory-wrapper");
	}
	setDeck() {
		let _gthis = this;
		let _g = 0;
		let _g1 = this.emojiArr.length;
		while(_g < _g1) {
			let i = _g++;
			let frontCard = this.emojiArr[i];
			let memoryCardDiv = window.document.createElement("div");
			memoryCardDiv.className = "memory-card";
			memoryCardDiv.innerHTML = "<div class=\"front-face\">" + frontCard + "</div><div class=\"back-face\">" + this.backCard + "</div>";
			memoryCardDiv.onclick = function(e) {
				if(!_gthis.isCardLocked) {
					_gthis.flipCard(e);
				} else {
					console.log("src/Memory.hx:45:","wait for it!");
				}
			};
			this.wrapper.appendChild(memoryCardDiv);
		}
	}
	flipCard(e) {
		let memoryCardDiv = e.target;
		memoryCardDiv.classList.toggle("flip");
		this.flipCardArray.push(memoryCardDiv);
		if(this.flipCardArray.length >= 2) {
			this.checkCards();
		}
	}
	flipCardsBack() {
		let arr = window.document.getElementsByClassName("memory-card");
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let _arr = arr[i];
			_arr.classList.remove("flip");
		}
	}
	hideCards() {
		console.log("src/Memory.hx:79:","hideCards");
		let _g = 0;
		let _g1 = this.flipCardArray.length;
		while(_g < _g1) {
			let i = _g++;
			let _flipCardArray = this.flipCardArray[i];
			_flipCardArray.classList.add("invisible");
			_flipCardArray.classList.add("disabled");
		}
		this.flipCardArray = [];
	}
	checkCards() {
		console.log("src/Memory.hx:91:","checkCards()");
		this.isCardLocked = true;
		let el1 = this.flipCardArray[0].getElementsByClassName("front-face")[0].innerText;
		let el2 = this.flipCardArray[1].getElementsByClassName("front-face")[0].innerText;
		let _gthis = this;
		if(el1 == el2) {
			window.setTimeout(function() {
				_gthis.isCardLocked = false;
				_gthis.hideCards();
			},1500);
		} else {
			window.setTimeout(function() {
				_gthis.flipCardArray = [];
				_gthis.isCardLocked = false;
				_gthis.flipCardsBack();
			},1500);
		}
	}
	shuffle(array) {
		let currentIndex = array.length;
		let temporaryValue;
		let randomIndex;
		while(0 != currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			--currentIndex;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	static main() {
		let app = new Memory();
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
{
}
Memory.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
