(function ($global) { "use strict";
class DummyData {
	constructor() {
		this.coffeeFlavorArray = ["Smokey","Rich","full-bodied","Round","smooth","Complex","balanced","Mild","delicately toasted","Sweet","light","Intensely roasted","with a full body","Exceptionally intense","syrupy","Powerful","contrasting","Intense","creamy","Full","balanced","full body","a small bitternes","Round","balanced","Fruity","vibrant","Sweet","harmonious"];
		this.coffeeImages = ["front_arpeggio.png","front_livanto.png","front_capriccio.png","front_ristretto.png","front_cosi.png","front_roma.png","front_fortissio_lungo.png","front_vivalto_lungo.png","front_kazaar.png","front_vivalto_lungo_decaf_Striped.png","front_linizio_lungo.png","front_volluto.png"];
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("DummyData - Dom ready");
			_gthis.getElements();
			$global.console.log(_gthis.guid());
			$global.console.log(_gthis.guid(15));
		});
	}
	getElements() {
		let html = this.convert();
		let div = window.document.getElementById("output");
		div.innerHTML = JSON.stringify(html,null,"  ");
		let btn = window.document.getElementById("btn-download-json");
		let _gthis = this;
		btn.onclick = function(e) {
			_gthis.download("dummy-data.json",JSON.stringify(html));
		};
	}
	convert() {
		let json = { items : []};
		let items = [];
		let _g = 0;
		let _g1 = this.coffeeImages.length;
		while(_g < _g1) {
			let i = _g++;
			let img = this.coffeeImages[i];
			let name = StringTools.replace(StringTools.replace(StringTools.replace(img,"front_",""),".png",""),"_"," ");
			let obj = { guid : this.guid(), name : "" + DummyData.capFirstLetter(name), img : "img/" + img, description : this.getDescription(), intensity : this.getIntensity(), price : this.getPrice()};
			items.push(obj);
		}
		json["items"] = items;
		return json;
	}
	getDescription() {
		let word1 = this.coffeeFlavorArray[Math.floor(Math.random() * this.coffeeFlavorArray.length)];
		let word2 = this.coffeeFlavorArray[Math.floor(Math.random() * this.coffeeFlavorArray.length)];
		return DummyData.capFirstLetter(("" + word1 + " and " + word2 + " coffee").toLowerCase());
	}
	getIntensity() {
		return Math.round(Math.random() * 12);
	}
	getPrice() {
		let price = Math.round(Math.random() * 100) / 100;
		return price;
	}
	guid(len) {
		if(len == null) {
			len = 32;
		}
		let buf = [];
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let charlen = chars.length;
		let _g = 0;
		let _g1 = len;
		while(_g < _g1) {
			let i = _g++;
			buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
		}
		return buf.join("");
	}
	download(filename,text) {
		let element = window.document.createElement("a");
		element.setAttribute("href","data:text/plain;charset=utf-8," + encodeURIComponent(text));
		element.setAttribute("download",filename);
		element.style.display = "none";
		window.document.body.appendChild(element);
		element.click();
		window.document.body.removeChild(element);
	}
	static capFirstLetter(str) {
		let tempstr = "";
		tempstr = str.substring(0,1).toUpperCase() + str.substring(1,str.length);
		return tempstr;
	}
	static main() {
		let app = new DummyData();
	}
}
class StringTools {
	static replace(s,sub,by) {
		return s.split(sub).join(by);
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
DummyData.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
