// Generated by Haxe 4.0.5
(function ($global) { "use strict";
class App {
}
class SvgEditor {
	constructor() {
		this.jsmap = new Map();
		this.map = new haxe_ds_StringMap();
		this.svgH = 300;
		this.svgW = 600;
		var _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			window.console.log("" + App.NAME + " - SvgEditor - Dom ready :: build: " + "2020-05-10 12:43:11");
			_gthis.init();
		});
	}
	init() {
		this.setupData();
		this.setElements();
		this.setupSVG();
		this.setupGraphics();
	}
	setupData() {
		var p0 = { x : 100, y : 200};
		var p1 = { x : 500, y : 100};
		var p2 = { x : 175, y : 55};
		var p3 = { x : 166, y : 250};
		var p4 = { x : 435, y : 200};
		var _this = this.map;
		if(__map_reserved["circle0"] != null) {
			_this.setReserved("circle0",p0);
		} else {
			_this.h["circle0"] = p0;
		}
		var _this1 = this.map;
		if(__map_reserved["circle1"] != null) {
			_this1.setReserved("circle1",p1);
		} else {
			_this1.h["circle1"] = p1;
		}
		var _this2 = this.map;
		if(__map_reserved["circle2"] != null) {
			_this2.setReserved("circle2",p2);
		} else {
			_this2.h["circle2"] = p2;
		}
		var _this3 = this.map;
		if(__map_reserved["circle3"] != null) {
			_this3.setReserved("circle3",p3);
		} else {
			_this3.h["circle3"] = p3;
		}
		var _this4 = this.map;
		if(__map_reserved["circle4"] != null) {
			_this4.setReserved("circle4",p4);
		} else {
			_this4.h["circle4"] = p4;
		}
		this.jsmap.set("circle0",p0);
		this.jsmap.set("circle1",p1);
		this.jsmap.set("circle2",p2);
		this.jsmap.set("circle3",p3);
		this.jsmap.set("circle4",p4);
	}
	setElements() {
	}
	setupSVG() {
		this.svgWrapper = window.document.getElementById("wrapper-svg");
		this.svg = window.document.getElementsByTagName("svg")[0];
		if(this.svg == null) {
			this.svg = this.createSVG();
			this.svgWrapper.innerHTML = "";
			this.svgWrapper.append(this.svg);
		}
		this.svg.onmousedown = $bind(this,this.onMouseDownHandler);
		this.svg.onmousemove = $bind(this,this.onMouseMoveHandler);
		this.svg.onmouseup = $bind(this,this.onMouseUpHandler);
	}
	setupGraphics() {
		var p0 = this.jsmap.get("circle0");
		var p1 = this.jsmap.get("circle1");
		var p2 = this.jsmap.get("circle2");
		var p3 = this.jsmap.get("circle3");
		var p4 = this.jsmap.get("circle4");
		var _gthis = this;
		var points = [p0,p1,p2];
		this.polygon = this.createPolygon("polygon0",points);
		this.polygon.classList.add("static");
		this.svg.appendChild(this.polygon);
		this.line = this.createLine("line0",p3,p4);
		this.line.classList.add("static");
		this.svg.appendChild(this.line);
		this.jsmap.forEach(function(value,key,jsmap) {
			var p = jsmap.get(key);
			var circle = _gthis.createCircle("" + key,p.x,p.y);
			circle.classList.add("draggable");
			_gthis.svg.appendChild(circle);
		});
	}
	updateShapes() {
		this.updateLine();
		this.updatePolygon();
	}
	updateLine() {
		var p3 = this.jsmap.get("circle3");
		var p4 = this.jsmap.get("circle4");
		this.line.setAttribute("x1","" + p3.x);
		this.line.setAttribute("y1","" + p3.y);
		this.line.setAttribute("x2","" + p4.x);
		this.line.setAttribute("y2","" + p4.y);
	}
	updatePolygon() {
		var p0 = this.jsmap.get("circle0");
		var p1 = this.jsmap.get("circle1");
		var p2 = this.jsmap.get("circle2");
		var points = [p0,p1,p2];
		this.polygon.setAttribute("points",this.updatePolygonPoints(points));
	}
	updatePolygonPoints(points) {
		var str = "";
		var _g = 0;
		var _g1 = points.length;
		while(_g < _g1) {
			var i = _g++;
			var p = points[i];
			str += "" + p.x + "," + p.y + " ";
		}
		return str;
	}
	onMouseDownHandler(e) {
		var el = e.target;
		if(el.classList.contains("draggable")) {
			this.selectedElement = el;
			this.offset = this.getMousePosition(e);
			this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null,"cx"));
			this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null,"cy"));
		}
	}
	onMouseMoveHandler(e) {
		if(this.selectedElement != null) {
			var el = e.target;
			e.preventDefault();
			var coord = this.getMousePosition(e);
			var p = { x : coord.x - this.offset.x, y : coord.y - this.offset.y};
			var id = el.id;
			var _this = this.map;
			if(__map_reserved[id] != null) {
				_this.setReserved(id,p);
			} else {
				_this.h[id] = p;
			}
			this.jsmap.set(id,p);
			switch(el.nodeName) {
			case "circle":
				this.selectedElement.setAttributeNS(null,"cx","" + (coord.x - this.offset.x));
				this.selectedElement.setAttributeNS(null,"cy","" + (coord.y - this.offset.y));
				break;
			case "x":
				this.selectedElement.setAttributeNS(null,"x","" + (coord.x - this.offset.x));
				this.selectedElement.setAttributeNS(null,"y","" + (coord.y - this.offset.y));
				break;
			}
			this.updateShapes();
		}
	}
	onMouseUpHandler(e) {
		this.selectedElement = null;
	}
	getMousePosition(evt) {
		var CTM = this.svg.getScreenCTM();
		return { x : (evt.clientX - CTM.e) / CTM.a, y : (evt.clientY - CTM.f) / CTM.d};
	}
	createSVG() {
		var svg = window.document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg.setAttribute("viewBox","0 0 " + this.svgW + " " + this.svgH);
		svg.setAttribute("width","" + this.svgW + " ");
		svg.setAttribute("height","" + this.svgH + " ");
		return svg;
	}
	createCircle(id,x,y,r) {
		if(r == null) {
			r = 15;
		}
		var shape = window.document.createElementNS("http://www.w3.org/2000/svg","circle");
		shape.setAttribute("id","" + id);
		shape.setAttribute("cx","" + x);
		shape.setAttribute("cy","" + y);
		shape.setAttribute("r","" + r);
		shape.setAttribute("fill","#00FFFF");
		shape.setAttribute("fill-opacity","0.7");
		shape.setAttribute("stroke","black");
		shape.setAttribute("stroke-width","2");
		return shape;
	}
	createLine(id,p0,p1) {
		var shape = window.document.createElementNS("http://www.w3.org/2000/svg","line");
		shape.setAttribute("id","" + id);
		shape.setAttribute("x1","" + p0.x);
		shape.setAttribute("y1","" + p0.y);
		shape.setAttribute("x2","" + p1.x);
		shape.setAttribute("y2","" + p1.y);
		shape.setAttribute("stroke","black");
		shape.setAttribute("stroke-width","3");
		return shape;
	}
	createPolygon(id,points) {
		var shape = window.document.createElementNS("http://www.w3.org/2000/svg","polygon");
		shape.setAttribute("id","" + id);
		shape.setAttribute("points",this.updatePolygonPoints(points));
		shape.setAttribute("fill","#00FFFF");
		shape.setAttribute("fill-opacity","0.7");
		shape.setAttribute("stroke","black");
		shape.setAttribute("stroke-width","3");
		return shape;
	}
	static main() {
		var app = new SvgEditor();
	}
}
class haxe_ds_StringMap {
	constructor() {
		this.h = { };
	}
	setReserved(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
}
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
var __map_reserved = {};
App.NAME = "[js-mini-projects]";
SvgEditor.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
