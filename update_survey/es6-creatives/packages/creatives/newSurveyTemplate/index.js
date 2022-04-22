import regeneratorRuntime from "regenerator-runtime";
import {sendCreativeEvent, getConfig, setConfig, sendCreativeStatisticsOnce, showCreative, isBanner, first, onClick, addCloseButton} from 'creative';
import {SURVEY_DATA_STUBS} from "./stubs";

import { SURVEY_DATA_STUBS_EN } from "./forTests/en/stubs_en";
// import { SURVEY_DATA_STUBS_JAP } from "./forTests/jap/stubs_jap";
// import { SURVEY_DATA_STUBS_RU } from "./forTests/ru/stubs_ru";
// import { SURVEY_DATA_STUBS_SPANISH } from "./forTests/spanish/stubs_spanish";
// import { SURVEY_DATA_STUBS_THAI } from "./forTests/thai/stubs_thai";
// import { SURVEY_DATA_STUBS_UKR } from "./forTests/ukr/stubs_ukr";

import {renderSurveyComponents} from "./surveyUIComponents/renderSurveyComponents";
import {handleAnimationState} from "./surveyPagesAnimation/utils/handleAnimationState";
import {sendCustomEventToTheFirstQuestion, switchBetweenQuestionStage} from "./utils";
import {initFirstPageAnimation} from "./surveyPagesAnimation/surveyFirstPage";
import {handleFirstSurveyPage} from "./surveyPagesLogic/surveyFirstPage/handleFirstSurveyPage";
import {checkTablet} from "./utils/checkTablet";




import './styles/creative.css';
import './styles/stylesForSomeLanguages.css';
import "./styles/animation.css";
import "./styles/media.css";
import './styles/mediaForSomeLanguages.css';
import './styles/mediaForSomeDevices.css';



setConfig({
	CREATIVE_NAME: 'LM_survey',
	CREATIVE_TYPE: 'FORM',
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

const body = document.querySelector('body');
if(window.frameElement) {
	console.log(window.frameElement);
	console.log(window.frameElement.clientHeight, 'height');
	console.log(window.frameElement.clientWidth, 'width');
	window.frameElement.addEventListener('visible', () => {
		console.log(window.frameElement.clientHeight, 'height visible');
		console.log(window.frameElement.clientWidth, 'width visible');
		body.style.width = window.frameElement.clientWidth;
		body.style.height = window.frameElement.clientHeight;
	});
} else {
	console.log('this page does not have iframe');
}
document.addEventListener('click', event => {
	console.log(event.target, 'event target');
});



//send additional track link
let sendingAdditionalApi = false;
export const sendApi = () => {
	const et = "SURVEY_RESPONSE";
    const name = "LM_survey";
    const page_id = "1";

	const eventState = {
		et,
        name,
        page_id
	}

	if(sendingAdditionalApi !== true){
		console.log('sendApi',eventState)
		sendCustomEventToTheFirstQuestion(eventState);
		sendingAdditionalApi = true;
	}
	return eventState;
}






// const iframeHeight = Array.from(window.parent.document.querySelectorAll('iframe'));
// console.log(iframeHeight);

// const {SURVEY_DATA} = window;
const initAd = async () => {
	sendInitEvents();
	showCreative();

	// renderSurveyComponents(SURVEY_DATA);
	renderSurveyComponents(SURVEY_DATA_STUBS_EN);
	// renderSurveyComponents(SURVEY_DATA_STUBS_JAP);
	// renderSurveyComponents(SURVEY_DATA_STUBS_SPANISH);
	// renderSurveyComponents(SURVEY_DATA_STUBS_THAI);
	// renderSurveyComponents(SURVEY_DATA_STUBS_UKR);
	// renderSurveyComponents(SURVEY_DATA_STUBS_RU);
	// renderSurveyComponents(SURVEY_DATA_STUBS);


	auxiliaryLogic();
	switchBetweenQuestionStage(0);
	await initFirstSurveyPage();
	showCloseButtonAfterDelay(SURVEY_DATA_STUBS_EN.closeButtonDelay);
	// showCloseButtonAfterDelay(SURVEY_DATA_STUBS.closeButtonDelay);
	handlePrivacyPolicyClick();
};

const auxiliaryLogic = () => {
	checkTablet();
	handleLogoClick();
	handleAnimationState();
}

const showCloseButtonAfterDelay = (closeButtonDelay) => {
	setTimeout(() => {
		addCloseButton();
	}, closeButtonDelay)
}

const initFirstSurveyPage = async () => {
	await initFirstPageAnimation();
	handleFirstSurveyPage();
}

const handleLogoClick = () => {
	const loopmeURL = "https://loopme.com/";
	first(".logo-click").addEventListener("click", () => onClick("logo_click"), loopmeURL);
};

const handlePrivacyPolicyClick = () => {
	const privacyPolicyPageUrl = "https://loopme.com/privacy-policy";
	first(".survey-footer-legal-extra-text").addEventListener("click", () => onClick("policy_click", privacyPolicyPageUrl))
}

const checkLandscape = () => {
	return initAd();
};

const getWebViewState = () => {
	if (!isVisible() || isBanner()) {
		return true;
	}

	wasVISIBLE = true;
	return checkLandscape();
};

(L.isPreview || isBanner()) && checkLandscape();
webview.on("webview:state", getWebViewState);
setTimeout(webview.set, 1000, "state", webview.states.READY);

window.addEventListener('orientationchange', () => {
	if(window.orientation) {
		sendCreativeEvent(getConfig().SCREEN_ROTATED_L, 'INTERACTION', 1);
	}
});