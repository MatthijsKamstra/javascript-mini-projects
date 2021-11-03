using StringTools;

class Csv2Md {
	// elements
	var dropzone:DivElement;
	var dropzoneOutput:DivElement;
	var textArea:TextAreaElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Csv2Md - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		setDropZone();
	}

	function setElements() {
		dropzone = cast document.getElementById("dropzone");
		dropzoneOutput = cast document.getElementById("dropzone-output");

		textArea = cast document.getElementById('js-output-textarea');
		var button = cast document.getElementById('js-copy-btn');
		button.onclick = onClickHandler;
	}

	function onClickHandler(e:Event) {
		e.preventDefault();
		textArea.select();
		document.execCommand('copy');
	}

	function setDropZone() {
		dropzone.ondragover = dropzone.ondragenter = function(e:DragEvent) {
			e.stopPropagation();
			e.preventDefault();
			dropzone.classList.add('active');
		}

		dropzone.ondrop = function(e:DragEvent) {
			e.stopPropagation();
			e.preventDefault();
			dropzone.classList.remove('active');

			console.log(e);

			dropzoneOutput.innerText = '';
			var list = document.createElement("ul");
			dropzoneOutput.appendChild(list);

			var filesArray:FileList = e.dataTransfer.files;
			for (i in 0...filesArray.length) {
				var file:File = filesArray[i];
				// sendFile(file);
				trace(file);

				var li = document.createElement("li");
				list.appendChild(li);

				switch (file.type) {
					case 'text/csv':
						convertFile2String(file);
					default:
						trace("case '" + file.type + "': trace ('" + file.type + "');");
				}

				// var img = document.createElement("img");
				// img.src = URL.createObjectURL(this.files[i]);
				// img.height = 60;
				// img.onload = function() {
				// 	URL.revokeObjectURL(this.src);
				// }
				// li.appendChild(img);

				var info = document.createElement("span");
				info.innerHTML = type2Icon(file.type) + " " + file.name + ": " + file.size + " bytes, type: " + file.type;
				li.appendChild(info);
			}
		}
	}

	function type2Icon(type:String):String {
		switch (type) {
			case 'text/markdown':
				return '<i class="fa fa-file-text-o"></i>';
			case 'application/json':
				return '<i class="fa fa-file-code-o"></i>';
			case 'image/png', 'image/jpg':
				return '<i class="fa fa-file-picture-o"></i>';
			case 'text/csv':
				return '<i class="fa fa-file-excel-o"></i>';
			default:
				trace("case '" + type + "': trace ('" + type + "'); return '<i class=\"fa fa-file\"></i>'");
				return '<i class="fa fa-file"></i>';
		}
	}

	function convertFile2String(file:File) {
		// trace(file);
		var content = "";
		var reader = new FileReader();

		reader.addEventListener('load', function(e) {
			content = e.target.result;
			var arr = convert2Markdown(content);
			var md = generateMarkdownTable(arr);
			var textarea:TextAreaElement = cast document.getElementById('js-output-textarea');
			textarea.value = md;
		});
		reader.readAsBinaryString(file);
	}

	function generateMarkdownTable(arr) {
		var md = '';
		var line = '';
		for (i in 0...arr.length) {
			var row = arr[i];
			for (j in 0...row.length) {
				var col = row[j];
				md += '| ${col} ';
				if (i == 0)
					line += '| ---- ';
			}
			md += '|\n';
			if (i == 0)
				md += '${line}|\n';
		}
		console.info(md);
		return md;
	}

	/**
	 * full of assumptions: the seporator is `,` (comma)
	 *
	 * @param csv 	string file with , as separators
	 */
	function convert2Markdown(csv:String) {
		var arr = [];
		var rowArr = csv.split('\n');
		for (i in 0...rowArr.length) {
			var row = rowArr[i];
			var colArr = row.split(',');
			// trace(row);
			// arr.push(colArr);
			var cleanColArr = [];
			for (j in 0...colArr.length) {
				var col = colArr[j].replace('"', '').replace("'", "").trim();
				// trace(col);
				cleanColArr.push(col);
			}
			arr.push(cleanColArr);
		}
		return arr;
	}

	static public function main() {
		var app = new Csv2Md();
	}
}
