import { selectAll } from "creative";
import { switchBetweenSurveyPages } from "../switchBetweenPages/switchBetweenSurveyPages";
import {
	generateTextParameter,
	fireEventAndRemoveListener,
	sendCustomEvent,
	sendCustomEventToTheFirstQuestion
} from "../../utils";
import { sendApi } from "../..";


export const handleSingleSelectionLogic = async (currentQuestion) => {
	const currentPage = selectAll(".survey-page")[currentQuestion];
	const demographicPageCount = selectAll(".survey-page").length - 1;

	return fireEventAndRemoveListener(currentPage, "change", (e) => {
		const { target } = e;
		const { parentElement: optionInputLabel } = target;
		let { jumpTo } = optionInputLabel.dataset;
		const isJumpToDemographicPage = jumpTo <= 0;
		jumpTo = isJumpToDemographicPage ? demographicPageCount : --jumpTo;

		optionInputLabel.classList.add("active");
		const userInteractionData = handleSendingCustomEvent(e, currentQuestion);
		// const singleSelectionData = sendSingleSelectionApi();
		const singleSelectionData = sendApi();

		return switchBetweenSurveyPages(currentQuestion, jumpTo, userInteractionData, singleSelectionData);
	});
}


const handleSendingCustomEvent = (e, currentQuestion) => {
	const { target } = e;
	const currentScreen = selectAll(".survey-page")[currentQuestion];
	const currentQuestionText = selectAll(".survey-question-text")[currentQuestion].textContent;
	const { parentElement: optionInputLabel } = target;
	const answerText = target.value;
	let { outcome, mode } = optionInputLabel.dataset;
	const { optimizationQuestionPosition, questionType } = currentScreen.dataset;


	const eventState = {
		questionText: generateTextParameter(currentQuestionText),
		answerText: generateTextParameter(answerText),
		outcome,
		mode,
		optimization_question_position: optimizationQuestionPosition,
		question_type: questionType
	}

	sendCustomEvent(eventState);
	return eventState;
}

