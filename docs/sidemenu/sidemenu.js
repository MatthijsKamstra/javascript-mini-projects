(function ($global) { "use strict";
class SideMenu {
	constructor() {
		this.isOffcanvas = false;
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("SideMenu - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
	}
	setElements() {
		this.sideNav = window.document.getElementById("sidenav");
		this.mainDiv = window.document.getElementById("main");
		this.btnNavClose = window.document.getElementById("btn-sidenav-close");
		let _gthis = this;
		this.btnNavClose.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav();
		};
		this.btnNavOpen = window.document.getElementById("btn-sidenav-open");
		this.btnNavOpen.onclick = function(e) {
			e.preventDefault();
			_gthis.toggleNav();
		};
		let btn = window.document.getElementById("btn-sidenav-overlay");
		btn.onclick = function(e) {
			console.log("src/SideMenu.hx:37:",e.target.id);
			e.preventDefault();
			_gthis.isOffcanvas = false;
			_gthis.toggleNav();
		};
		let btn1 = window.document.getElementById("btn-sidenav-offcanvas");
		btn1.onclick = function(e) {
			console.log("src/SideMenu.hx:44:",e.target.id);
			e.preventDefault();
			_gthis.isOffcanvas = true;
			_gthis.toggleNav();
		};
		let btn2 = window.document.getElementById("btn-sidenav-fullwidth");
		btn2.onclick = function(e) {
			console.log("src/SideMenu.hx:51:",e.target.id);
			e.preventDefault();
			_gthis.isOffcanvas = false;
			_gthis.toggleNav();
		};
		let btn3 = window.document.getElementById("btn-sidenav-rightside");
		btn3.onclick = function(e) {
			console.log("src/SideMenu.hx:58:",e.target.id);
			e.preventDefault();
			_gthis.isOffcanvas = false;
			_gthis.toggleNav();
		};
	}
	toggleNav() {
		if(this.sideNav.style.width != "250px") {
			this.openNav();
		} else {
			this.closeNav();
		}
	}
	openNav() {
		this.sideNav.style.width = "250px";
		if(this.isOffcanvas) {
			this.mainDiv.style.marginLeft = "250px";
		}
	}
	closeNav() {
		this.sideNav.style.width = "0";
		if(this.isOffcanvas) {
			this.mainDiv.style.marginLeft = "0";
		}
	}
	static main() {
		let app = new SideMenu();
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
SideMenu.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
