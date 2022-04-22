import { setConfig, sendCreativeStatisticsOnce, showCreative, isBanner, isLandscape } from 'creative';
import './styles/creative.css';

///ddlldldlldl
setConfig({
    CREATIVE_NAME: '',
    CREATIVE_TYPE: 'EV',
    CLICK_URL: '%%CLICK_URL%%',
    IS_AUTOPLAY: '%%IS_AUTOPLAY%%',
    IS_MUTED: '%%IS_MUTED%%',
    DEFAULT_LAT: 13.7468,
    DEFAULT_LON: 100.5350,
    USER_LAT: '%%LAT%%',
    USER_LON: '%%LON%%',
    IS_QR: '%%IS_QR%%',
    IS_BANNER: '%%ADFORMAT%%',
    MARKERS_URL: '',
    SHOW_CLOSE_BUTTON: '%%SHOW_CLOSE_BUTTON%%',
    CLOSE_BUTTON_DELAY: 3000,

    // events aliases
    LOADING_CLICK: 'LOADING_CLICK',
    SCREEN_ROTATED_L: 'SCREEN_ROTATED_L',
    BG_CLICK: 'BG_CLICK',
    CTA_CLICK: 'CTA_CLICK',
    LOGO_CLICK: 'LOGO_CLICK',
    VIDEO_REDIRECT: 'VIDEO_REDIRECT',
    MAP_CLICK: 'MAP_CLICK',
    MAP_LIST_CLICK: 'MAP_LIST_CLICK',
    CLOSE_MAP: 'CLOSE_MAP',
    SWIPE_LEFT: 'SWIPE_LEFT',
    SWIPE_RIGHT: 'SWIPE_RIGHT',
    CLICK_TO_PLAY: 'CLICK_TO_PLAY',
    EXPAND_CLICK: 'EXPAND_CLICK'
});

const L = window.L,
      webview = L.webview;

let wasVISIBLE = false;

const isVisible = () => webview.state === 'VISIBLE' && !wasVISIBLE;

const sendInitEvents = () => {
    sendCreativeStatisticsOnce('PAGE_1');
    setTimeout(sendCreativeStatisticsOnce, 1500, 'AD_VIEWABLE');
};

const initAd = () => {
    sendInitEvents();
    showCreative();
};

const checkLandscape = () => {
    if (!isLandscape()) {
        initAd();
    } else {
        const CHECK_LANDSCAPE_DELAY = 50;
        setTimeout(checkLandscape, CHECK_LANDSCAPE_DELAY);
    }
};

const getWebViewState = () => {
    if (!isVisible() || isBanner()) {
        return true;
    }

    wasVISIBLE = true;
    checkLandscape();
};

(L.isPreview || isBanner()) && checkLandscape();
webview.on('webview:state', getWebViewState);
setTimeout(webview.set, 1000, 'state', webview.states.READY);
