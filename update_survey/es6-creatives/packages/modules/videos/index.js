import '../video/video.css';
import { sendCreativeStatisticsOnce, sendCreativeEventOnce, setState, getState, show, hide, onClick, isLandscape, getConfig, sendCreativeEvent } from 'creative';

[...document.querySelectorAll('video')].forEach(video => video.pause());
const isCanPlay = () => isWebviewVisible() && getState('isContentLoaded') && !isLandscape();
const isWebviewVisible = () => L.webview.state === 'VISIBLE' && document.visibilityState === 'visible';

const defaultState = {
    index: 0,
    isAutoplay: true,
    isMuted: L.isIFrame,
    isVideoPlaying: false,
    wasPlayed: false,
};

export const createVideo = (videoWrapper, newState, { notiseOnEnd }) => {
    const state = Object.assign({}, defaultState, newState);
    const muteBtn = videoWrapper.querySelector('#mute');
    const video = videoWrapper.querySelector('.LM_video');
    const screenshot = videoWrapper.querySelector('.LM_screenshot');
    const videoOverlay = videoWrapper.querySelector('.LM_video-overlay');

    const checkMuteIcon = () => {
        L.isIFrame && show(muteBtn);
        muteBtn.className = state.isMuted ? 'LM_muted' : 'LM_unmuted';
    };

    const unmuteVideo = () => {
        state.isMuted = false;
        video.volume = 1;
        video.muted = false;
        video.removeAttribute('muted');
    };

    const switchMuteIcon = () => {
        const { isMuted } = state;
        muteBtn.className = isMuted ? 'LM_unmuted' : 'LM_muted';
        video.volume = isMuted ? 1 : 0;
        video.muted = !isMuted;
        state.isMuted = video.muted;
    };

    const onVideoClick = () => onClick(getConfig().VIDEO_REDIRECT);

    const onVideoEnded = () => {
        state.isVideoPlaying = false;
        state.wasPlayed = true;
        handleVideoPause();
        return (typeof notiseOnEnd === 'function') && notiseOnEnd(state.index);
    };

    const pauseVideo = () => video.pause();

    const onScreenshotClick = () => {
        [...document.querySelectorAll('video')].forEach(video => video.pause());
        setState('currentVideoIndex', state.index);
        state.isAutoplay = false;
        setState('autoplay', false);
        setState('isRedirected', false);
        video.play();
        hide(screenshot);
        show(videoOverlay);
        !state.isMuted && unmuteVideo();
        sendCreativeEvent(getConfig().CLICK_TO_PLAY, 'INTERACTION', false, 'track', '1');
    };

    const handleVideoPause = () => {
        hide(videoOverlay);
        show(screenshot);
        hide(muteBtn);
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
        if (!isCanPlay() || getState('currentVideoIndex') !== state.index) {
            return pauseVideo();
        }

        const { duration, currentTime } = target;
        const tempPercent = Math.round(currentTime / duration * 100);
        const trackPoints = [1, 25, 50, 75, 100];
        let percent = 1;

        trackPoints.forEach(i => tempPercent >= i && (percent = i));
        videoUpdate(percent);

        if (currentTime > 0.2) {
            state.isVideoPlaying = true;
            sendCreativeStatisticsOnce('VIDEO_DISPLAYS');

            if (state.isAutoplay) {
                sendCreativeEventOnce('AUTO_PLAY', 'CUSTOM');
                state.isAutoplay = false;
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

        const { isVideoPlaying, isAutoplay } = state;
        const isReady = isVideoPlaying || (!isVideoPlaying && isAutoplay);
        isReady && video.play();
    };

    const initVideo = () => {
        !state.isMuted && unmuteVideo();
        L.isInterscroller && video.removeAttribute('autoplay');
        screenshot.addEventListener('click', onScreenshotClick, false);
        videoOverlay.addEventListener('click', onVideoClick, false);
        video.addEventListener('ended', onVideoEnded, false);
        video.addEventListener('pause', handleVideoPause, false);
        video.addEventListener('timeupdate', videoListener, false);
        muteBtn.addEventListener('click', switchMuteIcon, false);
        document.addEventListener('loaded', playVideo, false);
        document.addEventListener('visible', playVideo, false);
        document.addEventListener('portrait', playVideo, false);
        document.addEventListener('redirect', pauseVideo, false);
        return { state, video };
    };

    return video ? initVideo() : null;
};
