class Quotes {
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Quotes - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
	}

	function setElements() {
		var btn:ButtonElement = cast document.getElementById('btn-start');
		btn.onclick = (e) -> onTimerStartHandle(e);
	}

	function onTimerStartHandle(e) {}

	static public function main() {
		var app = new Quotes();
	}
}
