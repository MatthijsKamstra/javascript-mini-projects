package;

import haxe.Json;

using StringTools;

class DummyData {
	var coffeeImages = [
		       'front_arpeggio.png',                     'front_livanto.png',
		      'front_capriccio.png',                   'front_ristretto.png',
		           'front_cosi.png',                        'front_roma.png',
		'front_fortissio_lungo.png',               'front_vivalto_lungo.png',
		         'front_kazaar.png', 'front_vivalto_lungo_decaf_Striped.png',
		  'front_linizio_lungo.png',                     'front_volluto.png',
	];

	var coffeeFlavorArray = [
		'Smokey', 'Rich', 'full-bodied', 'Round', 'smooth', 'Complex', 'balanced', 'Mild', 'delicately toasted', 'Sweet', 'light', 'Intensely roasted',
		'with a full body', 'Exceptionally intense', 'syrupy', 'Powerful', 'contrasting', 'Intense', 'creamy', 'Full', 'balanced', 'full body',
		'a small bitternes', 'Round', 'balanced', 'Fruity', 'vibrant', 'Sweet', 'harmonious'
	];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('DummyData - Dom ready');
			getElements();
		});
	}

	function getElements() {
		var html = convert();

		var div:DivElement = cast document.getElementById('output');
		div.innerHTML = Json.stringify(html, null, '  ');

		var btn:AnchorElement = cast document.getElementById('btn-download-json');
		btn.onclick = (e) -> {
			download('dummy-data.json', html);
		}
	}

	function convert() {
		var json = {items: []};
		var items = [];
		for (i in 0...coffeeImages.length) {
			var img = coffeeImages[i];
			var name = img.replace('front', '').replace('.png', '').replace('_', '');
			var obj = {
				name: '${capFirstLetter(name)}',
				img: 'img/${img}',
				description: getDescription(),
				intensity: getIntensity(),
				price: getPrice()
			}
			items.push(obj);
		}
		Reflect.setField(json, 'items', items);
		return (json);
	}

	// ____________________________________ utils ____________________________________

	function getDescription() {
		var word1 = coffeeFlavorArray[Math.floor(Math.random() * coffeeFlavorArray.length)];
		var word2 = coffeeFlavorArray[Math.floor(Math.random() * coffeeFlavorArray.length)];
		return capFirstLetter('${word1} and ${word2} coffee'.toLowerCase());
	}

	function getIntensity() {
		return Math.round(Math.random() * 12);
	}

	function getPrice() {
		var price = Math.round(Math.random() * 100) / 100;
		return price;
	}

	private static function capFirstLetter(str:String):String {
		var tempstr = '';
		tempstr = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
		return tempstr;
	}

	// ____________________________________ download ____________________________________

	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + untyped encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	static public function main() {
		var app = new DummyData();
	}
}
