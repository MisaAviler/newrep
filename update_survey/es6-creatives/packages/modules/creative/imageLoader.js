import { hideLoadPage } from './loadingPage';

let totalImages = 0;

const isImageLoaded = ({ naturalHeight, complete }) => naturalHeight && complete;

const onLoadImage = ({ target }) => {
	if (isImageLoaded(target)) {
		totalImages = totalImages - 1;
	}

	totalImages === 0 && hideLoadPage();
};

export const preloadImages = images => {

	const initLoadImage = image => image.addEventListener('load', onLoadImage, false);
	images = images.filter(image => !isImageLoaded(image));
	totalImages = images.length;

	if (totalImages === 0) {
		return hideLoadPage();
	}

	images.forEach(initLoadImage);
};
