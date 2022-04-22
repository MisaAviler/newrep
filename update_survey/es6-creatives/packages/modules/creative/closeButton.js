import { first, show } from './utils';
import {hideAndCloseSurvey} from "../../creatives/newSurveyTemplate/utils";

const CLOSE_BUTTON_TEMPLATE = `
			<div style='
				position: absolute;
				top: 0px;
				right: 0px;
				width: 60px;
				height: 60px;
				z-index: 999999999;
				opacity: 1;
				background: url(https://i.loopme.me/html/loopme_standart_icons/Close.png) no-repeat center;
				background-size: 24px;' class='LM_close'>&nbsp;
			</div>`;

const handleXButtonClick = e => {
    e.stopPropagation();
    hideAndCloseSurvey()
};

export const addCloseButton = () => {
    if (L.isInterscroller) {
        return false;
    }

    const close = first('.LM_close');

    if (!close) {
        first('body').insertAdjacentHTML('afterbegin', CLOSE_BUTTON_TEMPLATE);
    } else {
        show(close);
    }

    first('.LM_close').addEventListener('click', handleXButtonClick, false);
    first('.LM_close').addEventListener(
        'touchmove',
        () => event.preventDefault(),
        false
    );
};
