import {decodeURIComponentSafe, generateTextParameter, shuffleSurveyOptions, sortByPosition} from "../../utils";

export const renderSurveyOptions = (dataForOptions) => {
    let {
        shouldRandomizeAnswersOrder,
        randomizationType,
        randomizeLastAnswer,
        answers,
        questionType,
    } = dataForOptions;
    answers = shouldRandomizeAnswersOrder ? shuffleSurveyOptions(answers, randomizationType, randomizeLastAnswer) : sortByPosition(answers);
    const isMultipleSelection = questionType === 2;
    return makeAnswersTemplate(answers, isMultipleSelection);
};

const makeAnswersTemplate = (answers, isMultipleSelection) => {
    return answers.map(
        ({
             text,
             position,
             generatedHtmlId,
             outcome,
             followingQuestionPosition
         }) => {
            const inputType = isMultipleSelection ? "checkbox" : "radio";
            const encodedGeneratedHtmlId = generateTextParameter(generatedHtmlId);
            return `
					<li class="survey-option-item">
						<label
							data-jump-to="${followingQuestionPosition}"
							data-outcome="${outcome}"
							data-mode="${encodedGeneratedHtmlId}"
							class="survey-option"
							for="survey-option-item-${encodedGeneratedHtmlId}"
							style="pointer-events: none">

							<span class="option-item-text-span">${decodeURIComponentSafe(text)}</span>
							<input  type=${inputType}
									id="survey-option-item-${encodedGeneratedHtmlId}"
									name="first-question"
									value="${generateTextParameter(text)}"
							/>
							<span class="checkmark"></span>
						</label>
					</li>`;
        }
    ).join("");
};
