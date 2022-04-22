import {selectAll} from "creative";

export const handleAnimationState = () => {
	document.addEventListener("hidden", animationPaused);
	document.addEventListener("visible", animationRunning);

	// document.addEventListener("landscape", animationPaused);
	document.addEventListener("portrait", animationRunning);
}

const animationRunning = () => {
	const animatedElements = selectAll(".anim-element");

	animatedElements.forEach(element => element.classList.remove("pause"))
};

const animationPaused = () => {
	const animatedElements = selectAll(".anim-element");

	animatedElements.forEach(element => element.classList.add("pause"))
}