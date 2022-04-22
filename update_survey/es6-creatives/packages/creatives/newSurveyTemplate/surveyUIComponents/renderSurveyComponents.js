import { first } from "creative";
import { renderSurveyQuestions } from "./SurveyQuestion/renderSurveyQuestions";
import { renderSurveyThankText } from "./SurveyThanksPage/renderSurveyThankText";
import { renderSurveyQuestionStage } from "./SurveyQuestionStage/renderSurveyQuestionStage";
// import {handleSingleSelectionLogic} from "../surveyPagesLogic/utils/handleSingleSelectionLogic";
import { checkLang } from "./checkLanguage";
import { checkSizeSurveyOptionsContainer } from "../surveyPagesLogic/switchBetweenPages/switchBetweenSurveyPages";

export const renderSurveyComponents = (surveyData) => {
    const { hasThankYouPage, questions } = surveyData;

    const surveyQuestionsStages = renderSurveyQuestionStage(questions.length);
    const surveyQuestionsTemplate = renderSurveyQuestions(surveyData);


    const thankPageTemplate = hasThankYouPage ? renderSurveyThankText() : ""; 
  
    const rootContainer = first(".survey-pages-container");
    [thankPageTemplate, surveyQuestionsTemplate, surveyQuestionsStages].forEach(surveyComponent => {
        rootContainer.insertAdjacentHTML("afterbegin", surveyComponent);
    });
    checkSizeSurveyOptionsContainer();
    const language = document.querySelector('.survey-demographic-page').getAttribute('data-lang-iso');
    checkLang(language);
};
