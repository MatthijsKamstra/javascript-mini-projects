import haxe.Json;
import js.Lib;
import haxe.Constraints.Function;

class Weather {
	var weatherDiv:DivElement;

	var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Desktop - Dom ready');
			init();
		});
	}

	function init() {
		getElement();
		getData();
	}

	function getData() {
		// hack: https://cors-anywhere.herokuapp.com/
		var urlSearch = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=amsterdam';
		// answer gave us:
		var amsterdamID = '727232';
		// use this to get the prediction for the 5 days
		// var urlLocation = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${amsterdamID}';

		// stop hacking, be gentle on the free weather api
		var debugUrl = 'api.json';
		loadData(debugUrl, onLoadCompleteHandler);
	}

	function getElement() {
		weatherDiv = cast document.getElementById('weather');
	}

	function onLoadCompleteHandler(data) {
		var json = Json.parse(data);
		var arr:Array<WeatherObj> = json.consolidated_weather;
		for (i in 0...arr.length) {
			var _WeatherObj:WeatherObj = arr[i];
			trace(_WeatherObj);

			var div:DivElement = document.createDivElement();

			var date = Date.fromString(_WeatherObj.applicable_date);

			div.innerHTML = '<img src="https://www.metaweather.com/static/img/weather/${_WeatherObj.weather_state_abbr}.svg" alt="${_WeatherObj.weather_state_name}" width="30px"> ${daysOfTheWeek[date.getDay()]},  min: ${Math.floor(_WeatherObj.min_temp)}℃, max: ${Math.floor(_WeatherObj.max_temp)}℃';
			weatherDiv.appendChild(div);
		}
	}

	/**
	 * loading data, check if file exists before generating navigation
	 * @param url 		load file from here
	 * @param callback 	if file exists and is loaded, use this callbakc
	 */
	function loadData(url:String, callback:Function) {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (Lib.nativeThis.readyState == 4 && Lib.nativeThis.status == 200) {
				// console.log(Lib.nativeThis.responseText);
				// finishSetup();
			}
		};
		req.onload = function() {
			var body = req.response;

			if (Lib.nativeThis.status == 200)
				callback(body);
		};
		req.onerror = function(error) {
			console.error('[JS] error: $error');
		};
		req.open('GET', url);
		req.send();
	}

	static public function main() {
		var app = new Weather();
	}
}

typedef WeatherObj = {
	var id:Int;
	var weather_state_name:String; // "Heavy Cloud",
	var weather_state_abbr:String; // hc
	var wind_direction_compass:String; // NW
	var created:String; // "2020-05-15T09:23:56.727485Z",
	var applicable_date:String; // "2020-05-15
	var min_temp:Float;
	var max_temp:Float;
	var the_temp:Float;
	var wind_speed:Float;
	var wind_direction:Float; // 317.3284723925775
	var air_pressure:Float;
	var humidity:Int;
	var visibility:Float;
	var predictability:Int; // 71
}
