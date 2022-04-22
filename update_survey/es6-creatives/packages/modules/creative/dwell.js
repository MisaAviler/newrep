import { getRandomInteger } from './utils';
import { getState } from './state';
import { sendCreativeEvent } from './analytics';

const DWELL_TIME_DELAY = 3000;
const isDwellTime = getRandomInteger(1, 10) === 1;
let dwell_counter = 1;

const handleDwellTime = () => {
  const isReady = L.webview.state === 'VISIBLE' && !getState('isRedirected');
  if (isReady) {
    sendCreativeEvent(`DWELL_TIME&dwell_time=${dwell_counter}`, 'DWELL_TIME');
    dwell_counter += DWELL_TIME_DELAY / 1000;
  }
  sendTimeEvent();
};

export const sendTimeEvent = () => isDwellTime && setTimeout(handleDwellTime, DWELL_TIME_DELAY);
