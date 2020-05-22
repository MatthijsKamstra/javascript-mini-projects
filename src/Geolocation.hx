class Geolocation {
	// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
	// https://www.w3schools.com/html/html5_geolocation.asp
	// Geolocation.getCurrentPosition()
	public function new() {
		trace('Geolocation');

		var options:PositionOptions = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	function success(pos:Position):Void {
		var crd = pos.coords;

		console.log('Your current position is:');
		console.log('Latitude : ${crd.latitude}');
		console.log('Longitude: ${crd.longitude}');
		console.log('More or less ${crd.accuracy} meters.');
	}

	function error(err:PositionError) {
		console.warn('ERROR(${err.code}): ${err.message}');
	}

	static public function main() {
		var app = new Geolocation();
	}
}
