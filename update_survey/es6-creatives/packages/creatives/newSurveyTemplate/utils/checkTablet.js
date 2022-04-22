
const DEFAULT_TABLET_SCREEN_WIDTH = 620;
const DEFAULT_TABLET_SCREEN_HEIGHT = 550;

const match = (regex, userAgent) => {
	return regex.test(userAgent);
}

const apple_phone = /iPhone/i,
	apple_tablet = /iPad/i,
	android_phone = /\bAndroid(?:.+)Mobile\b/i, // Match 'Android' AND 'Mobile'
	android_tablet = /Android/i,
	amazon_phone = /\bAndroid(?:.+)SD4930UR\b/i,
	amazon_tablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
	windows_phone = /Windows Phone/i,
	windows_tablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'

const isTablet = () => {
	let ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';

	let tmp = ua.split('[FBAN');
	if (typeof tmp[1] !== 'undefined') {
		ua = tmp[0];
	}

	tmp = ua.split('Twitter');
	if (typeof tmp[1] !== 'undefined') {
		ua = tmp[0];
	}

	const isAppleTablet = !match(apple_phone, ua) && match(apple_tablet, ua) && !match(windows_phone, ua);
	const isAmazonTablet = !match(amazon_phone, ua) && match(amazon_tablet, ua);
	const isAndroidTablet = !match(windows_phone, ua) && !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua));
	const isWindowsTablet = match(windows_tablet, ua);

	return isAppleTablet || isAmazonTablet || isAndroidTablet || isWindowsTablet || window.screen.width >= DEFAULT_TABLET_SCREEN_WIDTH && window.screen.height >= DEFAULT_TABLET_SCREEN_HEIGHT ;
}

export const checkTablet = () => {
	if (isTablet()) {
		document.body.classList.add('isTablet');
	} else {
		document.body.classList.remove('isTablet');
	}
}

window.addEventListener('resize', checkTablet, false);
