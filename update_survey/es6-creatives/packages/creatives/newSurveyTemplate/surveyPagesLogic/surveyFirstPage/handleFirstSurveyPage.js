import {isMultipleSelectionMode} from "../../utils";
import {defineSurveyOptionSelectionMode} from "../utils/defineSurveyOptionSelectionMode";

export const handleFirstSurveyPage = () => {
	const firstPageCount = 0;
	const isMultipleSelection = isMultipleSelectionMode(firstPageCount);

	return defineSurveyOptionSelectionMode(firstPageCount, isMultipleSelection);
}