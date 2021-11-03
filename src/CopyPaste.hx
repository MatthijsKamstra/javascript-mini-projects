import js.Syntax;

class CopyPaste {
	var textArea:TextAreaElement;

	public function new() {
		trace('CopyPaste');

		textArea = cast document.getElementById('js-output-textarea');
		var button = cast document.getElementById('js-copy-btn');

		textArea.value = 'Current date is ${Date.now()}';

		button.onclick = onClickHandler;
	}

	function onClickHandler(e) {
		e.preventDefault();
		textArea.select();
		document.execCommand('copy');

		// var toastTrigger = document.getElementById('liveToastBtn');
		var toastLiveExample = document.getElementById('liveToast');
		// if (toastTrigger != null) {
		// 	toastTrigger.addEventListener('click', function() {
		var toast = Syntax.code('new bootstrap.Toast({0})', toastLiveExample);
		toast.show();
		// 	});
		// }
	}

	static public function main() {
		var app = new CopyPaste();
	}
}
