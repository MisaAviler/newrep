import {first, flex, hide} from "creative";

export const showThanksPage = () => {
	const thanksPage = first(".thanks-page");
	const demographicPage = first(".survey-demographic-page");
	const privacyPolicy = first(".survey-footer-privacy-policy-text-container");
	// const privacyPolicyClick = first(".privacy-policy-click");

	[demographicPage, privacyPolicy].forEach(hide);

	flex(thanksPage)
}