import {sendCreativeEvent, hide, show, first, addCloseButton, isMoPubOnIOS, getConfig} from 'creative';
import './expandable-banner.css';

const banner = first('#banner_el');
let lastState = 'default';

const toggleLayer = (fromLayer, toLayer) => {
    hide(document.getElementById(fromLayer));
    show(document.getElementById(toLayer));
};

const hideCloseButton = () => hide(first(".LM_close"));

const updateAd = (state) => {
    if (lastState === 'default' && state === "expanded") {
        toggleLayer('normal', 'expanded');
    } else if (lastState === 'expanded' && state === "default") {
        toggleLayer('expanded', 'normal');
        isMoPubOnIOS && hideCloseButton();
    }

    lastState = state;
};

const showAd = () => {
    first("#normal").style.display = '';
    mraid.addEventListener("stateChange", updateAd);
};

const mraidIsReady = () => {
    mraid.removeEventListener("ready", mraidIsReady);
    showAd();
};

const sendExpandEvents = () => {
    sendCreativeEvent(getConfig().EXPAND_CLICK, 'INTERACTION');
    sendCreativeEvent('expand', 'TRACKING');
};

const expand = () => {
    mraid.setOrientationProperties({"allowOrientationChange": false, "forceOrientation": "portrait"});
    mraid.expand();

    isMoPubOnIOS && addCloseButton();
    sendExpandEvents();
};

const doReadyCheck = () => {
    mraid.getState() === 'loading' ? mraid.addEventListener("ready", mraidIsReady) : showAd();
};

export const initBanner = () => {
    doReadyCheck();
    banner.addEventListener('click', expand, false);
};


