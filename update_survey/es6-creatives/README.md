# HTML5 creatives with ES6

*HTML5 creatives with ES6* is a set of modern JavaScript modules that make development easier.

## Getting started

1. First, make sure you are on NPM installed so that the proper dependencies are installed using the `package-lock.json` file.
`$ npm install -g npm`
1. Clone or [Download](https://github.com/loopme/es6-creatives/archive/master.zip) the project.
1. Inside the project folder, open yout Terminal and type
`$ NAME=%%NAME_OF_YOUR_PROJECT%% npm run new`
1. A new creative will be located in `packages/creatives/%%NAME_OF_YOUR_PROJECT%%`
1. Now you are ready to go.

At the end run `$ cd packages/creatives/%%NAME_OF_YOUR_PROJECT%% && npm run build`.
Then book the creative at [Loopme App](https://brand.loopme.com/#/campaigns).

## Naming convention

Please, make sure all your creative names matches this rule.
`%%NAME_OF_COMPANY%%/%%NAME_OF_YOUR_PROJECT%%`.
For example, `Porsche/Porsche-Cayenne`.

## Available tasks

1. `$ NAME=%%NAME_OF_YOUR_PROJECT%% npm run new` - create new project in creatives dir;
1. `$ NAME=%%NAME_OF_YOUR_PROJECT%% npm run marker` - converts your .xlsx markers file to .js for use with google maps.
1. `$ npm run build` - build your project.
1. `$ npm run preview` - starts up creative locally with hot reload.

At the moment you should change path in webpack manually.

## Interesting files / dirs

1. `./packages` - all modules and creatives.
1. `./tools` - contains all custom tools.
1. `./src` - default src files for creatives.

## User Experience / Functionality

1. [Changelog](https://github.com/loopme/es6-creatives/blob/master/docs/changelog.md)
2. [Events](https://github.com/loopme/es6-creatives/blob/master/docs/events.md)
3. [How to use calendar event](https://github.com/loopme/es6-creatives/blob/master/docs/calendarEvent.md)
4. [How to use map component](https://github.com/loopme/es6-creatives/blob/master/docs/mapComponent.md)

## Mobile OS

iOS 10+, Android 5+
