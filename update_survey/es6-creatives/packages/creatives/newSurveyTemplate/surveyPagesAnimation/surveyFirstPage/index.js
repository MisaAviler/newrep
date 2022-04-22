import {initFirstPageOptionsAnimation} from "./initFirstPageOptionsAnimation";
import {delay, initAnimationForPrivacyPolicy} from "../../utils";

export const initFirstPageAnimation = async () => {
	await delay(initFirstPageOptionsAnimation, 500);
	initAnimationForPrivacyPolicy();
}