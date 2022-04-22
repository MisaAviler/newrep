import { getState, IOS_VERSION, isMoPub } from "creative";

const canMove = (distance) => {
    if (L.webview.state !== 'VISIBLE') {
        return false;
    }
    if ( getState("isLandscape") ) {
        return false;
    }
    const STOP_ANGLE = 15;
    const isOnBorder = Math.abs(distance) <= STOP_ANGLE;
    if (!isOnBorder) {
        return false;
    }
    return true;
};

export const initParallax = (parallaxElement, touchContainer) => {
    const TRANSLATE_STEP_COEFFICIENT = 4;
    const gyroBlockedIosVersion = 12;

    const isGyroBlocked = (IOS_VERSION >= gyroBlockedIosVersion) || isMoPub;
    let canUseDeviceOrientation = Boolean(window.DeviceOrientationEvent);
    let canUseDeviceMotion = Boolean(window.DeviceMotionEvent);

    if (isGyroBlocked) {
        canUseDeviceOrientation = false;
        canUseDeviceMotion = false;
    }

    if (canUseDeviceOrientation) {

        const initDeviceOrientationEvents = ({gamma}) => {
            const distance = gamma / TRANSLATE_STEP_COEFFICIENT;
            if (!canMove(distance)) {
                return false;
            }
            parallaxElement.style.transform = `translateX(${distance}%)`;
        }
        window.addEventListener('deviceorientation', initDeviceOrientationEvents, false);
    } else if (canUseDeviceMotion) {
        
        const initDeviceMotionEvents = ({accelerationIncludingGravity: {x}}) => {
            const distance = -x;
            if (!canMove(distance)) {
                return false;
            }
            parallaxElement.style.transform = `translateX(${distance}%)`;
        }
        window.addEventListener('devicemotion', initDeviceMotionEvents, false);
    } else {

        const initTouchEvents = (container, parallaxElement) => {
            // Touch handlers
            let startX = 0;
            const onTouchStart = event => startX = event.targetTouches[ 0 ].clientX;
            container.addEventListener('touchstart', onTouchStart, false);
        
            const onTouchEnd = event => {
                const currX = event.changedTouches[ 0 ].clientX - startX;
                const SWIPE_DISTANCE = 30;
                const TO_LEFT_BORDER = 25;
                const TO_RIGHT_BORDER = -25;
        
                const distance = (currX > SWIPE_DISTANCE ? TO_LEFT_BORDER : TO_RIGHT_BORDER) / TRANSLATE_STEP_COEFFICIENT;
                if (!canMove(distance)) {
                    return false;
                }
                parallaxElement.style.transform = `translateX(${distance}%)`;
            };
            container.addEventListener('touchend', onTouchEnd, false);
            // smooth movement
            parallaxElement.style.transition = "transform 0.2s linear";
        }
        initTouchEvents(touchContainer, parallaxElement);
    }
};