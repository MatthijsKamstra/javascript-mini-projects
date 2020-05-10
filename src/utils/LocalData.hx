package utils;

import haxe.Json;

class LocalData {
	static var isDebug = true;
	static var json:Dynamic;

	// CRUD: Create Read Update Delete
	public function new() {
		// your code
	}

	// create

	/**
	 * create the database or get the previous information (isOverwrite==false)
	 * @param name
	 * @param isOverwrite
	 */
	public static function create(name:String, ?isOverwrite:Bool = false) {
		if (isDebug)
			console.info("get local storage");

		json = Json.parse(window.localStorage.getItem(name));
		// if (isDebug) console.info(json);
		if (json == null || isOverwrite) {
			json = {
				_id: 'localdata-${Date.now().getTime()}',
				version: '0.0.1',
				creationDate: Date.now().toString(),
				updateDate: Date.now().toString(),
			}
			// window.localStorage.setItem(name, Json.stringify(json));

			if (isDebug) {
				console.log('initialize database:' + Json.stringify(json));
			}
		}

		saveData(name);
	}

	// read
	public static function read(name:String, key:String) {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}

		if (Reflect.hasField(json, key)) {
			return Reflect.getProperty(json, key);
		} else {
			return null;
		}
	}

	/**
	 * load data
	 * @param name			dataBase name
	 * @return Dynamic 		json value
	 */
	public static function load(name:String):Dynamic {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}
		if (json == null) {
			return null;
		} else {
			return json;
		}
	}

	// update
	public static function update(name:String, key:String, value:Dynamic) {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}

		// if (Reflect.hasField(json, key)) {
		Reflect.setProperty(json, key, value);
		Reflect.setProperty(json, 'updateDate', Date.now().toString());
		// }

		saveData(name);
	}

	// delete

	/**
	 * [Description]
	 *  @param name			dataBase name
	 * @param key
	 */
	public static function delete(name:String, key:String) {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}

		if (Reflect.hasField(json, key)) {
			Reflect.deleteField(json, key);
		}

		saveData(name);
	}

	/**
	 * remove localStorage with (db)Name
	 *  @param name			dataBase name
	 */
	public static function clear(name:String) {
		json = null;
		window.localStorage.removeItem(name);
		if (isDebug)
			console.log('cleared data "$name"');
	}

	// ____________________________________ private ____________________________________

	private static function saveData(name:String) {
		window.localStorage.setItem(name, Json.stringify(json));
		if (isDebug)
			console.log(json);
	}
}
