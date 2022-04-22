# Handling Events

Handling events with *HTML5 creatives with ES6* modules is very easy. There is some syntactic differences:
- Custom dashboard events are named using lowercase (e.g. `custom_event_1`).
- Usually you can use up to 10 dashboard custom events.
- Find events aliases in index.js file and replace their values according to Design Docs. 

## Event types

- `Standard events`
which don't need to be specified, for example, `PAGE_1`, `PAGE_2`, all video events and others.

- `CUSTOM`
events that don't depend on the user interactions.

- `INTERACTION`
describes user actions like swipes, clicks and others.

## Sending event

``` javascript
sendCreativeStatisticsOnce('PAGE_2');
sendCreativeEvent(getConfig().LOADING_CLICK, 'INTERACTION');
sendCreativeEventOnce('custom_event_6', 'CUSTOM');
sendCreativeEventOnce('custom_event_10', 'INTERACTION');
sendCustomTracker(url);
sendCustomTrackerOnce(url);
```

## Types of creative

To know what types of creative and what kind of technologies perform better and show the best KPIs for a specific kind of brand.

Creative type is sent as a parameter `tt` in every event. Please specify creative type in index.js file according to the list below:

``` javascript
CREATIVE_TYPE: 'EV'
```
- `EV`  - Embedded video 
- `PV`  - Portrait video 
- `GALV` - Gallery video
- `GALI` - Gallery images 
- `CAL`- Add to calendar 
- `TILT` - Tilt or shake 
- `MAP` - Store locator
- `PLAX` - Parallax 
- `MIC` - Use of microphone 
- `HAP` - Vibration / haptic feedback 
- `WIP` - Wipe to reveal or drawing /colouring 
- `CAM` - Use of camera 
- `GAME` - Gamification
- `360` - Videos, images objects 
- `FORM` - Any form fills. including tick boxes
- `SCR` - Scroller
- `EXB` - Expandable banner
- `IMG` - just an image creative


## RTB attributes

To avoid cases where our HTML ads are blocked by RTB because we did not pass attributes to them while serving the ads we need to add the correspondents attributes in HTML tags for creative builds so dashboard can detect them and pass to RTB.

Here is the official list (in openRTB 2.5): 
- `1`- If video has audio on when it start auto-play
- `4` - Expandable banner
- `6` - RM embedded auto play video 
- `7` - RM embedded click to play
- `11` - Survey creative (good to auto detects as well, can be easily - added to survey builder)
- `13` - RM ads that allow user to browse around/play with it. e.g. - gallery etc templates
- `15` - audio button on video

Examples:

``` javascript
// Creative attributes: 1, 6, 15
```

``` css
/* Creative attributes: 1, 6, 15 */
```

``` html
<!-- Creative attributes: 1, 6, 15 -->
```

You can specify it in HTML, CSS or JavaScript.
But we agreed to specify it at the top of the HTML file. 

## Template attributes

To track the use of our internal creative services for rich media/HTML ads.
It must be sent at the top of HTML file right after RTB attribute. 

Example:
``` html
<!-- Template attributes: CUST -->
```

- `CUST` - loopme custom ES6 dev build
- `GWD` - loopme template build
- `INS` - instant template build
