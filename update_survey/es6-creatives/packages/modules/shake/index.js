function Shake(options) {
    //feature detect
    this.hasDeviceMotion = 'ondevicemotion' in window.top;

    this.options = {
        threshold: 15, //default velocity threshold for shake to register
        timeout: 1000 //default interval between events
    };

    if (typeof options === 'object') {
        for (const i in options) {
            options.hasOwnProperty(i) && (this.options[ i ] = options[ i ]);
        }
    }

    //use date to prevent multiple shakes firing
    this.lastTime = new Date();

    //accelerometer values
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;

    //create custom event
    if (typeof document.CustomEvent === 'function') {
        this.event = new document.CustomEvent('shake', {
            bubbles: true,
            cancelable: true
        });
    } else if (typeof document.createEvent === 'function') {
        this.event = document.createEvent('Event');
        this.event.initEvent('shake', true, true);
    } else {
        return false;
    }
}

//reset timer values
Shake.prototype.reset = () => {
    this.lastTime = new Date();
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;
};

//start listening for devicemotion
Shake.prototype.start = () => {
    this.reset();
    this.hasDeviceMotion && window.top.addEventListener('devicemotion', this, false);
};

//stop listening for devicemotion
Shake.prototype.stop = () => {
    this.hasDeviceMotion && window.top.removeEventListener('devicemotion', this, false);
    this.reset();
};

//calculates if shake did occur
Shake.prototype.devicemotion = e => {
    const current = e.accelerationIncludingGravity;
    let currentTime;
    let timeDifference;
    let deltaX = 0;
    let deltaY = 0;
    let deltaZ = 0;

    if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;
        return;
    }

    deltaX = Math.abs(this.lastX - current.x);
    deltaY = Math.abs(this.lastY - current.y);
    deltaZ = Math.abs(this.lastZ - current.z);

    if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
        //calculate time in milliseconds since last shake registered
        currentTime = new Date();
        timeDifference = currentTime.getTime() - this.lastTime.getTime();

        if (timeDifference > this.options.timeout) {
            window.dispatchEvent(this.event);
            this.lastTime = new Date();
        }
    }

    this.lastX = current.x;
    this.lastY = current.y;
    this.lastZ = current.z;

};

//event handler
Shake.prototype.handleEvent = e => {
    if (typeof (this[ e.type ]) === 'function') {
        return this[ e.type ](e);
    }
};

export default Shake;

// const myShakeEvent = new Shake({
//     threshold: 10, // optional shake strength threshold
//     timeout: 1000 // optional, determines the frequency of event generation
// });
//
// myShakeEvent.start();

// window.addEventListener('shake', startShake, false);
