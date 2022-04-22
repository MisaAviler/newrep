import './styles/loading_page.css';
import { first, hide, doVisible, triggerEvent } from './utils';
import { setState } from './state';
import { sendCreativeStatisticsOnce } from './analytics';

 export const hideLoadPage = () => {
	// hide(first('#LM_loading_page'));
	doVisible(first('.LM_content'));
	// sendCreativeStatisticsOnce('PAGE_2');
	setState('isContentLoaded');
	triggerEvent('loaded');
};

const trackerUrls = [
	`https://pixel.adsafeprotected.com/jload?anId=927083&advId=%%ADVERTISER%%&campId=%%CAMP_ID%%&pubId=%%PUBLISHER_NAME%%&chanId=%%BUNDLE_DOMAIN%%&placementId=%%APPID%%`,
];
const addCustomTrackers = urls => {
	const cachebuster = Math.round(new Date().getTime() / 1000);
	urls.forEach(url => {
		const trackerScript = document.createElement("script");
		trackerScript.src = `${url}&cb=${cachebuster}`;
		document.body.append(trackerScript);
	});
};
addCustomTrackers(trackerUrls);