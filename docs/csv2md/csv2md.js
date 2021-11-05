(function ($global) { "use strict";
class Csv2Md {
	constructor() {
		let _gthis = this;
		window.document.addEventListener("DOMContentLoaded",function(event) {
			$global.console.log("Csv2Md - Dom ready");
			_gthis.init();
		});
	}
	init() {
		this.setElements();
		this.setDropZone();
	}
	setElements() {
		this.dropzone = window.document.getElementById("dropzone");
		this.dropzoneOutput = window.document.getElementById("dropzone-output");
		this.textArea = window.document.getElementById("js-output-textarea");
		let button = window.document.getElementById("js-copy-btn");
		button.onclick = $bind(this,this.onClickHandler);
	}
	onClickHandler(e) {
		e.preventDefault();
		this.textArea.select();
		window.document.execCommand("copy");
	}
	setDropZone() {
		let _gthis = this;
		this.dropzone.ondragover = this.dropzone.ondragenter = function(e) {
			e.stopPropagation();
			e.preventDefault();
			_gthis.dropzone.classList.add("active");
		};
		this.dropzone.ondrop = function(e) {
			e.stopPropagation();
			e.preventDefault();
			_gthis.dropzone.classList.remove("active");
			$global.console.log(e);
			_gthis.dropzoneOutput.innerText = "";
			let list = window.document.createElement("ul");
			_gthis.dropzoneOutput.appendChild(list);
			let filesArray = e.dataTransfer.files;
			let _g = 0;
			let _g1 = filesArray.length;
			while(_g < _g1) {
				let i = _g++;
				let file = filesArray[i];
				console.log("src/Csv2Md.hx:58:",file);
				let li = window.document.createElement("li");
				list.appendChild(li);
				if(file.type == "text/csv") {
					_gthis.convertFile2String(file);
				} else {
					console.log("src/Csv2Md.hx:67:","case '" + file.type + "': trace ('" + file.type + "');");
				}
				let info = window.document.createElement("span");
				info.innerHTML = _gthis.type2Icon(file.type) + " " + file.name + ": " + file.size + " bytes, type: " + file.type;
				li.appendChild(info);
			}
		};
	}
	type2Icon(type) {
		switch(type) {
		case "application/json":
			return "<i class=\"fa fa-file-code-o\"></i>";
		case "image/jpg":case "image/png":
			return "<i class=\"fa fa-file-picture-o\"></i>";
		case "text/csv":
			return "<i class=\"fa fa-file-excel-o\"></i>";
		case "text/markdown":
			return "<i class=\"fa fa-file-text-o\"></i>";
		default:
			console.log("src/Csv2Md.hx:96:","case '" + type + "': trace ('" + type + "'); return '<i class=\"fa fa-file\"></i>'");
			return "<i class=\"fa fa-file\"></i>";
		}
	}
	convertFile2String(file) {
		let content = "";
		let reader = new FileReader();
		let _gthis = this;
		reader.addEventListener("load",function(e) {
			content = e.target.result;
			let arr = _gthis.convert2Markdown(content);
			let md = _gthis.generateMarkdownTable(arr);
			let textarea = window.document.getElementById("js-output-textarea");
			textarea.value = md;
		});
		reader.readAsBinaryString(file);
	}
	generateMarkdownTable(arr) {
		let md = "";
		let line = "";
		let _g = 0;
		let _g1 = arr.length;
		while(_g < _g1) {
			let i = _g++;
			let row = arr[i];
			let _g1 = 0;
			let _g2 = row.length;
			while(_g1 < _g2) {
				let j = _g1++;
				let col = row[j];
				md += "| " + col + " ";
				if(i == 0) {
					line += "| ---- ";
				}
			}
			md += "|\n";
			if(i == 0) {
				md += "" + line + "|\n";
			}
		}
		$global.console.info(md);
		return md;
	}
	convert2Markdown(csv) {
		let arr = [];
		let rowArr = csv.split("\n");
		let _g = 0;
		let _g1 = rowArr.length;
		while(_g < _g1) {
			let i = _g++;
			let row = rowArr[i];
			let colArr = row.split(",");
			let cleanColArr = [];
			let _g1 = 0;
			let _g2 = colArr.length;
			while(_g1 < _g2) {
				let j = _g1++;
				let col = StringTools.trim(StringTools.replace(StringTools.replace(colArr[j],"\"",""),"'",""));
				cleanColArr.push(col);
			}
			arr.push(cleanColArr);
		}
		return arr;
	}
	static main() {
		let app = new Csv2Md();
	}
}
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
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
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
{
}
Csv2Md.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
