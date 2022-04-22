import {first, show} from "creative";
import {removePointerEvents, setPointerEvents} from "../../utils";

export const initDemographicPageAnimation = async () => {
	await handleFieldsAnimation();
}

const handleFieldsAnimation = async () => {
	const demographicPage = first(".survey-demographic-page");
	const demographicForm = first(".survey-demographic-form");
	const demographicAgeFields = first(".age-select-inputs");
	const demographicGenderFields = first(".gender-select-inputs");
	const demographicMaritalStatusFields = first(".marital-status-select-inputs");
	const elemForAnimation = [demographicAgeFields, demographicGenderFields, demographicMaritalStatusFields]

	// CHANGE
	show(demographicPage)
	setPointerEvents(demographicForm);

	for await (const el of showFields(elemForAnimation)){}

	removePointerEvents(demographicForm);
}

async function* showFields(demographicField){
	const maxFieldsNumber = demographicField.length;

	let fieldCount = 0;
	while (fieldCount < maxFieldsNumber) {
		yield initFieldsAnimation(
			demographicField,
			fieldCount++
		);
	}
}

const initFieldsAnimation = (demographicField, fieldCount) => {
	return new Promise(resolve => {
		const onAnimationEndCb = () => {
			demographicField[fieldCount].removeEventListener("animationend", onAnimationEndCb);
			demographicField[fieldCount].classList.remove("anim-element");
			resolve();
		};
		demographicField[fieldCount].addEventListener("animationend", onAnimationEndCb);
		demographicField[fieldCount].classList.add("show", "anim-element");
	});
}
