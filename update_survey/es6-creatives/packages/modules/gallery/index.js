import {first, show, selectAll, getConfig, sendCreativeEvent, debounce, doVisible, doInvisible} from 'creative';
import './gallery.css';

const galleryItems = selectAll('.LM_gallery-item');
const maxIndex = galleryItems.length - 1;
let currIndex = 0;

const getIndex = (offsetIndex) => {
    if (offsetIndex > 0) {
        return currIndex === maxIndex ? 0 : currIndex + offsetIndex;
    }

    if (offsetIndex < 0) {
        return currIndex === 0 ? maxIndex : currIndex + offsetIndex;
    }

    return currIndex;
};

const setShift = ({ style }, offset) => {
    style.WebkitTransform = `translateX(${offset}px)`;
    style.transform = `translateX(${offset}px)`;
};

const switchIndicator = (currIndex) => {
    const indicators = selectAll('.LM_gallery-dots-item');
    const deactivate = ({ classList }) => classList.remove('active');
    [ ...indicators ].forEach(deactivate);

    const activate = ({ classList }) => classList.add('active');
    activate(indicators[ currIndex ]);
};

const switchItems = (items, offset) => {
    const activeItems = [ items[ getIndex(0) ], items[ getIndex(-1) ], items[ getIndex(+1) ] ];
    const offsets = [ 0, -offset, offset ];

    activeItems.forEach(show);
    activeItems.forEach((item, currIndex) => setShift(item, offsets[ currIndex ]));
};

//animation block
const SHIFT_DELAY = 400;

const shift = debounce((nextIndexOffset, items, offset) => {
    const currIndexes = [getIndex(0), getIndex(nextIndexOffset)];
    currIndex = currIndexes[1];

    galleryItems.forEach(doInvisible);

    const isOpacityMethod = OFFSET === 0;
    const elementsForTransform = isOpacityMethod ? [currIndex] : currIndexes;

    elementsForTransform.forEach(currIndex => {
        const element = items[currIndex];
        doVisible(element);
        setShift(element, nextIndexOffset * offset);
    });

    switchItems(items, offset);
    switchIndicator(getIndex(0));
}, SHIFT_DELAY);

const checkInteractionValue = (side, value) => {
    const names = {
        'left': getConfig().SWIPE_LEFT,
        'right': getConfig().SWIPE_RIGHT
    };
    const eventName = names[side];
    sendCreativeEvent(eventName, 'INTERACTION', false, 'track', value);
};

let counter = 0;
const changeGalleryElement = (side) => {
    clearInterval(autoLoopInterval);
    const nexElementIndex = side === 'right' ? 1 : -1;
    shift(nexElementIndex, galleryItems, OFFSET);
    const interactionValue = counter === 1 ? '1' : '';
    checkInteractionValue(side, interactionValue);
    counter++;
};

const addClickHandlers = () => {
    const leftBtn = first('.LM_gallery-control__left');
    leftBtn.addEventListener('click', () => changeGalleryElement('left'), false);

    const rightBtn = first('.LM_gallery-control__right');
    rightBtn.addEventListener('click', () => changeGalleryElement('right'), false);
};

const addTouchHandlers = () => {
    let startX = 0;
    const setStartX = event => startX = event.targetTouches[ 0 ].clientX;

    const calculateSwipeDirection = event => {
        const currX = event.changedTouches[ 0 ].clientX - startX;
        const SWIPE_DISTANCE = 30;
        if (Math.abs(currX) <= SWIPE_DISTANCE) {
            return;
        }
        const direction = currX > SWIPE_DISTANCE ? 'left' : 'right';
        changeGalleryElement(direction);
    };

    const gallery = first('.LM_gallery-list');
    gallery.addEventListener('touchstart', setStartX, false);
    gallery.addEventListener('touchend', calculateSwipeDirection, false);
};

//Autostart of animation
let OFFSET = null;
let autoLoopInterval = null;

const startAutoLoop = (delay = 1500) => {
    const rightElementIndex = 1;
    autoLoopInterval = setInterval(() => {
        shift(rightElementIndex, galleryItems, OFFSET);
    }, delay);
};

const addItemsTransition = (method) => {
    galleryItems.forEach(el => el.style.transition = `${method} 0.4s linear`);
};

const initGallery = (method = 'transform') => {
    OFFSET = method === 'opacity' ? 0 : window.screen.width;

    startAutoLoop();
    switchIndicator(0);
    switchItems(galleryItems, OFFSET);

    addClickHandlers();
    addTouchHandlers();
    addItemsTransition(method);

    galleryItems.forEach(doInvisible);
    doVisible(galleryItems[currIndex]);
};

export default initGallery;
