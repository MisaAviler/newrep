## How to use Map Component

##### Where you can find the module:
- ./packages/modules/map

##### Steps:
1. Add the module 'map' into dependencies in your package.json file `"map": "^1.0.0"`.
2. Run `lerna bootstrap`.
3. Generate map markers using markers generator tool (see detailed instruction below).
4. Upload your markers.json file to the server and paste the link to the config in the index.js file `MARKERS_URL: 'your url'`.
5. Button which initializes the map must have the class `LM_show_map_btn`.
6. Use this HTML template to use map component correctly: 
```html
<div class="LM_map">
    <div class="LM_map-preloader">
        <img src="https://i.loopme.me/html/" alt="">
        <div class="LM_map-preloader-spinner">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <div id="LM_map-container">
        <img class="LM_map-pin" src="https://i.loopme.me/html/" alt="">
        <div class="LM_hide_map_btn"></div>
        <div class="LM_map-wrapper">
            <div id="LM_map-holder"></div>
        </div>
    </div>
    <div class="LM_stores-list-wrap">
        <ul class="LM_stores-list"></ul>
    </div>
</div>
```

Then call `initMapListeners()` in your initializing function.

##### Notes:
- In Web we use coordinates received from Geolocation.getCurrentPosition() method.
- In SDK we use USER_LAT, USER_LON macros to get user coordinates.
- For QR code we can only use default coordinates which must be specified in config, e.g.:
```javascript
    DEFAULT_LAT: 13.7468,
    DEFAULT_LON: 100.5350
```

#### Google Maps Markers

Files:
- ./creatives/$NAME/markers.xlsx

Steps:
1. Install npm package: `npm i excel-as-json` (^2.0.2).
2. Copy markers.xlsx file into `./creatives/$NAME/` folder.
3. Run `$ NAME=%%NAME_OF_YOUR_PROJECT%% npm run marker` command.
4. Get your markers.js file from `/dist`.

Note: xlsx file must contain names of columns in lowercase: latitude, longitude, name, address, city, zip. 
