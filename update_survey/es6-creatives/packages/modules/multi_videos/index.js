/**
 * Call initVideo() in your initAd()
 */

import {show, hide, getState, setState} from 'creative';
import {MuteButton} from './MuteButton';
import {VideoComponent} from "./VideoComponent";
import {videos} from './videos';
import './styles/multivideos.css';

export const initVideo = () => {
    const container = document.querySelector('.container');
    const screenshotsList = document.querySelector('.screenshots_list');
    const muteButton = new MuteButton();
    hide(muteButton.muteBtn);

    let currentVideo = null;
    let autoplayTimer;

    const videoComponents = videos.map(props => new VideoComponent(props));

    videoComponents.forEach(videoComponent => {
        container.append(videoComponent.wrapper);

        const controls = document.createElement('li');
        controls.classList.add('screenshots');
        controls.append(videoComponent.playBtn);
        hide(videoComponent.pauseBtn);
        controls.append(videoComponent.pauseBtn);

        videoComponent.playBtn.addEventListener('click', () => {
            videoComponent.playVideo();
            show(muteButton.muteBtn);
        }, false);

        videoComponent.pauseBtn.addEventListener('click', () => {
            videoComponent.pauseVideo();
            hide(muteButton.muteBtn);
        }, false);

        screenshotsList.append(controls);

        muteButton.muteBtn.addEventListener('click', videoComponent.toggleVolume, false);

        const video = videoComponent.video;
        video.pause();
        video.playbackRate = 1;

        if (getState('autoplay')) {
            autoplayTimer = setTimeout(() => videoComponent.playVideo(), 3000);
            setState('autoplay', false);
        }

        video.addEventListener('playing', () => {
            clearTimeout(autoplayTimer);
            show(muteButton.muteBtn);
            if (currentVideo) {
                if (currentVideo !== videoComponent) {
                    currentVideo.pauseVideo();
                    currentVideo.hideVideoBlock();
                }
            }
            currentVideo = videoComponent;
        }, false);
        video.addEventListener('ended', () => {
            const index = videoComponents.indexOf(currentVideo);
            if (index + 1 === videoComponents.length) {
                show(videoComponents[0].wrapper);
                hide(muteButton.muteBtn);
            } else {
                videoComponents[index + 1].playVideo();
            }
        }, false);

        document.addEventListener('landscape', () => {
            currentVideo && currentVideo.pauseVideo();
            hide(muteButton.muteBtn);
        }, false);
        document.addEventListener('portrait', () => currentVideo && currentVideo.playVideo(), false);
        document.addEventListener('hidden', () => currentVideo && currentVideo.pauseVideo(), false);
        document.addEventListener('visible', () => currentVideo && currentVideo.playVideo(), false);
        document.addEventListener('redirect', () => currentVideo && currentVideo.pauseVideo(), false);
    });
    container.insertAdjacentElement('beforeend', muteButton.muteBtn);

};
