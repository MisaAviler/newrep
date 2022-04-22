import { getConfig } from './config';

const send = (et = '', mode = '', isNoHeatMap = false, track = 'track', i = '') => {
	const name = getConfig().CREATIVE_NAME;
	const nhm = isNoHeatMap ? '1' : '';
	const tt = getConfig().CREATIVE_TYPE;

	L[ track ]({ et, name, mode, nhm, tt, i });
};

const trackedUrls = [];

export const sendCustomTracker = src => (new Image()).src = src;

export const sendCustomTrackerOnce = src => {
	if (trackedUrls.includes(src)) {
		return false;
	}

	trackedUrls.push(src);
	sendCustomTracker(src);
};

export const sendCreativeEvent = (mode, eventType, isNoHeatMap, track, interactionValue) => {
	send(eventType, mode, isNoHeatMap, track, interactionValue);
};

export const sendCreativeEventOnce = (mode, eventType, isNoHeatMap, track = 'trackOnce') => {
	send(eventType, mode, isNoHeatMap, track);
};

export const sendCreativeStatisticsOnce = (eventType, mode = '', isNoHeatMap = false, track = 'trackOnce') => {
	send(eventType, mode, isNoHeatMap, track);
};
