import './styles/embed.css';
import './styles/common.css';
import { getConfig } from './config';
import { preloadImages } from './imageLoader';
// import { checkOrientation } from './landscape';
import { addCloseButton } from './closeButton';
import { sendTimeEvent } from './dwell';
import { first, selectAll, isBanner } from './utils';
// import { onLoadingClick } from './onClick';
import { initState } from './state';
import { initViewListeners } from './visibility';

const content = first('.LM_content');
// const loadingPage = first('#LM_loading_page');
// const prevent = event => event.preventDefault();
const prevent = () => {};

// loadingPage.addEventListener('click', onLoadingClick, false);
const addEvents = () => !L.isInterscroller && content.addEventListener('touchmove', prevent, false);

// const checkCloseButton = () => {
// 	const isCloseButton = getConfig().SHOW_CLOSE_BUTTON === 'true';
// 	isCloseButton && !isBanner() && setTimeout(addCloseButton, getConfig().CLOSE_BUTTON_DELAY);
// };

export const showCreative = () => {
	initState();
	initViewListeners();

	addEvents();
	// checkOrientation();
	preloadImages([ ...selectAll('.LM_content img') ]);
	sendTimeEvent();

	// !L.isInterscroller && checkCloseButton();
};

export * from './analytics';
export * from './config';
export * from './utils';
export * from './onClick';
export * from './state';
export * from './closeButton';
