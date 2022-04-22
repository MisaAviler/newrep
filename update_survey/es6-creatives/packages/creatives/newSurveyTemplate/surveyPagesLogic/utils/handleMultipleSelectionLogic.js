import {selectAll} from "creative";
import {initSurveyButtonAnimation} from "../../surveyPagesAnimation/surveyButton/initSurveyButtonAnimation";
import {handleButtonClick} from "../surveyButton/handleButtonClick";
import {sortByPosition} from "../../utils";


let listOfMultipleSelectedOptions = new Set();
export const handleMultipleSelectionLogic = (currentQuestion) => {
	const currentScreen = selectAll(".survey-page")[currentQuestion];

	listOfMultipleSelectedOptions = new Set();
	currentScreen.addEventListener("change", (e) => {
		handleMultipleSelectionClickEvent(e, currentQuestion);
	});

	return handleButtonClick(currentQuestion, listOfMultipleSelectedOptions);
};

const handleMultipleSelectionClickEvent = (e, currentQuestion) => {
	const {target} =  e;
	const optionLabel = target.parentElement;
	if(target.checked){
		optionLabel.classList.add("active");
		listOfMultipleSelectedOptions.add(optionLabel);
		optionLabel.classList.remove("deactive")
	}else{
		optionLabel.classList.remove("active");
		listOfMultipleSelectedOptions.delete(optionLabel);
		optionLabel.classList.add("deactive");
	}

	return initSurveyButtonAnimation(currentQuestion, listOfMultipleSelectedOptions)
};


