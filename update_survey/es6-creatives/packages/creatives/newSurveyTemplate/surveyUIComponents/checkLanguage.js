import {first} from "creative";

const body = first('body');
const maritalStatusWrapper = first('.marital-status-inputs-wrapper');

const typesLang = ['ru', 'uk', 'es', 'jp', 'th', 'en'];

const addClassName = (el, className) => el.classList.add(className);

const addLangInBodyClassName = (lang) => {
    addClassName(body, lang);
    addClassName(maritalStatusWrapper, 'addFlex');
};
export const checkLang = (lang) => {
    typesLang.includes(lang) ? addLangInBodyClassName(lang) : false;
};
