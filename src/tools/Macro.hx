package tools;

import AST.JsonObj;
#if macro
import haxe.Json;
import haxe.io.Path;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
import sys.FileSystem;
import sys.FileStat;
import sys.io.File;
import AST.ProjectObj;

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

	// folders I know I don't need to be generated
	private static var ignoreArr = ['_example', 'assets', 'cgi-bin'];

	//
	public static var json:Dynamic = null;

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
			generateFromFolder(docFolder);
		} else {
			Context.warning('You might be using a different folder structure: this will not work!', Context.currentPos());
		}
	}

	public static function generateFromFolder(folder):Void {
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
		// generateNav(folder, fileNames);
		// generateCardsHTML(folder, fileNames); // don't need that anymore
		generateMD(folder, fileNames);
	}

	private static function generateMD(folder:String, fileNames:Array<String>) {
		var md = '| # | Name | type | link |\n| --- | --- | --- |\n';

		if (Macro.json == null)
			return;

		var _json:JsonObj = Macro.json;
		var _arr:Array<ProjectObj> = _json.data;
		for (i in 0..._arr.length) {
			var _projectObj = _arr[i];
			// trace(_projectObj);
			md += '| ${i + 1} | ${capFirstLetter(_projectObj.title)} | ${_projectObj.tags.toString().replace('[', '').replace(']', '')} | [link](docs/${_projectObj.url}) |\n';
		}

		var templateMarkdown = folder + '/_list.md';
		File.saveContent(templateMarkdown, md);
	}

	private static function generateJson(folder:String, fileNames:Array<String>) {
		var json = {};
		Reflect.setField(json, 'updated', Date.now().toString());
		// Reflect.setField(json, 'folder', folder);
		var arr:Array<ProjectObj> = [];
		// create list

		for (fileName in fileNames) {
			var path = folder + '/' + fileName;
			if (FileSystem.isDirectory(path)) {
				// folders

				// ignore folder that start with `_`
				if (fileName.startsWith("_"))
					continue;

				if (ignoreArr.indexOf(fileName) == -1) {
					// trace('>> foldername: ' + fileName);

					var filestat:FileStat = FileSystem.stat(path);
					// trace(filestat.mtime);
					// trace(filestat.ctime);
					// trace(filestat.atime);

					// create ProjectObj
					var obj:ProjectObj = {'title': ''};

					// Reflect.setField(obj, 'title', capFirstLetter(fileName));
					obj.title = capFirstLetter(fileName);
					obj.path = '$folder/$fileName'.replace('${Sys.getCwd()}', '');
					obj.url = '$fileName'.replace('${Sys.getCwd()}', '');

					// just being lazy, make sure every project has these

					var tagPath = Path.join([path, 'tags.md']);
					var descPath = Path.join([path, 'description.md']);
					if (!FileSystem.exists(tagPath)) {
						trace('----> no tags.md? ${tagPath}');
						File.write(tagPath);
					}
					if (!FileSystem.exists(descPath)) {
						trace('----> no description.md? ${descPath}');
						File.write(descPath);
					}
					// use default image, if there is a `screenshot` file, use that!
					// obj.img = '../docs/assets/img/Screenshot.png';

					// read folder
					var projectFolderFiles:Array<String> = FileSystem.readDirectory(path);
					for (i in 0...projectFolderFiles.length) {
						var _projectFolderFiles = projectFolderFiles[i];
						// trace('\t>> ' + _projectFolderFiles);

						// Screenshot.png / Screenshot.jpg
						if (_projectFolderFiles.toLowerCase().indexOf('screenshot') != -1) {
							// Reflect.setField(obj, 'img', '${_projectFolderFiles}');
							obj.img = _projectFolderFiles;
						}
						if (_projectFolderFiles.toLowerCase().indexOf('description') != -1) {
							// Reflect.setField(obj, 'img', '${_projectFolderFiles}');
							var content = File.getContent(folder + '/' + fileName + '/' + _projectFolderFiles);
							if (content == '') {
								content = obj.title;
							}
							obj.description = content;

							var maxChar = 150; // might need to be bigger?
							obj.shortdesc = content.substring(0, maxChar) + " ...";
						}
						if (_projectFolderFiles.toLowerCase().indexOf('tags') != -1) {
							// Reflect.setField(obj, 'img', '${_projectFolderFiles}');
							var content = File.getContent(folder + '/' + fileName + '/' + _projectFolderFiles);
							var _arr = content.replace('- ', '').split('\n');
							_arr.remove('');
							obj.tags = _arr;
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

		Macro.json = json;
	}

	private static function capFirstLetter(str:String):String {
		var tempstr = '';
		tempstr = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
		return tempstr;
	}

	// ____________________________________ deprecated ____________________________________

	private static function generateNav(folder:String, fileNames:Array<String>) {
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
	}

	private static function generateCardsHTML(folder:String, fileNames:Array<String>) {
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
}
#end
