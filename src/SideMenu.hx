class SideMenu {
	// https://www.w3schools.com/howto/howto_js_sidenav.asp
	var sideNav:DivElement;
	var mainDiv:DivElement;
	var btnNavClose:AnchorElement;
	var btnNavOpen:SpanElement;
	var isOffcanvas = false;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('SideMenu - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
	}

	function setElements() {
		sideNav = cast document.getElementById('sidenav');
		mainDiv = cast document.getElementById('main');

		btnNavClose = cast document.getElementById('btn-sidenav-close');
		btnNavClose.onclick = (e:MouseEvent) -> {
			e.preventDefault();
			toggleNav();
		}
		btnNavOpen = cast document.getElementById('btn-sidenav-open');
		btnNavOpen.onclick = (e:MouseEvent) -> {
			e.preventDefault();
			toggleNav();
		}

		var btn:AnchorElement = cast document.getElementById('btn-sidenav-overlay');
		btn.onclick = (e:MouseEvent) -> {
			trace(untyped e.target.id);
			e.preventDefault();
			isOffcanvas = false;
			toggleNav();
		}
		var btn:AnchorElement = cast document.getElementById('btn-sidenav-offcanvas');
		btn.onclick = (e:MouseEvent) -> {
			trace(untyped e.target.id);
			e.preventDefault();
			isOffcanvas = true;
			toggleNav();
		}
		var btn:AnchorElement = cast document.getElementById('btn-sidenav-fullwidth');
		btn.onclick = (e:MouseEvent) -> {
			trace(untyped e.target.id);
			e.preventDefault();
			isOffcanvas = false;
			toggleNav();
		}
		var btn:AnchorElement = cast document.getElementById('btn-sidenav-rightside');
		btn.onclick = (e:MouseEvent) -> {
			trace(untyped e.target.id);
			e.preventDefault();
			isOffcanvas = false;
			toggleNav();
		}
	}

	function toggleNav() {
		if (sideNav.style.width != "250px") {
			openNav();
		} else {
			closeNav();
		}
	}

	/* Set the width of the side navigation to 250px */
	function openNav() {
		sideNav.style.width = "250px";
		if (isOffcanvas)
			mainDiv.style.marginLeft = "250px";
	}

	/* Set the width of the side navigation to 0 */
	function closeNav() {
		sideNav.style.width = "0";
		if (isOffcanvas)
			mainDiv.style.marginLeft = "0";
	}

	static public function main() {
		var app = new SideMenu();
	}
}
