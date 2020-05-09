package tools;

#if macro
import haxe.io.Path;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;
import sys.FileSystem;
import sys.io.File;

using StringTools;

class Macro {
	public static var html = '<!DOCTYPE html>
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
		var ignoreArr = ['_example', 'assets'];
		var fileNames = FileSystem.readDirectory(folder);
		var ul = '<ul class="nav-link">\n';
		for (fileName in fileNames) {
			if (FileSystem.isDirectory(folder + '/' + fileName)) {
				// trace(fileName);
				// // ignore invisible (OSX) files like ".DS_Store"
				if (fileName.startsWith("_"))
					continue;

				if (ignoreArr.indexOf(fileName) == -1) {
					// trace('>> ' + fileName);
					ul += '\t<li><a href="../$fileName">' + fileName + '</a></li>\n';
				}
			} else {
				// [mck] untested folder stucture copy from sourcefolder
				// FileSystem.createDirectory(binFolder + '/' + fileName + '/');
				// generateFromFolder(folder + '/' + fileName, binFolder);
			}
		}
		ul += '</ul>';

		var tempTemplateFile = folder + '/_nav.html';

		var file = {nav: ul, title: 'Generated: ${Date.now()}'};
		var template = new haxe.Template(html);
		var output = template.execute(file);

		File.saveContent(tempTemplateFile, output);
	}

	private static function capString(str:String):String {
		var tempstr = '';
		tempstr = str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
		return tempstr;
	}
}
#end
