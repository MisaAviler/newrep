import {flex, selectAll, show} from "creative";
import {removePointerEvents} from "../../utils";

export const initFirstPageOptionsAnimation = async () => {
	await handleIntroAnimation();
}

const handleIntroAnimation = async () => {
	for await (const el of showOptions()) {}
}

async function* showOptions() {
	const firstSurveyPage = selectAll(".survey-page")[0]
	const currentOptionItems = firstSurveyPage.querySelectorAll(".survey-option-item");
	const currentOptionLabels = firstSurveyPage.querySelectorAll(".survey-option");
	const maxOptionsNumber = currentOptionItems.length;


	flex(firstSurveyPage);

	let currentOptionCount = 0;
	while (currentOptionCount < maxOptionsNumber) {
		yield initAnimationForOptions(
			currentOptionItems,
			currentOptionCount++
		);
	}

	currentOptionLabels.forEach(removePointerEvents);
}

const initAnimationForOptions = (optionItems, currentOptionCount) => {
	return new Promise(resolve => {
		const onAnimationEndCb = () => {
			optionItems[currentOptionCount].removeEventListener("animationend", onAnimationEndCb);
			optionItems[currentOptionCount].classList.remove("anim-element");
			resolve();
		};
		optionItems[currentOptionCount].addEventListener("animationend", onAnimationEndCb);
		optionItems[currentOptionCount].classList.add("first-screen-show-option", "anim-element");
	});
};

