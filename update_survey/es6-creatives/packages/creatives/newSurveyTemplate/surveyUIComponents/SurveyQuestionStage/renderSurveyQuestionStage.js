import {renderSurveyQuestionStageBar} from "./renderSurveyQuestionStageBar";

export const renderSurveyQuestionStage = (maxQuestionsNumber) => {
	return `<div class="questions-stage">
				<div class="questions-stage-bars">
					${renderSurveyQuestionStageBar(maxQuestionsNumber)}
				</div>
			</div>`;
};
