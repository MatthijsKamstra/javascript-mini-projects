import js.Syntax;
import utils.Embed;

// https://sortablejs.github.io/Sortable/
class SortableJs {
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('SortableJs - Dom ready');
			Embed.setScript('https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js', init);
		});
	}

	function init() {
		trace('init');
		// var el = document.getElementById('example1');
		// var sortable = Syntax.code('Sortable.create({0})', el);

		var el = document.getElementById('example1');
		var sortable = Syntax.code("new Sortable({0}, {
			animation: 150,
			ghostClass: 'bg-warning'
		});", el);
	}

	static public function main() {
		var app = new SortableJs();
	}
}
