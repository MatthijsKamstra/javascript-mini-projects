package;

class Main {
	public function new() {
		// trace('START :: main');
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()}');
		});
	}

	static public function main() {
		var app = new Main();
	}
}
