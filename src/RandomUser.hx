import haxe.Json;
import js.lib.Error;
import js.Browser;
import js.Browser.window;

class RandomUser {
	var wrapper:DivElement;

	// https://randomuser.me/
	// https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
	public function new() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('RandomUser - Dom ready');
			init();
		});
	}

	function init() {
		setElements();
		getData();
	}

	function setElements() {
		wrapper = cast document.getElementById('user-wrapper');
		wrapper.innerHTML = '';
	}

	function getData() {
		// var url = 'https://randomuser.me/api';
		window.fetch('https://randomuser.me/api/?results=10')
			.then(handleErrors)
			.then(parseJSON)
			.then(updateProfile)
			.catchError(printError);
	}

	function handleErrors(res:Response) {
		if (!res.ok) {
			console.log(res.status);
		}
		console.log(res);
		return res;
	}

	function parseJSON(res:Response) {
		return res.json();
	}

	/**
		{
			  "gender": "male",
			  "name": {
			"title": "Mr",
			"first": "Rafael",
			"last": "Perez"
			  },
			  "location": {
			"street": {
			  "number": 1163,
			  "name": "Daisy Dr"
			},
			"city": "Dumas",
			"state": "California",
			"country": "United States",
			"postcode": 62922,
			"coordinates": {
			  "latitude": "-42.4595",
			  "longitude": "147.2083"
			},
			"timezone": {
			  "offset": "-8:00",
			  "description": "Pacific Time (US & Canada)"
			}
			  },
			  "email": "rafael.perez@example.com",
			  "login": {
			"uuid": "375d4272-91de-4b5e-86a1-92145e8b02f7",
			"username": "redlion877",
			"password": "peters",
			"salt": "vD2UPgmD",
			"md5": "285709d258542d992c86bdbec08a485f",
			"sha1": "4fe9fdc32f7379e2b6dc1cb6f8548da9e0e0d94b",
			"sha256": "39a5371eeebed0c0e7fbd794660a99207ca2cc44087b07169dea7976a6df7d54"
			  },
			  "dob": {
			"date": "1990-04-15T11:39:31.838Z",
			"age": 30
			  },
			  "registered": {
			"date": "2015-12-25T18:22:00.196Z",
			"age": 5
			  },
			  "phone": "(667)-684-3938",
			  "cell": "(797)-408-2973",
			  "id": {
			"name": "SSN",
			"value": "819-05-8770"
			  },
			  "picture": {
			"large": "https://randomuser.me/api/portraits/men/5.jpg",
			"medium": "https://randomuser.me/api/portraits/med/men/5.jpg",
			"thumbnail": "https://randomuser.me/api/portraits/thumb/men/5.jpg"
			  },
			  "nat": "US"
			}
		* @param json
	 */
	function updateProfile(json) {
		// trace(json);

		var html = '<div class="row">';

		var profileArray:Array<Dynamic> = json.results;

		for (i in 0...profileArray.length) {
			var result = profileArray[i];
			trace(result);

			html += '
<div class="col-12 col-md-4">
<div class="card profile-card">
<div class="profile-content">
<img src="${result.picture.medium}" alt="profile-image" class="profile" />
<div class="card-content">
<h2>${result.name.first} ${result.name.last}<small>${result.location.city}</small></h2>
<p class="card-text text-center">
Street: ${result.location.street.name} ${result.location.street.number} <br>
City:  ${result.location.city}<br>
State:  ${result.location.state}<br>
Country:  ${result.location.country}<br>
</p>
<div class="icon-block">
<a href="mailto:${result.email}"><i class="fa fa-envelope-o"></i></a>
<a href="https://twitter/${result.name.first}${result.name.last}"><i class="fa fa-twitter"></i></a>
<a href="tel:${result.phone}"><i class="fa fa-phone"></i> ${result.cell}</a>
</div>
</div>
</div>
</div>
</div>
';
		}
		html += '</div>';

		wrapper.innerHTML = html;
		return 1;
	}

	function printError(error) {
		console.log(error);
	}

	static public function main() {
		var app = new RandomUser();
	}
}
