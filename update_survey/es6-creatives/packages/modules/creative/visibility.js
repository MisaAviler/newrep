import { triggerEvent } from './utils';

let lastState;

const onVisibilityStateChange = () => {
	const isVisible = L.webview.state === 'VISIBLE' && document.visibilityState === 'visible';
	const currentState = isVisible ? "visible" : "hidden";

	lastState !== currentState && triggerEvent(currentState);
	lastState = currentState;
};

export const initViewListeners = () => {
	document.addEventListener('visibilitychange', onVisibilityStateChange, false);
	L.webview.on('webview:state', onVisibilityStateChange);
};
