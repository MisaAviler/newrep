import {selectAll} from "creative";
import {toggleButton} from "../../utils";

export const initSurveyButtonAnimation = (currentQuestion, selectedOptions) => {
	const currentPage = selectAll(".survey-page")[currentQuestion];
	const currentBtn = toggleButton(currentPage);

	const isOptionsSelected = selectedOptions.size;
	isOptionsSelected ? currentBtn.showBtn() : currentBtn.hideBtn();
}


