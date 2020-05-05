package;

import haxe.macro.Context;

class App {
	public static var NAME:String = "[js-mini-projects]";

	public static macro function getBuildDate() {
		#if !display
		var date = Date.now().toString();
		return macro $v{date};
		#else
		var date = Date.now().toString();
		return macro $v{date};
		#end
	}
}
