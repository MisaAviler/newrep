## How to use Expandable Banner Component

##### Where you can find the module:
- ./packages/modules/expandable-banner

##### Steps:
1. Add the module 'expandable-banner' into dependencies in your package.json file `"expandable-banner": "^1.0.0"`.
2. Run `lerna bootstrap`.
3. Use expandable banner HTML template to use component correctly.
4. Above all the HTML of the tag insert ```<script src="mraid.js"></script>```
5. Then call `initBanner()` in your initializing function `initAd()` in `index.js`

##### Notes:
1. There is no close button in normal layout in LoopMe and MoPub SDK.
2. To test expandable banner creative you must rewrite app key on the page https://demopages.loopme.me/flex_expandable_banner.html or test it in LoopMeX and MoPub apps using your expandable banner app key (dimensions 320x50 only).
3. We serve expandable banners only in apps.
