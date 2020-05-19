package tools;

import sys.FileStat;
import haxe.Json;
#if macro
import haxe.io.Path;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
import sys.FileSystem;
import sys.io.File;

using StringTools;

class Macro {
	public static var templateHTML = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>::title::</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col">
::nav::
			</div>
		</div>
	</div>
	<!-- /.container -->
</body>
</html>';

	private static var ignoreArr = ['_example', 'assets'];

	/**
	 * @example
	 * 			--macro tools.Macro.buildTemplate(true)
	 *
	 * @param overwrite
	 * @return Array<Field>
	 */
	public static function buildTemplate(?overwrite:Bool = false) {
		var cwd:String = Sys.getCwd();

		// trace(cwd);

		var docFolder = Path.join([cwd, 'docs']);

		if (FileSystem.exists(docFolder)) {
			// [mck] just generate that folder... I don't care!
			// if (!FileSystem.exists(templateDstFolder))
			// 	FileSystem.createDirectory(templateDstFolder);
			generateFromFolder(docFolder);
		} else {
			Context.warning('You might be using a different folder structure: this will not work!', Context.currentPos());
		}
	}

	public static function generateFromFolder(folder):Void {
		// var fileNames = FileSystem.readDirectory(folder);

		var fileNames:Array<String> = FileSystem.readDirectory(folder);
		// sort alfabetical
		fileNames.sort(function(a:String, b:String):Int {
			a = a.toLowerCase();
			b = b.toLowerCase();
			if (a < b)
				return -1;
			if (a > b)
				return 1;
			return 0;
		});

		generateJson(folder, fileNames);

		var md = '| Name | type | link |\n| --- | --- | --- |\n';

		// create list
		var ul = '<ul class="project-link">\n';
		ul += '\t<li><a href="../">Home</a></li>\n';
		for (fileName in fileNames) {
			if (FileSystem.isDirectory(folder + '/' + fileName)) {
				// folders

				// ignore folder that start with `_`
				if (fileName.startsWith("_"))
					continue;

				if (ignoreArr.indexOf(fileName) == -1) {
					// trace('>> ' + fileName);
					ul += '\t<li><a href="../$fileName">' + capFirstLetter(fileName) + '</a></li>\n';

					md += '| ${capFirstLetter(fileName)} | ? | [link](docs/${fileName}) |\n';
				}
			} else {
				// files
			}
		}
		ul += '</ul>';

		var tempTemplateFile = folder + '/_nav.html';
		var templateMarkdown = folder + '/_list.md';

		var file = {nav: ul, title: 'Generated'};
		var template = new haxe.Template(templateHTML);
		var output = template.execute(file);

		File.saveContent(tempTemplateFile, output);

		File.saveContent(templateMarkdown, md);

		// create cards
		var templateCard = '
<div class="col-3">
<div class="card">
<img src="::imgsource::" class="card-img-top" alt="::title::">
<div class="card-body">
<p class="card-text">::content::</p>
<a href="::url::" class="card-link">Visit ::title::</a>
</div>
</div>
</div>';

		var row = '<div class="row">\n';
		for (fileName in fileNames) {
			if (FileSystem.isDirectory(folder + '/' + fileName)) {
				// folders

				// ignore folder that start with `_`
				if (fileName.startsWith("_"))
					continue;

				if (ignoreArr.indexOf(fileName) == -1) {
					// trace('>> ' + fileName);
					// ul += '\t<li><a href="../$fileName">' + capFirstLetter(fileName) + '</a></li>\n';

					var defaultImg = '../assets/svg/imagecap.svg';

					var file = {
						url: '../$fileName',
						// imgsource: '../$fileName/screenshot.png',
						imgsource: defaultImg,
						title: capFirstLetter(fileName),
						content: 'bla bla'
					};
					var template = new haxe.Template(templateCard);
					var output = template.execute(file);

					row += output;
				}
			} else {
				// files
			}
		}
		row += '</div>';

		var tempTemplateFile = folder + '/_cards.html';

		var file = {nav: row, title: 'Generated'};
		var template = new haxe.Template(templateHTML);
		var output = template.execute(file);

		File.saveContent(tempTemplateFile, output);
	}

	private static function generateJson(folder:String, fileNames:Array<String>) {
		var json = {};
		Reflect.setField(json, 'updated', Date.now().toString());
		Reflect.setField(json, 'folder', folder);
		var arr = [];
		// create list

		for (fileName in fileNames) {
			if (FileSystem.isDirectory(folder + '/' + fileName)) {
				// folders

				// ignore folder that start with `_`
				if (fileName.startsWith("_"))
					continue;

				if (ignoreArr.indexOf(fileName) == -1) {
					trace('>> ' + fileName);

					var filestat:FileStat = FileSystem.stat(folder + '/' + fileName);
					// trace(filestat);
					// var lastModivicationTime:Date = filestat.mtime;
					// var creationTime:Date = filestat.ctime;

					// trace(filestat.mtime);
					// trace(filestat.ctime);
					// trace(filestat.atime);

					/**
						{
												 img:"Screenshot.jpg",
												 title: "Example",
												 path: "docs",
												 desciption:'xxxx',
												 tags:['xx','bbb'],

												}
					 */

					var obj = {};

					Reflect.setField(obj, 'title', capFirstLetter(fileName));

					var __fileNames:Array<String> = FileSystem.readDirectory(folder + '/' + fileName);

					for (i in 0...__fileNames.length) {
						var ___fileNames = __fileNames[i];
						trace('\t>> ' + ___fileNames);

						// Screenshot.png / Screenshot.jpg
						if (___fileNames.toLowerCase().indexOf('screenshot') != -1) {
							Reflect.setField(obj, 'img', '${___fileNames}');
						}
					}
					arr.push(obj);
				}
			} else {
				// files
			}
		}
		Reflect.setField(json, 'data', arr);
		var jsonName = folder + '/data.json';
		File.saveContent(jsonName, Json.stringify(json));
	}

	private static function capFirstLetter(str:String):String {
		var tempstr = '';
		tempstr = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
		return tempstr;
	}
}
#end
