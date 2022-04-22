import './video.css';
import { sendCreativeStatisticsOnce, sendCreativeEventOnce, sendCreativeEvent, setState, getState, first, show, hide, onClick, isMoPubOnIOS, isLandscape, getConfig } from 'creative';

let isVideoPlaying = false;

const muteBtn = first('#mute');
const video = first('.LM_video');
const screenshot = first('.LM_screenshot');
const videoOverlay = first('.LM_video-overlay');

const isWebviewVisible = () => L.webview.state === 'VISIBLE' && document.visibilityState === 'visible';
const isCanPlay = () =>  isWebviewVisible() && getState('isContentLoaded') && !isLandscape();

const checkMuteIcon = () => {
    L.isIFrame && show(muteBtn);
    muteBtn.className = getState('muted') ? 'LM_muted' : 'LM_unmuted';
};

const unmuteVideo = () => {
    setState('muted', false);
    video.volume = 1;
    video.muted = false;
    video.removeAttribute('muted');
};

const switchMuteIcon = () => {
    muteBtn.className = getState('muted') ? 'LM_unmuted' : 'LM_muted';
    video.volume = getState('muted') ? 1 : 0;
    video.muted = !getState('muted');
    setState('muted', video.muted);
};

const onVideoClick = () => onClick(getConfig().VIDEO_REDIRECT);

const onVideoEnded = () => {
    isVideoPlaying = false;
    handleVideoPause();
};

const pauseVideo = () => video.pause();

const onScreenshotClick = () => {
    setState('autoplay', false);
    setState('isRedirected', false);
    video.play();
    hide(screenshot);
    show(videoOverlay);
    !getState('muted') && unmuteVideo();
    sendCreativeEvent(getConfig().CLICK_TO_PLAY, 'INTERACTION', false, 'track', '1');
};

const handleVideoPause = () => {
    const isReady = !isVideoPlaying || isMoPubOnIOS;

    if (isReady) {
        hide(videoOverlay);
        show(screenshot);
        hide(muteBtn);
    }
};

const videoUpdate = percent => {
    const trackMap = {
        '1' : 'STARTS',
        '100': 'COMPLETES',
        '25': '25',
        '50': '50',
        '75': '75'
    };

    sendCreativeStatisticsOnce(`VIDEO_${trackMap[percent]}`);
};

const videoListener = ({target}) => {
    if (!isCanPlay()) {
        return pauseVideo();
    }

    const {duration, currentTime} = target;
    const tempPercent = Math.round(currentTime / duration * 100);
    const trackPoints = [1, 25, 50, 75, 100];
    let percent = 1;

    trackPoints.forEach(i => tempPercent >= i && (percent = i));
    videoUpdate(percent);

    if (currentTime > 0.2) {
        isVideoPlaying = true;
        sendCreativeStatisticsOnce('VIDEO_DISPLAYS');
        if (getState('autoplay')) {
            sendCreativeEventOnce('AUTO_PLAY', 'CUSTOM');
            setState('autoplay', false);
        }

        hide(screenshot);
        show(videoOverlay);
        checkMuteIcon();
    }    
};

const playVideo = () => {
    if (!isCanPlay()) {
        return false;
    }

    const isReady = isVideoPlaying || (!isVideoPlaying && getState('autoplay'));
    isReady && video.play();
};

export const initVideo = () => {
    if (!video) {
        return false;
    }

    screenshot.addEventListener('click', onScreenshotClick, false);
    videoOverlay.addEventListener('click', onVideoClick, false);
    video.addEventListener('ended', onVideoEnded, false);
    video.addEventListener('pause', handleVideoPause, false);
    video.addEventListener('timeupdate', videoListener, false);
    muteBtn.addEventListener('click', switchMuteIcon, false);

    !getState('muted') && unmuteVideo();

    //unlock autoplay for android 4 mopub (from landscape)
    if (getState('autoplay')) {
        video.play();
        pauseVideo();
    }

    L.isInterscroller && video.removeAttribute('autoplay');

    document.addEventListener('loaded', playVideo, false);
    document.addEventListener('visible', playVideo, false);
    document.addEventListener('portrait', playVideo, false);
    document.addEventListener('redirect', pauseVideo, false);
};

video && pauseVideo();
