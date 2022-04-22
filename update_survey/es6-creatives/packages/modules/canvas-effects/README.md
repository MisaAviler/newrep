```js
/*  
1) In your main file make all settings for canvas
2) You need to have an object with canvas sizes and context
This object will be needed for effect manager
    Here is an example:
*/ 

const canvas = first('#canvas');

const canvasOptions = {
    canvasContext: canvas.getContext('2d'), 
    canvasWidth: window.screen.width,
    canvasHeight: window.screen.height
};
const initAd = () => {
    sendInitEvents();
    showCreative();

    canvas.width = canvasOptions.canvasWidth;
    canvas.height = canvasOptions.canvasHeight;
};


/*
You can create 1 effect or as many as you want in one canvas.
    Here is an example how you can do it:
*/

    const effectManager = new ParticleSystem(canvasOptions);
    effectManager.add(Rain, 150);
    effectManager.add(Snow, 200);
    effectManager.refresh();

```