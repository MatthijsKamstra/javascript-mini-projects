package utils;

class Template {
	public function new() {
		// your code
	}

	/**
	 * bug in VSCode haxe extension, the autocomplete stops working when using a emoji..
	 *
	 * don't need autocompletion for the templates
	 * @return String
	 */
	static public function nav():String {
		return '<nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark smart-scroll-nav">
			<div class="container">
				<a class="navbar-brand" href="../">🚀</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse"
					data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">

						<li class="nav-item">
							<a class="nav-link" href="../">Home</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Mini Projects
							</a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<a v-for="(project, index) in json.data" class="dropdown-item"
									v-bind:href="folderUp(project.url)">{{index+1}}. {{project.title}}</a>
							</div>
						</li>


					</ul>
				</div>
			</div>
		</nav>';

	}
}
