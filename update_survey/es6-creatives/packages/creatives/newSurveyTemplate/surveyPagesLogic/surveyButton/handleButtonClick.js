import { fireEventAndRemoveListener, generateTextParameter, sendCustomEvent, toggleButton, sendCustomEventToTheFirstQuestion } from "../../utils";
import { switchBetweenSurveyPages } from "../switchBetweenPages/switchBetweenSurveyPages";
import { selectAll } from "creative";
import { calculateOptionOutcomeForMultipleSelection } from "../utils/calculateOptionOutcome";
import { sendApi } from "../..";

const getNextPage = (outcome, currentPage, currentQuestion) => {
    let jumpTo = currentQuestion;
    const isMultipleSelectionOptions =
        currentPage.dataset.hasOwnProperty('positiveFollowingQuestionType') &&
        currentPage.dataset.hasOwnProperty('neutralFollowingQuestionType') &&
        currentPage.dataset.hasOwnProperty('negativeFollowingQuestionType');

    if (isMultipleSelectionOptions) {
        const followingQuestionPositions = [];
        const demographicPageCount = selectAll(".survey-page").length - 1;
        const countOutcome = Number(outcome);

        let {
            positiveFollowingQuestionType,
            neutralFollowingQuestionType,
            negativeFollowingQuestionType
        } = currentPage.dataset;

        followingQuestionPositions.push(
            positiveFollowingQuestionType,
            neutralFollowingQuestionType,
            negativeFollowingQuestionType);

        const isJumpToNextPage = () => followingQuestionPositions[countOutcome - 1] === 'null';
        const isJumpToDemographicPage = () => followingQuestionPositions[countOutcome - 1] === '0';

        isJumpToDemographicPage() ? jumpTo = demographicPageCount : false;
        isJumpToNextPage() ? ++jumpTo : false;
        !isJumpToDemographicPage() && !isJumpToNextPage() ? jumpTo = --followingQuestionPositions[countOutcome - 1] : false;
    } else {
        ++jumpTo;
    }
    return jumpTo;
};

export const handleButtonClick = (currentQuestion, listOfMultipleSelectedOptions) => {
    const currentPage = selectAll(".survey-page")[currentQuestion];
    const pages = selectAll(".survey-page");
    const currentPageBtn = currentPage.querySelector(".survey-btn-container");
    const currentBtn = toggleButton(currentPage);

    return fireEventAndRemoveListener(currentPageBtn, "click", () => {
        currentBtn.hideBtn();

        const selectedOptionsState = Array.from(listOfMultipleSelectedOptions).map(selectedOption => {
            return handleEventState(selectedOption, currentQuestion);
        });

        const { outcomePattern } = currentPage.dataset;
        const outcome =
            calculateOptionOutcomeForMultipleSelection(selectedOptionsState, outcomePattern);
        const nextPage = getNextPage(outcome, currentPage, currentQuestion);
        const listOfEvents = [];
        selectedOptionsState.forEach(eventState => {
            const newEventState = Object.assign(eventState, { outcome });
            listOfEvents.push(newEventState)
            return sendCustomEvent(newEventState);
        })

        return (
            switchBetweenSurveyPages(currentQuestion, nextPage, listOfEvents),
            sendApi()
        )
    })
}

const handleEventState = (selectedOption, currentQuestion) => {
    const currentPage = selectAll(".survey-page")[currentQuestion];
    const currentQuestionText = selectAll(".survey-question-text")[currentQuestion].textContent;
    const answerText = selectedOption.children[0].textContent;
    let { outcome, mode } = selectedOption.dataset;
    const { optimizationQuestionPosition, questionType } = currentPage.dataset;

    const eventState = {
        questionText: generateTextParameter(currentQuestionText),
        answerText: generateTextParameter(answerText),
        outcome,
        mode,
        optimization_question_position: optimizationQuestionPosition,
        question_type: questionType
    };

    return eventState;
}
// let onceSendingApiMultipleSelection = false;
// const sendMultipleleSelectionApi = () => {
    
// 	const et = "SURVEY_RESPONSE";
//     const name = "LM_survey";
//     const page_id = "1";

// 	const eventState = {
// 		et,
//         name,
//         page_id
// 	}
//     if(onceSendingApiMultipleSelection !== true){
// 	sendCustomEventToTheFirstQuestion(eventState);
//     console.log('mulSel',eventState);
//     onceSendingApiMultipleSelection = true;
// }
// 	return eventState;
// }