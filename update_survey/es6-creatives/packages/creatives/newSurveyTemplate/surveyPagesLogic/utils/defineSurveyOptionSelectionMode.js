import {handleMultipleSelectionLogic} from "./handleMultipleSelectionLogic";
import {handleSingleSelectionLogic} from "./handleSingleSelectionLogic";

export const defineSurveyOptionSelectionMode = (currentPageCount, isMultipleSelection) => {
	isMultipleSelection
		? handleMultipleSelectionLogic(currentPageCount)
		: handleSingleSelectionLogic(currentPageCount);
}
