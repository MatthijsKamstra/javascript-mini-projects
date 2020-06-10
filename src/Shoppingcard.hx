package;

import haxe.ds.StringMap;
import AST.ProjectObj;
import vue.Vue;
import haxe.Json;
import haxe.Constraints.Function;
import js.Lib;
import js.Browser.*;
import js.html.XMLHttpRequest;

class Shoppingcard {
	var json = "coffee.json";
	var map:Map<String, CoffeeObj> = [];
	var vm:Vue;
	var sideNav:DivElement;
	var sideNavInnerWidth = 800;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Shoppingcard -Dom ready');
			init();
			setElements();
		});
	}

	function setElements() {
		sideNav = cast document.getElementById('shoppingnav');

		var btn = cast document.getElementById('btn-sidenav-close');
		btn.onclick = (e:MouseEvent) -> {
			e.preventDefault();
			toggleNav();
		}
		var btn = cast document.getElementById('btn-sidenav-open');
		btn.onclick = (e:MouseEvent) -> {
			e.preventDefault();
			toggleNav();
		}
	}

	function init() {
		// set vm dom
		vm = new Vue({
			el: '#app',
			data: {
				message: 'Hello Vue.js!',
				name: 'Vue.js',
				count: 20,
				json: {}
			},
			methods: {
				greet: function(event:MouseEvent) {
					event.preventDefault();
					test(event);
					// alert('Hello ' + Lib.nativeThis.name + '!');
				}
			}
		});
		loadData(json, setupJsonData);
	}

	function test(e:MouseEvent) {
		console.log(e);

		var link:AnchorElement = cast e.currentTarget;
		trace(link.dataset.id);
		// console.log('test  $e');

		var coffeeObj:CoffeeObj = map.get(link.dataset.id);
		console.log(coffeeObj.name);
	}

	/**
		description:
		img:
		intensity:
		name:
		price:

		* @param data
	 */
	function setupJsonData(data:String) {
		var _json = Json.parse(data);
		// var arr:Array<ProjectObj> = _json.data;
		// vm.data.count = arr.length;
		// trace(_json.items);
		var arr:Array<CoffeeObj> = _json.items;
		for (i in 0...arr.length) {
			var coffee:CoffeeObj = arr[i];
			map.set(coffee.guid, coffee);
		}
		vm.data.json = _json;
	}

	/**
	 * loading data, check if file exists before generating navigation
	 * @param url 		load file from here
	 * @param callback 	if file exists and is loaded, use this callbakc
	 */
	function loadData(url:String, callback:Function) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (Lib.nativeThis.readyState == 4 && Lib.nativeThis.status == 200) {
				// console.log(Lib.nativeThis.responseText);
				// finishSetup();
			}
		};
		req.onload = function() {
			var body = req.response;

			if (Lib.nativeThis.status == 200)
				callback(body);
		};
		req.onerror = function(error) {
			console.error('[JS] error: $error');
		};
		req.open('GET', url);
		req.send();
	}

	// ____________________________________ nav ____________________________________

	function toggleNav() {
		trace('toggleNav ${sideNav.style.left}');
		if (sideNav.style.left != '-${sideNavInnerWidth}px') {
			sideNav.style.left = '-${sideNavInnerWidth}px';
		} else {
			sideNav.style.left = "0";
		}
	}

	static public function main() {
		var app = new Shoppingcard();
	}
}

typedef CoffeeObj = {
	@:optional var _id:String;
	var guid:String; // Vc0rzoKc1pJM4084oZmxb6dPzClcZ3wA
	var name:String; // Vivalto
	var img:String; // img/front_vivalto_lungo_decaf_Striped.png",
	var description:String; // Witha full body and light coffee
	var intensity:Int; // 5
	var price:Float; // 0.51
}
