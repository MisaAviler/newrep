import {first} from "creative";
import {showThanksPage} from "../../surveyPagesAnimation/otherSurveyPages/showThanksPage";
import {hideAndCloseSurvey} from "../../utils";

export const handleDemographicPage = (userInteractionDataWithCalculatedOutcome) => {
	const demographicPage = first(".survey-demographic-page");
	demographicPage.addEventListener("change", (e) => handleDemographicPageChange(e, userInteractionDataWithCalculatedOutcome));
};

const selectedInputs = {};
const handleDemographicPageChange = ({target}, userInteractionDataWithCalculatedOutcome) => {
	const {name} = target;

	const inputValue = target.getAttribute("id")
		.replace(/\s+/g, "")
		.split(/-input|-gender/g)[0]
		.toLowerCase();

	selectedInputs[name] = inputValue;

	const keys = Object.keys(selectedInputs);
	const hasThanksPage = Boolean(first(".thanks-page"));

	if(keys.length < 3) return;

	handleSendingCustomEvent(userInteractionDataWithCalculatedOutcome, selectedInputs);

	L.trackOnce({
		et: "CUSTOM",
		name: "LM_survey",
		mode: "TY_PAGE"
	});
	return hasThanksPage ?  showThanksPage() : hideAndCloseSurvey();
}

const handleSendingCustomEvent = (userInteractionDataWithCalculatedOutcome, selectedInputs) => {
	const multipleSelectedResponses = [];
	const singleSelectedResponses = [];

	userInteractionDataWithCalculatedOutcome.forEach(optionData => {

		if(Array.isArray(optionData)){
			multipleSelectedResponses.push({
				a: optionData.map(option => option.answerText).join(","),
				o: optionData[0].outcome,
				q: optionData[0].questionText
			})
		}else{
			singleSelectedResponses.push({
				a: optionData.answerText,
				o: optionData.outcome,
				q: optionData.questionText
			});
		}
	})

	const userResponsesData = [].concat(singleSelectedResponses,multipleSelectedResponses);

	L.track({
		et: "SURVEY",
		name: "LM_survey",
		...selectedInputs,
		user_responses: encodeURIComponent(JSON.stringify(userResponsesData))
	});
}
