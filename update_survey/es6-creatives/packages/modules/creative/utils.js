import {getConfig} from "./config";

export const first = query => document.querySelector(query);
export const selectAll = query => document.querySelectorAll(query);
export const show = ({ style }) => style.display = 'block';
export const flex = ({ style }) => style.display = 'flex';
export const hide = ({ style }) => style.display = 'none';
export const doInvisible = ({ style }) => style.opacity = '0';
export const doVisible = ({ style }) => style.opacity = '1';
export const setDisable = ({ style }, state = true) => style.pointerEvents = state ? 'none' : 'initial';
export const doActive = ({ classList }) => classList.add('LM_active');
export const doUnactive = ({ classList }) => classList.remove('LM_active');
export const convertToKm = distance => (distance / 1000).toFixed();
export const sortByDistance = (first, second) => first.distance - second.distance;
export const getStyle = (elem, prop, isNumber) => {
	const styles = getComputedStyle(elem, null);
	const value = styles.getPropertyValue(prop);
	return isNumber ? parseFloat(value) : value;
};

export const isOldAndroid = (ua = navigator.userAgent) => {
	if (ua.includes('Android')) {
		const androidversion = parseFloat(ua.slice(ua.indexOf('Android') + 8), 10);
		return (androidversion > 4 && androidversion <= 4.5);
	}
};

window.L = window.L ? window.L : {
	error: message => console.log(message),
	track: () => { },
	trackOnce: () => { },
	onClick: () => window.parent.open('https://loopme.com/', '__blank', ''),
	isIOS: false,
	isInterscroller: false,
	isPreview: true,
	bridge: false,
	isIFrame: true,
	states: {
		READY: 'READY'
	},
	webview: {
		state: 'VISIBLE',
		states: {
			READY: 'READY'
		},
		on: () => { },
		set: () => { }
	}
};

const { isIFrame, bridge, isIOS } = L;
export const isLoopMeSDK = bridge && !isIFrame;
export const isSDKOnAndroid = isLoopMeSDK && !isIOS;
export const isMoPub = !bridge && !isIFrame;
export const isMoPubOnIOS = isMoPub && isIOS;
export const isBanner = () => getConfig().IS_BANNER === "banner";
export const isMoPubOnAndroid4 = isOldAndroid() && isMoPub;
export const isQR = () => getConfig().IS_QR === "true";

export const isLandscape = () => isIOS ? window.orientation !== 0 : window.screen.height < window.screen.width;

export const triggerEvent = eventName => {
	const event = document.createEvent("Event");
	event.initEvent(eventName, true, true);
	document.dispatchEvent(event);
};

export const getRandomInteger = (min, max) => {
	const rand = min - 0.5 + Math.random() * (max - min + 1);

	return Math.round(rand);
};

export const ANDROID_HACK_DELAY = 100;

export const IOS_VERSION = parseFloat(
	('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [ 0, '' ])[ 1 ])
		.replace('undefined', '3_2')
		.replace('_', '.')
		.replace('_', '')) || false;

export const IS_SAMSUNG_NATIVE = ('SAMSUNG' == navigator.userAgent.match(/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z|G]|SHV-E|SCH-[I|J|R|S]|SPH-L/i));

export const throttle = (func, delay) => {
	let doLastCall;
	const throttled = (...args) => {
		clearTimeout(doLastCall);
		doLastCall = setTimeout(() => func(...args), delay);
	};
	return throttled;
};

export const debounce = (func, delay) => {
    let isDebounceActive = false;
    const debounced = (...args) => {
        if (isDebounceActive) {
            return false;
        }
        isDebounceActive = true;
        func(...args);
        setTimeout(() => isDebounceActive = false, delay);
    }
    return debounced;
}