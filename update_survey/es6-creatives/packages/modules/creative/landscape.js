// import './styles/landscape.css';
// import { setState } from './state';
// import { sendCreativeEvent } from './analytics';
// import { first, show, hide, isSDKOnAndroid, isLandscape, triggerEvent } from './utils';
// import { getConfig } from './config';
//
// const WINDOW_RESIZE_DELAY = 100;
// const placeholderImageElem = first('.LM_landscape');
//
// const handleOrientationChange = isVisible => {
// 	const isLandscapeOrientation = isLandscape();
// 	const isReady = isVisible && isLandscapeOrientation && !isSDKOnAndroid;
// 	setState('isLandscape', isLandscapeOrientation);
//
// 	isReady && sendCreativeEvent(getConfig().SCREEN_ROTATED_L, 'INTERACTION', 1);
// 	L.isIOS && (isLandscapeOrientation ? show : hide)(placeholderImageElem);
// 	triggerEvent(isLandscapeOrientation ? 'landscape' : 'portrait');
// };
//
// export const checkOrientation = () => {
// 	setTimeout(handleOrientationChange, WINDOW_RESIZE_DELAY, L.webview.state === 'VISIBLE');
// };
//
// window.addEventListener('orientationchange', checkOrientation, false);
