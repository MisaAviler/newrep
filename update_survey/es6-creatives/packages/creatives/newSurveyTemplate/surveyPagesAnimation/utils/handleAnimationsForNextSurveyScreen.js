import {first, flex, selectAll, show} from "creative";
import {removePointerEvents, togglePrivacyPolicyText} from "../../utils";

export const handleAnimationsForNextSurveyScreen = async (nextSurveyScreen) => {
	// CHANGE
	flex(nextSurveyScreen);
	// showPrivatePolicy();
	for await (const el of showOptions(nextSurveyScreen)) {}
}

async function* showOptions(nextSurveyScreen) {
	const currentQuestionOptions = nextSurveyScreen.querySelectorAll(".survey-option-item");
	const currentQuestionOption = nextSurveyScreen.querySelectorAll(".survey-option");
	const maxQuantityOfOptions = currentQuestionOptions.length;

	let currentOptionCount = 0;
	while (currentOptionCount < maxQuantityOfOptions) {
		yield initAnimationForOptions(
			currentQuestionOptions,
			currentOptionCount++
		);
	}

	currentQuestionOption.forEach(removePointerEvents);

}

const initAnimationForOptions = (currentQuestionOptions, currentOptionCount) => {
	return new Promise(resolve => {
		const onAnimationEndCb = () => {
			currentQuestionOptions[currentOptionCount].removeEventListener("animationend", onAnimationEndCb);
			currentQuestionOptions[currentOptionCount].classList.remove("anim-element");
			resolve();
		};
		currentQuestionOptions[currentOptionCount].addEventListener("animationend", onAnimationEndCb);
		currentQuestionOptions[currentOptionCount].classList.add("show-next-screen-options", "anim-element");
	});
};


const showPrivacyPolicy = () => {
	const privacyPolicy = togglePrivacyPolicyText(first(".second-survey-footer-privacy-policy-container"));
	privacyPolicy.showPrivacyPolicy();

}