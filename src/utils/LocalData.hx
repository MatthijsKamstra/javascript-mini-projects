package utils;

import haxe.Json;

class LocalData {
	static var isDebug = true;
	static var json:Dynamic;

	// CRUD: Create Read Update Delete
	public function new() {}

	// create

	/**
	 * create the database or get the previous information
	 *
	 * if (isOverwrite == false) the 'database' is not created and not overwritten
	 *
	 * @param name			dataBase name
	 * @param isOverwrite	possible to reset the database/overwrite with original data
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
				created: Date.now().toString(),
				updated: Date.now().toString(),
			}
			// window.localStorage.setItem(name, Json.stringify(json));

			if (isDebug) {
				console.log('initialize database:' + Json.stringify(json));
			}
		}

		saveData(name);
	}

	// read

	/**
	 * read/load data from "database", send key and get specific data
	 *
	 * @example
	 * 				var json = LocalData.read('databaseName'); // get whole json
	 * 				var version = LocalData.read('databaseName', 'version'); // version from json (untyped)
	 *
	 * @param name			dataBase name
	 * @param key			(optional) key to get from json
	 * @return Dynamic		json/object or null
	 */
	public static function read(name:String, ?key:String) {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}

		if (key == null) {
			return json;
		}

		if (Reflect.hasField(json, key)) {
			return Reflect.getProperty(json, key);
		} else {
			return null;
		}
	}

	/**
	 * load data (syntactic sugar for read without a key param)
	 *
	 * @example
	 * 				var json = LocalData.load('databaseName'); // get json
	 *
	 * @param name			dataBase name
	 * @param key			(optional) key to get from json
	 * @return Dynamic		json/object or null
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

	/**
	 * update data (essential overwriting data: be careful with arrays and object)
	 *
	 * in the process the `updated` is updated to current date
	 *
	 * @example
	 * 				var json = LocalData.update('databaseName', 'test', 'foo');
	 *
	 * @param name			dataBase name
	 * @param key			(optional) key to get from json
	 * @param value
	 */
	public static function update(name:String, key:String, value:Dynamic) {
		if (json == null) {
			json = Json.parse(window.localStorage.getItem(name));
		}

		// if (Reflect.hasField(json, key)) {
		Reflect.setProperty(json, key, value);
		Reflect.setProperty(json, 'updated', Date.now().toString());
		// }

		saveData(name);
	}

	// delete

	/**
	 * [Description]
	 * @example
	 * 				var json = LocalData.delete('databaseName', 'test');
	 *
	 * @param name			dataBase name
	 * @param key			(optional) key to get from json
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
	 *
	 * @param name			dataBase name
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
