export const renderSurveyQuestionStageBar = (maxOptionsNumber) => {
	const MAX_NUMBER_SURVEY_SCREENS = maxOptionsNumber;
	let templateString = '';

	while (maxOptionsNumber > 0){
		templateString += `<span style="width: ${100 / MAX_NUMBER_SURVEY_SCREENS}%" class="bar"></span>`
		maxOptionsNumber--;
	}
	return templateString;
}