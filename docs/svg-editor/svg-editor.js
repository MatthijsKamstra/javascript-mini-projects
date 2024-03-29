(function ($global) { "use strict";
class SvgEditor {
	constructor() {
		this.jsmap = new Map();
		this.svgH = 300;
		this.svgW = 600;
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("SvgEditor - Dom ready");
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
		let p0 = { x : 100, y : 200};
		let p1 = { x : 500, y : 100};
		let p2 = { x : 175, y : 55};
		let p3 = { x : 166, y : 250};
		let p4 = { x : 435, y : 200};
		this.jsmap.set("circle0_A",p0);
		this.jsmap.set("circle1_B",p1);
		this.jsmap.set("circle2_C",p2);
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
		let p0 = this.jsmap.get("circle0_A");
		let p1 = this.jsmap.get("circle1_B");
		let p2 = this.jsmap.get("circle2_C");
		let p3 = this.jsmap.get("circle3");
		let p4 = this.jsmap.get("circle4");
		let points = [p0,p1,p2];
		this.polygon = this.createPolygon("polygon0",points);
		this.polygon.classList.add("static");
		this.svg.appendChild(this.polygon);
		this.line = this.createLine("line0",p3,p4);
		this.line.classList.add("static");
		this.svg.appendChild(this.line);
		let _gthis = this;
		this.jsmap.forEach(function(value,key,jsmap) {
			let p = jsmap.get(key);
			let circle = _gthis.createCircle("" + key,p.x,p.y);
			circle.classList.add("draggable");
			_gthis.svg.appendChild(circle);
		});
	}
	updateShapes() {
		this.updateLine();
		this.updatePolygon();
	}
	updateLine() {
		let p3 = this.jsmap.get("circle3");
		let p4 = this.jsmap.get("circle4");
		this.line.setAttribute("x1","" + p3.x);
		this.line.setAttribute("y1","" + p3.y);
		this.line.setAttribute("x2","" + p4.x);
		this.line.setAttribute("y2","" + p4.y);
	}
	updatePolygon() {
		let p0 = this.jsmap.get("circle0_A");
		let p1 = this.jsmap.get("circle1_B");
		let p2 = this.jsmap.get("circle2_C");
		let points = [p0,p1,p2];
		this.polygon.setAttribute("points",this.updatePolygonPoints(points));
	}
	updatePolygonPoints(points) {
		let str = "";
		let _g = 0;
		let _g1 = points.length;
		while(_g < _g1) {
			let i = _g++;
			let p = points[i];
			str += "" + p.x + "," + p.y + " ";
		}
		return str;
	}
	onMouseDownHandler(e) {
		let el = e.target;
		if(el.classList.contains("draggable")) {
			this.selectedElement = el;
			this.offset = this.getMousePosition(e);
			this.offset.x -= parseFloat(this.selectedElement.getAttributeNS(null,"cx"));
			this.offset.y -= parseFloat(this.selectedElement.getAttributeNS(null,"cy"));
		}
	}
	onMouseMoveHandler(e) {
		if(this.selectedElement != null) {
			e.preventDefault();
			let coord = this.getMousePosition(e);
			let p = { x : coord.x - this.offset.x, y : coord.y - this.offset.y};
			let id = this.selectedElement.id;
			this.jsmap.set(id,p);
			switch(this.selectedElement.nodeName) {
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
		let CTM = this.svg.getScreenCTM();
		return { x : (evt.clientX - CTM.e) / CTM.a, y : (evt.clientY - CTM.f) / CTM.d};
	}
	createSVG() {
		let svg = window.document.createElementNS("http://www.w3.org/2000/svg","svg");
		svg.setAttribute("viewBox","0 0 " + this.svgW + " " + this.svgH);
		svg.setAttribute("width","" + this.svgW + " ");
		svg.setAttribute("height","" + this.svgH + " ");
		return svg;
	}
	createCircle(id,x,y,r) {
		if(r == null) {
			r = 15;
		}
		let shape = window.document.createElementNS("http://www.w3.org/2000/svg","circle");
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
		let shape = window.document.createElementNS("http://www.w3.org/2000/svg","line");
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
		let shape = window.document.createElementNS("http://www.w3.org/2000/svg","polygon");
		shape.setAttribute("id","" + id);
		shape.setAttribute("points",this.updatePolygonPoints(points));
		shape.setAttribute("fill","#00FFFF");
		shape.setAttribute("fill-opacity","0.7");
		shape.setAttribute("stroke","black");
		shape.setAttribute("stroke-width","3");
		return shape;
	}
	static main() {
		let app = new SvgEditor();
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
{
}
SvgEditor.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
