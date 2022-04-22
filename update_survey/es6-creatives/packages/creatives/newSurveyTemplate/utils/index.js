import {first, flex, hide, selectAll, show} from "creative";

export const hideAndCloseSurvey = () => {
    hide(document.body);
    window.L && L.webview.close();
}

const randomizeOptions = (options, randomizeLastAnswer) => {
    if (!randomizeLastAnswer) {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
    } else {
        let lastAnswer = options.pop();
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        options.push(lastAnswer);
    }
    return options
};

const columnOptionsReverse = Boolean(Math.round(Math.random()));

const flipOptions = (options, randomizeLastAnswer) => {
    if (!randomizeLastAnswer) {
        columnOptionsReverse ? options.reverse() : false;
    } else {
        let lastAnswer = options.pop();

        columnOptionsReverse ? options.reverse() : false;

        options.push(lastAnswer);
    }
    return options;
};

export const shuffleSurveyOptions = (options, randomizationType, randomizeLastAnswer) => {

    if (!Array.isArray(options)) {
        throw new Error("The function argument must be an Array")
    }

    if (randomizationType === 1) {
        options = randomizeOptions(options, randomizeLastAnswer);
    }
    if (randomizationType === 2) {
        options = flipOptions(options, randomizeLastAnswer);
    }

    return options;
}

export const fireEventAndRemoveListener = (target, eventName, cb) => {
    const handleEvent = async (e) => {
        target.removeEventListener(`${eventName}`, handleEvent);
        await cb(e);
    };

    target.addEventListener(`${eventName}`, handleEvent);
};

export const isDemographicPage = (currentPageCount) => {
    const maxQuestionNumber = selectAll(".survey-page").length - 1;
    return currentPageCount === maxQuestionNumber;
}

const handleChangeActiveQuestionStage = currentPageCount => {
    if (isDemographicPage(currentPageCount)) {
        selectAll(".bar").forEach(hide);
        return;
    }

    selectAll(".bar").forEach((bar, barIndex) => {
        bar.classList.remove("active-stage");
        if (barIndex === currentPageCount) {
            bar.classList.add("active-stage");
        }
    });
};

const handleChangeQuestionCount = currentQuestionCount => {
    const questionCount = first(".question-count");
    const questionStageContainer = first(".questions-stage");

    if (isDemographicPage(currentQuestionCount)) {
        return hide(questionStageContainer)
    }
    ;

    // questionCount.innerHTML = ++currentQuestionCount;
};

export const switchBetweenQuestionStage = (currentQuestionCount) => {
    handleChangeActiveQuestionStage(currentQuestionCount);
    handleChangeQuestionCount(currentQuestionCount);
}

export const delay = (fn, delay) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            await fn();
            resolve();
        }, delay)
    })
}

export const togglePrivacyPolicyText = () => {
    const privatePolicySelector = first(".survey-footer-privacy-policy-text-container");
    const hidePrivacyPolicy = () => {
        hide(privatePolicySelector)
        privatePolicySelector.classList.remove("show");
        privatePolicySelector.classList.add("hide");
    };

    const showPrivacyPolicy = () => {
        show(privatePolicySelector)
        privatePolicySelector.classList.add("show");
        privatePolicySelector.classList.remove("hide");
    }

    return {
        showPrivacyPolicy,
        hidePrivacyPolicy
    }
}

export const toggleButton = (currentScreen) => {
    const currentScreenBtn = currentScreen.querySelector(".survey-btn-container");

    const hideBtn = () => {
        currentScreenBtn.classList.remove("show");
        currentScreenBtn.classList.add("hide");
        currentScreenBtn.style.pointerEvents = "none";
        // hide(currentScreenBtn)
    };

    const showBtn = () => {
        currentScreenBtn.style.pointerEvents = "auto";
        flex(currentScreenBtn)
        currentScreenBtn.classList.add("show");
        currentScreenBtn.classList.remove("hide");
    };

    return {
        showBtn,
        hideBtn
    }
}

export const initAnimationForPrivacyPolicy = () => {
    const privacyPolicyText = togglePrivacyPolicyText(first(".survey-footer-privacy-policy-text-container"));
    // const privacyPolicyClickZone = first(".privacy-policy-click");

    privacyPolicyText.showPrivacyPolicy();
    // show(privacyPolicyClickZone);
    // show(privacyPolicyClickZone);
}

export const isMultipleSelectionMode = (currentScreenCount) => {
    const currentPage = selectAll(".survey-page")[currentScreenCount];

    return Boolean(currentPage.querySelector(".survey-btn-container"));
}

export const sendCustomEvent = ({
                                    mode,
                                    questionText,
                                    answerText,
                                    outcome,
                                    optimization_question_position,
                                    question_type
                                }) => {
    const eventState = {
        et: "INTERACTION",
        name: "LM_survey",
        mode,
        q: questionText,
        awr: answerText,
        survey_outcome: outcome,
        optimization_question_position,
        question_type,
        campaign_id: '%%CAMP_ID%%',
        li_id: '%%LI_ID%%',
        pl_aw_aud: '%%PL_AWARENESS_AUDIENCE%%',
        age_rating: '%%AGE_RATING%%',
        pub_name: '%%PUBLISHER_NAME%%',
        language: '%%LANGUAGE%%',
        survey_type: '%%SURVEY_TYPE%%',
        del_segment: '%%DELIVERED_SEGMENT%%',
        data_exclude: '%%DATA_EXCLUDE%%',
        ssp: '%%EXCHANGE%%',
        app_genre: '%%APP_GENRE%%',
        app_category: '%%APP_CATEGORY%%',
    };

    // console.log(eventState);
    L.track(eventState);
};

//added code

export const sendCustomEventToTheFirstQuestion = ({
    et,
    name,
    page_id
}) => {
const eventState = {
    et,
    name,
    page_id
};
L.track(eventState);
};


export const generateTextParameter = (text) => {
    return encodeURIComponent(decodeURIComponentSafe(text.toLowerCase().split(" ").join("_")));
}
/*
* if string not include character '%' function decodeURIComponentSafe() returns decoding string without changes,
* if  string include character '%' function decodeURIComponentSafe()
* returns decoded string and added safe characters for '%'
* */
export const decodeURIComponentSafe = (text) => {
    if (!text) {
        return text;
    }
    if (text.indexOf('%') === -1) {
        return decodeURIComponent(text)
    } else {
        try {
            return decodeURIComponent(text.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25'));
        } catch (e) {
            return decodeURIComponent(text);
        }
    }
};

export const flatDeep = (arr, deep = 1) => {
    return deep > 0 ?
        arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, deep - 1) : val), [])
        : arr.slice();
};

export const setPointerEvents = (target) => target.style.pointerEvents = "none";

export const removePointerEvents = (target) => target.style.pointerEvents = "auto";

export const sortByPosition = (items) => items.sort((a, b) => a.position - b.position)
const s = (items) => items.sort((a, b) => a.position - b.position);


