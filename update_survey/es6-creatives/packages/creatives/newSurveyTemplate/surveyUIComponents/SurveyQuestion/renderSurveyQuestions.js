import {renderSurveyOptions} from "../SurveyOption/renderSurveyOptions";
import {renderSurveyButton} from "../SurveyButton/renderSurveyButton";
import {decodeURIComponentSafe, sortByPosition} from "../../utils";
import {getFollowingQuestionPositions} from "../../surveyPagesLogic/surveyButton/handleButtonClick";

export const renderSurveyQuestions = (surveyData) => {
    const {questions, optimizationQuestionPosition} = surveyData;

    const sortedQuestionsByPosition = sortByPosition(questions);
    return sortedQuestionsByPosition.map(({
                                              text,
                                              shouldRandomizeAnswersOrder,
                                              randomizationType,
                                              randomizeLastAnswer,
                                              answers,
                                              questionType,
                                              outcomePattern,
                                              ...positions
                                          }) => {
        const dataForOptionComponent = {
            shouldRandomizeAnswersOrder,
            randomizationType,
            randomizeLastAnswer,
            answers,
            questionType,
        };
        const checkFollovingQuestionPosiotions = () =>{
          
          const isMultipleSelectionOptions =
                positions.hasOwnProperty('positiveFollowingQuestionPosition') &&
                positions.hasOwnProperty('neutralFollowingQuestionPosition') &&
                positions.hasOwnProperty('negativeFollowingQuestionPosition');
          
          if(isMultipleSelectionOptions){
            return `
            data-positive-following-question-type="${positions.positiveFollowingQuestionPosition}"
            data-neutral-following-question-type="${positions.neutralFollowingQuestionPosition}"
            data-negative-following-question-type="${positions.negativeFollowingQuestionPosition}"
            `
          }
        }
        const isMultipleSelection = questionType === 2;

        return `
				<section
				data-outcome-pattern="${outcomePattern.join(",")}"
        data-question-type=${questionType}
		    ${checkFollovingQuestionPosiotions()}
				data-optimization-question-position="${optimizationQuestionPosition}"
				class="survey-page">

					<h2 class="survey-question-text">${decodeURIComponentSafe(text)}</h2>
					<ul class="survey-options">
						${renderSurveyOptions(dataForOptionComponent)}
					</ul>
				 	${isMultipleSelection ? renderSurveyButton() : ""}
				</section>
				`
    }).join("");
};
