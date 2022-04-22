// Just run cubeRotate() in initAd()
import './styles/cube.css'

const scene = document.querySelector( ".scene" );
const cube = document.querySelector( ".cube" );

let startX;
let startY;
let startAngleX = 0;
let startAngleY = 0;

const getLongerSwipe = ( deltaX, deltaY ) => Math.abs( deltaX ) > Math.abs( deltaY ) ? deltaX : deltaY;

const getSwipeIntensity = delta => {
    const noSwipe = Math.abs( delta ) >= 0 && Math.abs( delta ) < 15;
    const lightSwipe = Math.abs( delta ) > 15 && Math.abs( delta ) < 45;
    if ( noSwipe ) {
        return 0;
    } else if ( lightSwipe ) {
        return 90;
    } else {
        return 180;
    }
}

const getRotationAngles = ( aroundAxis, angle ) =>
    aroundAxis ? [ startAngleY, startAngleX + angle ] : [ startAngleY + angle, startAngleX ];

const move = ( deltaX, deltaY ) => {
    const swipe = getLongerSwipe( deltaX, deltaY );
    const swipeDirection = swipe >= 0 ? 1 : -1;
    const angle = swipeDirection * getSwipeIntensity( swipe );
    const aroundYAxis = Math.abs( deltaX ) > Math.abs( deltaY );
    [ startAngleY, startAngleX ] = getRotationAngles( aroundYAxis, angle );
    cube.style.transform = `translate(-50%, -50%) rotateX(${ startAngleY }deg) rotateY(${ startAngleX }deg)`;
}
const saveStartPosition = event => {
    const { changedTouches: { "0": { clientX: x, clientY: y } } } = event;
    startX = x;
    startY = y;
}
const rotate = event => {
    const { changedTouches: { "0": { clientX: endX, clientY: endY } } } = event;
    const deltaX = ( endX - startX ) / 4;
    const deltaY = -( endY - startY ) / 4;
    move( deltaX, deltaY );
}

export const cubeRotate = () => {
    scene.addEventListener( "touchstart", saveStartPosition, false );
    scene.addEventListener( "touchend", rotate, false );
}