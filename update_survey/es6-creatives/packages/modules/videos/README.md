
```js
// add this script after showCreative()
const notiseOnEnd = index => {
    const hasVideoToPlay = videos[index + 1] && !videos[index + 1].state.wasPlayed;

    if (hasVideoToPlay) {
        setState('currentVideoIndex', index + 1);
        videos[index + 1].video.play();
    }
};

const videoMapper = (videoWrapper, index) => createVideo(videoWrapper, {
    index,
    isAutoplay: index === 0,
    isMuted: getState('muted'),
}, { notiseOnEnd });

setState('currentVideoIndex', 0);

const videoWrappers = [...document.querySelectorAll('.LM_video-wrapper')];
const videos = videoWrappers.map(videoMapper);
```
