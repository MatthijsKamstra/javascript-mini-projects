typedef Point = {
	@:optional var _id:String;
	var x:Float;
	var y:Float;
}

typedef ProjectObj = {
	@:optional var _id:String;
	var title:String;
	@:optional var url:String; // from the root folder (without `docs`)
	@:optional var img:String;
	@:optional var path:String; // from the compile folder (with `docs`)
	@:optional var description:String; // everything written in `descriptoin.md`
	@:optional var shortdesc:String; // shorter version of the description
	@:optional var tags:Array<String>;
}
