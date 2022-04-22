import './swipeToReveal.css';
import {first, doInvisible, setDisable} from 'creative';

const layoutElem = first('.LM_layout');
const canvasElem = first('.LM_canvas');
const context = canvasElem.getContext('2d');
const imageObj = new Image();
const canvasImageUrl = 'https://i.loopme.me/html/DisneyOnIce_assets/P_pg1.jpg';

let startX = 0;
let startY = 0;
let currX = 0;
let currY = 0;
let drawStarted = false;
let animationStarted = false;
let wipesAmount = 0;
let autoStartTimeout = null;

const START_POINT_OFFSET = 0.01;
const DRAW_RADIUS = 60;
const CANVAS_HIDE_DELAY = 5000;
const AUTO_START_DELAY = 5000;
const MAX_WIPES_AMOUNT = 5;

const setCanvasSize = (width, height) => {
	canvasElem.width = width;
	canvasElem.height = height;
};

const setLayoutSize = (width, height) => {
	layoutElem.style.width = `${width}px`;
	layoutElem.style.height = `${height}px`;
};

const animStart = () => {
	animationStarted = true;

	doInvisible(canvasElem);
	setDisable(canvasElem);
};

const drawOnCanvas = (currX, currY, radius) => {
	context.beginPath();
	context.lineWidth = radius;
	context.strokeStyle = '#ffffff';
	context.lineJoin = 'round';
	context.moveTo(startX, startY);
	context.lineTo(currX, currY);
	context.closePath();
	context.stroke();

	startX = currX;
	startY = currY;
};

const onDrawStart = event => {
	event.preventDefault();
	if (animationStarted) {
		return false;
	}

	wipesAmount += 1;

	startX = event.targetTouches[0].clientX;
	startY = event.targetTouches[0].clientY;
	currX = event.targetTouches[0].clientX + START_POINT_OFFSET;
	currY = event.targetTouches[0].clientY + START_POINT_OFFSET;

	drawOnCanvas(currX, currY, DRAW_RADIUS);

	if (drawStarted) {
		return false;
	}

	drawStarted = true;
	setTimeout(animStart, CANVAS_HIDE_DELAY);

	if (autoStartTimeout) {
		clearTimeout(autoStartTimeout);
		autoStartTimeout = null;
	}
};

const onDraw = event => {
	event.preventDefault();

	currX = event.targetTouches[0].clientX;
	currY = event.targetTouches[0].clientY;

	drawOnCanvas(currX, currY, DRAW_RADIUS);
};

const onDrawEnd = () => wipesAmount >= MAX_WIPES_AMOUNT && animStart();

const animAutoStart = () => {
	autoStartTimeout = setTimeout(() => {!animationStarted && animStart()}, AUTO_START_DELAY)
};

export const canvasInit = (width, height) => {
	setCanvasSize(width, height);
	setLayoutSize(width, height);

	imageObj.setAttribute('crossOrigin', 'anonymous');
	imageObj.src = canvasImageUrl;

	imageObj.addEventListener('load', () => {
		context.drawImage(imageObj, 0, 0, width, height);
		context.globalCompositeOperation = 'destination-out';

		animAutoStart();
	}, false);
};

canvasElem.addEventListener('touchstart', onDrawStart, false);
canvasElem.addEventListener('touchmove', onDraw, false);
canvasElem.addEventListener('touchend', onDrawEnd, false);
