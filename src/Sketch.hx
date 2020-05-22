import AST.Point;
import js.html.svg.SetElement;

class Sketch {
	// elemetns
	var canvas:CanvasElement;
	var ctx:CanvasRenderingContext2D;
	// default color and size
	var color = "black";
	var lineWidth = 2;
	// mouse
	var isMouseDown:Bool = false;
	// points
	var previousP:Point;
	var currentP:Point;
	// scale
	var scale = 1.0;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Sketch - Dom ready');
			init();
		});
	}

	function init() {
		setElement();
	}

	function setElement() {
		canvas = cast document.getElementById('canvasElement');
		// set the width of the canvas to the size of the html/css
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		ctx = canvas.getContext2d();

		// scale, only usefull if you would use a very big canvas and scale it down with css
		scale = canvas.width / canvas.clientWidth;
		// console.log(scale);

		// get color buttons
		document.getElementById('green').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('blue').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('red').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('yellow').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('orange').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('black').onclick = (e:MouseEvent) -> {
			color = cast(e.currentTarget, DivElement).id;
		}
		document.getElementById('btn-save').onclick = (e:MouseEvent) -> {
			saveCanvas();
		}
		document.getElementById('btn-clear').onclick = (e:MouseEvent) -> {
			clearCanvas();
		}

		// mouse actions
		canvas.onmousedown = onMouseDownHandler;
		canvas.onmousemove = onMouseMoveHandler;
		canvas.onmouseup = onMouseUpHandler;
	}

	// ____________________________________ mouse handers ____________________________________

	function onMouseDownHandler(e:MouseEvent) {
		isMouseDown = true;
		setPosition(e);
	}

	function onMouseMoveHandler(e:MouseEvent) {
		if (isMouseDown) {
			setPosition(e);
		};
	}

	function onMouseUpHandler(e:MouseEvent) {
		// reset previous values
		previousP = null;
		currentP = null;
		isMouseDown = false;
	}

	function setPosition(e:MouseEvent) {
		previousP = currentP;
		var p:Point = {
			x: e.offsetX * scale,
			y: e.offsetY * scale
		};
		currentP = p;
		if (previousP == null)
			previousP = p;
		draw();
	}

	function draw() {
		ctx.beginPath();
		ctx.moveTo(previousP.x, previousP.y);
		ctx.lineTo(currentP.x, currentP.y);
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
	}

	function setColor(obj:Element) {
		color = obj.id;
	}

	function saveCanvas() {
		window.alert("WIP");
	}

	function clearCanvas() {
		var m = window.confirm("Want to clear?");
		if (m) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
	}

	static public function main() {
		var app = new Sketch();
	}
}
