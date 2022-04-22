import {show, hide, onClick, sendCreativeEvent, getConfig, sendCreativeEventOnce, sendCreativeStatisticsOnce, getState, setState} from "creative";
const videoUpdate = percent => {
    const trackMap = {
        '1': 'STARTS',
        '100': 'COMPLETES',
        '25': '25',
        '50': '50',
        '75': '75'
    };

    sendCreativeStatisticsOnce(`VIDEO_${trackMap[percent]}`);
};
export class VideoComponent {
    playVideo () {
        hide(this.screenshot);
        show(this.wrapper);
        hide(this.playBtn);
        show(this.pauseBtn);
        return this.video.play();
    }

    pauseVideo () {
        show(this.screenshot);
        show(this.playBtn);
        hide(this.pauseBtn);
        return this.video.pause();
    }

    unmute () {
        this.video.volume = 1;
        this.video.muted = false;
        this.video.removeAttribute('muted');
    }

    mute () {
        this.video.volume = 0;
        this.video.muted = true;
        this.video.setAttribute('muted', true);
    }
    toggleVolume () {
        this.isMuted = !this.isMuted;
        return this.isMuted ? this.unmute() : this.mute();
    }

    hideVideoBlock () {
        hide(this.wrapper);
        show(this.screenshot);
        hide(this.pauseBtn);
        show(this.playBtn);
    }
    onVideoClick () {
        onClick(getConfig().VIDEO_REDIRECT);
    }
    videoListener ({target}) {
        const {duration, currentTime} = target;
        const tempPercent = Math.round(currentTime / duration * 100);
        const trackPoints = [1, 25, 50, 75, 100];
        let percent = 1;

        trackPoints.forEach(i => tempPercent >= i && (percent = i));
        videoUpdate(percent);

        if (currentTime > 0.2) {
            sendCreativeStatisticsOnce('VIDEO_DISPLAYS');
            if (getState('autoplay')) {
                sendCreativeEventOnce('AUTO_PLAY', 'CUSTOM');
                setState('autoplay', false);
            }
        }
    };

    constructor({src, screenshot, play, pause}) {
        this.playVideo = this.playVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.unmute = this.unmute.bind(this);
        this.mute = this.mute.bind(this);
        this.toggleVolume = this.toggleVolume.bind(this);
        this.hideVideoBlock = this.hideVideoBlock.bind(this);
        this.onVideoClick = this.onVideoClick.bind(this);
        this.videoListener = this.videoListener.bind(this);

        const wrapper = document.createElement('div');
        wrapper.classList.add('LM_video-wrapper');
        wrapper.innerHTML = `
            <video class='LM_video' autoplay='autoplay' playsinline='true' webkit-playsinline='true'
                x-webkit-airplay='allow' muted='true'>
                <source src='${src}' type='video/mp4'>
            </video>
            <img class='LM_main-screenshot' src='${screenshot}'>`;

        this.wrapper = wrapper;

        this.screenshot = wrapper.querySelector('.LM_main-screenshot');
        this.screenshot.addEventListener('click', () => {
            this.playVideo();
            sendCreativeEvent(getConfig().CLICK_TO_PLAY, 'INTERACTION', false, 'track', '1');
        }, false);

        this.playBtn = document.createElement('img');
        this.playBtn.src = play;
        this.playBtn.addEventListener('click', this.playVideo, false);

        this.pauseBtn = document.createElement('img');
        this.pauseBtn.src = pause;
        this.pauseBtn.addEventListener('click', this.pauseVideo, false);

        this.video = wrapper.querySelector('video');
        this.video.addEventListener('ended', this.hideVideoBlock, false);
        this.video.addEventListener('click', this.onVideoClick, false);
        this.video.addEventListener('timeupdate', this.videoListener, false);

        this.wasPlayed = false;
    }
}