import { getConfig } from './config';

const state = {
	muted: true,
	autoplay: false,
	isContentLoaded: false,
	isLandscape: null,
	isRedirected: false,
	currentVideoIndex: 0
};

export const setState = (prop, value = true) => state[ prop ] = value;
export const getState = prop => state[ prop ];

export const initState = () => {
	const { IS_MUTED, IS_AUTOPLAY } = getConfig();

	if (L.isPreview) {
		setState('autoplay', true);
		setState('muted', true);
		return true;
	}

	setState('autoplay', IS_AUTOPLAY === 'true');
	setState('muted', L.isIFrame && getState('autoplay') ? true : IS_MUTED === 'true');
};
