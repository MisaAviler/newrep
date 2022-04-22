import { getConfig } from './config';
import { setState } from './state';
import { triggerEvent } from './utils';
import { sendCreativeEvent } from './analytics';

const trim = str => str.trim();

export const onClick = (eventName, url = getConfig().CLICK_URL ) => {
	setState('isRedirected');
	triggerEvent('redirect');
	sendCreativeEvent( trim(eventName), 'INTERACTION' );
	L.onClick(url);
};

export const onLoadingClick = () => onClick(getConfig().LOADING_CLICK);
export const onBgClick = () => onClick(getConfig().BG_CLICK);
export const onCtaClick = () => onClick(getConfig().CTA_CLICK);
export const onLogoClick = () => onClick(getConfig().LOGO_CLICK);