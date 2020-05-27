class Memory {
	var backCard = '';
	var emojies = "abcdefgh";
	var emojiArr:Array<String> = [];

	var wrapper:DivElement;
	var flipCardArray:Array<DivElement> = [];

	var isCardLocked = false;
	var isDebug = true; // should be false for 'release'

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Memory - Dom ready');
			init();
		});
	}

	function init() {
		emojiArr = emojies.split('').concat(emojies.split(''));
		if (!isDebug) {
			trace(emojiArr);
			shuffle(emojiArr);
			trace(emojiArr);
		}

		setElements();
		setDeck();
	}

	function setElements() {
		wrapper = cast document.getElementById('memory-wrapper');
	}

	function setDeck() {
		for (i in 0...emojiArr.length) {
			var frontCard = emojiArr[i];
			var memoryCardDiv = document.createDivElement();
			memoryCardDiv.className = 'memory-card';
			memoryCardDiv.innerHTML = '<div class="front-face">${frontCard}</div><div class="back-face">${backCard}</div>';
			memoryCardDiv.onclick = (e) -> {
				if (!isCardLocked) {
					flipCard(e);
				} else {
					trace('wait for it!');
				}
			}
			wrapper.appendChild(memoryCardDiv);
		}
	}

	// ____________________________________ flip cards ____________________________________

	function flipCard(e:MouseEvent) {
		var memoryCardDiv:DivElement = cast e.target;
		memoryCardDiv.classList.toggle('flip');
		flipCardArray.push(memoryCardDiv);

		if (flipCardArray.length >= 2) {
			checkCards();
		}
	}

	function flipCardsBack() {
		var arr = document.getElementsByClassName('memory-card');
		for (i in 0...arr.length) {
			var _arr = arr[i];
			_arr.classList.remove('flip');
		}
	}

	// ____________________________________ hide cards ____________________________________

	/**
	 * if you have selected two of the same cards, remove them from the playarea
	 * aka make them 'invisible'
	 */
	function hideCards() {
		trace('hideCards');
		for (i in 0...flipCardArray.length) {
			var _flipCardArray = flipCardArray[i];
			_flipCardArray.classList.add('invisible');
			_flipCardArray.classList.add('disabled');
		}
		flipCardArray = [];
	}

	// ____________________________________ check if cards are the same ____________________________________

	function checkCards() {
		trace('checkCards()');
		isCardLocked = true;
		var el1:DivElement = cast flipCardArray[0].getElementsByClassName('front-face')[0].innerText; // only one, make sure to use it
		var el2:DivElement = cast flipCardArray[1].getElementsByClassName('front-face')[0].innerText; // only one, make sure to use it
		if (el1 == el2) {
			// trace('correct');
			window.setTimeout(function() {
				isCardLocked = false;
				hideCards();
			}, 1500);
		} else {
			window.setTimeout(function() {
				flipCardArray = [];
				isCardLocked = false;
				flipCardsBack();
			}, 1500);
		}
	}

	// ____________________________________ suffle the original array ____________________________________

	function shuffle(array:Array<String>) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 != currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	static public function main() {
		var app = new Memory();
	}
}
