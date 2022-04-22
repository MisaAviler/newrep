## Version 1.1.1
1. Events names were changed
1. Added support for last version of Chrome to Shake ad unit
1. Polyffils were removed

## Version 1.1.0
1. Totally changed the project structure. Added Lerna.
1. Removed unused modules
1. Added `animation` module

## Version 1.0.11
1. Added `PREVIEW` feature

## Version 1.0.10
1. Add a comment for openRTB attributes
1. Update `BUILD` script in `package.json`
1. Update docs.

## Version 1.0.9
1. Video logic was rewritten
1. Visibility was fully rewritten
1. Refactored and changes were made to support new logic in the following files: `Creative.js`, `state.js`, `index.js`, `onClick.js`, `imageLoader.js`, `landscapeMode.js`, `loadingPage.js`, `utils.js`

## Version 1.0.8
1. Click event for `loading page` was moved from addEvents.
1. Unnecessary attribute was removed for `#LM_loading_page` in `index html`.

## Version 1.0.7
1. Fixed bugs in `click_to_play` tags.
1. Added macros support for video module.
1. Removed old css style.
1. Fixed `SCREEN_ROTATED_L` event bug in LoopMe SDK on Android.

## Version 1.0.6
1. Added visibility change module.
1. Added visibility change documentation.

## Version 1.0.5
1. Added krpano template.
1. Added krpano documentation.

## Version 1.0.4
1. Added resizer.
1. Added docs.
1. Added close button macros support.

## Version 1.0.3
1. `SCREEN_ROTATED_L` event was fixed.
1. Added comscore tracker.

## Version 1.0.2
1. Video.js was fixed and tested.
1. Added video playback after device rotate and scroller's scroll for autoplay video.
1. Map.js was refactored and updated. Removed open/close functional. You should write it by yourself if you need it in your project.
1. Gallery autostart was exported by default. You can call this function with delay parameter in milliseconds. Default value is 1500ms.
1. Added `%%CLICK_URL%%`, `%%LAT%%`, `%%LON%%` macroses.
