import './camera.css';
import { first, doInvisible, doVisible, setDisable, hide, show, getState } from 'creative';

const initCameraBtn = first('.LM_camera');
const video = first('.LM_video');
const streamContainer = first('.LM_stream-container');
const streamWrap = first('.LM_stream-wrap');
const photoClick = first('.LM_photo-click');
const canvas = first('.LM_photo');
const buttonsContainer = first('.LM_buttons');
const backBtn = first('.LM_button__back');
const shareBtn = first('.LM_button__share');
const cta = first('.LM_cta');
const convertServerUrl = 'https://share.loopme.com/';

const constraints = { audio: false, video: { optional: [ { facingMode: 'user' } ] } };
const appId = '492703937757989';

let currUrl = null;
let streamStopped = true;

const getImageLink = (b64, serverUrl, show) => {
	const xhr = new XMLHttpRequest();
	const body = { b64 };

	xhr.open('POST', serverUrl, false);

	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Accept', 'application/json');

	xhr.send(JSON.stringify(body));

	if (xhr.status === 200) {
		const response = JSON.parse(xhr.responseText);
		currUrl = response.url;

		show();
	}
};

const resizeVideo = (video, wrapWidth, wrapHeight) => {
	if (video.offsetWidth === 0) {
		return false;
	}

	const videoWidth = wrapHeight / video.offsetHeight * video.offsetWidth;
	const [ height, width ] = (videoWidth < wrapWidth) ? [ "auto", "100%" ] : [ "100%", "auto" ];
	video.style.height = height;
	video.style.width = width;
};

const stopStream = stream => () => {
	streamStopped = true;
	const stopTrack = track => track.stop();
	const tracks = stream.getVideoTracks();
	const isButttonsHidden = buttonsContainer.style.opacity !== "1";

	tracks.forEach(stopTrack);
	hide(streamWrap);
	hide(photoClick);
	isButttonsHidden && show(initCameraBtn);
};

const streamSuccess = stream => {
	if ("srcObject" in video) {
		video.srcObject = stream;
	} else {
		video.src = window.URL.createObjectURL(stream);
	}

	streamStopped = false;
	const track = stream.getVideoTracks()[ 0 ];

	const streamHeight = streamContainer.offsetHeight - cta.offsetHeight;
	streamWrap.style.height = `${streamHeight}px`;
	canvas.style.height = `${streamHeight}px`;

	video.load();

	track.addEventListener('mute', stopStream(stream), false);
};

const streamFailure = error => console.log(error);

const initCamera = () => {
	if (navigator.mediaDevices) {
		return navigator.mediaDevices.getUserMedia(constraints)
			.then(streamSuccess)
			.catch(streamFailure);
	}

	navigator.getUserMedia && navigator.getUserMedia(constraints, streamSuccess, streamFailure);
};

const shareToFB = imageUrl => {
	const ROOT = 'https://www.facebook.com/dialog/feed';
	const url = `${ROOT}?app_id=${encodeURIComponent(appId)}&display=popup&picture=${encodeURIComponent(imageUrl)}`;

	(L.isInterscroller ? window.parent : window).open(url, '__blank', '');
};

const showButtons = () => {
	doVisible(buttonsContainer);
	setDisable(buttonsContainer, false);
};

const createScreenshot = (video, width, height) => {
	const ctx = canvas.getContext('2d');
	const { offsetWidth, offsetHeight } = video;
	const videoOffsetX = (width - offsetWidth) / 2;

	canvas.width = width;
	canvas.height = height;

	ctx.translate(canvas.width, 0);
	ctx.scale(-1, 1);

	ctx.drawImage(video, videoOffsetX, 0, offsetWidth, offsetHeight);

	hide(streamWrap);
	hide(photoClick);
	doVisible(canvas);

	setTimeout(() => getImageLink(canvas.toDataURL('image/jpeg'), convertServerUrl, showButtons), 1000);
};

const back = () => {
	doInvisible(canvas);
	doInvisible(buttonsContainer);
	setDisable(buttonsContainer);
	show(streamWrap);
	show(streamStopped ? initCameraBtn : photoClick);
};

const share = () => shareToFB(currUrl);
const onCreateScreenshot = () => createScreenshot(video, streamWrap.offsetWidth, streamWrap.offsetHeight);

const onLoadVideo = () => {
	video.play();
	resizeVideo(video, streamWrap.offsetWidth, streamWrap.offsetHeight);
	show(streamWrap);
	show(photoClick);
	hide(initCameraBtn);
};

const resizeWrapper = () => {
	if (getState('isLandscape')) {
		return false;
	}

	const streamHeight = streamContainer.offsetHeight - cta.offsetHeight;
	streamWrap.style.height = `${streamHeight}px`;
	canvas.style.height = `${streamHeight}px`;
	resizeVideo(video, streamWrap.offsetWidth, streamWrap.offsetHeight);
};

const onResize = () => {
	const CONTENT_REBUILD_DELAY = 150;
	setTimeout(resizeWrapper, CONTENT_REBUILD_DELAY);
};

export const initCameraListeners = () => {
	video.addEventListener('loadedmetadata', onLoadVideo, false);
	L.isInterscroller && window.addEventListener('resize', onResize, false);
	initCameraBtn.addEventListener('click', initCamera, false);
	photoClick.addEventListener('click', onCreateScreenshot, false);
	backBtn.addEventListener('click', back, false);
	shareBtn.addEventListener('click', share, false);
};
