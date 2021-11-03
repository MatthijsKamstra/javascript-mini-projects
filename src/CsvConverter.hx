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

	var csvArr = [];

	public function new() {
		trace('CsvConverter');
		csvArr = convert(csv2);
		trace('column names: ${csvArr[0]}');
		trace('nr colums: ${csvArr[0].length}');
		trace('nr rows: ${csvArr.length - 1}');
		generateMarkdownTable(csvArr);
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
