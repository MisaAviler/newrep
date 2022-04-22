import {first, hide} from "creative";
import {setPointerEvents, togglePrivacyPolicyText} from "../../utils";
import {checkSizeSurveyOptionsContainer} from "../../surveyPagesLogic/switchBetweenPages/switchBetweenSurveyPages";

export const handleAnimationsForPrevSurveyScreen = async (prevSurveyScreen) => {
	// hidePrivatePolicy();
	// CHANGE
	for await (const el of showOptions(prevSurveyScreen)) {}
	hide(prevSurveyScreen);
}

async function* showOptions(prevSurveyScreen) {
	const currentQuestionOptionsItem = prevSurveyScreen.querySelectorAll(".survey-option-item");
	const currentQuestionOption = prevSurveyScreen.querySelectorAll(".survey-option");
	const maxQuantityOfOptions = currentQuestionOptionsItem.length;

	currentQuestionOption.forEach(setPointerEvents);

	let currentOptionCount = 0;
	while (currentOptionCount < maxQuantityOfOptions) {
		yield initAnimationForOptions(
			currentQuestionOptionsItem,
			currentOptionCount++
		);
	}
    checkSizeSurveyOptionsContainer();
}

const initAnimationForOptions = (currentQuestionOptions, currentOptionCount) => {
	return new Promise(resolve => {
		const onAnimationEndCb = () => {
			currentQuestionOptions[currentOptionCount].removeEventListener("animationend", onAnimationEndCb);
			currentQuestionOptions[currentOptionCount].classList.remove("anim-element");
			resolve();
		};
		currentQuestionOptions[currentOptionCount].addEventListener("animationend", onAnimationEndCb);
		currentQuestionOptions[currentOptionCount].classList.add("hide-prev-screen-options", "anim-element");
	});
};

const hidePrivacyPolicy = () => {
	const privacyPolicy = togglePrivacyPolicyText(first(".survey-footer-privacy-policy-container"));
	privacyPolicy.hidePrivacyPolicy();
}
