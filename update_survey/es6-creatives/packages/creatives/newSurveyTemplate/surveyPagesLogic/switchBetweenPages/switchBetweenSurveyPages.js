import { selectAll } from "creative";
import { handleAnimationsForPrevSurveyScreen } from "../../surveyPagesAnimation/utils/handleAnimationsForPrevSurveyScreen";
import { handleAnimationsForNextSurveyScreen } from "../../surveyPagesAnimation/utils/handleAnimationsForNextSurveyScreen";
import { defineSurveyOptionSelectionMode } from "../utils/defineSurveyOptionSelectionMode";
import { initDemographicPageAnimation } from "../../surveyPagesAnimation/surveyDemographicPage/initDemographicPageAnimation";
import { handleDemographicPage } from "../surveyDemographicPage/handleDemographicPage";
import { isDemographicPage, isMultipleSelectionMode, switchBetweenQuestionStage } from "../../utils";


const userInteractionDataStore = [];
let nextIndexPage = 0;
export const switchBetweenSurveyPages = async (prevQuestionCount, nextQuestionCount, userInteractionData) => {
    const prevSurveyPage = selectAll(".survey-page")[prevQuestionCount];
    const nextSurveyPage = selectAll(".survey-page")[nextQuestionCount];
    const isMultipleSelection = isMultipleSelectionMode(nextQuestionCount);

    nextIndexPage = nextQuestionCount;
    userInteractionDataStore.push(userInteractionData);


    if (isDemographicPage(nextQuestionCount)) {
        await handleAnimationsForPrevSurveyScreen(prevSurveyPage);
        switchBetweenQuestionStage(nextQuestionCount);
        await initDemographicPageAnimation();
        handleDemographicPage(userInteractionDataStore);
        return;
    }

    await handleAnimationsForPrevSurveyScreen(prevSurveyPage);
    switchBetweenQuestionStage(nextQuestionCount);
    await handleAnimationsForNextSurveyScreen(nextSurveyPage);
    defineSurveyOptionSelectionMode(nextQuestionCount, isMultipleSelection);


    const pageCount = ++nextQuestionCount;
    L.trackOnce({
        et: `PAGE_${pageCount}`
    });

}

/*
* after 600 - 700 ms nextSurveyPage will update the scrollHeight and clientHeight values,
* so in the else if clause the count === 700
*/
export const checkSizeSurveyOptionsContainer = () => {

    let count = 0;
    let interval = null;

    interval = setInterval(() => {
        const surveyBtnContainer = document.querySelectorAll('.survey-btn-container')[nextIndexPage];
        const nextSurveyPage = document.getElementsByClassName("survey-options")[nextIndexPage];
        const page = document.getElementsByClassName("survey-page")[nextIndexPage];

        const isMultipleSellection = page.dataset.questionType === '2';
        isMultipleSellection ? page.classList.add('multiplesellection') : false;

        count += 100;

        if (nextSurveyPage?.clientHeight < nextSurveyPage?.scrollHeight) {
            clearInterval(interval);
            nextSurveyPage?.classList.add('survey-options-scroll');
            surveyBtnContainer?.classList.add('survey-btn-container-scroll');
        } else if (nextSurveyPage?.clientHeight === nextSurveyPage?.scrollHeight && count === 700) {
            clearInterval(interval);
            nextSurveyPage?.classList.remove('survey-options-scroll');
            surveyBtnContainer?.classList.remove('survey-btn-container-scroll');
        }
    }, 100);
};
