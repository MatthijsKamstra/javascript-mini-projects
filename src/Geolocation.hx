import haxe.Json;
import haxe.Constraints.Function;
import js.Lib;

class Geolocation {
	// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
	// https://www.w3schools.com/html/html5_geolocation.asp
	// Geolocation.getCurrentPosition()
	var searchUrl = 'https://www.metaweather.com/api/location/search/'; // ?lattlong=(latt),(long)';
	// var corsUrl = 'https://cors-anywhere.herokuapp.com/'; // limited
	var corsUrl = 'https://yacdn.org/proxy/';

	var long:Float;
	var latt:Float;

	var div:DivElement;

	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Geolocation - Dom ready');
			init();
		});
	}

	function init() {
		getElement();
		getPosition();
	}

	function getElement() {
		div = cast document.getElementById('longlatt');
	}

	function getData() {
		var url = '${corsUrl}${searchUrl}?lattlong=${latt},${long}';
		// var url = '${searchUrl}?lattlong=${latt},${long}';
		trace(url);
		loadData(url, onLoadCompleteHandler);
	}

	function getPosition() {
		var options:PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	function success(pos:Position):Void {
		var crd:Coordinates = pos.coords;

		console.log('Your current position is:');
		console.log('Latitude : ${crd.latitude}');
		console.log('Longitude: ${crd.longitude}');
		console.log('More or less ${crd.accuracy} meters.');

		long = crd.longitude;
		latt = crd.latitude;

		var html = '';
		html += '<pre>';
		html += 'Your current position is:';
		html += '\n- Latitude : ${crd.latitude}';
		html += '\n- Longitude: ${crd.longitude}';
		html += '\n- More or less ${crd.accuracy} meters.';
		html += '</pre>';

		div.innerHTML = html;
		getData();
	}

	function error(err:PositionError) {
		console.warn('ERROR(${err.code}): ${err.message}');
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

	// amsterdam   52.349744609646166,4.788564319130978
	function onLoadCompleteHandler(data) {
		trace(data);

		var json = Json.parse(data);

		var arr:Array<LongLattObj> = json;
		for (i in 0...arr.length) {
			var _LongLattObj:LongLattObj = arr[i];
			trace(_LongLattObj);

			// var div:DivElement = document.createDivElement();

			// var date = Date.fromString(_WeatherObj.applicable_date);

			// div.innerHTML = '<img src="https://www.metaweather.com/static/img/weather/${_WeatherObj.weather_state_abbr}.svg" alt="${_WeatherObj.weather_state_name}" width="30px"> ${daysOfTheWeek[date.getDay()]},  min: ${Math.floor(_WeatherObj.min_temp)}℃, max: ${Math.floor(_WeatherObj.max_temp)}℃';
			// weatherDiv.appendChild(div);
		}
	}

	static public function main() {
		var app = new Geolocation();
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

typedef LongLattObj = {
	var distance:Int; // 7553
	var title:String; // Amsterdam"
	var location_type:String; // City",
	var woeid:Int; // 727232
	var latt_long:String; // 52.373119,4.893190"
}
