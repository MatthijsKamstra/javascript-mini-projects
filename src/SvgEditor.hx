import js.html.svg.PolygonElement;
import AST.Point;
import js.html.svg.CircleElement;
import js.html.svg.LineElement;
import js.html.svg.Angle;
import js.html.svg.SVGElement;

class SvgEditor {
	var svg:SVGElement;
	var svgWrapper:DivElement;
	var svgW = 600;
	var svgH = 300;

	var selectedElement:SVGElement;
	var line:LineElement;
	var polygon:PolygonElement;

	var offset:Point;

	var map:Map<String, Point> = [];
	var jsmap = new js.lib.Map();

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} - SvgEditor - Dom ready :: build: ${App.getBuildDate()}');
			init();
		});
	}

	function init() {
		setupData();
		setElements();
		setupSVG();
		setupGraphics();
	}

	function setupData() {
		var p0:Point = {
			x: 100,
			y: 200
		}
		var p1:Point = {
			x: 500,
			y: 100
		}
		var p2:Point = {
			x: 175,
			y: 55
		}
		var p3:Point = {
			x: 166,
			y: 250
		}
		var p4:Point = {
			x: 435,
			y: 200
		}
		map.set('circle0', p0);
		map.set('circle1', p1);
		map.set('circle2', p2);
		map.set('circle3', p3);
		map.set('circle4', p4);

		jsmap.set('circle0', p0);
		jsmap.set('circle1', p1);
		jsmap.set('circle2', p2);
		jsmap.set('circle3', p3);
		jsmap.set('circle4', p4);

		// jsmap.forEach(function(value, key, jsmap):Void {
		// 	console.log(key + ' = ' + value);
		// });
	}

	function setElements() {}

	function setupSVG() {
		svgWrapper = cast document.getElementById('wrapper-svg');
		svg = cast document.getElementsByTagName('svg')[0]; // only one present
		if (svg == null) {
			svg = createSVG();
			// reset content
			svgWrapper.innerHTML = '';
			svgWrapper.append(svg);
		}

		svg.onmousedown = onMouseDownHandler;
		svg.onmousemove = onMouseMoveHandler;
		svg.onmouseup = onMouseUpHandler;
		// svg.onmouseleave = onMouseUpHandler;
	}

	function setupGraphics() {
		// for (id in map.keys()) {
		// 	var p = map[id];
		// 	trace('$id has $p ');
		// 	var circle = createCircle('$id', p.x, p.y);
		// 	circle.classList.add('draggable');
		// 	svg.appendChild(circle);
		// }

		var p0 = jsmap.get('circle0');
		var p1 = jsmap.get('circle1');
		var p2 = jsmap.get('circle2');
		var p3 = jsmap.get('circle3');
		var p4 = jsmap.get('circle4');

		var points:Array<Point> = [p0, p1, p2];
		polygon = createPolygon('polygon0', points);
		polygon.classList.add('static');
		svg.appendChild(polygon);

		line = createLine('line0', p3, p4);
		line.classList.add('static');
		svg.appendChild(line);

		jsmap.forEach(function(value, key, jsmap):Void {
			var p = jsmap.get(key);
			var circle = createCircle('$key', p.x, p.y);
			circle.classList.add('draggable');
			svg.appendChild(circle);
		});
	}

	function updateShapes() {
		updateLine();
		updatePolygon();
	}

	function updateLine() {
		var p3 = jsmap.get('circle3');
		var p4 = jsmap.get('circle4');
		line.setAttribute('x1', '${p3.x}');
		line.setAttribute('y1', '${p3.y}');
		line.setAttribute('x2', '${p4.x}');
		line.setAttribute('y2', '${p4.y}');
	}

	function updatePolygon() {
		var p0 = jsmap.get('circle0');
		var p1 = jsmap.get('circle1');
		var p2 = jsmap.get('circle2');

		var points:Array<Point> = [p0, p1, p2];
		polygon.setAttribute("points", updatePolygonPoints(points));
	}

	function updatePolygonPoints(points:Array<Point>) {
		var str = '';
		for (i in 0...points.length) {
			var p = points[i];
			// trace(p);
			str += '${p.x},${p.y} ';
		}
		return str;
	}

	// ____________________________________ onMouse handlers ____________________________________

	function onMouseDownHandler(e:MouseEvent) {
		var el:SVGElement = cast e.target;
		if (el.classList.contains('draggable')) {
			// trace('onMouseDownHandler($e)');
			// console.log(e);
			selectedElement = el;
			// trace(el.nodeName);
			offset = getMousePosition(e);
			offset.x -= Std.parseFloat(selectedElement.getAttributeNS(null, "cx"));
			offset.y -= Std.parseFloat(selectedElement.getAttributeNS(null, "cy"));
		}
	}

	function onMouseMoveHandler(e:MouseEvent) {
		if (selectedElement != null) {
			// trace('Drag');
			var el:SVGElement = cast e.target;
			e.preventDefault();
			var coord = getMousePosition(e);
			var p:Point = {
				x: coord.x - offset.x,
				y: coord.y - offset.y
			}

			var id = (el.id);
			map.set(id, p);
			jsmap.set(id, p);

			switch (el.nodeName) {
				case 'circle':
					selectedElement.setAttributeNS(null, "cx", '${coord.x - offset.x}');
					selectedElement.setAttributeNS(null, "cy", '${coord.y - offset.y}');
				case 'x':
					selectedElement.setAttributeNS(null, "x", '${coord.x - offset.x}');
					selectedElement.setAttributeNS(null, "y", '${coord.y - offset.y}');
			}
			updateShapes();
		}
	}

	function onMouseUpHandler(e:MouseEvent) {
		// trace('onMouseUpHandler');
		selectedElement = null;
	}

	// ____________________________________ mouse magic ____________________________________

	function getMousePosition(evt):Point {
		var CTM = svg.getScreenCTM();
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}

	// ____________________________________ create svg/shapes ____________________________________

	function createSVG() {
		// create the svg element
		var svg:SVGElement = cast document.createElementNS("http://www.w3.org/2000/svg", "svg");
		// set viewbox
		svg.setAttribute("viewBox", '0 0 $svgW $svgH');
		// set width and height
		svg.setAttribute("width", '$svgW ');
		svg.setAttribute("height", '$svgH ');
		return svg;
	}

	function createCircle(id:String, x:Float, y:Float, r:Float = 15) {
		// create a shape
		var shape:CircleElement = cast document.createElementNS("http://www.w3.org/2000/svg", "circle");
		shape.setAttribute("id", '${id}');
		// pos
		shape.setAttribute("cx", '${x}');
		shape.setAttribute("cy", '${y}');
		shape.setAttribute("r", '${r}');
		// fill
		shape.setAttribute("fill", "#00FFFF");
		shape.setAttribute("fill-opacity", "0.7");
		// stroke
		shape.setAttribute("stroke", "black");
		shape.setAttribute("stroke-width", "2");
		return shape;
	}

	function createLine(id:String, p0:Point, p1:Point) {
		var shape:LineElement = cast document.createElementNS('http://www.w3.org/2000/svg', 'line');
		shape.setAttribute("id", '${id}');
		// shape.setAttribute('id', 'line2');
		shape.setAttribute('x1', '${p0.x}');
		shape.setAttribute('y1', '${p0.y}');
		shape.setAttribute('x2', '${p1.x}');
		shape.setAttribute('y2', '${p1.y}');
		// stroke
		shape.setAttribute("stroke", "black");
		shape.setAttribute("stroke-width", "3");
		return shape;
	}

	function createPolygon(id:String, points:Array<Point>) {
		var shape:PolygonElement = cast document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		shape.setAttribute("id", '${id}');
		// points
		shape.setAttribute("points", updatePolygonPoints(points));
		// fill
		shape.setAttribute("fill", "#00FFFF");
		shape.setAttribute("fill-opacity", "0.7");
		// stroke
		shape.setAttribute("stroke", "black");
		shape.setAttribute("stroke-width", "3");
		return shape;
	}

	static public function main() {
		var app = new SvgEditor();
	}
}
