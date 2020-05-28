import haxe.Json;
import js.lib.Error;
import js.Browser;
import js.Browser.window;

class RandomUser {
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

	function setElements() {}

	function getData() {
		// // window.fetch('https://randomuser.me/api/?results=10')
		// // 	// .then(handleErrors)
		// // 	.then(parseJSON)
		// // 	.then(updateProfile)
		// // 	.catchError(printError);

		// var url = 'https://randomuser.me/api';
		// // The data we are going to send in our request
		// var data = {
		// 	name: 'Sara'
		// }
		// // Create our request constructor with all the parameters we need
		// var r:RequestInit = {
		// 	method: 'POST',
		// 	body: Json.stringify(data),
		// 	headers: new Headers()
		// }
		// var request = new Request(url, r);

		// window.fetch(request)
		// 	.then(function(data) {
		// 		// Here you get the data to modify as you please
		// 	})
		// 	.catchError(function(error) {
		// 		// If there is any error you will catch them here
		// 	});

		untyped $.ajax({
			url: 'https://randomuser.me/api/',
			dataType: 'json',
			success: function(data) {
				console.log(data);
			}
		});
	}

	function handleErrors(res) {
		if (!res.ok) {
			console.log(res.status);
		}
		console.log(res);
		return res;
	}

	function parseJSON(res) {
		return res.json();
	}

	function updateProfile(profile) {
		// avatar.src = profile.results[0].picture.medium;
		// fullname.innerHTML = profile.results[0].name.first + " " + profile.results[0].name.last;
		// username.innerHTML = profile.results[0].login.username;
		// email.innerHTML = profile.results[0].email;
		// city.innerHTML = profile.results[0].location.city;
		// return 1;
	}

	function printError(error) {
		console.log(error);
	}

	static public function main() {
		var app = new RandomUser();
	}
}
