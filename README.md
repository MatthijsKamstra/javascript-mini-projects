# javascript-mini-projects

Mini projects built with HTML5, CSS &amp; JavaScript

## Ideas

- Mini SPA website
- Interactive online store
- Check out shop/shopping card
- Games (basic and simple)
  - Tick tack toe
  - Hang man
  - rock paper scissors
  - pong game
  - memory
- Counters/clock/countdown
  - till I die counter
  - Days till New Years counter
  - is it Friday counter
  - is it beer time counter
  - meditation clock
  - progress bar
  - 7 min app
- SVG editor (svg exporter)
- Form
  - basic form validator
  - drag and drop image/file
  - photo share (twitter)
  - photo upload and manipulation and share
- Skinning default
  - Custom video player
  - Custom music player
- ar.js
- parcel
- js drawing (canvas)
- js animation class (test, workshop)
- classic todo list
- basic quiz
- custom greetings from other sites
- flash cards (local storage)
- quotes project (api)
- virtual key board
- weather app (api)
- random name generator
- secret message encoder/decoder
- inlog site and share info (sockets)
- real time chat (sockets)
- emoji favicon generator
- copy example code

## Developer install

Als developer installeer je:

- VSCode: https://code.visualstudio.com/
- Node.js / npm (als je node installeerd is npm ook geinstalleerd): https://nodejs.org/en/
- Sourcetree (gui voor git): https://www.sourcetreeapp.com/
- Browser (Firefox)

Bij VSCode kan je nog wat plugins installeren die handig zijn:

- Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- SCSS Formatter: https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter
- SCSS IntelliSense: https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss

En nice to haves:

- Color Highlight: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
- Copy Relative Path: https://marketplace.visualstudio.com/items?itemName=alexdima.copy-relative-path
- Prettier - Code formatter: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Prettify JSON: https://marketplace.visualstudio.com/items?itemName=mohsen1.prettify-json

## Start developement

Gebruik de `public_html` (bin) folder als root, theoretisch zou dit ook moeten werken op de server

- `npm install` om alle node packages te installeren (worden ignored voor git, dus zelf installeren)
- VSCode plugin _LiveServer_: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- in combinatie met `npm run _dev` kan je lekker doorwerken zonder de heletijd te recompilen en refreshen

In principe zou de `.vscode`-folder in git zitten dus dat zou moeten werken als je de liveserver plugin hebt geinstalleerd

```
{
  "liveServer.settings.root": "bin",
  "liveServer.settings.port": 5501
}
```

## local dev

activate scss watch:

```bash
npm run _dev
```

because I decided to use VSCode "Go Live" plugin

needs to be change

## dev resources

- https://getbootstrap.com/
- https://ficons.fiction.com/

## sources

- sass opzet: <https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4>
- hover.css: <http://ianlunn.github.io/Hover/>

## sass

The 7–1 Pattern

The architecture known as the 7–1 pattern (7 folders, 1 file), is a widely-adopted structure that serves as a basis for large projects

- _Abstracts_ (or utilities): holds Sass tools, helper files, variables, functions, mixins and other config files. These files are meant to be just helpers which don’t output any CSS when compiled.
- _Base_: holds the boilerplate code for the project. Including standard styles such as resets and typographic rules, which are commonly used throughout your project.
- _Components_ (or modules): holds all of your styles for buttons, carousels, sliders, and similar page components (think widgets). Your project will typically contain a lot of component files — as the whole site/app should be mostly composed of small modules.
- _Layout_: contains all styles involved with the layout of your project. Such as styles for your header, footer, navigation and the grid system.
- _Pages_: any styles specific to individual pages will sit here. For example it’s not uncommon for the home page of your site to require page specific styles that no other page receives.
- _Themes_: this is likely not used in many projects. It would hold files that create project specific themes. For example if sections of your site contain alternate color schemes.
- _Vendors_: contains all third party code from external libraries and frameworks — such as Normalize, Bootstrap, jQueryUI, etc. However, there is often a need to override vendor code. If this is required, its good practice to create a new folder called vendors-extensions/ and then name any files after the vendors they overwrite. The filevendors-extensions/\_bootstrap.scss would contain all your Bootstrap overrides — as editing the vendor files themselves, isn’t generally a good idea.

_Main.scss_: This file should only contain your imports! For example..
