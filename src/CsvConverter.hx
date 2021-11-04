using StringTools;

class CsvConverter {
	var csv1 = 'FistName,LastName,Age
Henk,de Boer, 3
Jan,Rood , 20
Mien , Fiets , 45';
	var csv2 = 'FistName,LastName,Age
Henk,"de Boer", 3
Jan,Rood , 20
Mien ," Fiets ", 45';
	var csv3 = '"FistName","LastName","Age"
"Henk","de Boer", "3"
"Jan","Rood ", "20"
"Mien" ," Fiets ", "45"';

	var inArea:TextAreaElement;
	var outArea:TextAreaElement;

	public function new() {
		trace('CsvConverter');
		var csvArr = convert(csv2);
		trace('column names: ${csvArr[0]}');
		trace('nr colums: ${csvArr[0].length}');
		trace('nr rows: ${csvArr.length - 1}');
		var md = generateMarkdownTable(csvArr);

		inArea = cast document.getElementById('js-input-textarea');
		inArea.value = csv2;

		outArea = cast document.getElementById('js-output-textarea');
		outArea.value = md;

		var copyBtn = cast document.getElementById('js-copy-btn');
		copyBtn.onclick = onClickHandler;

		var convertBtn = cast document.getElementById('js-convert-btn');
		convertBtn.onclick = onConvertClickHandler;
	}

	function onClickHandler(e) {
		e.preventDefault();
		outArea.select();
		document.execCommand('copy');
	}

	function onConvertClickHandler(e) {
		var str = inArea.value;
		var csvArr = convert(str);
		var md = generateMarkdownTable(csvArr);
		outArea.value = md;
	}

	/**
	 * [Description]
	 * @param arr
	 */
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
	function convert(csv:String) {
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
		var app = new CsvConverter();
	}
}
